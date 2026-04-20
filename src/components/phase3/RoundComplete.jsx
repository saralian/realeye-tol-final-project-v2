import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from "../common/Button"
import { appCopy } from "../../data/exercises"

export default function RoundComplete({ tellData, onHome }) {
  const [earned, setEarned] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEarned(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{appCopy.roundComplete.heading}</h1>
        <p className="text-xl text-gray-600">{appCopy.roundComplete.subheading(tellData.name)}</p>
      </div>

      <div className="max-w-xs mx-auto mb-12">
        <div
          className={`rounded-xl border p-6 shadow-sm transition-colors duration-500 ${
            earned ? "bg-emerald-50 border-emerald-300" : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl" role="img" aria-label={tellData.name}>{tellData.icon}</span>
            <span
              className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors duration-500 ${
                earned ? "text-emerald-700 bg-emerald-100" : "text-gray-400 bg-gray-200"
              }`}
            >
              {earned ? appCopy.roundComplete.earnedLabel : "🔒 Locked"}
            </span>
          </div>
          <h3
            className={`font-bold text-lg mb-1 transition-colors duration-500 ${
              earned ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {tellData.name}
          </h3>
          <p
            className={`text-sm transition-colors duration-500 ${
              earned ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {tellData.shortTagline}
          </p>
          {earned && (
            <Link
              to={`/tell/${tellData.id}`}
              className="block text-sm font-medium text-emerald-700 mt-4 hover:text-emerald-800 transition-colors"
            >
              {appCopy.tellCard.viewDetailsText}
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button variant="primary" onClick={onHome}>{appCopy.roundComplete.backHomeText}</Button>
        <div className="flex flex-col items-center gap-1">
          <Button variant="secondary" disabled>{appCopy.roundComplete.learnAnotherText}</Button>
          <p className="text-xs text-gray-400">{appCopy.roundComplete.learnAnotherDisabledSubtext}</p>
        </div>
      </div>
    </div>
  )
}
