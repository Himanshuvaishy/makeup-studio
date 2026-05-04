import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { isCloudinaryConfigured, listGalleryImages } from "@/lib/cloudinary";
import LoginForm from "./LoginForm";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const loggedIn = await isAdmin();

  if (!loggedIn) {
    return (
      <section className="mx-auto max-w-md px-5 py-16">
        <h1 className="font-display text-3xl text-foreground">Admin sign-in</h1>
        <p className="mt-2 text-sm text-foreground/65">
          Enter the admin password to manage gallery photos.
        </p>
        <div className="mt-6">
          <LoginForm error={params.error} />
        </div>
      </section>
    );
  }

  if (!isCloudinaryConfigured) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="font-display text-3xl text-foreground">Admin</h1>
        <div className="mt-6 rounded-2xl border border-brand/30 bg-brand-soft/30 p-6 text-sm text-foreground/85">
          <p className="font-medium">Cloudinary is not configured yet.</p>
          <p className="mt-2">
            Set <code>CLOUDINARY_CLOUD_NAME</code>,{" "}
            <code>CLOUDINARY_API_KEY</code>, and{" "}
            <code>CLOUDINARY_API_SECRET</code> in your environment, then restart
            the server. See <code>README.md</code> for the full guide.
          </p>
        </div>
        <form action="/api/logout" method="post" className="mt-6">
          <button className="text-sm text-foreground/60 hover:text-brand">
            Sign out
          </button>
        </form>
      </section>
    );
  }

  const images = await listGalleryImages().catch(() => []);
  return <AdminPanel images={images} />;
}

export const revalidate = 0;
