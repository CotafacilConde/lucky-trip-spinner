
-- Create system_config table to store admin password
CREATE TABLE IF NOT EXISTS public.system_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the admin password
INSERT INTO public.system_config (config_key, config_value) 
VALUES ('admin_password', 'Cotafacil.conde2025')
ON CONFLICT (config_key) DO UPDATE SET config_value = EXCLUDED.config_value;

-- Create function to get admin password
CREATE OR REPLACE FUNCTION public.get_admin_password()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT config_value FROM public.system_config WHERE config_key = 'admin_password');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on system_config table
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading system config (needed for the function)
CREATE POLICY "Allow reading system config" ON public.system_config
  FOR SELECT USING (true);
