// components/ImageUtils.tsx

/**
 * Constructs the full URL for an image.
 * If NEXT_PUBLIC_IMAGE_BASE_URL is set, it prepends it to the image path.
 * Otherwise, it returns the relative path.
 *
 * @param relativePath The path to the image relative to the public directory (e.g., "/img/company-01.png").
 * @returns The full image URL or relative path.
 */
export function getImageUrl(relativePath: string): string {
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  if (imageBaseUrl) {
    // Ensure base URL ends with a slash and relative path starts without one
    const baseUrl = imageBaseUrl.endsWith('/') ? imageBaseUrl : `${imageBaseUrl}/`;
    const path = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
    return `${baseUrl}${path}`;
  }

  // If no base URL is set, return the relative path as is (assuming it starts with /public)
  // For Next.js, paths starting with / refer to the public directory
  return relativePath;
}
