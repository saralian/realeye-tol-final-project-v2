import { useState } from "react"
import Button from "../common/Button"

export default function ContrastingPair({ imageA, imageB, onConfirm, locked = false }) {
  const [selected, setSelected] = useState(null) // "A" | "B"

  const images = [
    { key: "A", image: imageA },
    { key: "B", image: imageB },
  ]

  function handleConfirm() {
    if (!selected) return
    const img = selected === "A" ? imageA : imageB
    onConfirm({ selectedKey: selected, isCorrect: img.isAI })
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {images.map(({ key, image }) => {
          const isSelected = selected === key
          return (
            <div key={key}>
              <p className="text-sm font-semibold text-gray-500 mb-2 tracking-wide">Photo {key}</p>
              <button
                type="button"
                onClick={locked ? undefined : () => setSelected(key)}
                disabled={locked}
                className={`w-full block rounded-lg overflow-hidden transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                  ${isSelected
                    ? "ring-4 ring-blue-500 ring-offset-2 shadow-lg"
                    : locked
                      ? "ring-1 ring-gray-200"
                      : "ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300 hover:shadow-md"
                  }`}
              >
                <div className="h-80">
                  <img
                    src={image.src}
                    alt={`Photo ${key}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {!locked && (
        <div className="mt-8 flex justify-center">
          <Button variant="primary" onClick={handleConfirm} disabled={!selected}>
            Confirm my choice
          </Button>
        </div>
      )}
    </div>
  )
}
