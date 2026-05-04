import Link from "next/link";
import { studio } from "@/lib/studio";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-soft/70 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-3">
        <div>
          <div className="font-display text-xl text-brand">Real Look Makeup Studio</div>
          <p className="mt-2 text-sm text-foreground/70">
            Bridal, party, and engagement makeup — tailored to bring out your best look.
          </p>
        </div>
        <div className="text-sm">
          <div className="mb-2 text-xs uppercase tracking-widest text-foreground/50">
            Visit us
          </div>
          <p className="text-foreground/80 whitespace-pre-line">{studio.address}</p>
        </div>
        <div className="text-sm">
          <div className="mb-2 text-xs uppercase tracking-widest text-foreground/50">
            Contact
          </div>
          <ul className="space-y-1 text-foreground/80">
            <li>
              <a href={`tel:${studio.phone}`} className="hover:text-brand">
                {studio.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${studio.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${studio.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand"
              >
                @{studio.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-soft/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-xs text-foreground/60">
          <span>&copy; {new Date().getFullYear()} Real Look Makeup Studio</span>
          <Link href="/admin" className="hover:text-brand">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
