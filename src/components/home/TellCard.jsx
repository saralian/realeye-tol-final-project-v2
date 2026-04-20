import { appCopy } from "../../data/exercises"

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  )
}

function getProgressLabel(progress) {
  if (!progress) return ""
  const { currentPhase, phase2Beat, phase3ImagesCompleted } = progress
  const labels = appCopy.tellCard.progressLabels
  if (currentPhase === "phase1") return labels.examine
  if (currentPhase === "phase2") return labels.learn(phase2Beat)
  if (currentPhase === "phase3") return labels.practice(phase3ImagesCompleted + 1, 3)
  return ""
}

export default function TellCard({ tell, state, progress, onClick }) {
  if (state === "earned") {
    return (
      <button
        onClick={onClick}
        className="w-full text-left bg-emerald-50 border border-emerald-300 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl" role="img" aria-label={tell.name}>{tell.icon}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
            <CheckIcon />
            {appCopy.roundComplete.earnedLabel}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-1">{tell.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{tell.shortTagline}</p>
        <span className="text-sm font-medium text-emerald-700">{appCopy.tellCard.viewDetailsText}</span>
      </button>
    )
  }

  if (state === "in-progress") {
    return (
      <button
        onClick={onClick}
        className="w-full text-left rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <div className="flex h-full">
          <div className="w-1.5 bg-blue-500 shrink-0" />
          <div className="flex-1 bg-white border-t border-r border-b border-gray-200 rounded-r-xl p-6">
            <span className="text-3xl block mb-3" role="img" aria-label={tell.name}>{tell.icon}</span>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{tell.name}</h3>
            <p className="text-sm text-blue-600 mb-4">{getProgressLabel(progress)}</p>
            <span className="text-sm font-medium text-blue-500">{appCopy.tellCard.continueText}</span>
          </div>
        </div>
      </button>
    )
  }

  if (state === "coming-soon") {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="grayscale opacity-60">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl" role="img" aria-label={tell.name}>{tell.icon}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <LockIcon />
              {appCopy.tellCard.lockedText}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{tell.name}</h3>
          <p className="text-sm text-gray-600">{tell.shortTagline}</p>
        </div>
      </div>
    )
  }

  // locked / fallback — shouldn't occur in demo
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 opacity-40">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl grayscale" role="img" aria-label={tell.name}>{tell.icon}</span>
        <LockIcon />
      </div>
      <h3 className="font-bold text-gray-700 text-lg mb-1">{tell.name}</h3>
    </div>
  )
}
