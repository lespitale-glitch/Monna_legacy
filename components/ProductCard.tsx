import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

type Props = {
  nombre: string;
  precio: number;
  imagen: string;
  nuevo?: boolean;
};

export default function ProductCard({
  nombre,
  precio,
  imagen,
  nuevo,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-80 overflow-hidden">
        {nuevo && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
            NUEVO
          </span>
        )}

        <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow">
          <Heart size={18} />
        </button>

        <Image
          src={imagen}
          alt={nombre}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{nombre}</h3>

        <p className="mt-2 text-2xl font-bold text-pink-500">
          ${precio.toLocaleString("es-AR")}
        </p>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 py-3 text-white">
          <ShoppingBag size={18} />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}