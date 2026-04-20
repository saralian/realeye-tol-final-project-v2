import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import HomePage from "./components/home/HomePage"
import RoundPage from "./components/round/RoundPage"
import TellDetailPage from "./components/tellDetail/TellDetailPage"
import useUnlockedTells from "./hooks/useUnlockedTells"
import useRoundProgress from "./hooks/useRoundProgress"

function HomeRoute() {
  const navigate = useNavigate()
  const { unlockedTells } = useUnlockedTells()
  const { roundProgress } = useRoundProgress()

  function handleReset() {
    window.localStorage.removeItem("realeye.unlockedTells")
    window.localStorage.removeItem("realeye.roundProgress")
    window.location.reload()
  }

  return (
    <HomePage
      onStart={() => navigate("/round/round-1-hands-fingers")}
      onTellClick={(tellId) => navigate(`/tell/${tellId}`)}
      onRoundClick={(roundId) => navigate(`/round/${roundId}`)}
      unlockedTells={unlockedTells}
      roundProgress={roundProgress}
      onReset={handleReset}
    />
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/round/:roundId" element={<RoundPage />} />
          <Route path="/tell/:tellId" element={<TellDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
