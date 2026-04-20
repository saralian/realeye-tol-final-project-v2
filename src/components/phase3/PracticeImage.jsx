import { useState, useRef } from "react"
import Button from "../common/Button"
import Modal from "../common/Modal"
import FeedbackBanner from "../common/FeedbackBanner"
import HotspotMarker from "./HotspotMarker"
import HintRegion from "./HintRegion"
import { getHitTell } from "../../utils/hotspotDetection"

export default function PracticeImage({ imageData, phase3Data, imageNumber, totalImages, isLastImage, onComplete, debug = false }) {
  const [phase, setPhase] = useState("finding") // "finding" | "success" | "revealed"
  const [foundTell, setFoundTell] = useState(null)
  const [foundClickPos, setFoundClickPos] = useState(null)
  const [placements, setPlacements] = useState([])
  const [revealedTells, setRevealedTells] = useState([])
  const [showHint, setShowHint] = useState(false)
  const [showRevealModal, setShowRevealModal] = useState(false)
  const [wrongClickVisible, setWrongClickVisible] = useState(false)
  const wrongClickTimer = useRef(null)
  const revealTimers = useRef([])

  function handleImageClick(e) {
    if (phase !== "finding") return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const hit = getHitTell(x, y, imageData.primaryTells)
    if (hit) {
      setFoundTell(hit)
      setFoundClickPos({ x, y })
      setPhase("success")
      // Schedule bonus reveal of any unfound tells (staggered)
      const unfound = imageData.primaryTells.filter(t => t.id !== hit.id)
      revealTimers.current = unfound.map((tell, i) =>
        setTimeout(() => setRevealedTells(prev => [...prev, tell]), 800 + i * 400)
      )
    } else {
      setPlacements(prev => [...prev, { id: `p-${Date.now()}`, x, y }])
      setWrongClickVisible(true)
      clearTimeout(wrongClickTimer.current)
      wrongClickTimer.current = setTimeout(() => setWrongClickVisible(false), 1500)
    }
  }

  function handleRevealConfirm() {
    revealTimers.current.forEach(clearTimeout)
    setShowRevealModal(false)
    setRevealedTells(imageData.primaryTells)
    setPhase("revealed")
  }

  const isComplete = phase === "success" || phase === "revealed"
  const continueLabel = isLastImage ? phase3Data.completeButtonText : "Continue"

  // Tells shown with amber marker + annotation (unfound tells in bonus reveal, or all in reveal flow)
  const annotatedTells = phase === "revealed"
    ? imageData.primaryTells
    : revealedTells.filter(t => t.id !== foundTell?.id)

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-base text-gray-600">{phase3Data.instruction}</p>
        <span className="text-sm text-gray-400 ml-4 shrink-0">Image {imageNumber} of {totalImages}</span>
      </div>

      {/* Image with overlays */}
      <div
        className={`relative rounded-xl overflow-hidden ${phase === "finding" ? "cursor-crosshair" : "cursor-default"}`}
        onClick={handleImageClick}
      >
        <img
          src={imageData.src}
          alt=""
          className="w-full h-auto block select-none"
          draggable={false}
        />

        {/* Wrong-click markers (persistent gray) */}
        {placements.map(p => (
          <HotspotMarker key={p.id} x={p.x} y={p.y} type="placed" />
        ))}

        {/* Correct click marker */}
        {foundClickPos && (
          <HotspotMarker x={foundClickPos.x} y={foundClickPos.y} type="correct" />
        )}

        {/* Amber markers for annotated tells */}
        {annotatedTells.map(tell => (
          <HotspotMarker
            key={tell.id}
            x={tell.x + tell.width / 2}
            y={tell.y + tell.height / 2}
            type="revealed"
          />
        ))}

        <HintRegion
          hintRegion={imageData.hintRegion}
          visible={showHint}
          tooltipText={phase3Data.hintTooltip}
        />

        {debug && imageData.primaryTells.map(tell => (
          <div
            key={tell.id}
            className="absolute border-2 border-blue-500 bg-blue-400/20 pointer-events-none"
            style={{
              left: `${tell.x}%`,
              top: `${tell.y}%`,
              width: `${tell.width}%`,
              height: `${tell.height}%`,
            }}
          >
            <span className="absolute top-0 left-0 text-xs font-mono text-white bg-blue-600 px-1 leading-tight">
              {tell.id} x:{tell.x} y:{tell.y} w:{tell.width} h:{tell.height}
            </span>
          </div>
        ))}
      </div>

      {/* Wrong-click feedback (fades after ~1.5s) */}
      <div className="h-6 mt-3 text-center">
        <span
          className={`text-sm text-gray-500 transition-opacity duration-300 ${
            wrongClickVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {phase3Data.wrongClickText}
        </span>
      </div>

      {/* Success message */}
      {phase === "success" && foundTell && (
        <div className="mt-2">
          <FeedbackBanner variant="green">{foundTell.successMessage}</FeedbackBanner>
        </div>
      )}

      {/* Reveal intro text (shown once bonus reveals or full reveal appears) */}
      {isComplete && imageData.revealIntroText && annotatedTells.length > 0 && (
        <p className="mt-4 text-base text-gray-600">{imageData.revealIntroText}</p>
      )}

      {/* Annotated tell panels */}
      {annotatedTells.length > 0 && (
        <div className="mt-3 space-y-3">
          {annotatedTells.map(tell => (
            <FeedbackBanner key={tell.id} variant="amber">{tell.revealAnnotation}</FeedbackBanner>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-3">
          {phase === "finding" && (
            <>
              <Button variant="secondary" onClick={() => setShowHint(h => !h)}>
                {showHint ? "Hide hint" : "Hint"}
              </Button>
              <Button variant="destructive" onClick={() => setShowRevealModal(true)}>
                Reveal
              </Button>
            </>
          )}
        </div>
        {isComplete && (
          <Button variant="primary" onClick={onComplete}>{continueLabel}</Button>
        )}
      </div>

      <Modal
        isOpen={showRevealModal}
        heading={phase3Data.revealConfirmModal.heading}
        body={phase3Data.revealConfirmModal.body}
        cancelText={phase3Data.revealConfirmModal.cancelText}
        confirmText={phase3Data.revealConfirmModal.confirmText}
        onCancel={() => setShowRevealModal(false)}
        onConfirm={handleRevealConfirm}
        confirmVariant="destructive"
      />
    </div>
  )
}
