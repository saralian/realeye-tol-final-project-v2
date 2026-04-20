import { useParams, Navigate, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { tellLibrary, appCopy } from "../../data/exercises"
import Header from "../common/Header"

export default function TellDetailPage() {
  const { tellId } = useParams()
  const navigate = useNavigate()
  const tell = tellLibrary.find(t => t.id === tellId)

  if (!tell) return <Navigate to="/" replace />

  return (
    <div>
      <Header onHomeClick={() => navigate("/")} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
          {appCopy.tellDetail.backText}
        </Link>
        <div className="mt-8">
          <span className="text-4xl" role="img" aria-label={tell.name}>{tell.icon}</span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{tell.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{tell.shortTagline}</p>
        </div>
      </div>
    </div>
  )
}
