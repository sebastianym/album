import { MonthSection } from "@/components/month-section";
import { AddPhotoButton } from "@/components/add-photo-button";
import { Toaster } from "@/components/ui/toaster";
import { Background } from "@/components/backgorund";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";

interface Photo {
  id: number;
  src: string;
  date: string;
}

const AudioAutoPlayer = dynamic(() => import("@/components/audioPlayer"), {
  ssr: false,
});

export default async function PhotoAlbum() {
  // Obtener fotos desde la base de datos
  const photos = await prisma.image.findMany({
    orderBy: { date: "asc" }, // Ordenar por fecha
  });

  // Transformar las fotos en un formato agrupado por año y mes
  const photosByYearAndMonth = photos.reduce(
    (acc: Record<string, Record<string, Photo[]>>, photo) => {
      const date = new Date(photo.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("es-ES", { month: "long" });

      const yearMonthKey = `${year} - ${month}`;

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      acc[year][month].push({
        id: photo.id,
        src: `data:image/jpeg;base64,${Buffer.from(photo.data).toString(
          "base64"
        )}`, // Convertir buffer a base64
        date: photo.date.toISOString(),
      });

      return acc;
    },
    {}
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <audio id="myAudio" src="/audio/primorosa.mp3" loop className="hidden" />
      <AudioAutoPlayer />
      <Background />
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-light tracking-wide text-gray-800 md:text-7xl">
            Nuestra Historia
          </h1>
        </header>

        <div className="space-y-16">
          {Object.entries(photosByYearAndMonth).map(([year, months]) => (
            <section key={year}>
              <h2 className="mb-8 text-center font-serif text-4xl font-light text-gray-800">
                {year}
              </h2>
              <div className="grid gap-16">
                {Object.entries(months).map(([month, photos], index) => (
                  <MonthSection
                    key={month}
                    month={month}
                    photos={photos}
                    index={index}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <AddPhotoButton />
      </div>
      <Toaster />
    </main>
  );
}
