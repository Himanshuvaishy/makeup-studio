import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteImage, isCloudinaryConfigured } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      { error: "cloudinary-not-configured" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const publicId = body?.publicId;
  if (typeof publicId !== "string" || !publicId) {
    return NextResponse.json({ error: "bad-id" }, { status: 400 });
  }

  try {
    await deleteImage(publicId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("delete failed", err);
    return NextResponse.json({ error: "delete-failed" }, { status: 500 });
  }
}
