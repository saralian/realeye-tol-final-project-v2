// Acknowledgment cascade (CLAUDE.md Section 8):
// 1. Any option with isCorrect === true  → correctTell   (green)
// 2. Any option with isCorrect === false → plausibleWrong (amber)
// 3. "felt-off" selected                → feltOff        (amber)
// 4. Only "guessed" selected            → guessed        (gray)
export function getAcknowledgment(selectedOptions, acknowledgments) {
  if (selectedOptions.some(o => o.isCorrect === true))
    return { message: acknowledgments.correctTell, variant: "green" }
  if (selectedOptions.some(o => o.isCorrect === false))
    return { message: acknowledgments.plausibleWrong, variant: "amber" }
  if (selectedOptions.some(o => o.id === "felt-off"))
    return { message: acknowledgments.feltOff, variant: "amber" }
  return { message: acknowledgments.guessed, variant: "gray" }
}
