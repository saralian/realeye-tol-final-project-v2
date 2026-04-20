import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../common/Header"
import Phase1 from "../phase1/Phase1"
import Phase2 from "../phase2/Phase2"
import Phase3 from "../phase3/Phase3"
import { tellLibrary } from "../../data/exercises"

export default function RoundContainer({ round }) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState("phase1")
  const [phase1Result, setPhase1Result] = useState(null) // reserved for Session 8 localStorage

  const tellData = tellLibrary.find(t => t.id === round.tellId)

  function handleHomeClick() {
    // TODO Session 8: save round progress to localStorage before navigating
    navigate("/")
  }

  function handlePhase1Complete(result) {
    setPhase1Result(result)
    setPhase("phase2")
  }

  return (
    <div>
      <Header onHomeClick={handleHomeClick} />

      {phase === "phase1" && (
        <Phase1
          phase1Data={round.phase1}
          onComplete={handlePhase1Complete}
        />
      )}

      {phase === "phase2" && (
        <Phase2
          phase2Data={round.phase2}
          tellData={tellData}
          onComplete={() => setPhase("phase3")}
        />
      )}

      {phase === "phase3" && (
        <Phase3
          phase3Data={round.phase3}
          tellData={tellData}
          onHome={() => navigate("/")}
        />
      )}
    </div>
  )
}
