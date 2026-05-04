import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  await clearAdminSession();
  const origin = new URL(req.url).origin;
  return NextResponse.redirect(`${origin}/admin`, { status: 303 });
}
