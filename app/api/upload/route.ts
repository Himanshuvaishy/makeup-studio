import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { isCategorySlug } from "@/lib/studio";
import { isCloudinaryConfigured, uploadImage } from "@/lib/cloudinary";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;

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

  const form = await req.formData();
  const file = form.get("file");
  const category = String(form.get("category") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no-file" }, { status: 400 });
  }
  if (!isCategorySlug(category)) {
    return NextResponse.json({ error: "bad-category" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "not-an-image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too-large" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  try {
    const image = await uploadImage(buffer, category);
    return NextResponse.json({ ok: true, image });
  } catch (err) {
    console.error("upload failed", err);
    return NextResponse.json({ error: "upload-failed" }, { status: 500 });
  }
}
