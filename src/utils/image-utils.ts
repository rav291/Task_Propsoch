/**
 * Generate unique property images using Unsplash Source API
 * This uses Unsplash Source which doesn't require an API key
 * Different image IDs for variety (architecture, real estate, luxury homes)
 */

const PROPERTY_IMAGE_IDS = [
  "photo-1600585154340-be6161a56a0c", // Modern house
  "photo-1600566753190-17f0baa2a6c3", // Luxury home
  "photo-1600607687939-ce8a6c25118c", // Interior
  "photo-1600566752355-35792bedcfea", // Architecture
  "photo-1600566752355-35792bedcfea", // Architecture
  // Add more real Unsplash photo IDs here
];

/**
 * Get a unique property image URL based on property ID
 * Uses Unsplash Source API with random image selection
 */
export function getPropertyImageUrl(propertyId: number): string {
  const imageIndex = propertyId % PROPERTY_IMAGE_IDS.length;
  const photoId = PROPERTY_IMAGE_IDS[imageIndex];

  return `https://images.unsplash.com/${photoId}?w=800&h=600&fit=crop&auto=format&q=80`;
}

/**
 * Get a random property image URL (for variety)
 */
export function getRandomPropertyImageUrl(seed?: number): string {
  const randomIndex = seed
    ? seed % PROPERTY_IMAGE_IDS.length
    : Math.floor(Math.random() * PROPERTY_IMAGE_IDS.length);
  const imageId = PROPERTY_IMAGE_IDS[randomIndex];

  return `https://images.unsplash.com/photo-${imageId}?w=800&h=600&fit=crop&auto=format&q=80`;
}
