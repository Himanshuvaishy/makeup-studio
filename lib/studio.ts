export const studio = {
  name: "Real Look Makeup Studio",
  tagline: "Where every look feels real, radiant, and you.",
  phone: "+91 76073 06382",
  whatsapp: "917607306382",
  instagram: "manyamakeover_beautysaloon",
  email: "hello@reallookmakeup.com",
  address:
    "Next to Central Bank of India & LIC Office,\nSultanpur Road, Haidergarh,\nBarabanki, Uttar Pradesh, India",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Central+Bank+of+India+Haidergarh+Barabanki&output=embed",
  hours: [
    { day: "Mon - Sat", time: "10:00 AM - 8:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
};

export const categories = [
  { slug: "bridal", label: "Bridal" },
  { slug: "engagement", label: "Engagement" },
  { slug: "party", label: "Party" },
  { slug: "mehendi", label: "Mehendi" },
  { slug: "casual", label: "Casual / Day" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categorySlugs: CategorySlug[] = categories.map((c) => c.slug);

export function isCategorySlug(value: string): value is CategorySlug {
  return categorySlugs.includes(value as CategorySlug);
}
