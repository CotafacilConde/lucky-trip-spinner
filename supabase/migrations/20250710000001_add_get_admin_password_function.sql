
-- Create function to get admin password
CREATE OR REPLACE FUNCTION public.get_admin_password()
RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT config_value FROM public.system_config WHERE config_key = 'admin_password');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
