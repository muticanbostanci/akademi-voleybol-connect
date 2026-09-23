-- Genel içerik tabloları: herkes okur, yazma yalnızca yönetici (service_role) üzerinden.
REVOKE INSERT, UPDATE, DELETE ON public.teams FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.players FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.slides FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.matches FROM anon, authenticated;

GRANT SELECT ON public.teams TO anon, authenticated;
GRANT SELECT ON public.players TO anon, authenticated;
GRANT SELECT ON public.slides TO anon, authenticated;
GRANT SELECT ON public.matches TO anon, authenticated;

GRANT ALL ON public.teams TO service_role;
GRANT ALL ON public.players TO service_role;
GRANT ALL ON public.slides TO service_role;
GRANT ALL ON public.matches TO service_role;
