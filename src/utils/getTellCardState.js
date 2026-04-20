export function getTellCardState(tell, unlockedTells, roundProgress) {
  if (unlockedTells.includes(tell.id)) return "earned"
  if (tell.unlockRoundId && roundProgress[tell.unlockRoundId]) return "in-progress"
  if (tell.unlockRoundId === null) return "coming-soon"
  return "locked"
}
