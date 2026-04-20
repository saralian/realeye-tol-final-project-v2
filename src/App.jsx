import { useState } from "react"
import Header from "./components/common/Header"
import Phase1 from "./components/phase1/Phase1"
import Phase2 from "./components/phase2/Phase2"
import Button from "./components/common/Button"
import { rounds, tellLibrary } from "./data/exercises"

const round = rounds[0]
const { phase1: phase1Data, phase2: phase2Data } = round
const tellData = tellLibrary.find(t => t.id === round.tellId)

export default function App() {
  const [phase, setPhase] = useState("phase1")
  const [resetKey, setResetKey] = useState(0)

  function reset() {
    setPhase("phase1")
    setResetKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onHomeClick={reset} />

      {/* Test harness jump controls */}
      <div className="max-w-4xl mx-auto px-6 pt-4 flex gap-3 border-b border-dashed border-gray-300 pb-4">
        <span className="text-xs text-gray-400 self-center mr-1">Jump to:</span>
        <Button variant="secondary" onClick={() => { setResetKey(k => k + 1); setPhase("phase1") }}>Phase 1</Button>
        <Button variant="secondary" onClick={() => setPhase("phase2")}>Phase 2</Button>
      </div>

      {phase === "phase1" && (
        <Phase1
          key={resetKey}
          phase1Data={phase1Data}
          onComplete={() => setPhase("phase2")}
        />
      )}

      {phase === "phase2" && (
        <Phase2
          phase2Data={phase2Data}
          tellData={tellData}
          onComplete={() => alert("Phase 2 complete — Phase 3 coming in Session 5")}
        />
      )}
    </div>
  )
}
