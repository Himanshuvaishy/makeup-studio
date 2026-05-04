import { studio } from "@/lib/studio";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <header className="mb-10">
        <h1 className="font-display text-4xl text-foreground md:text-5xl">
          Visit / Book
        </h1>
        <p className="mt-2 text-foreground/70">
          Drop in for a consultation, or message us to lock your date.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Block title="Address">
            <p className="whitespace-pre-line text-foreground/80">
              {studio.address}
            </p>
          </Block>

          <Block title="Phone & WhatsApp">
            <div className="flex flex-col gap-1.5 text-foreground/85">
              <a href={`tel:${studio.phone}`} className="hover:text-brand">
                {studio.phone}
              </a>
              <a
                href={`https://wa.me/${studio.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline"
              >
                Chat on WhatsApp &rarr;
              </a>
            </div>
          </Block>

          <Block title="Email">
            <a
              href={`mailto:${studio.email}`}
              className="text-foreground/85 hover:text-brand"
            >
              {studio.email}
            </a>
          </Block>

          <Block title="Studio hours">
            <ul className="space-y-1 text-sm text-foreground/80">
              {studio.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-foreground/65">{h.time}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Instagram">
            <a
              href={`https://instagram.com/${studio.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-brand hover:underline"
            >
              @{studio.instagram}
            </a>
          </Block>
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-soft/70 bg-white shadow-sm">
          <iframe
            title="Studio location"
            src={studio.mapsEmbedSrc}
            width="100%"
            height="100%"
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-brand-soft/70 bg-white p-5 shadow-sm">
      <div className="mb-2 text-xs uppercase tracking-widest text-foreground/55">
        {title}
      </div>
      {children}
    </div>
  );
}
