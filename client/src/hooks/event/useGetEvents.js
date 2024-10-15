import { useState } from 'react'

export const useGetEvents = () => {
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const get = async (user_id) => {
    setIsSuccess(false)
    setError(null)

    const response = await fetch(`/api/event?id=${user_id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    const data = await response.json()

    if (!response.ok) {
      setIsSuccess(false)
      setError(data.error)
    }
    if (response.ok) {
      // update loading state
      setIsSuccess(true)
      return data
    }
  }

  return { get, isSuccess, error}
}