export default function FeedbackBanner({ variant = "gray", children }) {
  const styles = {
    green: "bg-green-50 border-l-4 border-green-500 text-green-900",
    amber: "bg-amber-50 border-l-4 border-amber-500 text-amber-900",
    gray:  "bg-gray-50  border-l-4 border-gray-400  text-gray-700",
  }

  return (
    <div className={`${styles[variant] ?? styles.gray} rounded-r-lg p-5`}>
      <p className="text-base leading-relaxed">{children}</p>
    </div>
  )
}
