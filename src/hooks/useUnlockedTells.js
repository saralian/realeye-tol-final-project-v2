import useLocalStorage from "./useLocalStorage"

export default function useUnlockedTells(onError) {
  const [unlockedTells, setUnlockedTells] = useLocalStorage("realeye.unlockedTells", [], onError)

  function unlockTell(tellId) {
    if (!unlockedTells.includes(tellId)) {
      setUnlockedTells([...unlockedTells, tellId])
    }
  }

  function isTellUnlocked(tellId) {
    return unlockedTells.includes(tellId)
  }

  return { unlockedTells, unlockTell, isTellUnlocked }
}
