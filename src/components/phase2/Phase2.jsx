import { useState } from "react"
import Beat1 from "./Beat1"
import Beat2 from "./Beat2"
import BeatNav from "./BeatNav"

export default function Phase2({ phase2Data, onComplete }) {
  const [currentBeat, setCurrentBeat] = useState(1)

  function goBack() {
    setCurrentBeat(b => Math.max(1, b - 1))
  }

  function goNext() {
    if (currentBeat < 4) {
      setCurrentBeat(b => b + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {currentBeat === 1 && (
        <Beat1 beat1Data={phase2Data.beat1} onNext={goNext} />
      )}

      {currentBeat === 2 && (
        <Beat2 beat2Data={phase2Data.beat2} onNext={goNext} onBack={goBack} />
      )}

      {(currentBeat === 3 || currentBeat === 4) && (
        <div className="space-y-4">
          <p className="text-gray-500 italic">Beat {currentBeat} — coming in Session 5.</p>
          <BeatNav
            currentBeat={currentBeat}
            totalBeats={4}
            onBack={goBack}
            onNext={goNext}
            nextLabel={currentBeat === 4 ? phase2Data.beat4.buttonText : "Next →"}
          />
        </div>
      )}
    </div>
  )
}
