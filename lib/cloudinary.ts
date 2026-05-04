import { v2 as cloudinary } from "cloudinary";
import { categorySlugs, type CategorySlug } from "./studio";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const folder = process.env.CLOUDINARY_FOLDER || "real-look-studio";

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export const cloudinaryFolder = folder;
export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

export interface GalleryImage {
  id: string;
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
  category: CategorySlug | "uncategorized";
  createdAt: string;
}

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
  tags?: string[];
}

function pickCategory(tags: string[] | undefined): GalleryImage["category"] {
  if (!tags) return "uncategorized";
  const found = tags.find((t) => categorySlugs.includes(t as CategorySlug));
  return (found as CategorySlug) || "uncategorized";
}

function buildVariants(publicId: string) {
  if (!cloudName) return { url: "", thumbUrl: "" };
  const base = `https://res.cloudinary.com/${cloudName}/image/upload`;
  return {
    url: `${base}/q_auto,f_auto,w_1600/${publicId}`,
    thumbUrl: `${base}/q_auto,f_auto,c_fill,w_640,h_800/${publicId}`,
  };
}

export async function listGalleryImages(): Promise<GalleryImage[]> {
  if (!isCloudinaryConfigured) return [];
  const result = (await cloudinary.search
    .expression(`folder:${folder}/*`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(200)
    .execute()) as { resources: CloudinaryResource[] };

  return result.resources.map((r) => {
    const v = buildVariants(r.public_id);
    return {
      id: r.public_id,
      url: v.url,
      thumbUrl: v.thumbUrl,
      width: r.width,
      height: r.height,
      category: pickCategory(r.tags),
      createdAt: r.created_at,
    };
  });
}

export async function uploadImage(
  fileBuffer: Buffer,
  category: CategorySlug,
): Promise<GalleryImage> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured. Set env vars first.");
  }
  const result = await new Promise<CloudinaryResource>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        tags: [category],
        resource_type: "image",
      },
      (error, uploaded) => {
        if (error || !uploaded) return reject(error);
        resolve(uploaded as CloudinaryResource);
      },
    );
    stream.end(fileBuffer);
  });

  const v = buildVariants(result.public_id);
  return {
    id: result.public_id,
    url: v.url,
    thumbUrl: v.thumbUrl,
    width: result.width,
    height: result.height,
    category,
    createdAt: result.created_at,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured.");
  }
  await cloudinary.uploader.destroy(publicId);
}
