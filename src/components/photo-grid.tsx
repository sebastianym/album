import { PhotoCard } from "@/components/photo-card";

interface Photo {
  id: number;
  month: string;
  src: string;
  date: string;
}

interface PhotoGridProps {
  photos: Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          rotation={index % 2 === 0 ? "5" : "-5"}
        />
      ))}
    </div>
  );
}
