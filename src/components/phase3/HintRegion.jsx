export default function HintRegion({ hintRegion, visible, tooltipText }) {
  if (!visible) return null

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${hintRegion.x}%`,
        top: `${hintRegion.y}%`,
        width: `${hintRegion.width}%`,
        height: `${hintRegion.height}%`,
      }}
    >
      <div className="w-full h-full bg-amber-300 opacity-30 rounded-lg" />
      {tooltipText && (
        <p className="absolute top-full left-0 mt-1 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1 whitespace-nowrap shadow-sm">
          {tooltipText}
        </p>
      )}
    </div>
  )
}
