//this is lib/utils/avatar.ts
export function getInitials(nameOrEmail: string) {
  if (!nameOrEmail) return "?";
  const [name] = nameOrEmail.split("@");
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Choose a soft color based on string (user's email, for consistency)
const colorPalette = [
  "#06b6d4", "#818cf8", "#f59e42", "#34d399", "#f472b6", "#fbbf24", "#6366f1"
];
export function getAvatarColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
}