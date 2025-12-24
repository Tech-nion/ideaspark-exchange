import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ideaId, title, description, category, tags } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Verifying idea:", ideaId, title);

    const prompt = `You are an expert startup idea analyst and venture capital advisor. Analyze this startup idea and provide a structured evaluation.

IDEA DETAILS:
- Title: ${title}
- Category: ${category}
- Tags: ${tags?.join(", ") || "None"}
- Description: ${description}

Evaluate the idea on these criteria and provide:
1. A viability score from 0-100 (where 100 is highly viable)
2. A predicted market value/price range in USD (what someone would pay for this validated idea)
3. Key strengths (2-3 bullet points)
4. Potential challenges (2-3 bullet points)
5. Market opportunity assessment (1-2 sentences)

Return your response in this exact JSON format:
{
  "score": <number 0-100>,
  "predictedPrice": <number in USD>,
  "strengths": ["strength1", "strength2"],
  "challenges": ["challenge1", "challenge2"],
  "marketOpportunity": "<assessment string>",
  "summary": "<1-2 sentence overall assessment>"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a startup idea analyst. Always respond with valid JSON only, no markdown or explanation." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("AI Response:", content);

    // Parse the JSON response
    let analysis;
    try {
      // Remove any markdown code blocks if present
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return new Response(JSON.stringify({ error: "Failed to parse AI analysis" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update the idea in the database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: updateError } = await supabase
      .from("ideas")
      .update({
        ai_verified: true,
        ai_score: analysis.score,
        ai_predicted_price: analysis.predictedPrice,
        ai_analysis: JSON.stringify(analysis),
        verified_at: new Date().toISOString(),
      })
      .eq("id", ideaId);

    if (updateError) {
      console.error("Database update error:", updateError);
    }

    return new Response(JSON.stringify({
      success: true,
      analysis: {
        score: analysis.score,
        predictedPrice: analysis.predictedPrice,
        strengths: analysis.strengths,
        challenges: analysis.challenges,
        marketOpportunity: analysis.marketOpportunity,
        summary: analysis.summary,
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Verify idea function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
