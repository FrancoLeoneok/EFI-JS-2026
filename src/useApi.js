import { useEffect, useState } from 'react'
import { api } from './api'

export function useApi(path) {
  const [result, setResult] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    api(path, { signal: controller.signal }).then(
      (data) => { if (!controller.signal.aborted) setResult({ path, data }) },
      (error) => { if (!controller.signal.aborted) setResult({ path, error: error.message }) },
    )
    return () => controller.abort()
  }, [path])
  return result?.path === path ? result : { loading: true }
}
