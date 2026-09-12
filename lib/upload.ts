export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const ALLOWED_UPLOAD_EXTENSIONS = [
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".zip",
  ".dwg",
  ".dxf",
] as const;

export function fileExtension(name: string) {
  const match = name.toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? match[0] : "";
}

export function isAllowedUpload(file: { name: string; size: number }) {
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Blueprints must be 8 MB or smaller.";
  }

  const extension = fileExtension(file.name);
  if (!ALLOWED_UPLOAD_EXTENSIONS.includes(extension as (typeof ALLOWED_UPLOAD_EXTENSIONS)[number])) {
    return "Upload a PDF, image, zip, DWG, or DXF file.";
  }

  return null;
}

export function formatUploadLimit() {
  return "PDF, images, zip, DWG, or DXF — optional, 8 MB max";
}
