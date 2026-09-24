import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Clock3, ExternalLink, Instagram, Mail, MapPin, Navigation, Pause, Phone, Play, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader, StickyWhatsApp, WhatsAppIcon, WHATSAPP_URL, INSTAGRAM_URL } from "@/components/site-chrome";
import { TeamGrid } from "@/components/team-grid";
import { getHomeContent, type Match, type Slide, type Team } from "@/lib/content.functions";
import { CLUB_LOGO, CLUB_NAME } from "@/lib/brand";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kaz%C4%B1m+Orbay%2C+342.+Cd.+No%3A46%2C+06630+Mamak%2FAnkara";
const TRAINING_SLIDES: Slide[] = [
  { id: "training-01", image_url: "/antrenman/antrenman-01.jpg", eyebrow: "AKADEMİ ATLETİK • TAKIM RUHU", title: "BİRLİKTE DAHA GÜÇLÜYÜZ", description: "Disiplin, dayanışma ve oyun sevgisiyle her antrenmanda birlikte gelişiyoruz.", position: "center", sort_order: 1001 },
  { id: "training-02", image_url: "/antrenman/antrenman-02.jpg", eyebrow: "DENEYİMLİ ANTRENÖRLER", title: "DOĞRU EĞİTİMLE GELİŞİM", description: "Teknik gelişimi güçlü iletişim ve takım kültürüyle buluşturuyoruz.", position: "center", sort_order: 1002 },
  { id: "training-03", image_url: "/antrenman/antrenman-03.jpg", eyebrow: "ANTRENMAN • ODAK • GELİŞİM", title: "HER GÜN BİR ADIM İLERİ", description: "Sahadaki her tekrar, geleceğin güçlü sporcularını hazırlıyor.", position: "center", sort_order: 1003 },
  { id: "training-04", image_url: "/antrenman/antrenman-04.jpg", eyebrow: "SAHADA ENERJİ", title: "OYUNUN İÇİNDE BÜYÜ", description: "Voleybol sevgisini disiplinli çalışma ve gerçek takım ruhuyla yaşatıyoruz.", position: "center", sort_order: 1004 },
  { id: "training-05", image_url: "/antrenman/antrenman-05.jpg", eyebrow: "HER SPORCUYA ALAN", title: "KENDİ GÜCÜNÜ KEŞFET", description: "Farklı yaş ve seviyelere uygun çalışmalarla her sporcunun gelişimini destekliyoruz.", position: "center", sort_order: 1005 },
  { id: "training-06", image_url: "/antrenman/antrenman-06.jpg", eyebrow: "HAZIRLIK • KARARLILIK", title: "HER TOPA HAZIR", description: "Odak, çeviklik ve özgüven sahadaki güçlü duruşun temelini oluşturuyor.", position: "center", sort_order: 1006 },
  { id: "training-07", image_url: "/antrenman/antrenman-07.jpg", eyebrow: "TAKIM • TUTKU • HEDEF", title: "AYNI HEDEFE BAKIYORUZ", description: "Ankara'da voleybolun birleştirici gücüyle geleceğe hazırlanıyoruz.", position: "center", sort_order: 1007 },
];

export const Route = createFileRoute("/")({
  staleTime: 0,
  shouldReload: true,
  loader: () => getHomeContent(),
  head: () => ({ meta: [
    { title: "Akademi Atletik Spor Kulübü | Ankara Voleybol Akademisi" },
    { name: "description", content: "Akademi Atletik Spor Kulübü takımları, maçları, oyuncu kadroları ve Ankara voleybol antrenmanları." },
    { property: "og:title", content: "Akademi Atletik Spor Kulübü | Ankara Voleybol Akademisi" },
    { property: "og:description", content: "Geleceğin voleybolcuları Akademi Atletik Spor Kulübü'nde yetişiyor." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
  errorComponent: () => <main className="grid min-h-screen place-items-center bg-section-dark px-5 text-center text-hero-foreground"><p>Sayfa içeriği yüklenemedi. Lütfen yenileyin.</p></main>,
  notFoundComponent: () => <main className="grid min-h-screen place-items-center bg-section-dark text-hero-foreground"><p>Sayfa bulunamadı.</p></main>,
});

function HeroSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing || slides.length < 2) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [playing, slides.length]);
  if (!slides.length) return null;
  const go = (index: number) => setActive((index + slides.length) % slides.length);
  return <section className="hero-slider" aria-roledescription="carousel" aria-label={`${CLUB_NAME} tanıtım görselleri`}>
    {slides.map((slide, index) => <article key={slide.id} className={`hero-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active}>
      <img src={slide.image_url} alt={slide.title} className="hero-slide-image" style={{ objectPosition: slide.position }} fetchPriority={index === 0 ? "high" : "auto"} />
      <div className="hero-overlay" />
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-end px-5 pb-28 pt-32 sm:items-center sm:pb-16 lg:min-h-[820px] lg:px-8">
        <div className="max-w-3xl"><div className="eyebrow"><span /> {slide.eyebrow}</div><h1 className="mt-5 font-display text-5xl font-black leading-[0.94] text-hero-foreground sm:text-6xl lg:text-8xl">{slide.title}</h1><p className="mt-6 max-w-xl text-base leading-relaxed text-hero-muted sm:text-lg">{slide.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp'tan Bilgi Al <ArrowRight /></a><Link className="btn-ghost-hero" to="/takimlar">Takımları İncele <ArrowRight /></Link></div><div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-hero-line pt-6 text-xs font-bold uppercase text-hero-muted"><span className="flex items-center gap-2"><Users className="size-4 text-brand-gold" /> 11 Takım Grubu</span><span className="flex items-center gap-2"><Trophy className="size-4 text-brand-gold" /> Lisanslı Sporcular</span><span className="flex items-center gap-2"><MapPin className="size-4 text-brand-gold" /> Ankara</span></div></div>
      </div>
    </article>)}
    <div className="hero-controls"><Button variant="ghost" size="icon" onClick={() => go(active - 1)} aria-label="Önceki görsel"><ArrowLeft /></Button><div className="hero-dots">{slides.map((slide, index) => <button key={slide.id} onClick={() => go(index)} className={index === active ? "is-active" : ""} aria-label={`${index + 1}. görsel`} aria-current={index === active ? "true" : undefined} />)}</div><Button variant="ghost" size="icon" onClick={() => setPlaying(value => !value)} aria-label={playing ? "Kaydırıcıyı duraklat" : "Kaydırıcıyı oynat"}>{playing ? <Pause /> : <Play />}</Button><Button variant="ghost" size="icon" onClick={() => go(active + 1)} aria-label="Sonraki görsel"><ArrowRight /></Button></div>
  </section>;
}

function TeamLogo({ name, logo }: { name: string; logo: string | null }) { return <div className="match-team"><div className="match-logo"><img src={logo ?? CLUB_LOGO} alt={`${name} logosu`} /></div><strong>{name}</strong></div>; }

const FIXTURE_URL = "https://ankara.voleyboliltemsilciligi.com/";

function MatchLinks() {
  return <nav className="match-tabs" aria-label="Lig bağlantıları"><a href={FIXTURE_URL} target="_blank" rel="noreferrer">PUAN DURUMU</a><a href={FIXTURE_URL} target="_blank" rel="noreferrer">FİKSTÜR</a></nav>;
}

function MatchCard({ match, latest = false }: { match: Match; latest?: boolean }) {
  const middle = latest ? match.score || "—" : match.match_date || "TARİH YAKINDA";
  return <article className="match-card">
    <MatchLinks />
    <div className="match-card-heading"><span className="match-tournament"><Trophy /></span><h3>{latest ? "SON MAÇ SONUCU" : "GELECEK MAÇ"}</h3><span aria-hidden="true" /></div>
    <div className="match-versus"><TeamLogo name={match.home_name} logo={match.home_logo} /><div className="match-center"><b>{middle}</b>{latest ? <small>{match.sets.split(",").map(set => set.trim()).filter(Boolean).join("  •  ")}</small> : <small>{match.match_time}{match.venue ? ` • ${match.venue}` : ""}</small>}</div><TeamLogo name={match.away_name} logo={match.away_logo} /></div>
  </article>;
}

function Matches({ matches }: { matches: Match[] }) {
  const upcoming = matches.find(match => match.slot === "upcoming");
  const latest = matches.find(match => match.slot === "latest");
  return <section className="matches-band"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"><div className="matches-heading"><div><p className="section-kicker text-brand-gold">SAHADAKİ HEYECAN</p><h2>MAÇ MERKEZİ</h2></div><a href={FIXTURE_URL} target="_blank" rel="noreferrer">Tüm fikstürü gör <ExternalLink /></a></div><div className="matches-grid">
    {upcoming && <MatchCard match={upcoming} />}
    {latest && <MatchCard match={latest} latest />}
  </div></div></section>;
}

function Index() {
  const initialData = Route.useLoaderData() as { slides: Slide[]; matches: Match[]; teams: Team[] };
  const fetchHomeContent = useServerFn(getHomeContent);
  const { data } = useQuery({ queryKey: ["home-content"], queryFn: fetchHomeContent, initialData, staleTime: 0, refetchOnMount: "always", refetchOnWindowFocus: true });
  const { matches, teams } = data;
  const slides = [...data.slides, ...TRAINING_SLIDES];
  return <main id="top" className="overflow-hidden bg-background text-foreground"><SiteHeader /><HeroSlider slides={slides} /><Matches matches={matches} />
  <section id="takimlar" className="section-light"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="section-heading"><div><p className="section-kicker">SAHADAKİ GÜCÜMÜZ</p><h2>TAKIMLARIMIZ <span>&</span><br />YAŞ GRUPLARIMIZ</h2></div><div><p>Her yaşta doğru eğitim, güçlü takım ruhu ve sürdürülebilir sportif gelişim.</p><Link to="/takimlar" className="mt-5 inline-flex items-center gap-2 font-bold text-brand-red">Tüm takımları gör <ArrowRight className="size-4" /></Link></div></div><div className="mt-12"><TeamGrid teams={teams} compact /></div></div></section>
  <section id="salon" className="section-dark"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28"><div><p className="section-kicker text-brand-gold">ANTRENMAN ALANIMIZ</p><h2 className="mt-3 font-display text-4xl font-black leading-tight text-hero-foreground sm:text-5xl">OYUNUN KALBİ<br />ÇAĞRIBEY'DE ATIYOR</h2><p className="mt-6 max-w-lg leading-relaxed text-hero-muted">Tüm takım antrenmanlarımız Çağrıbey Anadolu Lisesi Spor Salonu'nda gerçekleşiyor.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="info-line"><MapPin /><span><small>Adres</small>Kazım Orbay, 342. Cd. No:46<br />06630 Mamak / Ankara</span></div><div className="info-line"><Clock3 /><span><small>Saatler</small>Yaş grubuna göre<br />WhatsApp'tan öğrenin</span></div></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><Navigation /> Yol Tarifi Al</a><a className="btn-outline-dark" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> Saatleri Sor</a></div></div><a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-card"><div className="map-grid" /><div className="map-rings"><span /><span /><span /></div><MapPin className="relative z-10 size-14 fill-brand-red text-brand-red" /><div className="relative z-10 mt-4 px-6 text-center"><strong>Mamak / Ankara</strong><span>Kazım Orbay, 342. Cd. No:46, 06630</span></div><div className="map-action">Google Haritalar'da Aç <ExternalLink /></div></a></div></section>
  <section id="iletisim" className="section-contact"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="section-heading"><div><p className="section-kicker">BİZE ULAŞIN</p><h2>TAKIMA KATILMAYA<br /><span>HAZIR MISINIZ?</span></h2></div><p>Size en uygun yaş grubu ve antrenman programı için doğrudan iletişime geçin.</p></div><div className="mt-12 grid gap-4 lg:grid-cols-3"><a className="contact-card" href="tel:+905336802206"><span className="contact-icon"><Phone /></span><small>TELEFON / WHATSAPP</small><strong>0533 680 22 06</strong><em>Hemen ara <ArrowRight /></em></a><a className="contact-card" href="mailto:info@akademisporkulubu.com"><span className="contact-icon"><Mail /></span><small>E-POSTA</small><strong>info@akademisporkulubu.com</strong><em>E-posta gönder <ArrowRight /></em></a><a className="contact-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span className="contact-icon"><Instagram /></span><small>INSTAGRAM</small><strong>@akademi.sporkulubu</strong><em>Takip et <ArrowRight /></em></a></div></div></section><SiteFooter /><StickyWhatsApp /></main>;
}
