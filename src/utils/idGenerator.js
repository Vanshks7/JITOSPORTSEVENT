/**
 * Generates an unpredictable randomized permanent Player ID
 * MP for Male (e.g. MP4821), FP for Female (e.g. FP7309)
 */
export function generateRandomPlayerId(gender, existingPlayers = []) {
  const prefix = gender === "Male" ? "MP" : "FP";
  let id = "";
  let exists = true;
  let attempts = 0;

  while (exists && attempts < 1000) {
    attempts++;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    id = `${prefix}${randNum}`;
    exists = existingPlayers.some((p) => p.id?.toUpperCase() === id);
  }

  return id;
}
