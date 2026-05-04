export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-4xl text-foreground md:text-5xl">
        About Real Look
      </h1>
      <p className="mt-2 text-foreground/70">
        A homegrown makeup studio built on care, craft, and a love for detail.
      </p>

      <div className="mt-10 space-y-5 text-foreground/85 leading-relaxed">
        <p>
          At Real Look Makeup Studio, we believe makeup should feel like you &mdash;
          only on your most confident day. Every face is different, and every
          occasion deserves a look that fits.
        </p>
        <p>
          From soft engagement glam to full bridal looks with hair styling and
          draping, we work with HD-quality, skin-friendly products and modern
          techniques to bring out your natural features. Whether it&rsquo;s your
          big day, a pre-wedding shoot, or a party, you&rsquo;ll leave the chair
          feeling like the best version of yourself.
        </p>
        <p>
          We take limited bookings each day so every client gets unhurried,
          personal attention. Trials are recommended for brides &mdash; let&rsquo;s
          plan your look together.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-3 text-center">
        <Stat number="500+" label="Brides done" />
        <Stat number="6+" label="Years of work" />
        <Stat number="4.9" label="Avg. rating" />
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-brand-soft/70 bg-white p-5">
      <div className="font-display text-2xl text-brand">{number}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-foreground/55">
        {label}
      </div>
    </div>
  );
}
