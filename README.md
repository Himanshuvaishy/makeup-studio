# Real Look Makeup Studio

A small marketing + gallery site for **Real Look Makeup Studio**.
Built with Next.js, Tailwind CSS, and Cloudinary. Free to host on Vercel.

## Features

- Home, Gallery, Services, About, Contact pages
- Filterable gallery (Bridal, Engagement, Party, Mehendi, Casual)
- WhatsApp / phone / email contact + embedded Google Map
- Password-protected admin panel at `/admin` to upload & delete photos
- All photos stored on Cloudinary's free tier (25 GB / month bandwidth)

## Tech & free tiers used

| What | Service | Free tier |
| --- | --- | --- |
| Hosting | Vercel | Yes — unlimited personal projects |
| Image storage | Cloudinary | Yes — 25 GB storage, 25 GB monthly bandwidth |
| Code hosting | GitHub | Yes |

Total monthly cost: **₹0**.

## Local setup

```bash
npm install
cp .env.example .env.local
# fill in values inside .env.local
npm run dev
```

Open http://localhost:3000.

### Environment variables

See `.env.example`. You'll need:

- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from your Cloudinary dashboard
- `CLOUDINARY_FOLDER` — optional, defaults to `real-look-studio`
- `ADMIN_PASSWORD` — your private admin password
- `ADMIN_SESSION_SECRET` — random string. Generate with:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

## Deploying free on Vercel

1. **Push to GitHub.** Create a new repo on github.com and push this code.

   ```bash
   git remote add origin https://github.com/<your-username>/makeup-studio.git
   git branch -M main
   git push -u origin main
   ```

2. **Sign up to Cloudinary** at https://cloudinary.com (no card needed).
   Copy the cloud name, API key, and API secret from your dashboard.

3. **Sign up to Vercel** at https://vercel.com using your GitHub account.
   Click **"Add New… → Project"** and import the `makeup-studio` repo.

4. **Add environment variables** in Vercel before clicking Deploy:

   ```
   CLOUDINARY_CLOUD_NAME     = <from Cloudinary>
   CLOUDINARY_API_KEY        = <from Cloudinary>
   CLOUDINARY_API_SECRET     = <from Cloudinary>
   CLOUDINARY_FOLDER         = real-look-studio
   ADMIN_PASSWORD            = <choose a private password>
   ADMIN_SESSION_SECRET      = <random 64-char hex string>
   ```

5. **Click Deploy.** In ~2 minutes your site is live at
   `https://<project>.vercel.app`.

6. **Open `/admin`**, log in with `ADMIN_PASSWORD`, and start uploading photos.
   They appear on the public gallery within a minute (cache TTL is 60s).

## How the admin panel works

- Visit `/admin` — link is also in the page footer.
- Enter the password (the one you set as `ADMIN_PASSWORD`).
- Pick one or more photos, choose a category (bridal / party / etc), upload.
- Hover any photo on the panel to delete it.

Auth is a signed httpOnly session cookie. Uploads go through your server, so
the Cloudinary API secret never reaches the browser.

## Customizing for the real studio

Most studio details live in [`lib/studio.ts`](lib/studio.ts):

- Studio name, tagline
- Phone, WhatsApp number, Instagram handle, email
- Address (multi-line)
- Google Maps embed URL — replace `mapsEmbedSrc` with the embed URL from
  Google Maps → Share → Embed a map
- Studio hours

Service prices are in [`app/services/page.tsx`](app/services/page.tsx).

## Folder layout

```
app/
  page.tsx               home
  gallery/page.tsx       filterable gallery
  services/page.tsx      services + pricing
  about/page.tsx         about studio
  contact/page.tsx       contact + map
  admin/                 admin login + manage photos
  api/                   login, logout, upload, delete routes
components/              header + footer
lib/
  studio.ts              studio info & categories
  cloudinary.ts          Cloudinary list / upload / delete
  auth.ts                signed-cookie admin session
```
