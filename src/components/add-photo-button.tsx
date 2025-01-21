"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddPhotoForm } from "./add-photo-form";

export function AddPhotoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="fixed bottom-8 right-8 rounded-full shadow-lg"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Foto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Foto</DialogTitle>
          <DialogDescription>
            Sube una nueva foto a tu álbum de recuerdos.
          </DialogDescription>
        </DialogHeader>
        {
          // Mostrar formulario de carga de fotos si el usuario está autorizado
          authorized ? (
            <AddPhotoForm onSuccess={() => setIsOpen(false)} />
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-center">
                Para agregar una foto, primero debes ingresar la contraseña.
              </p>
              <form>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                  placeholder="Contraseña"
                  onChange={(e) => {
                    if (
                      e.target.value ===
                      process.env.NEXT_PUBLIC_PASSWORD_ADD_PHOTO
                    ) {
                      setAuthorized(true);
                    }
                  }}
                />
              </form>
            </div>
          )
        }
      </DialogContent>
    </Dialog>
  );
}
