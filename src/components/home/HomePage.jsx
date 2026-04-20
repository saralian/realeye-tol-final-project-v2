import { appCopy, tellLibrary } from "../../data/exercises"
import Button from "../common/Button"
import LibraryGrid from "./LibraryGrid"

export default function HomePage({ onStart, onTellClick, onRoundClick, unlockedTells = [], roundProgress = {} }) {
  const { home } = appCopy
  const earnedCount = unlockedTells.length
  const totalCount = tellLibrary.length

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">

      {/* Intro */}
      <h1 className="text-4xl font-bold text-gray-900">{home.title}</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">{home.intro}</p>

      {/* Three-step explainer */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide">{home.howItWorksHeading}</h2>
        <div className="mt-6 flex gap-0">
          {home.steps.map((step, index) => (
            <div key={step.label} className="flex items-start flex-1">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{step.label}</span>
                </div>
                <p className="mt-2 ml-11 text-sm text-gray-600">{step.description}</p>
              </div>
              {index < home.steps.length - 1 && (
                <span className="mx-4 mt-1.5 text-gray-300 text-xl font-light shrink-0">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Button variant="primary" onClick={onStart}>
          {home.startButtonText}
        </Button>
      </div>

      {/* Divider */}
      <hr className="my-12 border-gray-200" />

      {/* Tell Library */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="text-2xl font-bold text-gray-900">{home.libraryHeading}</h2>
          <span className="text-sm text-gray-500">{home.libraryProgressText(earnedCount, totalCount)}</span>
        </div>
        <div className="mt-6">
          <LibraryGrid
            unlockedTells={unlockedTells}
            roundProgress={roundProgress}
            onTellClick={onTellClick}
            onRoundClick={onRoundClick}
          />
        </div>
      </div>

    </main>
  )
}
