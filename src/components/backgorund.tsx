"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const floatingHearts = Array(20).fill(null)

export function Background() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingHearts.map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-rose-200"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: -100,
            transition: {
              repeat: Number.POSITIVE_INFINITY,
              duration: Math.random() * 60 + 60,
              ease: "linear",
            },
          }}
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
      ))}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-pink-100 to-transparent" />
    </div>
  )
}

