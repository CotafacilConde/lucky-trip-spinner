-- Create a table for participants (leads)
CREATE TABLE public.participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  contato TEXT NOT NULL,
  numero INTEGER NOT NULL UNIQUE,
  origem TEXT,
  observacoes TEXT,
  data_atribuicao TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required for this app)
CREATE POLICY "Anyone can view participants" 
ON public.participants 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create participants" 
ON public.participants 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.data_atribuicao = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create index for better performance on numero column
CREATE INDEX idx_participants_numero ON public.participants(numero);

-- Create index for better performance on data_atribuicao column
CREATE INDEX idx_participants_data_atribuicao ON public.participants(data_atribuicao DESC);