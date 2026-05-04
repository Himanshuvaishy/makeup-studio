"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { categories, type CategorySlug } from "@/lib/studio";
import type { GalleryImage } from "@/lib/cloudinary";

export default function AdminPanel({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [category, setCategory] = useState<CategorySlug>(categories[0].slug);
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!files || files.length === 0) {
      setError("Pick at least one image first.");
      return;
    }
    setBusy(true);
    let uploaded = 0;
    let failed = 0;
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (res.ok) uploaded += 1;
        else failed += 1;
      } catch {
        failed += 1;
      }
    }
    setBusy(false);
    setFiles(null);
    const fileInput = document.getElementById(
      "admin-file-input",
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
    setMessage(
      `Uploaded ${uploaded} photo${uploaded === 1 ? "" : "s"}` +
        (failed ? `, ${failed} failed` : ""),
    );
    startTransition(() => router.refresh());
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setError(null);
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: id }),
      });
      if (!res.ok) throw new Error();
      startTransition(() => router.refresh());
    } catch {
      setError("Could not delete that photo.");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-foreground md:text-4xl">
            Manage gallery
          </h1>
          <p className="mt-2 text-sm text-foreground/65">
            Upload new photos and remove old ones. Changes are live on the site.
          </p>
        </div>
        <form action="/api/logout" method="post">
          <button className="rounded-full border border-brand-soft px-3 py-1.5 text-xs text-foreground/65 hover:text-brand">
            Sign out
          </button>
        </form>
      </div>

      <form
        onSubmit={handleUpload}
        className="mt-8 rounded-2xl border border-brand-soft/70 bg-white p-6 shadow-sm"
      >
        <h2 className="font-display text-xl text-foreground">Upload new photos</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-foreground/55">
              Photos (you can pick multiple)
            </span>
            <input
              id="admin-file-input"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="mt-1 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-brand/90"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-foreground/55">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug)}
              className="mt-1 w-full rounded-md border border-brand-soft bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-brand"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Uploading…" : "Upload"}
          </button>
        </div>
        {message ? (
          <p className="mt-4 text-sm text-green-700">{message}</p>
        ) : null}
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </form>

      <div className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl text-foreground">
            All photos ({images.length})
          </h2>
          {pending ? (
            <span className="text-xs text-foreground/55">Refreshing…</span>
          ) : null}
        </div>

        {images.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-brand/30 bg-brand-soft/20 p-10 text-center text-foreground/65">
            No photos yet. Upload your first one above.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-soft/40"
              >
                <Image
                  src={img.thumbUrl}
                  alt={img.category}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[10px] uppercase tracking-widest text-brand">
                  {img.category}
                </div>
                <button
                  onClick={() => handleDelete(img.id)}
                  className="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
