import { createServerFn } from "@tanstack/react-start";

export type Slide = { id: string; image_url: string; eyebrow: string; title: string; description: string; position: string; sort_order: number };
export type Team = { slug: string; name: string; league: string; description: string; image_url: string | null; sort_order: number };
export type Player = { id: string; team_slug: string; jersey_number: string; first_name: string; last_name: string; image_url: string | null; sort_order: number };
export type Match = { slot: string; label: string; match_date: string; match_time: string; venue: string; home_name: string; away_name: string; home_logo: string | null; away_logo: string | null; score: string; sets: string };

async function publicClient() {
  const { createClient } = await import("@supabase/supabase-js");
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const getHomeContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await publicClient();
  const [slides, matches, teams] = await Promise.all([
    supabase.from("slides").select("*").order("sort_order"),
    supabase.from("matches").select("*"),
    supabase.from("teams").select("*").order("sort_order"),
  ]);
  return {
    slides: (slides.data ?? []) as Slide[],
    matches: (matches.data ?? []) as Match[],
    teams: (teams.data ?? []) as Team[],
  };
});

export const getTeams = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = await publicClient();
  const { data } = await supabase.from("teams").select("*").order("sort_order");
  return (data ?? []) as Team[];
});

export const getTeamRoster = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const supabase = await publicClient();
    const [team, players] = await Promise.all([
      supabase.from("teams").select("*").eq("slug", data.slug).maybeSingle(),
      supabase.from("players").select("*").eq("team_slug", data.slug).order("sort_order"),
    ]);
    return { team: (team.data ?? null) as Team | null, players: (players.data ?? []) as Player[] };
  });
