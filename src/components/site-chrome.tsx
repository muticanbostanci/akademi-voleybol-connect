import { Link } from "@tanstack/react-router";
import { ChevronDown, Instagram, Menu, Phone, Volleyball, X } from "lucide-react";
import { useState } from "react";
import teams from "@/data/teamsData.json";

export const WHATSAPP_URL = "https://wa.me/905336802206?text=Merhaba,%20kulübünüz%20ve%20voleybol%20antrenmanları%20hakkında%20bilgi%20almak%20istiyorum.";
export const INSTAGRAM_URL = "https://www.instagram.com/akademi.sporkulubu/";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.84 9.84 0 0 0-8.44 14.9L2 22l5.23-1.55A9.94 9.94 0 1 0 12.04 2Zm0 17.96a8 8 0 0 1-4.08-1.11l-.3-.18-3.1.92.94-3.02-.2-.31a7.93 7.93 0 1 1 6.74 3.7Zm4.36-5.93c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12-.16.24-.61.77-.75.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18a7.2 7.2 0 0 1-1.32-1.64c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.59 4.11 3.63.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header absolute inset-x-0 top-0 z-40 border-b border-hero-line">
    <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:h-24 lg:px-8">
      <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Akademi Spor Kulübü ana sayfa">
        <img src="/akademi-spor-kulubu-logo.png" alt="Akademi Spor Kulübü" className="logo-glow h-16 w-24 shrink-0 object-contain lg:h-20 lg:w-32" />
        <div className="hidden min-w-0 sm:block"><strong className="block font-display text-sm text-hero-foreground lg:text-base">AKADEMİ SPOR KULÜBÜ</strong><span className="flex items-center gap-1.5 text-xs font-semibold text-hero-muted"><Volleyball className="size-3.5" /> VOLEYBOL</span></div>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Ana navigasyon">
        <div className="nav-dropdown group"><Link className="nav-link flex items-center gap-1" to="/takimlar">Takımlarımız <ChevronDown className="size-3.5" /></Link><div className="nav-dropdown-panel">{teams.map(team => <Link key={team.slug} to="/takimlar/$slug" params={{ slug: team.slug }}>{team.name}</Link>)}</div></div>
        <Link className="nav-link" to="/" hash="salon">Salon</Link><Link className="nav-link" to="/" hash="iletisim">İletişim</Link>
        <a className="icon-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="size-5" /></a>
        <a className="btn-header" href="tel:+905336802206"><Phone className="size-4" /> Hemen Ara</a>
        <a className="btn-whatsapp-small" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon className="size-4" /> WhatsApp</a>
      </nav>
      <button className="icon-link lg:hidden" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? "Menüyü kapat" : "Menüyü aç"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobil navigasyon"><Link to="/takimlar" onClick={() => setOpen(false)}>Takımlarımız</Link>{teams.map(team => <Link key={team.slug} className="text-xs font-medium text-hero-muted" to="/takimlar/$slug" params={{ slug: team.slug }} onClick={() => setOpen(false)}>{team.name}</Link>)}<Link to="/" hash="salon" onClick={() => setOpen(false)}>Salon</Link><Link to="/" hash="iletisim" onClick={() => setOpen(false)}>İletişim</Link><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp'tan Bilgi Al</a></nav>}
  </header>;
}

export function SiteFooter() {
  return <footer className="border-t border-hero-line bg-section-dark text-hero-muted"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8"><div className="flex items-center gap-4"><img src="/akademi-spor-kulubu-logo.png" alt="Akademi Spor Kulübü logosu" className="logo-glow h-20 w-28 object-contain" /><p className="max-w-xs text-sm">Voleybolun birleştirici gücüyle geleceğin sporcularını yetiştiriyoruz.</p></div><div><strong className="footer-title">HIZLI BAĞLANTILAR</strong><nav className="mt-4 grid gap-2 text-sm"><Link to="/takimlar">Takımlarımız</Link><Link to="/" hash="salon">Salonumuz</Link><Link to="/" hash="iletisim">İletişim</Link></nav></div><div><strong className="footer-title">BİZİ TAKİP EDİN</strong><div className="mt-4 flex gap-3"><a className="social-icon" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a className="social-icon" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a></div></div></div><div className="border-t border-hero-line px-5 py-5 text-center text-xs">© 2026 Akademi Spor Kulübü. Tüm hakları saklıdır. • www.akademisporkulubu.com</div></footer>;
}

export function StickyWhatsApp() { return <a className="sticky-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp'tan bilgi alın"><span className="hidden sm:inline">Bilgi Almak İstiyorum</span><span className="sticky-icon"><WhatsAppIcon className="size-7" /></span></a>; }
