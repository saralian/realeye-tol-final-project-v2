import { appCopy } from "../../data/exercises"

export default function Header({ onHomeClick }) {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={onHomeClick}
          title={appCopy.navigation.homeTooltip}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h4v-4h2v4h4a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
          </svg>
          <span className="text-sm font-medium">Home</span>
        </button>

        <span className="text-lg font-bold text-gray-900 tracking-tight">RealEye</span>
      </div>
    </header>
  )
}
