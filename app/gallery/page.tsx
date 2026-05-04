import Link from "next/link";
import Image from "next/image";
import { categories, isCategorySlug, type CategorySlug } from "@/lib/studio";
import { listGalleryImages, type GalleryImage } from "@/lib/cloudinary";

export const revalidate = 60;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const params = await searchParams;
  const activeCat: CategorySlug | "all" =
    params.cat && isCategorySlug(params.cat) ? params.cat : "all";

  const images = await listGalleryImages().catch(() => [] as GalleryImage[]);
  const filtered =
    activeCat === "all"
      ? images
      : images.filter((i) => i.category === activeCat);

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-foreground md:text-5xl">
          Gallery
        </h1>
        <p className="mt-2 text-foreground/70">
          Real clients. Real looks. Browse by occasion.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        <FilterPill href="/gallery" label="All" active={activeCat === "all"} />
        {categories.map((c) => (
          <FilterPill
            key={c.slug}
            href={`/gallery?cat=${c.slug}`}
            label={c.label}
            active={activeCat === c.slug}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand/30 bg-brand-soft/20 p-12 text-center">
          <p className="text-foreground/70">
            {images.length === 0
              ? "No photos uploaded yet. Once the admin uploads photos, they will appear here."
              : "No photos in this category yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img) => (
            <a
              key={img.id}
              href={img.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-soft/40"
            >
              <Image
                src={img.thumbUrl}
                alt={`${img.category} look`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 rounded-full bg-white/85 px-3 py-1 text-[11px] uppercase tracking-widest text-brand opacity-0 transition group-hover:opacity-100">
                {img.category}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

function FilterPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-sm transition ${
        active
          ? "bg-brand text-white shadow"
          : "border border-brand/25 text-foreground/75 hover:border-brand/50 hover:text-brand"
      }`}
    >
      {label}
    </Link>
  );
}
