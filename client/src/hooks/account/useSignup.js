import { useState } from 'react'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)

  const signup = async (email, password, name, role, company) => {
    setIsSuccess(false)
    setError(null)

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, name, role, company })
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

  return { signup, isSuccess, error }
}