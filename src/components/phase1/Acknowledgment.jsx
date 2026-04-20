import { getAcknowledgment } from "../../utils/selectionLogic"
import FeedbackBanner from "../common/FeedbackBanner"
import Button from "../common/Button"

export default function Acknowledgment({ selectedOptions, acknowledgments, onContinue }) {
  const { message, variant } = getAcknowledgment(selectedOptions, acknowledgments)

  return (
    <div className="space-y-6">
      <FeedbackBanner variant={variant}>{message}</FeedbackBanner>
      <div className="flex justify-center">
        <Button variant="primary" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
