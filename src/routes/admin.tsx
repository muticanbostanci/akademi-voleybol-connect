import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, LogOut, Lock, Trash2, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { adminData, adminLogin, adminLogout, adminStatus, addPlayer, addSlide, deletePlayer, deleteSlide, saveMatch, saveTeamPhoto } from "@/lib/admin.functions";
import { optimizedFormData } from "@/lib/image-optimization";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Yönetici Girişi | Akademi Atletik Spor Kulübü" },
    { name: "description", content: "Akademi Atletik Spor Kulübü site yönetim paneli: takım fotoğrafları, slider görselleri, oyuncu kadrosu ve maç skorları." },
    { property: "og:title", content: "Yönetici Girişi | Akademi Atletik Spor Kulübü" },
    { property: "og:description", content: "Kulüp içeriklerini güncellemek için yönetici paneli." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex" },
  ]}),
  component: AdminPage,
});

const cardClass = "rounded-xl border border-hero-line bg-black/25 p-5";
const inputClass = "w-full rounded-md border border-hero-line bg-black/40 px-3 py-2 text-sm text-hero-foreground placeholder:text-hero-muted focus:outline-none focus:ring-2 focus:ring-brand-gold";
const labelClass = "mb-1 block text-xs font-bold uppercase tracking-wide text-hero-muted";

function AdminPage() {
  const status = useQuery({ queryKey: ["admin-status"], queryFn: useServerFn(adminStatus) });
  
  // Tarayıcı hafızasında admin_auth kaydı var mı diye kontrol et
  const [isAuth, setIsAuth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("admin_auth") === "true";
    }
    return false;
  });

  if (status.isLoading) return <Shell><div className="flex items-center gap-2 text-hero-muted"><Loader2 className="size-4 animate-spin" /> Yükleniyor...</div></Shell>;
  
  // Eğer ne tarayıcıda yetki bayrağı var ne de sunucu admin onay vermişse LoginForm göster
  if (!isAuth && !status.data?.admin) {
    return <Shell><LoginForm /></Shell>;
  }

  return <Shell><Panel /></Shell>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="bg-background text-foreground"><SiteHeader /><section className="section-dark"><div className="mx-auto max-w-5xl px-5 pb-20 pt-40 lg:px-8 lg:pt-48"><p className="section-kicker text-brand-gold">SİTE YÖNETİMİ</p><h1 className="mt-3 font-display text-4xl font-black text-hero-foreground sm:text-5xl">YÖNETİCİ PANELİ</h1><div className="mt-10">{children}</div></div></section><SiteFooter /></main>;
}

function LoginForm() {
  const login = useServerFn(adminLogin);
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "").trim();
    const password = String(form.get("password") ?? "");
    // İstemci taraflı hızlı kontrol — hatalı bilgide sunucuya hiç gidilmez.
    if (username !== "admin" || password !== "akademiboz2026") {
      setError("Hatalı kullanıcı adı veya şifre!");
      return;
    }
    setBusy(true); setError("");
    try {
      // Panelin veri işlemleri için sunucu oturumunu da kur.
      const result = await login({ data: { username, password } });
      if (!result.ok) { setError("Giriş yapılamadı, tekrar deneyin."); return; }
      try { window.localStorage.setItem("admin_auth", "true"); } catch { /* private mode */ }
      queryClient.invalidateQueries();
    } catch {
      setError("Giriş yapılamadı, tekrar deneyin.");
    } finally {
      setBusy(false);
    }
  };

  return <form className={`${cardClass} max-w-md`} onSubmit={handleLogin}>
    <div className="flex items-center gap-2 text-hero-foreground"><Lock className="size-4 text-brand-gold" /><strong className="font-display text-lg">YÖNETİCİ GİRİŞİ</strong></div>
    <div className="mt-5 grid gap-4">
      <div><label className={labelClass} htmlFor="username">Kullanıcı Adı</label><input id="username" name="username" className={inputClass} autoComplete="username" required /></div>
      <div><label className={labelClass} htmlFor="password">Şifre</label><input id="password" name="password" type="password" className={inputClass} autoComplete="current-password" required /></div>
      {error && <p className="text-sm font-semibold text-brand-gold">{error}</p>}
      <button className="btn-primary justify-center" type="submit" disabled={busy}>{busy ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />} Giriş Yap</button>
    </div>
  </form>;
}

function Panel() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const data = useQuery({ queryKey: ["admin-data"], queryFn: useServerFn(adminData) });
  const logout = useServerFn(adminLogout);
  const refresh = () => { queryClient.invalidateQueries(); router.invalidate(); };
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const run = async (key: string, action: () => Promise<unknown>, okMessage: string) => {
    setBusy(key); setMessage("");
    try { await action(); setMessage(okMessage); refresh(); }
    catch (error) { setMessage(error instanceof Error ? error.message : "İşlem başarısız."); }
    finally { setBusy(""); }
  };

  if (data.isLoading) return <div className="flex items-center gap-2 text-hero-muted"><Loader2 className="size-4 animate-spin" /> Veriler yükleniyor…</div>;
  const teams = data.data?.teams ?? [];
  const players = data.data?.players ?? [];
  const slides = data.data?.slides ?? [];
  const matches = data.data?.matches ?? [];

  return <div className="grid gap-8">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-hero-muted">Yüklediğiniz görseller ve bilgiler anında sitede yayınlanır.</p>
      <button className="btn-outline-dark" onClick={() => { try { window.localStorage.removeItem("admin_auth"); } catch { /* private mode */ } run("logout", async () => { await logout({ data: undefined }); }, "Çıkış yapıldı."); }}><LogOut className="size-4" /> Çıkış Yap</button>
    </div>
    {message && <p className="rounded-md border border-hero-line bg-black/30 px-4 py-3 text-sm font-semibold text-brand-gold">{message}</p>}

    <section className={cardClass}>
      <h2 className="font-display text-xl text-hero-foreground">TAKIM FOTOĞRAFLARI</h2>
      <p className="mt-1 text-sm text-hero-muted">Her takım için toplu kadro fotoğrafı yükleyin; takım sayfasının en üstünde görünür.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {teams.map(team => <form key={team.slug} className="rounded-lg border border-hero-line p-4" onSubmit={event => { event.preventDefault(); const form = event.currentTarget; run(`team-${team.slug}`, async () => saveTeamPhoto({ data: await optimizedFormData(form) }), `${team.name} fotoğrafı güncellendi.`); }}>
          <input type="hidden" name="slug" value={team.slug} />
          <strong className="block text-sm text-hero-foreground">{team.name}</strong>
          {team.image_url && <img src={team.image_url} alt={`${team.name} mevcut fotoğrafı`} className="mt-3 h-28 w-full rounded-md object-cover" />}
          <input className={`${inputClass} mt-3`} type="file" name="photo" accept="image/*" required />
          <button className="btn-primary mt-3 w-full justify-center" type="submit" disabled={busy === `team-${team.slug}`}>{busy === `team-${team.slug}` ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Fotoğrafı Yükle</button>
        </form>)}
      </div>
    </section>

    <section className={cardClass}>
      <h2 className="font-display text-xl text-hero-foreground">HERO SLIDER GÖRSELLERİ</h2>
      <form className="mt-4 grid gap-3" onSubmit={event => { event.preventDefault(); const form = event.currentTarget; run("slide", async () => { await addSlide({ data: await optimizedFormData(form) }); form.reset(); }, "Antrenman görseli eklendi."); }}>
        <div><label className={labelClass}>Görsel</label><input className={inputClass} type="file" name="photo" accept="image/*" required /></div>
        <button className="btn-primary justify-center" type="submit" disabled={busy === "slide"}>{busy === "slide" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Antrenmandan Karelere Ekle</button>
      </form>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {slides.map((slide, index) => <div key={slide.id} className="rounded-lg border border-hero-line p-3">
          <img src={slide.image_url} alt={slide.title || "Slider görseli"} className="h-24 w-full rounded object-cover" />
          <p className="mt-2 line-clamp-2 text-xs text-hero-muted">{index === 0 ? "Sabit ilk görsel" : "Antrenmandan Kareler"}</p>
          {index > 0 && <button className="btn-outline-dark mt-2 w-full justify-center" onClick={() => run(`slide-${slide.id}`, () => deleteSlide({ data: { id: slide.id } }), "Görsel kaldırıldı.")}><Trash2 className="size-4" /> Kaldır</button>}
        </div>)}
      </div>
    </section>

    <section className={cardClass}>
      <h2 className="font-display text-xl text-hero-foreground">OYUNCU KADROSU</h2>
      <form className="mt-4 grid gap-3 md:grid-cols-5" onSubmit={event => { event.preventDefault(); const form = event.currentTarget; run("player", async () => { await addPlayer({ data: await optimizedFormData(form) }); form.reset(); }, "Oyuncu eklendi."); }}>
        <div className="md:col-span-2"><label className={labelClass}>Takım</label><select className={inputClass} name="team_slug" required>{teams.map(team => <option key={team.slug} value={team.slug}>{team.name}</option>)}</select></div>
        <div><label className={labelClass}>Forma No</label><input className={inputClass} name="jersey_number" placeholder="7" /></div>
        <div><label className={labelClass}>İsim</label><input className={inputClass} name="first_name" required /></div>
        <div><label className={labelClass}>Soyisim</label><input className={inputClass} name="last_name" required /></div>
        <div className="md:col-span-4"><label className={labelClass}>Oyuncu Fotoğrafı</label><input className={inputClass} type="file" name="photo" accept="image/*" /></div>
        <button className="btn-primary justify-center self-end" type="submit" disabled={busy === "player"}>{busy === "player" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Ekle</button>
      </form>
      <div className="mt-6 grid gap-6">
        {teams.map(team => { const roster = players.filter(player => player.team_slug === team.slug); if (!roster.length) return null; return <div key={team.slug}>
          <strong className="text-sm text-hero-foreground">{team.name}</strong>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map(player => <div key={player.id} className="flex items-center gap-3 rounded-lg border border-hero-line p-2 text-sm text-hero-muted">
              {player.image_url ? <img src={player.image_url} alt={`${player.first_name} ${player.last_name}`} className="size-12 rounded object-cover" /> : <span className="grid size-12 place-items-center rounded bg-black/40 text-xs">#{player.jersey_number}</span>}
              <span className="flex-1 text-hero-foreground">#{player.jersey_number} {player.first_name} {player.last_name}</span>
              <button className="icon-link" aria-label="Oyuncuyu kaldır" onClick={() => run(`player-${player.id}`, () => deletePlayer({ data: { id: player.id } }), "Oyuncu kaldırıldı.")}><Trash2 className="size-4" /></button>
            </div>)}
          </div>
        </div>; })}
      </div>
    </section>

    <section className={cardClass}>
      <h2 className="font-display text-xl text-hero-foreground">MAÇ & SKOR PANELİ</h2>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        {matches.map(match => <form key={match.slot} className="grid gap-3 rounded-lg border border-hero-line p-4" onSubmit={event => { event.preventDefault(); const form = event.currentTarget; run(`match-${match.slot}`, async () => { const payload = await optimizedFormData(form); payload.set("slot", match.slot); return saveMatch({ data: payload }); }, `${match.label} güncellendi.`); }}>
          <strong className="font-display text-base text-brand-gold">{match.label}</strong>
          <div><label className={labelClass}>Tarih</label><input className={inputClass} name="match_date" defaultValue={match.match_date} /></div>
          <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass}>Saat</label><input className={inputClass} name="match_time" defaultValue={match.match_time} /></div><div><label className={labelClass}>Salon</label><input className={inputClass} name="venue" defaultValue={match.venue} /></div></div>
          <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass}>Ev Sahibi</label><input className={inputClass} name="home_name" defaultValue={match.home_name} /></div><div><label className={labelClass}>Rakip</label><input className={inputClass} name="away_name" defaultValue={match.away_name} /></div></div>
           <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass}>Ev Sahibi Logo URL</label><input className={inputClass} name="home_logo" defaultValue={match.home_logo ?? ""} placeholder="https://…" /></div><div><label className={labelClass}>Rakip Takım Logo URL</label><input className={inputClass} name="away_logo" defaultValue={match.away_logo ?? ""} placeholder="https://…" /></div></div>
           <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass}>Ev Sahibi Logosu Yükle</label><input className={inputClass} type="file" name="home_logo_file" accept="image/*" /></div><div><label className={labelClass}>Rakip Takım Logosu Yükle</label><input className={inputClass} type="file" name="away_logo_file" accept="image/*" /></div></div>
          <div className="grid gap-3 sm:grid-cols-2"><div><label className={labelClass}>Skor</label><input className={inputClass} name="score" defaultValue={match.score} placeholder="3–0" /></div><div><label className={labelClass}>Set Skorları</label><input className={inputClass} name="sets" defaultValue={match.sets} placeholder="25–22, 25–22, 25–14" /></div></div>
          <button className="btn-primary justify-center" type="submit" disabled={busy === `match-${match.slot}`}>{busy === `match-${match.slot}` ? <Loader2 className="size-4 animate-spin" /> : null} Kaydet</button>
        </form>)}
      </div>
    </section>
  </div>;
}
