export default function Button({ children, onClick, disabled = false, variant = "primary", type = "button", className = "" }) {
  const base = "px-5 py-2.5 rounded-md font-medium text-base transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
    secondary: "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 active:bg-blue-100",
    destructive: "bg-white text-amber-600 border border-amber-500 hover:bg-amber-50 active:bg-amber-100",
  }

  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none"

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${disabled ? disabledStyles : ""} ${className}`}
    >
      {children}
    </button>
  )
}
