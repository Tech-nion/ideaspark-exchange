-- Allow authenticated users to insert their own ideas
CREATE POLICY "Users can insert their own ideas"
ON public.ideas
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = creator_id);

-- Allow users to update their own ideas
CREATE POLICY "Users can update their own ideas"
ON public.ideas
FOR UPDATE
TO authenticated
USING (auth.uid() = creator_id);

-- Allow users to delete their own ideas
CREATE POLICY "Users can delete their own ideas"
ON public.ideas
FOR DELETE
TO authenticated
USING (auth.uid() = creator_id);

-- Allow users to view their own unpublished ideas
CREATE POLICY "Users can view their own ideas"
ON public.ideas
FOR SELECT
TO authenticated
USING (auth.uid() = creator_id);