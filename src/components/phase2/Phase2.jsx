import { useState } from "react"
import Beat1 from "./Beat1"
import Beat2 from "./Beat2"
import Beat3 from "./Beat3"
import Beat4 from "./Beat4"

export default function Phase2({ phase2Data, onComplete, tellData, initialBeat = 1, onBeatChange, maxBeats = 4 }) {
  const [currentBeat, setCurrentBeat] = useState(initialBeat)

  function goBack() {
    const next = Math.max(1, currentBeat - 1)
    setCurrentBeat(next)
    onBeatChange?.(next)
  }

  function goNext() {
    if (currentBeat === maxBeats) {
      onComplete?.()
      return
    }
    const next = currentBeat + 1
    setCurrentBeat(next)
    onBeatChange?.(next)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {currentBeat === 1 && <Beat1 beat1Data={phase2Data.beat1} onNext={goNext} totalBeats={maxBeats} />}
      {currentBeat === 2 && <Beat2 beat2Data={phase2Data.beat2} onNext={goNext} onBack={goBack} totalBeats={maxBeats} />}
      {currentBeat === 3 && <Beat3 beat3Data={phase2Data.beat3} onNext={goNext} onBack={goBack} totalBeats={maxBeats} />}
      {currentBeat === 4 && <Beat4 beat4Data={phase2Data.beat4} onComplete={onComplete} onBack={goBack} tellData={tellData} />}
    </div>
  )
}
