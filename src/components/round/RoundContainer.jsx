import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../common/Header"
import Phase1 from "../phase1/Phase1"
import Phase2 from "../phase2/Phase2"
import Phase3 from "../phase3/Phase3"
import FeedbackBanner from "../common/FeedbackBanner"
import { tellLibrary, appCopy } from "../../data/exercises"
import useRoundProgress from "../../hooks/useRoundProgress"
import useUnlockedTells from "../../hooks/useUnlockedTells"

export default function RoundContainer({ round }) {
  const navigate = useNavigate()
  const [storageError, setStorageError] = useState(false)
  function onStorageError() { setStorageError(true) }

  const { saveProgress, clearProgress, getPhaseProgress } = useRoundProgress(onStorageError)
  const { unlockTell } = useUnlockedTells(onStorageError)

  const savedProgress = getPhaseProgress(round.id)
  const [phase, setPhase] = useState(() => savedProgress?.currentPhase ?? "phase1")
  const [phase1Result, setPhase1Result] = useState(null)

  const tellData = tellLibrary.find(t => t.id === round.tellId)

  // Initial sub-step values for resume — read from saved progress at mount time
  const initialBeat = savedProgress?.phase2Beat ?? 1
  const savedImageId = savedProgress?.phase3CurrentImageId
  const initialImageIndex = Math.max(
    0,
    savedImageId ? round.phase3.images.findIndex(img => img.id === savedImageId) : 0
  )

  function handlePhase1Complete(result) {
    setPhase1Result(result)
    saveProgress(round.id, { currentPhase: "phase2", phase1Complete: true, phase2Beat: 1 })
    setPhase("phase2")
  }

  function handlePhase2BeatChange(beat) {
    saveProgress(round.id, { phase2Beat: beat })
  }

  function handlePhase2Complete() {
    saveProgress(round.id, {
      currentPhase: "phase3",
      phase3ImagesCompleted: 0,
      phase3CurrentImageId: round.phase3.images[0].id,
    })
    setPhase("phase3")
  }

  function handlePhase3ImageComplete(imagesCompleted, nextImageId) {
    saveProgress(round.id, {
      currentPhase: "phase3",
      phase3ImagesCompleted: imagesCompleted,
      phase3CurrentImageId: nextImageId,
    })
  }

  function handleRoundComplete() {
    unlockTell(round.tellId)
    clearProgress(round.id)
  }

  return (
    <div>
      <Header onHomeClick={() => navigate("/")} />

      {storageError && (
        <div className="max-w-4xl mx-auto px-6 pt-4">
          <FeedbackBanner variant="amber">{appCopy.errors.storageFailure}</FeedbackBanner>
        </div>
      )}

      {phase === "phase1" && (
        <Phase1
          phase1Data={round.phase1}
          onComplete={handlePhase1Complete}
        />
      )}

      {phase === "phase2" && (
        <Phase2
          phase2Data={round.phase2}
          tellData={tellData}
          initialBeat={initialBeat}
          onBeatChange={handlePhase2BeatChange}
          onComplete={handlePhase2Complete}
        />
      )}

      {phase === "phase3" && (
        <Phase3
          phase3Data={round.phase3}
          tellData={tellData}
          initialImageIndex={initialImageIndex}
          onImageComplete={handlePhase3ImageComplete}
          onRoundComplete={handleRoundComplete}
          onHome={() => navigate("/")}
        />
      )}
    </div>
  )
}
