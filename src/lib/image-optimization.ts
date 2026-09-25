const MAX_IMAGE_EDGE = 1920;
const WEBP_QUALITY = 0.82;

async function optimizeImage(file: File) {
  if (!file.type.startsWith("image/")) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    return file;
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", WEBP_QUALITY));
  if (!blob) return file;

  const baseName = file.name.replace(/\.[^.]+$/, "") || "gorsel";
  return new File([blob], `${baseName}.webp`, { type: "image/webp", lastModified: Date.now() });
}

export async function optimizedFormData(form: HTMLFormElement) {
  const source = new FormData(form);
  const optimized = new FormData();

  for (const [key, value] of source.entries()) {
    if (value instanceof File && value.size > 0 && value.type.startsWith("image/")) {
      try {
        optimized.append(key, await optimizeImage(value));
      } catch {
        optimized.append(key, value);
      }
    } else {
      optimized.append(key, value);
    }
  }

  return optimized;
}