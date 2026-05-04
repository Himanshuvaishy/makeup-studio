import Link from "next/link";

const services = [
  {
    name: "Bridal Makeup",
    price: "From Rs. 12,000",
    points: [
      "HD or airbrush base",
      "Lashes, contour, and highlight",
      "Hair styling included",
      "Saree / lehenga draping",
    ],
  },
  {
    name: "Engagement / Reception",
    price: "From Rs. 7,500",
    points: [
      "Soft glam or bold look",
      "Lashes and contour",
      "Hair styling included",
    ],
  },
  {
    name: "Party Makeup",
    price: "From Rs. 3,500",
    points: ["Evening glam look", "Smoky or shimmer eyes", "Hair blowout"],
  },
  {
    name: "Mehendi / Haldi",
    price: "From Rs. 4,500",
    points: ["Fresh, dewy base", "Bright eye look", "Floral hair styling"],
  },
  {
    name: "Pre-wedding Shoot",
    price: "From Rs. 5,500 / look",
    points: ["Camera-ready HD finish", "Up to 2 looks", "On-location available"],
  },
  {
    name: "Casual / Day Makeup",
    price: "From Rs. 2,000",
    points: ["No-makeup makeup", "Light base + soft eye", "Quick 45-min session"],
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl text-foreground md:text-5xl">
          Services &amp; Pricing
        </h1>
        <p className="mt-2 text-foreground/70">
          Indicative pricing &mdash; final quote depends on the look and location.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.name}
            className="flex flex-col rounded-2xl border border-brand-soft/70 bg-white p-6 shadow-sm"
          >
            <div className="font-display text-2xl text-foreground">{s.name}</div>
            <div className="mt-1 text-sm font-medium text-brand">{s.price}</div>
            <ul className="mt-5 space-y-2 text-sm text-foreground/75">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full border border-brand/30 px-4 py-2 text-center text-sm font-medium text-brand hover:bg-brand-soft/60"
            >
              Enquire now
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-foreground/55">
        * Trial sessions available before bridal bookings. Travel charges apply for
        outstation work.
      </p>
    </section>
  );
}
