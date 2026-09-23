import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader, StickyWhatsApp } from "@/components/site-chrome";
import { TeamGrid } from "@/components/team-grid";
import { getTeams } from "@/lib/content.functions";

export const Route = createFileRoute("/takimlar/")({
  staleTime: 0,
  shouldReload: true,
  loader: () => getTeams(),
  head: () => ({ meta: [
    { title: "Voleybol Takımlarımız | Akademi Spor Kulübü" },
    { name: "description", content: "Akademi Spor Kulübü Süperlig, 1. Lig ve spor okulu voleybol takımlarını keşfedin." },
    { property: "og:title", content: "Voleybol Takımlarımız | Akademi Spor Kulübü" },
    { property: "og:description", content: "Akademi Spor Kulübü'nün tüm voleybol takımları ve kadroları." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: TeamsPage,
  errorComponent: () => <ErrorBlock />,
  notFoundComponent: () => <ErrorBlock />,
});

function ErrorBlock() { return <main className="grid min-h-screen place-items-center bg-section-dark px-5 text-center text-hero-foreground"><p>Takım bilgileri yüklenemedi. Sayfayı yenileyin.</p></main>; }

function TeamsPage() { const teams = Route.useLoaderData(); return <main className="bg-background text-foreground"><SiteHeader /><section className="inner-hero"><div className="mx-auto max-w-7xl px-5 pb-16 pt-40 lg:px-8 lg:pb-20 lg:pt-48"><p className="section-kicker text-brand-gold">AKADEMİ SPOR KULÜBÜ</p><h1>TÜM TAKIMLARIMIZ</h1><p>Süperlig, 1. Lig ve spor okulu gruplarımızı inceleyin; takım kadrosuna doğrudan ulaşın.</p></div></section><section><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><TeamGrid teams={teams} /></div></section><SiteFooter /><StickyWhatsApp /></main>; }
