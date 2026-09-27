import Image from "next/image";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}
        <Image
          src="/logo.jpg"
          alt="Monna"
          width={180}
          height={60}
          priority
        />

        {/* Menú */}
        <nav className="hidden gap-8 font-medium md:flex">
          <a
            href="#"
            className="text-orange-500 transition-all duration-300 hover:text-pink-600"
          >
            Inicio
          </a>

          <a
            href="#"
            className="text-orange-500 transition-all duration-300 hover:text-pink-600"
          >
            Productos
          </a>

          <a
            href="#"
            className="text-orange-500 transition-all duration-300 hover:text-pink-600"
          >
            Colecciones
          </a>

          <a
            href="#"
            className="text-orange-500 transition-all duration-300 hover:text-pink-600"
          >
            Nosotros
          </a>
        </nav>

        {/* Iconos */}
        <div className="flex items-center gap-5">

          <Search
            className="cursor-pointer text-orange-500 transition hover:text-pink-600"
            size={20}
          />

          <Heart
            className="cursor-pointer text-orange-500 transition hover:text-pink-600"
            size={20}
          />

          <User
            className="cursor-pointer text-orange-500 transition hover:text-pink-600"
            size={20}
          />

          <div className="relative cursor-pointer">
            <ShoppingBag
              className="text-orange-500 transition hover:text-pink-600"
              size={22}
            />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
              0
            </span>
          </div>

          <Menu
            className="cursor-pointer text-orange-500 transition hover:text-pink-600 md:hidden"
            size={24}
          />

        </div>
      </div>
    </header>
  );
}