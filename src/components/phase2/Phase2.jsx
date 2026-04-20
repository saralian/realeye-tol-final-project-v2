import { useState } from "react"
import Beat1 from "./Beat1"
import Beat2 from "./Beat2"
import Beat3 from "./Beat3"
import Beat4 from "./Beat4"

export default function Phase2({ phase2Data, onComplete, tellData }) {
  const [currentBeat, setCurrentBeat] = useState(1)

  function goBack() {
    setCurrentBeat(b => Math.max(1, b - 1))
  }

  function goNext() {
    setCurrentBeat(b => Math.min(4, b + 1))
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {currentBeat === 1 && <Beat1 beat1Data={phase2Data.beat1} onNext={goNext} />}
      {currentBeat === 2 && <Beat2 beat2Data={phase2Data.beat2} onNext={goNext} onBack={goBack} />}
      {currentBeat === 3 && <Beat3 beat3Data={phase2Data.beat3} onNext={goNext} onBack={goBack} />}
      {currentBeat === 4 && <Beat4 beat4Data={phase2Data.beat4} onComplete={onComplete} onBack={goBack} tellData={tellData} />}
    </div>
  )
}
