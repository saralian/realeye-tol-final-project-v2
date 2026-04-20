import Button from "../common/Button"
import BeatNav from "./BeatNav"

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  )
}

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
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl" role="img" aria-label={tellData.name}>{tellData.icon}</span>
                <span className="flex items-center text-gray-400 bg-gray-200 p-1.5 rounded-full">
                  <LockIcon />
                </span>
              </div>
              <p className="font-bold text-gray-600 text-lg mb-1">{tellData.name}</p>
              <p className="text-sm text-gray-600 mb-2">{tellData.shortTagline}</p>
              <p className="text-xs text-blue-500 font-medium">In progress: Practice</p>
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
