import { useState } from "react"
import BeatNav from "./BeatNav"

// Renders a cropped region of an image using percentage-based coordinates.
// width/left are exact percentages of container width.
// top is an approximation — exact only when the image intrinsic aspect ratio
// matches the crop aspect ratio. Tune zoomCrop coordinates in exercises.js
// once actual images are placed.
function ZoomCrop({ zoomSrc, annotation }) {
  return (
    <div className="relative overflow-hidden rounded-lg h-full">
      <img
        src={zoomSrc}
        alt="Zoomed region showing the tell"
        className="w-full h-full object-cover"
      />
      {annotation && (
        <div
          className="absolute pointer-events-none flex flex-col items-center"
          style={{
            left: `${annotation.arrowX}%`,
            top: `${annotation.arrowY}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <span className="text-amber-400 text-lg leading-none">▲</span>
          <span className="bg-gray-900/80 text-white text-xs rounded px-2 py-0.5 whitespace-nowrap mt-0.5">
            {annotation.text}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Beat2({ beat2Data, onNext, onBack, totalBeats = 4 }) {
  const [annotationRevealed, setAnnotationRevealed] = useState(false)

  const annotationParagraphs = beat2Data.annotationText.split("\n\n")

  return (
    <div>
      <p className="text-base text-gray-600 mb-8">{beat2Data.introText}</p>

      <div className="flex gap-8 items-stretch h-[420px]">
        {/* Left panel: full image with highlight overlay */}
        <div className="min-w-0" style={{ flex: "55" }}>
          <div className="relative h-full bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={beat2Data.imageSrc}
              alt="AI-generated image from Phase 1"
              className="w-full h-full object-contain"
            />
            <div
              className="absolute border-4 border-amber-400 pointer-events-none rounded-sm"
              style={{
                left:   `${beat2Data.highlightRegion.x}%`,
                top:    `${beat2Data.highlightRegion.y}%`,
                width:  `${beat2Data.highlightRegion.width}%`,
                height: `${beat2Data.highlightRegion.height}%`,
              }}
            />
          </div>
        </div>

        {/* Right panel: zoom crop only */}
        <div className="min-w-0" style={{ flex: "45" }}>
          <ZoomCrop
            zoomSrc={beat2Data.zoomSrc}
            annotation={beat2Data.zoomAnnotation}
          />
        </div>
      </div>

      {/* Annotation — full width below the image row */}
      <div className="mt-5">
        {!annotationRevealed ? (
          <button
            onClick={() => setAnnotationRevealed(true)}
            className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
          >
            What am I looking at? →
          </button>
        ) : (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">{beat2Data.directionalHeading}</h3>
            {annotationParagraphs.map((para, i) => (
              <p key={i} className="text-base text-gray-700 leading-relaxed">{para}</p>
            ))}
            {beat2Data.backgroundTeaser && (
              <p className="text-sm text-gray-500 italic mt-4">{beat2Data.backgroundTeaser}</p>
            )}
          </div>
        )}
      </div>

      <BeatNav currentBeat={2} totalBeats={totalBeats} onNext={onNext} onBack={onBack} />
    </div>
  )
}
