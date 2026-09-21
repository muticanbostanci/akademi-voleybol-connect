import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shirt, UserRound } from "lucide-react";
import { SiteFooter, SiteHeader, StickyWhatsApp, WhatsAppIcon, WHATSAPP_URL } from "@/components/site-chrome";
import teams from "@/data/teamsData.json";
import playersData from "@/data/playersData.json";

export const Route = createFileRoute("/takimlar/$slug")({
  loader: ({ params }) => { const team = teams.find(item => item.slug === params.slug); if (!team) throw notFound(); return { team }; },
  head: ({ loaderData }) => { const title = loaderData?.team.name ?? "Takım Bulunamadı"; return { meta: [
    { title: `${title} | Akademi Spor Kulübü` },
    { name: "description", content: `${title} oyuncu kadrosu, takım bilgileri ve antrenman iletişimi.` },
    { property: "og:title", content: `${title} | Akademi Spor Kulübü` },
    { property: "og:description", content: `${title} oyuncu kadrosunu ve takım bilgilerini inceleyin.` },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}; }, component: TeamRosterPage, notFoundComponent: TeamNotFound,
});

function TeamRosterPage() { const { team } = Route.useLoaderData(); const players = playersData.default; return <main className="bg-background text-foreground"><SiteHeader /><section className="roster-hero"><img src={team.image} alt={`${team.name} takım görseli`} /><div className="hero-overlay" /><div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-40 lg:px-8 lg:pb-20 lg:pt-52"><Link to="/takimlar" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-hero-muted"><ArrowLeft className="size-4" /> Tüm Takımlar</Link><p className="section-kicker text-brand-gold">{team.league}</p><h1>{team.name}</h1><p>{team.description}</p></div></section><section><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="section-heading"><div><p className="section-kicker">2026 SEZONU</p><h2>OYUNCU <span>KADROSU</span></h2></div><p>Oyuncu fotoğrafları, isimleri ve forma numaraları veri dosyasından kolayca güncellenebilir.</p></div><div className="players-grid">{players.map((player, index) => <article className="player-card" key={`${player.number}-${index}`}><div className="player-image"><img src={player.image} alt={`${player.firstName} ${player.lastName}`} loading="lazy" /><span><Shirt /> {player.number}</span></div><div><small>OYUNCU</small><h3>{player.firstName}<br /><strong>{player.lastName}</strong></h3></div></article>)}</div><div className="roster-cta"><UserRound /><div><strong>Kadro ve antrenman bilgisi alın</strong><p>Güncel sporcu kadrosu ve seçmeler hakkında WhatsApp'tan bize ulaşın.</p></div><a className="btn-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp'tan Yazın <ArrowRight /></a></div></div></section><SiteFooter /><StickyWhatsApp /></main>; }

function TeamNotFound() { return <main className="min-h-screen bg-section-dark text-hero-foreground"><SiteHeader /><div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center"><p className="section-kicker text-brand-gold">TAKIM BULUNAMADI</p><h1 className="mt-3 font-display text-5xl font-black">Bu takım sayfası mevcut değil.</h1><Link to="/takimlar" className="btn-primary mt-8"><ArrowLeft /> Takımlara Dön</Link></div></main>; }
