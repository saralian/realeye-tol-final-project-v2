import useLocalStorage from "./useLocalStorage"

export default function useRoundProgress(onError) {
  const [roundProgress, setRoundProgress] = useLocalStorage("realeye.roundProgress", {}, onError)

  function saveProgress(roundId, progressUpdate) {
    setRoundProgress({
      ...roundProgress,
      [roundId]: {
        ...(roundProgress[roundId] ?? {}),
        ...progressUpdate,
      },
    })
  }

  function clearProgress(roundId) {
    const updated = { ...roundProgress }
    delete updated[roundId]
    setRoundProgress(updated)
  }

  function getPhaseProgress(roundId) {
    return roundProgress[roundId] ?? null
  }

  return { roundProgress, saveProgress, clearProgress, getPhaseProgress }
}
