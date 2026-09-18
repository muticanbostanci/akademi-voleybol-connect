import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Clock3,
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Trophy,
  Users,
  Volleyball,
  X,
} from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/akademi-volleyball-hero.jpg";
import logoAsset from "@/assets/akademi-spor-kulubu-logo.png.asset.json";
import takimKucukKiz from "@/assets/takim-kucuk-kiz.png.asset.json";
import takimGencYildiz from "@/assets/takim-genc-yildiz.png.asset.json";
import takimYildiz from "@/assets/takim-yildiz.png.asset.json";
import takimMidiler from "@/assets/takim-midiler.png.asset.json";
import takimMiniler from "@/assets/takim-miniler.png.asset.json";
import takimMinisler from "@/assets/takim-minisler.png.asset.json";

const WHATSAPP_URL =
  "https://wa.me/905336802206?text=Merhaba,%20kulübünüz%20ve%20voleybol%20antrenmanları%20hakkında%20bilgi%20almak%20istiyorum.";
const INSTAGRAM_URL = "https://www.instagram.com/akademi.sporkulubu/";
const FIXTURE_URL = "https://ankara.voleyboliltemsilciligi.com/";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Kaz%C4%B1m+Orbay%2C+342.+Cd.+No%3A46%2C+06630+Mamak%2FAnkara";

const teams = [
  { name: "Küçük Kız Takımı", code: "01", note: "Takım ruhu, teknik gelişim ve müsabaka deneyimi", photo: takimKucukKiz, photoFit: "contain" },
  { name: "Genç Yıldız", code: "02", note: "Güçlü altyapı, disiplinli oyun ve hedef odaklı gelişim", photo: takimGencYildiz },
  { name: "Yıldız Takım", code: "03", note: "İleri seviye teknik, taktik ve lig hazırlığı", photo: takimYildiz },
  { name: "Midiler", code: "04", note: "Temel voleybol becerileri ve takım kültürü", photo: takimMidiler },
  { name: "Miniler", code: "05", note: "Hareket, koordinasyon ve voleybolla ilk adım", photo: takimMiniler, photoFit: "contain" },
  { name: "Minişler", code: "06", note: "Oyunla öğrenme, özgüven ve spor sevgisi", photo: takimMinisler },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akademi Spor Kulübü | Voleybol Takımları" },
      {
        name: "description",
        content:
          "Akademi Spor Kulübü voleybol takımları, yaş grupları ve Çağrıbey Anadolu Lisesi Spor Salonu antrenmanları hakkında bilgi alın.",
      },
      { property: "og:title", content: "Akademi Spor Kulübü | Voleybol Takımları" },
      {
        property: "og:description",
        content: "Geleceğin sporcuları Akademi Spor Kulübü'nde yetişiyor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.44 14.9L2 22l5.23-1.55A9.94 9.94 0 1 0 12.04 2Zm0 17.96a8 8 0 0 1-4.08-1.11l-.3-.18-3.1.92.94-3.02-.2-.31a7.93 7.93 0 1 1 6.74 3.7Zm4.36-5.93c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.61.77-.75.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18a7.2 7.2 0 0 1-1.32-1.64c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.59 4.11 3.63.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header absolute inset-x-0 top-0 z-40 border-b border-hero-line">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:h-24 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Akademi Spor Kulübü ana sayfa">
          <img src={logoAsset.url} alt="Akademi Spor Kulübü" className="logo-glow h-16 w-24 shrink-0 object-contain lg:h-20 lg:w-32" />
          <div className="hidden min-w-0 sm:block">
            <strong className="block font-display text-sm tracking-wide text-hero-foreground lg:text-base">AKADEMİ SPOR KULÜBÜ</strong>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-hero-muted"><Volleyball className="size-3.5" /> VOLEYBOL</span>
          </div>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana navigasyon">
          <a className="nav-link" href="#takimlar">Takımlarımız</a>
          <a className="nav-link" href="#salon">Salon</a>
          <a className="nav-link" href="#iletisim">İletişim</a>
          <a className="icon-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="size-5" /></a>
          <a className="btn-header" href="tel:+905336802206"><Phone className="size-4" /> Hemen Ara</a>
          <a className="btn-whatsapp-small" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon className="size-4" /> WhatsApp</a>
        </nav>
        <button className="icon-link lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Menüyü kapat" : "Menüyü aç"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobil navigasyon">
          <a href="#takimlar" onClick={() => setOpen(false)}>Takımlarımız</a>
          <a href="#salon" onClick={() => setOpen(false)}>Salon</a>
          <a href="#iletisim" onClick={() => setOpen(false)}>İletişim</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp'tan Bilgi Al</a>
        </nav>
      )}
    </header>
  );
}

function Index() {
  return (
    <main id="top" className="overflow-hidden bg-background text-foreground">
      <Header />

      <section className="hero-section">
        <img src={heroImage} alt="Voleybol maçında smaç vuran Akademi sporcusu" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
        <div className="hero-overlay" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-16 pt-32 sm:items-center sm:pb-12 lg:min-h-[820px] lg:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow"><span /> 2022'DEN BERİ • VOLEYBOL AKADEMİSİ</div>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.98] text-hero-foreground sm:text-6xl lg:text-8xl">
              GELECEĞİN<br />SPORCULARI<br /><span>BURADA YETİŞİYOR</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-hero-muted sm:text-lg">
              Disiplin, takım ruhu ve güçlü altyapıyla sahaya çıkıyoruz. Antrenmanlarımız <strong className="text-hero-foreground">Çağrıbey Anadolu Lisesi Spor Salonu</strong>'nda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp'tan Bilgi Al <ArrowRight className="size-5" /></a>
              <a className="btn-ghost-hero" href="#takimlar">Takımları İncele <ArrowRight className="size-4" /></a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-hero-line pt-6 text-xs font-bold uppercase text-hero-muted">
              <span className="flex items-center gap-2"><Users className="size-4 text-brand-gold" /> 6 Yaş Grubu</span>
              <span className="flex items-center gap-2"><Trophy className="size-4 text-brand-gold" /> Lisanslı Sporcular</span>
              <span className="flex items-center gap-2"><MapPin className="size-4 text-brand-gold" /> Ankara</span>
            </div>
          </div>
        </div>
        <a href="#takimlar" className="scroll-cue" aria-label="Takımlara git"><span /> KEŞFET</a>
      </section>

      <section id="takimlar" className="section-light">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="section-heading">
            <div><p className="section-kicker">SAHADAKİ GÜCÜMÜZ</p><h2>TAKIMLARIMIZ <span>&</span><br />YAŞ GRUPLARIMIZ</h2></div>
            <p>Her yaşta doğru eğitim, güçlü takım ruhu ve sürdürülebilir sportif gelişim.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <article key={team.name} className="team-card group">
                <div className="team-media" aria-label={`${team.name} fotoğrafı`}>
                  {team.photo ? (
                    <>
                      {team.photoFit === "contain" && (
                        <img src={team.photo.url} alt="" aria-hidden="true" loading="lazy" decoding="async" className="team-photo-backdrop" />
                      )}
                      <img
                        src={team.photo.url}
                        alt={`${team.name} takım fotoğrafı`}
                        loading="lazy"
                        decoding="async"
                        className={`team-photo ${team.photoFit === "contain" ? "object-contain" : "object-cover"}`}
                      />
                    </>
                  ) : (
                    <>
                      <div className="team-media-mark"><Camera className="size-5" /></div>
                      <div>
                        <strong>TAKIM FOTOĞRAFI</strong>
                        <span>{team.name}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <span className="team-number">{team.code}</span>
                  <Volleyball className="size-7 text-brand-red transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3>{team.name}</h3>
                <p>{team.note}</p>
                <div className="mt-auto space-y-3 pt-7">
                  <a className="team-wa" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon className="size-4 shrink-0" /><span>Kadro & Antrenman Saatleri</span><ArrowRight className="ml-auto size-4 shrink-0" /></a>
                  <a className="team-fixture" href={FIXTURE_URL} target="_blank" rel="noreferrer"><CalendarDays className="size-4" /> Fikstür & Puan Durumu <ExternalLink className="ml-auto size-3.5" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="salon" className="section-dark">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="section-kicker text-brand-gold">ANTRENMAN ALANIMIZ</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight text-hero-foreground sm:text-5xl">OYUNUN KALBİ<br />ÇAĞRIBEY'DE ATIYOR</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-hero-muted">Tüm takım antrenmanlarımız güvenli, ulaşılabilir ve tam donanımlı Çağrıbey Anadolu Lisesi Spor Salonu'nda gerçekleşiyor.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="info-line"><MapPin /><span><small>Adres</small>Kazım Orbay, 342. Cd. No:46<br />06630 Mamak / Ankara</span></div>
              <div className="info-line"><Clock3 /><span><small>Saatler</small>Yaş grubuna göre<br />WhatsApp'tan öğrenin</span></div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><Navigation className="size-5" /> Yol Tarifi Al</a>
              <a className="btn-outline-dark" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> Saatleri Sor</a>
            </div>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className="map-card" aria-label="Çağrıbey Anadolu Lisesi Spor Salonu yol tarifi">
            <div className="map-grid" />
            <div className="map-rings"><span /><span /><span /></div>
            <MapPin className="relative z-10 size-14 fill-brand-red text-brand-red" />
            <div className="relative z-10 mt-4 px-6 text-center"><strong>Mamak / Ankara</strong><span>Kazım Orbay, 342. Cd. No:46, 06630</span></div>
            <div className="map-action">Google Haritalar'da Aç <ExternalLink className="size-4" /></div>
          </a>
        </div>
      </section>

      <section id="iletisim" className="section-contact">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="section-heading">
            <div><p className="section-kicker">BİZE ULAŞIN</p><h2>TAKIMA KATILMAYA<br /><span>HAZIR MISINIZ?</span></h2></div>
            <p>Size en uygun yaş grubu ve antrenman programı için doğrudan iletişime geçin.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <a className="contact-card" href="tel:+905336802206"><span className="contact-icon"><Phone /></span><small>TELEFON / WHATSAPP</small><strong>0533 680 22 06</strong><em>Hemen ara <ArrowRight /></em></a>
            <a className="contact-card" href="mailto:info@akademisporkulubu.com"><span className="contact-icon"><Mail /></span><small>E-POSTA</small><strong>info@akademisporkulubu.com</strong><em>E-posta gönder <ArrowRight /></em></a>
            <a className="contact-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span className="contact-icon"><Instagram /></span><small>INSTAGRAM</small><strong>@akademi.sporkulubu</strong><em>Takip et <ArrowRight /></em></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-hero-line bg-section-dark text-hero-muted">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div className="flex items-center gap-4"><img src={logoAsset.url} alt="Akademi Spor Kulübü logosu" className="logo-glow h-20 w-28 object-contain" /><p className="max-w-xs text-sm">Voleybolun birleştirici gücüyle geleceğin sporcularını yetiştiriyoruz.</p></div>
          <div><strong className="footer-title">HIZLI BAĞLANTILAR</strong><nav className="mt-4 grid gap-2 text-sm"><a href="#takimlar">Takımlarımız</a><a href="#salon">Salonumuz</a><a href="#iletisim">İletişim</a></nav></div>
          <div><strong className="footer-title">BİZİ TAKİP EDİN</strong><div className="mt-4 flex gap-3"><a className="social-icon" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a className="social-icon" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a></div></div>
        </div>
        <div className="border-t border-hero-line px-5 py-5 text-center text-xs">© 2026 Akademi Spor Kulübü. Tüm hakları saklıdır. • www.akademisporkulubu.com</div>
      </footer>

      <a className="sticky-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp'tan bilgi alın">
        <span className="hidden sm:inline">Bilgi Almak İstiyorum</span><span className="sticky-icon"><WhatsAppIcon className="size-7" /></span>
      </a>
    </main>
  );
}