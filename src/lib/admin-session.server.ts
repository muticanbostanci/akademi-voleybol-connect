import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type AdminSession = { admin?: boolean };

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "akademiboz2026";

function config() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "akademi-admin",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function getAdminSession() {
  return useSession<AdminSession>(config());
}

export async function isAdmin() {
  const session = await getAdminSession();
  return session.data.admin === true;
}

export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Yetkisiz işlem. Lütfen yönetici olarak giriş yapın.");
}

export async function signInAdmin(username: string, password: string) {
  const expectedUser =
    import.meta.env["VITE_ADMIN_USERNAME"] || process.env["ADMIN_USERNAME"] || DEFAULT_ADMIN_USERNAME;
  const expectedPass =
    import.meta.env["VITE_ADMIN_PASSWORD"] || process.env["ADMIN_PASSWORD"] || DEFAULT_ADMIN_PASSWORD;
  if (!matches(username.trim(), expectedUser) || !matches(password, expectedPass)) return false;
  const session = await getAdminSession();
  await session.update({ admin: true });
  return true;
}

export async function signOutAdmin() {
  const session = await getAdminSession();
  await session.clear();
}
