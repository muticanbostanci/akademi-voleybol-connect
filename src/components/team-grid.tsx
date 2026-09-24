import { Link } from "@tanstack/react-router";
import { ArrowRight, Volleyball } from "lucide-react";
import type { Team } from "@/lib/content.functions";
import { CLUB_LOGO } from "@/lib/brand";

export function TeamGrid({ teams, compact = false }: { teams: Team[]; compact?: boolean }) {
  const shown = compact ? teams.slice(0, 6) : teams;
  return <div className="team-category-grid">{shown.map((team, index) => <Link key={team.slug} to="/takimlar/$slug" params={{ slug: team.slug }} className="team-category-card group"><img src={team.image_url ?? CLUB_LOGO} alt={`${team.name} takım görseli`} loading="lazy" /><div className="team-category-shade" /><div className="team-category-copy"><span>{String(index + 1).padStart(2, "0")} • {team.league}</span><h3>{team.name}</h3><p>{team.description}</p><strong>Kadroyu Gör <ArrowRight /></strong></div><Volleyball className="team-category-ball" /></Link>)}</div>;
}
