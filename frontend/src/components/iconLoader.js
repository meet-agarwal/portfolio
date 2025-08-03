// iconLoader.js
import * as brands from '@fortawesome/free-brands-svg-icons';
import * as solids from '@fortawesome/free-solid-svg-icons';

export function getFAIcon(iconName) {
  // Try brands first (fab)
  const brandIcon = brands[iconName];
  if (brandIcon) return brandIcon;

  // Then solids (fas)
  const solidIcon = solids[iconName];
  if (solidIcon) return solidIcon;

  // If not found, return null
  return null;
}
