CREATE TABLE public.teams (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  league TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.teams TO anon;
GRANT SELECT ON public.teams TO authenticated;
GRANT ALL ON public.teams TO service_role;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teams are publicly readable" ON public.teams FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_slug TEXT NOT NULL REFERENCES public.teams(slug) ON DELETE CASCADE,
  jersey_number TEXT NOT NULL DEFAULT '00',
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX players_team_slug_idx ON public.players (team_slug, sort_order);
GRANT SELECT ON public.players TO anon;
GRANT SELECT ON public.players TO authenticated;
GRANT ALL ON public.players TO service_role;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Players are publicly readable" ON public.players FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  eyebrow TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  position TEXT NOT NULL DEFAULT 'center',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.slides TO anon;
GRANT SELECT ON public.slides TO authenticated;
GRANT ALL ON public.slides TO service_role;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Slides are publicly readable" ON public.slides FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.matches (
  slot TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  match_date TEXT NOT NULL DEFAULT '',
  match_time TEXT NOT NULL DEFAULT '',
  venue TEXT NOT NULL DEFAULT '',
  home_name TEXT NOT NULL DEFAULT '',
  away_name TEXT NOT NULL DEFAULT '',
  home_logo TEXT,
  away_logo TEXT,
  score TEXT NOT NULL DEFAULT '',
  sets TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.matches TO anon;
GRANT SELECT ON public.matches TO authenticated;
GRANT ALL ON public.matches TO service_role;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Matches are publicly readable" ON public.matches FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.teams (slug, name, league, description, image_url, sort_order) VALUES
 ('superlig-genc-takim', 'Süperlig Genç Takım', 'Süperlig', 'Genç sporcular için ileri seviye teknik, taktik ve müsabaka gelişimi.', '/takim-genc-yildiz.png', 1),
 ('superlig-yildiz-takim', 'Süperlig Yıldız Takım', 'Süperlig', 'Takım disiplini ve hedef odaklı lig hazırlığı.', '/takim-yildiz.png', 2),
 ('superlig-kucuk-takim', 'Süperlig Küçük Takım', 'Süperlig', 'Teknik gelişim, koordinasyon ve müsabaka deneyimi.', '/takim-kucuk-kiz.png', 3),
 ('1-lig-yildiz-takim', '1. Lig Yıldız Takım', '1. Lig', 'Sağlam altyapı ve düzenli maç temposuyla gelişim.', '/takim-yildiz.png', 4),
 ('1-lig-kucuk-a-takim', '1. Lig Küçük A Takım', '1. Lig', 'Takım ruhu ve temel oyun prensipleri.', '/takim-kucuk-kiz.png', 5),
 ('1-lig-kucuk-b-takim', '1. Lig Küçük B Takım', '1. Lig', 'Temel becerilerden müsabaka deneyimine uzanan program.', '/takim-kucuk-kiz.png', 6),
 ('1-lig-midi-a-takim', '1. Lig Midi A Takım', '1. Lig', 'Oyun bilgisi, koordinasyon ve takım kültürü.', '/takim-midiler.png', 7),
 ('1-lig-midi-b-takim', '1. Lig Midi B Takım', '1. Lig', 'Düzenli antrenmanla bireysel ve takım gelişimi.', '/takim-midiler.png', 8),
 ('1-lig-mini-a-takim', '1. Lig Mini A Takım', '1. Lig', 'Voleybolun temel hareketleriyle güvenli başlangıç.', '/takim-miniler.png', 9),
 ('1-lig-mini-b-takim', '1. Lig Mini B Takım', '1. Lig', 'Oyunla öğrenme, özgüven ve spor sevgisi.', '/takim-minisler.png', 10),
 ('spor-okullarimiz', 'Spor Okullarımız', 'Voleybol Eğitimi', 'Voleybola başlamak isteyen çocuklar için yaşa uygun eğitim.', '/takim-miniler.png', 11);

INSERT INTO public.slides (image_url, eyebrow, title, description, position, sort_order) VALUES
 ('/akademi-volleyball-hero.jpg', '2022''DEN BERİ • VOLEYBOL AKADEMİSİ', 'GELECEĞİN VOLEYBOLCULARI YETİŞİYOR', 'Disiplin, takım ruhu ve güçlü altyapıyla sahaya çıkıyoruz. Ankara''da geleceğin sporcularını birlikte yetiştiriyoruz.', '68% center', 1),
 ('/takim-genc-yildiz.png', 'ANTRENMAN • GELİŞİM • TAKIM RUHU', 'HER ANTRENMANDA DAHA GÜÇLÜ', 'Teknik gelişimi, oyun disiplinini ve takım kültürünü aynı sahada buluşturuyoruz.', 'center', 2),
 ('/takim-midiler.png', 'ANKARA • AKADEMİ SPOR KULÜBÜ', 'SAHADA BİRLİKTE BÜYÜYORUZ', 'Farklı yaş gruplarına uygun programlarla sporcularımızın potansiyelini destekliyoruz.', 'center', 3),
 ('/takim-miniler.png', 'İLK ADIM • SAĞLAM TEMEL', 'VOLEYBOL SEVGİSİ BURADA BAŞLIYOR', 'Çocuklar için güvenli, eğlenceli ve gelişim odaklı bir spor ortamı sunuyoruz.', 'center', 4);

INSERT INTO public.matches (slot, label, match_date, match_time, venue, home_name, away_name, home_logo, away_logo, score, sets) VALUES
 ('upcoming', 'GELECEK MAÇ', 'Tarih eklenecek', 'Saat eklenecek', 'Salon bilgisi eklenecek', 'Akademi Spor Kulübü', 'Rakip Takım', '/akademi-spor-kulubu-logo.png', '/akademi-spor-kulubu-logo.png', '', ''),
 ('latest', 'SON MAÇ', 'Maç tarihi eklenecek', '', '', 'Akademi Spor Kulübü', 'Rakip Takım', '/akademi-spor-kulubu-logo.png', '/akademi-spor-kulubu-logo.png', '3–0', '25–22, 25–22, 25–14');
