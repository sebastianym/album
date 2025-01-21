"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import sharp from "sharp";

export async function addPhoto(formData: FormData) {
  const photo = formData.get("photo") as File | null;
  const date = formData.get("date") as string | null;

  // Validación de los datos
  if (!photo || !date) {
    throw new Error("Faltan datos: archivo o fecha");
  }

  try {
    // Leer el contenido del archivo como un buffer
    const arrayBuffer = await photo.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Optimizar la imagen con sharp (redimensionar y convertir a formato jpeg)
    const optimizedBuffer = await sharp(fileBuffer)
      .resize(1024, 1024, { fit: "inside" }) // Ajuste de tamaño opcional
      .toFormat("jpeg", { quality: 80 }) // Conversión a JPEG con calidad 80
      .toBuffer();

    // Guardar en la base de datos con Prisma
    const image = await prisma.image.create({
      data: {
        data: optimizedBuffer,
        date: new Date(date),
      },
    });

    // Revalidar la ruta para actualizar la UI con la nueva foto
    revalidatePath("/");

    return { success: true, image };
  } catch (error) {
    console.error("Error al subir la foto:", error);
    throw new Error("Error al subir la foto.");
  } finally {
    await prisma.$disconnect();
  }
}