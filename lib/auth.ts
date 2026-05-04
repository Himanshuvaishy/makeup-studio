import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "rl_admin";

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

function sign(value: string): string {
  const secret = getSecret();
  if (!secret) return "";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function adminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

export async function setAdminSession(): Promise<void> {
  const token = `ok.${Date.now()}`;
  const sig = sign(token);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${token}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return false;
  const lastDot = raw.lastIndexOf(".");
  if (lastDot < 0) return false;
  const token = raw.slice(0, lastDot);
  const sig = raw.slice(lastDot + 1);
  if (!token.startsWith("ok.")) return false;
  const expected = sign(token);
  if (!expected) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(sig, "hex"),
      Buffer.from(expected, "hex"),
    );
  } catch {
    return false;
  }
}
