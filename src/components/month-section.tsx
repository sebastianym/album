"use client";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Photo {
  id: number;
  src: string;
  date: string;
}

interface MonthSectionProps {
  month: string;
  photos: Photo[];
  index: number;
}

export function MonthSection({ month, photos, index }: MonthSectionProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative"
    >
      <div className="mb-4 text-center">
        <h2 className="font-serif text-4xl font-light text-gray-800">
          {month}
        </h2>
        <p className="mt-1 font-serif text-sm text-rose-600">
          {photos.length} {photos.length === 1 ? "foto" : "fotos"}
        </p>
      </div>

      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-xl bg-white p-4 shadow-xl">
        <div className="relative aspect-[4/3]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhotoIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={photos[currentPhotoIndex].src}
                alt={`Foto de ${month}`}
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Fecha con corazón */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-rose-500" />
            <p className="font-serif text-sm text-gray-800">
              {new Date(photos[currentPhotoIndex].date).toLocaleDateString(
                "es-ES",
                {
                  day: "numeric",
                  month: "long",
                }
              )}
            </p>
          </div>

          {/* Controles del carrusel */}
          {photos.length > 1 && (
            <>
              <button
                onClick={previousPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-all hover:bg-white hover:scale-110"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-all hover:bg-white hover:scale-110"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Indicadores */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhotoIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentPhotoIndex ? "bg-rose-600 w-4" : "bg-white/80"
                  }`}
                  aria-label={`Ir a la foto ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
