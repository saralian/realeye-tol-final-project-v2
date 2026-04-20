import { tellLibrary } from "../../data/exercises"
import { getTellCardState } from "../../utils/getTellCardState"
import TellCard from "./TellCard"

export default function LibraryGrid({ unlockedTells, roundProgress, onTellClick, onRoundClick }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
      {tellLibrary.map((tell) => {
        const state = getTellCardState(tell, unlockedTells, roundProgress)
        const progress = roundProgress[tell.unlockRoundId] ?? null

        function handleClick() {
          if (state === "earned") onTellClick?.(tell.id)
          else if (state === "in-progress") onRoundClick?.(tell.unlockRoundId)
        }

        return (
          <TellCard
            key={tell.id}
            tell={tell}
            state={state}
            progress={progress}
            onClick={state === "coming-soon" || state === "locked" ? undefined : handleClick}
          />
        )
      })}
    </div>
  )
}
