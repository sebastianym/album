// AudioAutoPlayer.jsx
"use client";
import { useEffect } from "react";

export default function AudioAutoPlayer() {
  useEffect(() => {
    const startAudio = () => {
      const audio = document.getElementById("myAudio") as HTMLAudioElement;
      if (audio) {
        audio.play().catch((error) => {
          console.error("Error al reproducir el audio:", error);
        });
      }
      // Remover el listener después del primer clic
      document.removeEventListener("click", startAudio);
    };

    document.addEventListener("click", startAudio);

    return () => {
      document.removeEventListener("click", startAudio);
    };
  }, []);

  return null; // Este componente no renderiza nada visible
}
