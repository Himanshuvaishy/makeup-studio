import Link from "next/link";
import Image from "next/image";
import { studio, categories } from "@/lib/studio";
import { listGalleryImages } from "@/lib/cloudinary";

export const revalidate = 60;

export default async function Home() {
  const images = await listGalleryImages().catch(() => []);
  const featured = images.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-soft via-background to-background" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand">
              Bridal &middot; Party &middot; Engagement
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-6xl">
              Real Look <span className="text-brand">Makeup Studio</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-foreground/70">
              {studio.tagline} Book a session and let us craft a look that&rsquo;s
              uniquely yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-brand/90"
              >
                Book a session
              </Link>
              <Link
                href="/gallery"
                className="rounded-full border border-brand/30 px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand-soft/60"
              >
                View gallery
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand/30 to-brand-soft shadow-lg" />
              <div className="mt-8 aspect-[3/4] rounded-2xl bg-gradient-to-br from-gold/40 to-brand-soft shadow-lg" />
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-soft to-brand/20 shadow-lg" />
              <div className="mt-8 aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-soft to-gold/30 shadow-lg" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-white px-4 py-3 shadow-lg md:block">
              <div className="text-xs uppercase tracking-widest text-foreground/60">
                500+
              </div>
              <div className="font-display text-lg text-brand">Happy Brides</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services snapshot */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="text-center">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            What we offer
          </h2>
          <p className="mt-2 text-foreground/70">
            From your big day to a glam night out — we&rsquo;ve got you covered.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/gallery?cat=${c.slug}`}
              className="group rounded-2xl border border-brand-soft/70 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <div className="mb-4 inline-block rounded-full bg-brand-soft/60 px-3 py-1 text-xs uppercase tracking-widest text-brand">
                Look
              </div>
              <div className="font-display text-2xl text-foreground group-hover:text-brand">
                {c.label}
              </div>
              <p className="mt-2 text-sm text-foreground/65">
                {descriptionFor(c.slug)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured gallery preview */}
      <section className="border-y border-brand-soft/60 bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl text-foreground md:text-4xl">
                Recent work
              </h2>
              <p className="mt-2 text-foreground/70">
                A glimpse from our latest sessions.
              </p>
            </div>
            <Link
              href="/gallery"
              className="hidden text-sm font-medium text-brand hover:underline md:inline"
            >
              See full gallery &rarr;
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-brand/30 bg-brand-soft/20 p-10 text-center">
              <p className="text-foreground/70">
                No photos yet. Once your admin uploads photos, they&rsquo;ll appear
                here automatically.
              </p>
              <Link
                href="/admin"
                className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
              >
                Open admin panel &rarr;
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {featured.map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-soft/40"
                >
                  <Image
                    src={img.thumbUrl}
                    alt="Real Look Makeup Studio"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">
          Ready to look your best?
        </h2>
        <p className="mt-3 text-foreground/70">
          Drop us a message on WhatsApp or call to book your slot.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${studio.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow hover:bg-brand/90"
          >
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${studio.phone}`}
            className="rounded-full border border-brand/30 px-6 py-3 text-sm font-medium text-brand hover:bg-brand-soft/60"
          >
            Call {studio.phone}
          </a>
        </div>
      </section>
    </>
  );
}

function descriptionFor(slug: string): string {
  switch (slug) {
    case "bridal":
      return "HD makeup for your wedding day, with hair styling and draping.";
    case "engagement":
      return "Soft, romantic looks perfect for ring ceremonies and roka.";
    case "party":
      return "Bold and glam looks for evening events and receptions.";
    case "mehendi":
      return "Fresh, vibrant looks to match your mehendi vibe.";
    case "casual":
      return "Light, dewy day makeup for shoots and casual outings.";
    default:
      return "Tailored makeup for every occasion.";
  }
}
