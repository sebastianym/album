"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { addPhoto } from "@/data/action"; // Asegúrate de que la ruta sea correcta.

const formSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `El tamaño máximo es 5MB.`),
  date: z.date({
    required_error: "Se requiere una fecha.",
  }),
});

interface AddPhotoFormProps {
  onSuccess: () => void;
}

export function AddPhotoForm({ onSuccess }: AddPhotoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true); // Cambia el estado a "en envío".
    try {
      // Creamos el FormData para enviar la foto y la fecha al servidor
      const formData = new FormData();
      formData.append("photo", values.photo); // Añadimos el archivo de foto
      formData.append("date", values.date.toISOString()); // Añadimos la fecha en formato ISO

      // Llamamos a la función addPhoto que utiliza el endpoint en el servidor
      await addPhoto(formData);

      // Muestra un toast de éxito
      toast({
        title: "Foto agregada",
        description: "Tu foto ha sido agregada exitosamente al álbum.",
      });

      // Llama a la función onSuccess para manejar el estado después de la subida
      onSuccess();
    } catch (error) {
      // Si ocurre un error, muestra un toast de error
      toast({
        title: "Error",
        description:
          "Hubo un problema al agregar la foto. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Restablece el estado de envío
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Haz clic para subir
                        </span>{" "}
                        o arrastra y suelta
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG o GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </label>
                </div>
              </FormControl>
              <FormDescription>
                Selecciona una foto para agregar a tu álbum.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("2022-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Selecciona la fecha en que se tomó la foto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Agregando..." : "Agregar Foto"}
        </Button>
      </form>
    </Form>
  );
}
