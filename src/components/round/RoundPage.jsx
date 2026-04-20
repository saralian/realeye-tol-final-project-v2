import { useParams, Navigate } from "react-router-dom"
import { rounds } from "../../data/exercises"
import RoundContainer from "./RoundContainer"

export default function RoundPage() {
  const { roundId } = useParams()
  const round = rounds.find(r => r.id === roundId)

  if (!round) return <Navigate to="/" replace />

  return <RoundContainer round={round} />
}
