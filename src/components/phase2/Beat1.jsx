import BeatNav from "./BeatNav"

export default function Beat1({ beat1Data, onNext }) {
  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl" role="img" aria-label={beat1Data.tellName}>
            {beat1Data.tellIcon}
          </span>
          <h2 className="text-3xl font-bold text-gray-900">{beat1Data.tellName}</h2>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">{beat1Data.definition}</p>

        <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-5 space-y-2 max-w-2xl">
          <h3 className="font-semibold text-gray-900">{beat1Data.whyHeading}</h3>
          <p className="text-base text-gray-700 leading-relaxed">{beat1Data.whyExplanation}</p>
        </div>
      </div>

      <BeatNav currentBeat={1} totalBeats={4} onNext={onNext} />
    </div>
  )
}
