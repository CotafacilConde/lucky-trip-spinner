
-- Drop existing UPDATE and DELETE policies for participants table
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.participants;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.participants;

-- Create new UPDATE policy for public role (anyone can update)
CREATE POLICY "Anyone can update participants" 
ON public.participants 
FOR UPDATE 
USING (true);

-- Create new DELETE policy for public role (anyone can delete)
CREATE POLICY "Anyone can delete participants" 
ON public.participants 
FOR DELETE 
USING (true);
