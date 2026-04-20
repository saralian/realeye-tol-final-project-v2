import Header from "./components/common/Header"
import HomePage from "./components/home/HomePage"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onHomeClick={() => {}} />
      <HomePage
        onStart={() => alert("Navigate to round-1-hands-fingers")}
        onTellClick={(id) => alert(`Navigate to tell detail: ${id}`)}
        onRoundClick={(id) => alert(`Navigate to round: ${id}`)}
        unlockedTells={[]}
        roundProgress={{}}
      />
    </div>
  )
}
