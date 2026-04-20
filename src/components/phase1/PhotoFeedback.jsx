import FeedbackBanner from "../common/FeedbackBanner"
import Button from "../common/Button"

export default function PhotoFeedback({ isCorrect, correctFeedback, wrongFeedback, onContinueWrong }) {
  if (isCorrect) {
    return <FeedbackBanner variant="green">{correctFeedback}</FeedbackBanner>
  }

  return (
    <div className="space-y-6">
      <FeedbackBanner variant="amber">{wrongFeedback}</FeedbackBanner>
      <div className="flex justify-center">
        <Button variant="primary" onClick={onContinueWrong}>
          Continue to learn →
        </Button>
      </div>
    </div>
  )
}
