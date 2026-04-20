import BeatNav from "./BeatNav"

export default function Beat3({ beat3Data, onNext, onBack }) {
  return (
    <div>
      <p className="text-base text-gray-600 mb-8">{beat3Data.introText}</p>

      {/* h-64 (256px) — adjust once real images are in place */}
      <div className="grid grid-cols-2 gap-6">
        {beat3Data.examples.map((example) => (
          <div key={example.label} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="h-64">
              <img
                src={example.src}
                alt={example.label}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <p className="font-semibold text-gray-900 mb-2">{example.label}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{example.annotation}</p>
            </div>
          </div>
        ))}
      </div>

      <BeatNav currentBeat={3} totalBeats={4} onNext={onNext} onBack={onBack} />
    </div>
  )
}
