"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Photo {
  id: number
  month: string
  src: string
  date: string
}

interface PhotoCardProps {
  photo: Photo
  rotation: string
}

export function PhotoCard({ photo, rotation }: PhotoCardProps) {
  return (
    <motion.div
      initial={{ rotate: `${rotation}deg`, opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05, rotate: "0deg" }}
      className="group relative"
    >
      <div className="overflow-hidden rounded-lg bg-white p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={photo.src}
            alt={`Foto de ${photo.month}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-2xl font-light text-gray-800">{photo.month}</h3>
          <p className="mt-1 text-sm text-rose-600">
            {new Date(photo.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

