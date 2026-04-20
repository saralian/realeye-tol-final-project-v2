import { useState } from "react"
import PracticeImage from "./PracticeImage"
import RoundComplete from "./RoundComplete"

export default function Phase3({ phase3Data, tellData, onHome, debug = false, initialImageIndex = 0, onImageComplete, onRoundComplete }) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex)
  const [done, setDone] = useState(false)

  function handleComplete() {
    if (currentIndex < phase3Data.images.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      onImageComplete?.(currentIndex + 1, phase3Data.images[nextIndex].id)
    } else {
      setDone(true)
      onRoundComplete?.()
    }
  }

  if (done) {
    return <RoundComplete tellData={tellData} onHome={onHome} />
  }

  const imageData = phase3Data.images[currentIndex]
  const isLastImage = currentIndex === phase3Data.images.length - 1

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <PracticeImage
        key={imageData.id}
        imageData={imageData}
        phase3Data={phase3Data}
        imageNumber={currentIndex + 1}
        totalImages={phase3Data.images.length}
        isLastImage={isLastImage}
        onComplete={handleComplete}
        debug={debug}
      />
    </div>
  )
}
