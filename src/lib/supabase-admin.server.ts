import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const MEDIA_BUCKET = "site-media";

export function adminClient() {
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export async function uploadMedia(folder: string, file: File) {
  const extension = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;
  const { error } = await adminClient()
    .storage.from(MEDIA_BUCKET)
    .upload(path, new Uint8Array(await file.arrayBuffer()), {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (error) throw new Error(`Görsel yüklenemedi: ${error.message}`);
  return `/api/public/media/${path}`;
}

export async function downloadMedia(path: string) {
  return adminClient().storage.from(MEDIA_BUCKET).download(path);
}
