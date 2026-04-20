import { useState } from "react"
import Button from "../common/Button"

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

export default function TellSelection({ tellOptions, tellSelectionPrompt, continueButtonText, onContinue }) {
  const [selectedIds, setSelectedIds] = useState(new Set())

  function toggle(id) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleContinue() {
    onContinue(tellOptions.filter(o => selectedIds.has(o.id)))
  }

  return (
    <div>
      <p className="text-lg font-medium text-gray-800 mb-5">{tellSelectionPrompt}</p>

      <div className="grid grid-cols-2 gap-3">
        {tellOptions.map(option => {
          const isSelected = selectedIds.has(option.id)
          return (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors
                ${isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => toggle(option.id)}
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                ${isSelected ? "bg-blue-500 border-blue-500 text-white" : "bg-white border-gray-400"}`}
              >
                {isSelected && <CheckIcon />}
              </div>
              <span className="text-sm font-medium text-gray-800 leading-snug">{option.label}</span>
            </label>
          )
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="primary" onClick={handleContinue} disabled={selectedIds.size === 0}>
          {continueButtonText}
        </Button>
      </div>
    </div>
  )
}
