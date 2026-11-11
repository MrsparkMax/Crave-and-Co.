import { Suspense } from 'react'
import { RelativeTime } from './relative-time'
 
export default function Article({ timestamp }) {
  return (
    <article>
      <Suspense fallback={<time>…</time>}>
        <RelativeTime timestamp={timestamp} />
      </Suspense>
    </article>
  )
}