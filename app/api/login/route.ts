import { NextResponse } from "next/server";
import { adminPassword, setAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const expected = adminPassword();
  const origin = new URL(req.url).origin;

  if (!expected) {
    return NextResponse.redirect(
      `${origin}/admin?error=not-configured`,
      { status: 303 },
    );
  }
  if (password !== expected) {
    return NextResponse.redirect(`${origin}/admin?error=wrong`, { status: 303 });
  }
  await setAdminSession();
  return NextResponse.redirect(`${origin}/admin`, { status: 303 });
}
