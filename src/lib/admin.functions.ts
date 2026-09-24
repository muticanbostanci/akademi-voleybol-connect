import { createServerFn } from "@tanstack/react-start";
import type { Match, Player, Slide, Team } from "./content.functions";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}
function fileOf(form: FormData, key: string) {
  const value = form.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { isAdmin } = await import("./admin-session.server");
  return { admin: await isAdmin() };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { signInAdmin } = await import("./admin-session.server");
    const ok = await signInAdmin(data.username, data.password);
    return { ok };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { signOutAdmin } = await import("./admin-session.server");
  await signOutAdmin();
  return { ok: true };
});

export const adminData = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./admin-session.server");
  await requireAdmin();
  const { adminClient } = await import("./supabase-admin.server");
  const supabase = adminClient();
  const [slides, teams, players, matches] = await Promise.all([
    supabase.from("slides").select("*").order("sort_order"),
    supabase.from("teams").select("*").order("sort_order"),
    supabase.from("players").select("*").order("sort_order"),
    supabase.from("matches").select("*"),
  ]);
  return {
    slides: (slides.data ?? []) as Slide[],
    teams: (teams.data ?? []) as Team[],
    players: (players.data ?? []) as Player[],
    matches: (matches.data ?? []) as Match[],
  };
});

/** Takım kapak fotoğrafı yükleme */
export const saveTeamPhoto = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { adminClient, uploadMedia } = await import("./supabase-admin.server");
    const slug = text(data, "slug");
    const file = fileOf(data, "photo");
    if (!slug || !file) throw new Error("Takım ve fotoğraf gereklidir.");
    const url = await uploadMedia("takimlar", file);
    const { error } = await adminClient().from("teams").update({ image_url: url, updated_at: new Date().toISOString() }).eq("slug", slug);
    if (error) throw new Error(error.message);
    return { ok: true, url };
  });

/** Slider'a görsel ekleme */
export const addSlide = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { adminClient, uploadMedia } = await import("./supabase-admin.server");
    const file = fileOf(data, "photo");
    if (!file) throw new Error("Görsel seçilmedi.");
    const supabase = adminClient();
    const { data: last } = await supabase.from("slides").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    const url = await uploadMedia("slider", file);
    const { error } = await supabase.from("slides").insert({
      image_url: url,
      eyebrow: text(data, "eyebrow"),
      title: text(data, "title"),
      description: text(data, "description"),
      position: text(data, "position") || "center",
      sort_order: ((last?.sort_order as number | undefined) ?? 0) + 1,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteSlide = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { adminClient } = await import("./supabase-admin.server");
    const { error } = await adminClient().from("slides").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Oyuncu ekleme */
export const addPlayer = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { adminClient, uploadMedia } = await import("./supabase-admin.server");
    const slug = text(data, "team_slug");
    if (!slug) throw new Error("Takım seçilmedi.");
    const file = fileOf(data, "photo");
    const supabase = adminClient();
    const { data: last } = await supabase.from("players").select("sort_order").eq("team_slug", slug).order("sort_order", { ascending: false }).limit(1).maybeSingle();
    const url = file ? await uploadMedia("oyuncular", file) : null;
    const { error } = await supabase.from("players").insert({
      team_slug: slug,
      jersey_number: text(data, "jersey_number") || "00",
      first_name: text(data, "first_name"),
      last_name: text(data, "last_name"),
      image_url: url,
      sort_order: ((last?.sort_order as number | undefined) ?? 0) + 1,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deletePlayer = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { adminClient } = await import("./supabase-admin.server");
    const { error } = await adminClient().from("players").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Maç & skor güncelleme */
export const saveMatch = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { adminClient, uploadMedia } = await import("./supabase-admin.server");
    const slot = text(data, "slot");
    if (!slot) throw new Error("Maç türü bulunamadı.");
    const homeFile = fileOf(data, "home_logo_file");
    const awayFile = fileOf(data, "away_logo_file");
    const fields = {
      match_date: text(data, "match_date"), match_time: text(data, "match_time"), venue: text(data, "venue"),
      home_name: text(data, "home_name"), away_name: text(data, "away_name"), score: text(data, "score"), sets: text(data, "sets"),
      home_logo: homeFile ? await uploadMedia("mac-logolari", homeFile) : text(data, "home_logo") || null,
      away_logo: awayFile ? await uploadMedia("mac-logolari", awayFile) : text(data, "away_logo") || null,
    };
    const { error } = await adminClient().from("matches").update({ ...fields, updated_at: new Date().toISOString() }).eq("slot", slot);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
