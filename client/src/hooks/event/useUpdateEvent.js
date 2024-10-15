import { useState } from 'react'

export const useUpdateEvent = () => {
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const resetState = () => {
    setIsSuccess(false)
    setError(null);
  };

  const update = async (event_id, name, start, end, user_id) => {
    setIsSuccess(false)
    setError(null)

    const response = await fetch(`/api/event/${encodeURIComponent(event_id)}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, start, end, user_id})
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

  const deleteEvent = async (event_id) => {
    setIsSuccess(false)
    setError(null)

    const response = await fetch(`/api/event/${encodeURIComponent(event_id)}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
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

  return { resetState, update, deleteEvent, isSuccess, error}
}