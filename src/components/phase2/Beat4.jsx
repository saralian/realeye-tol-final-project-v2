import Button from "../common/Button"
import BeatNav from "./BeatNav"

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
        <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50 max-w-md">
          <span className="text-3xl grayscale opacity-60" role="img" aria-label={tellData.name}>
            {tellData.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <LockIcon />
              <span className="font-semibold text-gray-500">{tellData.name}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{tellData.shortTagline}</p>
            <p className="text-xs text-gray-400 italic">You'll earn this when you complete Practice.</p>
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
