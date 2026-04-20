import { useState } from "react"

export default function useLocalStorage(key, defaultValue, onError) {
  const [value, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  function setValue(newValue) {
    try {
      setStoredValue(newValue)
      window.localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      onError?.(error)
    }
  }

  return [value, setValue]
}
