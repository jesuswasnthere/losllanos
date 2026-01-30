"use client"

import { useEffect } from "react"
import AOS from "aos"

export function AOSProvider() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out-cubic",
    })
  }, [])

  return null
}
