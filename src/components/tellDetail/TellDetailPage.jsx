import { useParams, Navigate, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { tellLibrary, rounds, appCopy } from "../../data/exercises"
import Header from "../common/Header"
import Phase2 from "../phase2/Phase2"

export default function TellDetailPage() {
  const { tellId } = useParams()
  const navigate = useNavigate()

  const tell = tellLibrary.find(t => t.id === tellId)
  if (!tell) return <Navigate to="/" replace />

  const round = rounds.find(r => r.tellId === tellId)
  if (!round) return <Navigate to="/" replace />

  return (
    <div>
      <Header onHomeClick={() => navigate("/")} />
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          {appCopy.tellDetail.backText}
        </Link>
      </div>
      <Phase2
        phase2Data={round.phase2}
        tellData={tell}
        maxBeats={3}
        onComplete={() => navigate("/")}
      />
    </div>
  )
}
