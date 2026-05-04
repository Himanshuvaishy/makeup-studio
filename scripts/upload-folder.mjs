// Bulk-upload a local folder to Cloudinary with a category tag.
// Usage:  node scripts/upload-folder.mjs "D:/path/to/folder" bridal
//
// Reads CLOUDINARY_* + CLOUDINARY_FOLDER from .env.local

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";

function loadEnv(file) {
  const txt = fs.readFileSync(file, "utf8");
  for (const line of txt.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
loadEnv(path.join(projectRoot, ".env.local"));

const [, , folderPathRaw, categoryRaw] = process.argv;
if (!folderPathRaw || !categoryRaw) {
  console.error("Usage: node scripts/upload-folder.mjs <folder> <category>");
  process.exit(1);
}

const allowedCategories = ["bridal", "engagement", "party", "mehendi", "casual"];
const category = categoryRaw.toLowerCase();
if (!allowedCategories.includes(category)) {
  console.error(`category must be one of: ${allowedCategories.join(", ")}`);
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudFolder = process.env.CLOUDINARY_FOLDER || "real-look-studio";
const folderPath = folderPathRaw.replace(/^\/([A-Za-z]):/, "$1:");

const files = fs
  .readdirSync(folderPath)
  .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f));

console.log(`Found ${files.length} image(s) in ${folderPath}`);
console.log(`Uploading to cloud folder "${cloudFolder}" with tag "${category}"\n`);

let ok = 0;
let fail = 0;
for (const file of files) {
  const full = path.join(folderPath, file);
  process.stdout.write(`  ${file} ... `);
  try {
    const r = await cloudinary.uploader.upload(full, {
      folder: cloudFolder,
      tags: [category],
      resource_type: "image",
    });
    ok += 1;
    console.log(`OK (${r.public_id})`);
  } catch (e) {
    fail += 1;
    console.log(`FAIL (${e?.message || e})`);
  }
}

console.log(`\nDone. Uploaded ${ok}, failed ${fail}.`);
