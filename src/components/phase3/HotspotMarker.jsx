export default function HotspotMarker({ x, y, type }) {
  const base = "absolute rounded-full pointer-events-none"

  const styles = {
    correct: `${base} w-7 h-7 bg-green-500 border-2 border-white shadow-md flex items-center justify-center`,
    revealed: `${base} w-7 h-7 bg-amber-400 border-2 border-white shadow-md flex items-center justify-center`,
    placed:   `${base} w-4 h-4 bg-gray-400 border-2 border-white shadow-sm`,
  }

  return (
    <div
      className={styles[type]}
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      {type === "correct" && (
        <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {type === "revealed" && (
        <span className="text-white text-sm font-bold leading-none select-none">!</span>
      )}
    </div>
  )
}
