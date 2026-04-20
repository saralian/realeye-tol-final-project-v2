import Button from "../common/Button"

export default function BeatNav({ currentBeat, totalBeats, onBack, onNext, nextLabel = "Next →" }) {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
      <div className="w-32">
        {currentBeat > 1 && (
          <Button variant="secondary" onClick={onBack}>← Back</Button>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalBeats }, (_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i + 1 === currentBeat ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="w-32 flex justify-end">
        <Button variant="primary" onClick={onNext}>{nextLabel}</Button>
      </div>
    </div>
  )
}
