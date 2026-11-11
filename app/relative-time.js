'use client'

import { useEffect, useState } from 'react'

export function RelativeTime({ timestamp }) {
  const [now, setNow] = useState()

  useEffect(() => {
    const updateNow = () => setNow(Date.now())
    updateNow()

    const intervalId = setInterval(updateNow, 60000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <time suppressHydrationWarning>
      {now === undefined ? '...' : computeTimeAgo({ timestamp, now })}
    </time>
  )
}