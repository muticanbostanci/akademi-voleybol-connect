import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink, Instagram, Mail, MapPin, Navigation, Pause, Phone, Play, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader, StickyWhatsApp, WhatsAppIcon, WHATSAPP_URL, INSTAGRAM_URL } from "@/components/site-chrome";
import { TeamGrid } from "@/components/team-grid";
import sliderData from "@/data/sliderData.json";
import matchesData from "@/data/matchesData.json";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kaz%C4%B1m+Orbay%2C+342.+Cd.+No%3A46%2C+06630+Mamak%2FAnkara";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Akademi Spor Kulübü | Ankara Voleybol Akademisi" },
    { name: "description", content: "Akademi Spor Kulübü takımları, maçları, oyuncu kadroları ve Ankara voleybol antrenmanları." },
    { property: "og:title", content: "Akademi Spor Kulübü | Ankara Voleybol Akademisi" },
    { property: "og:description", content: "Geleceğin voleybolcuları Akademi Spor Kulübü'nde yetişiyor." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});

function HeroSlider() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % sliderData.length), 6000);
    return () => window.clearInterval(timer);
  }, [playing]);
  const go = (index: number) => setActive((index + sliderData.length) % sliderData.length);
  return <section className="hero-slider" aria-roledescription="carousel" aria-label="Akademi Spor Kulübü tanıtım görselleri">
    {sliderData.map((slide, index) => <article key={slide.id} className={`hero-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active}>
      <img src={slide.image} alt={slide.title} className="hero-slide-image" style={{ objectPosition: slide.position }} fetchPriority={index === 0 ? "high" : "auto"} />
      <div className="hero-overlay" />
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-end px-5 pb-28 pt-32 sm:items-center sm:pb-16 lg:min-h-[820px] lg:px-8">
        <div className="max-w-3xl"><div className="eyebrow"><span /> {slide.eyebrow}</div><h1 className="mt-5 font-display text-5xl font-black leading-[0.94] text-hero-foreground sm:text-6xl lg:text-8xl">{slide.title}</h1><p className="mt-6 max-w-xl text-base leading-relaxed text-hero-muted sm:text-lg">{slide.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp'tan Bilgi Al <ArrowRight /></a><Link className="btn-ghost-hero" to="/takimlar">Takımları İncele <ArrowRight /></Link></div><div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-hero-line pt-6 text-xs font-bold uppercase text-hero-muted"><span className="flex items-center gap-2"><Users className="size-4 text-brand-gold" /> 11 Takım Grubu</span><span className="flex items-center gap-2"><Trophy className="size-4 text-brand-gold" /> Lisanslı Sporcular</span><span className="flex items-center gap-2"><MapPin className="size-4 text-brand-gold" /> Ankara</span></div></div>
      </div>
    </article>)}
    <div className="hero-controls"><Button variant="ghost" size="icon" onClick={() => go(active - 1)} aria-label="Önceki görsel"><ArrowLeft /></Button><div className="hero-dots">{sliderData.map((slide, index) => <button key={slide.id} onClick={() => go(index)} className={index === active ? "is-active" : ""} aria-label={`${index + 1}. görsel`} aria-current={index === active ? "true" : undefined} />)}</div><Button variant="ghost" size="icon" onClick={() => setPlaying(value => !value)} aria-label={playing ? "Kaydırıcıyı duraklat" : "Kaydırıcıyı oynat"}>{playing ? <Pause /> : <Play />}</Button><Button variant="ghost" size="icon" onClick={() => go(active + 1)} aria-label="Sonraki görsel"><ArrowRight /></Button></div>
  </section>;
}

function TeamLogo({ team }: { team: { name: string; logo: string } }) { return <div className="match-team"><div className="match-logo"><img src={team.logo} alt={`${team.name} logosu`} /></div><strong>{team.name}</strong></div>; }
function Matches() { const { upcoming, latest } = matchesData; return <section className="matches-band"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20"><div className="matches-heading"><div><p className="section-kicker text-brand-gold">SAHADAKİ HEYECAN</p><h2>MAÇ MERKEZİ</h2></div><a href="https://ankara.voleyboliltemsilciligi.com/" target="_blank" rel="noreferrer">Tüm fikstürü gör <ExternalLink /></a></div><div className="matches-grid">
    <article className="match-card"><header><span>{upcoming.label}</span><CalendarDays /></header><div className="match-date"><strong>{upcoming.date}</strong><span>{upcoming.time} • {upcoming.venue}</span></div><div className="match-versus"><TeamLogo team={upcoming.home} /><b>VS</b><TeamLogo team={upcoming.away} /></div></article>
    <article className="match-card is-latest"><header><span>{latest.label}</span><Trophy /></header><div className="match-date"><strong>{latest.date}</strong><span>Tamamlandı</span></div><div className="match-versus"><TeamLogo team={latest.home} /><div className="match-score"><b>{latest.score}</b><small>{latest.sets.join("  •  ")}</small></div><TeamLogo team={latest.away} /></div></article>
  </div></div></section>; }

function Index() { return <main id="top" className="overflow-hidden bg-background text-foreground"><SiteHeader /><HeroSlider /><Matches />
  <section id="takimlar" className="section-light"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="section-heading"><div><p className="section-kicker">SAHADAKİ GÜCÜMÜZ</p><h2>TAKIMLARIMIZ <span>&</span><br />YAŞ GRUPLARIMIZ</h2></div><div><p>Her yaşta doğru eğitim, güçlü takım ruhu ve sürdürülebilir sportif gelişim.</p><Link to="/takimlar" className="mt-5 inline-flex items-center gap-2 font-bold text-brand-red">Tüm takımları gör <ArrowRight className="size-4" /></Link></div></div><div className="mt-12"><TeamGrid compact /></div></div></section>
  <section id="salon" className="section-dark"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28"><div><p className="section-kicker text-brand-gold">ANTRENMAN ALANIMIZ</p><h2 className="mt-3 font-display text-4xl font-black leading-tight text-hero-foreground sm:text-5xl">OYUNUN KALBİ<br />ÇAĞRIBEY'DE ATIYOR</h2><p className="mt-6 max-w-lg leading-relaxed text-hero-muted">Tüm takım antrenmanlarımız Çağrıbey Anadolu Lisesi Spor Salonu'nda gerçekleşiyor.</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="info-line"><MapPin /><span><small>Adres</small>Kazım Orbay, 342. Cd. No:46<br />06630 Mamak / Ankara</span></div><div className="info-line"><Clock3 /><span><small>Saatler</small>Yaş grubuna göre<br />WhatsApp'tan öğrenin</span></div></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><Navigation /> Yol Tarifi Al</a><a className="btn-outline-dark" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> Saatleri Sor</a></div></div><a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-card"><div className="map-grid" /><div className="map-rings"><span /><span /><span /></div><MapPin className="relative z-10 size-14 fill-brand-red text-brand-red" /><div className="relative z-10 mt-4 px-6 text-center"><strong>Mamak / Ankara</strong><span>Kazım Orbay, 342. Cd. No:46, 06630</span></div><div className="map-action">Google Haritalar'da Aç <ExternalLink /></div></a></div></section>
  <section id="iletisim" className="section-contact"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="section-heading"><div><p className="section-kicker">BİZE ULAŞIN</p><h2>TAKIMA KATILMAYA<br /><span>HAZIR MISINIZ?</span></h2></div><p>Size en uygun yaş grubu ve antrenman programı için doğrudan iletişime geçin.</p></div><div className="mt-12 grid gap-4 lg:grid-cols-3"><a className="contact-card" href="tel:+905336802206"><span className="contact-icon"><Phone /></span><small>TELEFON / WHATSAPP</small><strong>0533 680 22 06</strong><em>Hemen ara <ArrowRight /></em></a><a className="contact-card" href="mailto:info@akademisporkulubu.com"><span className="contact-icon"><Mail /></span><small>E-POSTA</small><strong>info@akademisporkulubu.com</strong><em>E-posta gönder <ArrowRight /></em></a><a className="contact-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span className="contact-icon"><Instagram /></span><small>INSTAGRAM</small><strong>@akademi.sporkulubu</strong><em>Takip et <ArrowRight /></em></a></div></div></section><SiteFooter /><StickyWhatsApp /></main>; }
