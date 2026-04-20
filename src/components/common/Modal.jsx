import { useEffect } from "react"
import Button from "./Button"

export default function Modal({
  isOpen,
  heading,
  body,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmVariant = "primary",
}) {
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e) {
      if (e.key === "Escape") onCancel()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{heading}</h2>
        <p className="text-base text-gray-600 mb-8">{body}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
