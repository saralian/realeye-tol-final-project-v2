import { useState } from "react"
import ContrastingPair from "./ContrastingPair"
import PhotoFeedback from "./PhotoFeedback"
import TellSelection from "./TellSelection"
import Acknowledgment from "./Acknowledgment"

export default function Phase1({ phase1Data, onComplete }) {
  const [step, setStep] = useState("pair") // "pair" | "post-confirm" | "acknowledgment"
  const [pickedCorrectly, setPickedCorrectly] = useState(null)
  const [selectedTellOptions, setSelectedTellOptions] = useState([])

  function handleConfirm({ isCorrect }) {
    setPickedCorrectly(isCorrect)
    setStep("post-confirm")
  }

  function handleWrongContinue() {
    onComplete({ pickedCorrectly: false, selectedTellIds: [] })
  }

  function handleTellContinue(selectedOptions) {
    setSelectedTellOptions(selectedOptions)
    setStep("acknowledgment")
  }

  function handleAcknowledgmentContinue() {
    onComplete({
      pickedCorrectly: true,
      selectedTellIds: selectedTellOptions.map(o => o.id),
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {step === "pair" && (
        <div className="space-y-8">
          <div>
            <p className="text-sm text-gray-500">{phase1Data.instruction}</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">{phase1Data.prompt}</h2>
            <p className="mt-2 text-base text-gray-500">{phase1Data.subPrompt}</p>
          </div>
          <ContrastingPair
            imageA={phase1Data.imageA}
            imageB={phase1Data.imageB}
            onConfirm={handleConfirm}
          />
        </div>
      )}

      {step === "post-confirm" && (
        <div className="space-y-10">
          <PhotoFeedback
            isCorrect={pickedCorrectly}
            correctFeedback={phase1Data.correctPhotoFeedback}
            wrongFeedback={phase1Data.wrongPhotoFeedback}
            onContinueWrong={handleWrongContinue}
          />
          {pickedCorrectly && (
            <TellSelection
              tellOptions={phase1Data.tellOptions}
              tellSelectionPrompt={phase1Data.tellSelectionPrompt}
              continueButtonText={phase1Data.continueButtonText}
              onContinue={handleTellContinue}
            />
          )}
        </div>
      )}

      {step === "acknowledgment" && (
        <Acknowledgment
          selectedOptions={selectedTellOptions}
          acknowledgments={phase1Data.acknowledgments}
          onContinue={handleAcknowledgmentContinue}
        />
      )}

    </div>
  )
}
