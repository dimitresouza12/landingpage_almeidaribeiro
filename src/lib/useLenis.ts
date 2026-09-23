import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -88 },
      duration: 1.1,
    })

    return () => {
      lenis.destroy()
    }
  }, [])
}
