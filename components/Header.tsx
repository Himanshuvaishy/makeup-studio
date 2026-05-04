import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-soft/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white font-display text-lg">
            R
          </span>
          <div className="leading-tight">
            <div className="font-display text-lg text-brand">Real Look</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/60">
              Makeup Studio
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-foreground/75 transition hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand/90 md:inline-block"
        >
          Book now
        </Link>

        <details className="relative md:hidden">
          <summary className="list-none rounded-md border border-brand-soft px-3 py-1.5 text-sm text-brand cursor-pointer">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border border-brand-soft bg-white shadow-lg">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-4 py-2 text-sm text-foreground/80 hover:bg-brand-soft/50"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block bg-brand px-4 py-2 text-sm font-medium text-white"
            >
              Book now
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
