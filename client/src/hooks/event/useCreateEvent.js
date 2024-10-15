import { useState } from 'react'

export const useCreateEvent = () => {
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const resetState = () => {
    setIsSuccess(false)
    setError(null);
  };

  const create = async (name, start, end, user_id) => {
    setIsSuccess(false)
    setError(null)

    const response = await fetch('/api/event', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, start, end, user_id })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsSuccess(false)
      setError(json.error)
    }
    if (response.ok) {
      // update loading state
      setIsSuccess(true)
    }
  }

  return { create, resetState, isSuccess, error}
}