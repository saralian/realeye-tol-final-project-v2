import Button from "../common/Button"
import BeatNav from "./BeatNav"

export default function Beat4({ beat4Data, onComplete, onBack, tellData }) {
  return (
    <div>
      <div className="py-8 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{beat4Data.bridgeHeading}</h2>
        <p className="text-lg text-gray-600">{beat4Data.bridgeText}</p>
      </div>

      {tellData && (
        <div className="max-w-md rounded-xl overflow-hidden shadow-sm">
          <div className="flex">
            <div className="w-1.5 bg-blue-500 shrink-0" />
            <div className="flex-1 bg-gray-100 border-t border-r border-b border-gray-200 rounded-r-xl p-5">
              <span className="text-3xl block mb-2" role="img" aria-label={tellData.name}>{tellData.icon}</span>
              <p className="font-bold text-gray-600 text-lg mb-1">{tellData.name}</p>
              <p className="text-sm text-gray-600 mb-2">{tellData.shortTagline}</p>
              <p className="text-xs text-blue-500 font-medium">Up next: Practice</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button variant="primary" onClick={onComplete} className="px-8">
          {beat4Data.buttonText}
        </Button>
      </div>

      <BeatNav currentBeat={4} totalBeats={4} onBack={onBack} hideNext />
    </div>
  )
}
