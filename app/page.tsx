"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

// ==========================================
// COMPONENTE COLECCIÓN MARINA
// ==========================================
function MarineCollection() {
  const { addToCart, setSelectedCategory } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // IDs de productos marinos según tu nuevo catálogo (1 al 68)
  const idsElegidos = [5, 6, 7, 8, 9, 10, 52, 62, 63, 65, 66, 67];

  const productosMarinos = (Array.isArray(products) ? products : [])
    .filter((p) => idsElegidos.includes(p.id))
    .sort((a, b) => idsElegidos.indexOf(a.id) - idsElegidos.indexOf(b.id));

  const handleDiscoverCollection = () => {
    if (setSelectedCategory) setSelectedCategory("Collares");
    const section = document.getElementById("productos-seccion");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#F0F7F9] py-14 px-6 font-sans antialiased border-b border-cyan-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* BANNER DE INTRODUCCIÓN */}
          <div className="lg:col-span-3 flex flex-col justify-between h-[270px] pr-0 lg:pr-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-cyan-700 uppercase flex items-center gap-1">
                🌊 COLECCIÓN MARINA
              </span>
              <h3 className="text-2xl font-light tracking-[0.05em] text-gray-800 uppercase mt-2 leading-snug">
                brisa del mar <br />
                <span className="font-semibold text-teal-600 italic">en tu piel...</span>
              </h3>
              <p className="text-[11.5px] text-cyan-900/70 font-light mt-3 leading-relaxed">
                Perlas, conchas y destellos turquesa para llevar el océano con vos.
              </p>
            </div>

            <div className="flex items-center justify-between lg:justify-start lg:gap-5 mt-4">
              <button
                onClick={handleDiscoverCollection}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700 hover:text-cyan-900 transition-colors border-b-2 border-cyan-300 pb-0.5"
              >
                Ver todo
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200 bg-white text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-400 hover:text-white hover:border-transparent transition-all duration-300 shadow-xs active:scale-95"
                  aria-label="Deslizar izquierda"
                >
                  <span className="text-sm font-bold">←</span>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200 bg-white text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-teal-400 hover:text-white hover:border-transparent transition-all duration-300 shadow-xs active:scale-95"
                  aria-label="Deslizar derecha"
                >
                  <span className="text-sm font-bold">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* CONTENEDOR DESLIZABLE */}
          <div className="lg:col-span-9 relative">
            {productosMarinos.length === 0 ? (
              <div className="py-12 text-center text-xs text-cyan-500 font-light bg-white rounded-2xl border border-cyan-100">
                Cargando tus próximos favoritos... 🐚
              </div>
            ) : (
              <div
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin" }}
              >
                {productosMarinos.map((producto, index) => (
                  <div
                    key={`${producto.id}-${index}`}
                    className="min-w-[210px] sm:min-w-[230px] flex-shrink-0 snap-start bg-white p-4 rounded-2xl border border-cyan-200/40 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_24px_rgba(14,165,233,0.12)] hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F0F9FF] mb-4 border border-cyan-50">
                      {producto.imagen ? (
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          fill
                          sizes="200px"
                          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cyan-300 text-xs">
                          🐚
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-[11px] font-light tracking-wide text-gray-800 truncate">
                        {producto.nombre}
                      </h4>
                      <span className="text-xs font-semibold text-cyan-700 mt-1 mb-3">
                        ${producto.precio.toLocaleString("es-AR")}
                      </span>

                      <button
                        onClick={() => addToCart && addToCart(producto)}
                        className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-cyan-500 to-teal-400 rounded-lg transition-all duration-300 hover:opacity-90 shadow-sm active:scale-95"
                      >
                        Añadir 🐚
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}


// ==========================================
// 1. TIPOS Y CONTEXTO DEL CARRITO
// ==========================================
interface Product {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  nuevo?: boolean;
  categoria?: string;
}

interface CartItem {
  producto: Product;
  cantidad: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("monna_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error al parsear el carrito del localStorage:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("monna_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.producto.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.producto.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { producto: product, cantidad: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.producto.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.producto.id === productId ? { ...item, cantidad: quantity } : item))
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  const cartCount = cart.reduce((count, item) => count + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
// ==========================================
// MARQUESINA / BANNER DE ENVÍOS EN LOOP
// ==========================================
function AnnouncementBar() {
  const text = "-Los envíos tienen un costo inicial de $6.000 y varían según la ubicación, tambien contamos con puntos de retiro en Ballester, Carapachay y Belgrano-";

  return (
    <div className="w-full bg-[#FAF8F6] border-b border-orange-100/40 overflow-hidden py-2 text-[11px] font-light tracking-wider text-gray-600 uppercase">
      <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
        <span className="px-8 flex items-center gap-2">{text}</span>
        <span className="px-8 flex items-center gap-2">{text}</span>
        <span className="px-8 flex items-center gap-2">{text}</span>
        <span className="px-8 flex items-center gap-2">{text}</span>
      </div>
    </div>
  );
}

function LocalNavbar() {
  const { setIsCartOpen, cartCount, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, addToCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categorias = ["Pulseras", "Collares", "Anillos", "Aros"];

  const resultadosBusquedaRapida = searchQuery.trim() === "" 
    ? [] 
    : (Array.isArray(products) ? products : []).filter(prod => 
        prod.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const section = document.getElementById("productos-seccion");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full bg-[#FAF8F6] font-sans antialiased">
      <AnnouncementBar />
      {/* SECCIÓN SUPERIOR */}
      <div className="mx-auto max-w-7xl px-4 py-5 flex items-center justify-between border-b border-orange-100/40">
        <div className="w-20 hidden sm:flex items-center gap-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
          <span className="text-pink-400/60">✦</span> monna
        </div>

        <div 
          className="cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }}
        >
          <Image src= "/logomonnanuevo.jpg" alt="Monna" width={140} height={40} priority className="object-contain" />
        </div>

        <div className="flex items-center gap-4 w-20 justify-end">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-500 hover:text-pink-500 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" /></svg>
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative text-gray-500 hover:text-pink-500 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-pink-400 text-[8px] font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: CATEGORÍAS */}
      <div className="bg-white border-b border-orange-100/30">
        <div className="mx-auto max-w-7xl px-2">
          {/* Scroll horizontal en móviles */}
          <nav className="flex items-center justify-start sm:justify-center gap-6 py-3 px-2 overflow-x-auto text-[10px] sm:text-[11px] font-light tracking-[0.2em] text-gray-500 uppercase whitespace-nowrap scrollbar-hide">
            <button onClick={() => handleCategorySelect("Todos")} className={`pb-1 transition-colors ${selectedCategory === "Todos" ? "text-gray-900" : "hover:text-pink-500"}`}>Colección</button>
            {categorias.map((cat) => (
              <button key={cat} onClick={() => handleCategorySelect(cat)} className={`pb-1 transition-colors ${selectedCategory === cat ? "text-gray-900" : "hover:text-pink-500"}`}>
                {cat}
              </button>
            ))}
          </nav>

          {/* BUSCADOR */}
          <div className={`overflow-hidden transition-all duration-300 ${isSearchOpen ? "max-h-[400px] opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
            <div className="relative w-full max-w-sm mx-auto px-4">
              <input
                type="text"
                placeholder="Buscar tesoros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-gray-200 bg-transparent py-2 text-center text-xs outline-none focus:border-pink-300"
              />
              
              {resultadosBusquedaRapida.length > 0 && (
                <div className="absolute left-4 right-4 top-full z-50 mt-2 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden">
                  {resultadosBusquedaRapida.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                            {prod.imagen && <Image src={prod.imagen} alt={prod.nombre} width={40} height={40} className="object-cover" />}
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] text-gray-800 truncate max-w-[120px]">{prod.nombre}</p>
                          <p className="text-[10px] text-pink-500 font-medium">${prod.precio.toLocaleString()}</p>
                        </div>
                      </div>
                      <button onClick={() => { addToCart(prod); setSearchQuery(""); }} className="text-[9px] border border-pink-400 text-pink-500 px-2 py-1 rounded">ADD</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
// ==========================================
// 3. SECCIÓN HERO ASIMÉTRICO EN PANTALLA COMPLETA
// ==========================================
function NewHeroMinimal() {
  const handleScrollToProducts = () => {
    const section = document.getElementById("productos-seccion");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-start bg-[#FAF8F6] font-sans overflow-hidden">
      
      {/* FONDO COMPLETO: La Imagen abarca toda la sección */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/banner3.jpg" 
          alt="Monna Colección Exclusiva"
          fill
          priority
          className="object-cover object-center transition-transform duration-700 hover:scale-102"
        />
        {/* Un velo traslúcido muy suave que unifica tonos y garantiza legibilidad */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
      </div>

      {/* BLOQUE ASIMÉTRICO FLOTANTE: El Manifiesto contenido a la izquierda */}
      <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center items-start px-8 sm:px-16 lg:px-24 bg-gradient-to-r from-[#FAF8F6]/95 via-[#FAF8F6]/80 to-transparent py-16 md:py-0">
        
        {/* Identificador Sutil */}
        <span className="text-[10px] font-medium tracking-[0.3em] text-pink-500 uppercase mb-4">
          Monna // tu accesorio ideal esta aca
        </span>
        
        {/* Título Estructurado */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 leading-[1.1] uppercase">
          Para que te veas <br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500 ">monisima</span> <br />
          todos los días.
        </h1>
        
        {/* Línea de acento arquitectónica */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-orange-400 to-pink-500 my-8" />

        {/* Botón de Impacto Minimalista */}
        <button 
          onClick={handleScrollToProducts}
          className="mt-10 flex items-center gap-4 rounded-full bg-pink-500 px-8 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-all duration-300 hover:bg-orange-500 hover:shadow-lg active:scale-98 group"
        >
          <span>Ver el Drop</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>

    </section>
  );
}

// ==========================================
// 3.5. SECCIÓN COLLARES (VIBRANT PINK CAROUSEL - MONNA ESSENCE)
// ==========================================
function NewArrivalsCollars() {
  const { addToCart, setSelectedCategory } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // IDs de los collares elegidos: Arte (9), Margarita (10), Eros (11) y Ofelia (21)
  const idsElegidos = [1, 2, 3, 4, 11, 21, 55, 30, 36, 37, 50, 51, 53, 59, 61, 67]; // Actualizá estos IDs según tus productos recientes

  const collaresNuevos = (Array.isArray(products) ? products : [])
    .filter(p => idsElegidos.includes(p.id))
    .sort((a, b) => idsElegidos.indexOf(a.id) - idsElegidos.indexOf(b.id));

  const handleDiscoverCollection = () => {
    setSelectedCategory("Collares");
    const section = document.getElementById("productos-seccion");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#FFF0EB] py-14 px-6 font-sans antialiased border-b border-pink-100">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* BANNER DE INTRODUCCIÓN (Columna Izquierda - Con más color) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-[270px] pr-0 lg:pr-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-pink-600 uppercase flex items-center gap-1">
                ✦ PRIMAVERA
              </span>
              <h3 className="text-2xl font-light tracking-[0.05em] text-gray-800 uppercase mt-2 leading-snug">
                viene primavera <br />
                <span className="font-semibold text-pink-500 italic">y monna lo sabe...</span>
              </h3>
              <p className="text-[11.5px] text-gray-600 font-light mt-3 leading-relaxed">
                Coming soon...
              </p>
            </div>
            
            <div className="flex items-center justify-between lg:justify-start lg:gap-5 mt-4">
              <button 
                onClick={handleDiscoverCollection}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-600 hover:text-pink-700 transition-colors border-b-2 border-pink-300 pb-0.5"
              >
                Ver todo
              </button>

              {/* Flechas de Navegación Estilizadas en Oro/Rosa */}
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 hover:bg-gradient-to-r hover:from-pink-400 hover:to-orange-300 hover:text-white hover:border-transparent transition-all duration-300 shadow-xs active:scale-95"
                  aria-label="Deslizar izquierda"
                >
                  <span className="text-sm font-bold">←</span>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 hover:bg-gradient-to-r hover:from-pink-400 hover:to-orange-300 hover:text-white hover:border-transparent transition-all duration-300 shadow-xs active:scale-95"
                  aria-label="Deslizar derecha"
                >
                  <span className="text-sm font-bold">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* CONTENEDOR DESLIZABLE DE PRODUCTOS (Columna Derecha) */}
          <div className="lg:col-span-9 relative">
            {collaresNuevos.length === 0 ? (
              <div className="py-12 text-center text-xs text-pink-400 font-light bg-white rounded-2xl border border-pink-100">
                Cargando tus próximos favoritos... 🌸
              </div>
            ) : (
              <div 
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin" }}
              >
                {collaresNuevos.map((producto) => (
                  <div 
                    key={producto.id} 
                    className="min-w-[210px] sm:min-w-[230px] flex-shrink-0 snap-start bg-white p-4 rounded-2xl border border-pink-200/30 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_24px_rgba(244,160,144,0.12)] hover:-translate-y-0.5"
                  >
                    {/* Contenedor de Imagen con fondo rosa sutil */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#FFF6F3] mb-4 border border-pink-50">
                      {producto.imagen ? (
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          fill
                          sizes="200px"
                          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-pink-300 text-xs">✦</div>
                      )}
                    </div>

                    {/* Info de Joyería y botón de acción */}
                    <div className="flex flex-col">
                      <h4 className="text-[11px] font-light tracking-wide text-gray-800 truncate">
                        {producto.nombre}
                      </h4>
                      <span className="text-xs font-semibold text-pink-600 mt-1 mb-3">
                        ${producto.precio.toLocaleString("es-AR")}
                      </span>
                      
                      <button
                        onClick={() => addToCart(producto)}
                        className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-pink-400 to-orange-300 rounded-lg transition-all duration-300 hover:opacity-90 shadow-sm active:scale-95"
                      >
                        Añadir ✦
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
// ==========================================
// 3.6. SECCIÓN COLECCIÓN MARINA
// ==========================================
function NewArrivalsMarina() {
  const { addToCart, setSelectedCategory } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // IDs asignados para la colección marina
  const idsElegidos = [5, 6, 7, 8, 9, 52, 62, 63, 65, 66, 67, 26, 27];

  const productosMarina = (Array.isArray(products) ? products : [])
    .filter(p => idsElegidos.includes(p.id))
    .sort((a, b) => idsElegidos.indexOf(a.id) - idsElegidos.indexOf(b.id));

  const handleDiscoverCollection = () => {
    setSelectedCategory("Marina");
    const section = document.getElementById("productos-seccion");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      const targetScroll = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
   
    <section className="bg-[#EBF7F9] py-14 px-6 font-sans antialiased border-b border-cyan-100">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Bloque Izquierdo: Título y Navegación */}
          <div className="lg:col-span-3 flex flex-col justify-between h-[270px] pr-0 lg:pr-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-cyan-600 uppercase flex items-center gap-1">
                🌊 COLECCIÓN MARINA
              </span>
              <h3 className="text-2xl font-light tracking-[0.05em] text-gray-800 uppercase mt-2 leading-snug">
                brisa de verano <br />
                <span className="font-semibold text-cyan-600 italic">en cada detalle...</span>
              </h3>
              <p className="text-[11.5px] text-gray-600 font-light mt-3 leading-relaxed">
                Caracoles, perlas y tonos marinos pensados para resaltar tus días bajo el sol.
              </p>
            </div>
            
            <div className="flex items-center justify-between lg:justify-start lg:gap-5 mt-4">
              <button 
                onClick={handleDiscoverCollection}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 hover:text-cyan-700 transition-colors border-b-2 border-cyan-300 pb-0.5 cursor-pointer"
              >
                Ver colección
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200 bg-white text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-300 hover:text-white hover:border-transparent transition-all duration-300 shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Deslizar izquierda"
                >
                  <span className="text-sm font-bold">←</span>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200 bg-white text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-300 hover:text-white hover:border-transparent transition-all duration-300 shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Deslizar derecha"
                >
                  <span className="text-sm font-bold">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bloque Derecho: Carousel de Productos */}
          <div className="lg:col-span-9 relative">
            {productosMarina.length === 0 ? (
              <div className="py-12 text-center text-xs text-cyan-500 font-light bg-white rounded-2xl border border-cyan-100">
                Sumergiéndonos en la nueva colección... 🌊
              </div>
            ) : (
              <div 
                ref={scrollContainerRef}
                className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin" }}
              >
                {productosMarina.map((producto) => (
                  <div 
                    key={producto.id} 
                    className="min-w-[210px] sm:min-w-[230px] flex-shrink-0 snap-start bg-white p-4 rounded-2xl border border-cyan-200/30 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_24px_rgba(165,224,233,0.2)] hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F0F9FA] mb-4 border border-cyan-50">
                      {producto.imagen ? (
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          fill
                          sizes="200px"
                          className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cyan-300 text-xs">🌊</div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="text-[11px] font-light tracking-wide text-gray-800 truncate">
                        {producto.nombre}
                      </h4>
                      <span className="text-xs font-semibold text-cyan-600 mt-1 mb-3">
                        ${producto.precio.toLocaleString("es-AR")}
                      </span>
                      
                      <button
                        onClick={() => addToCart(producto)}
                        className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-gradient-to-r from-cyan-400 to-teal-300 rounded-lg transition-all duration-300 hover:opacity-90 shadow-sm active:scale-95 cursor-pointer"
                      >
                        Añadir 🌊
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. TARJETA DE PRODUCTO REDISEÑADA (PREMIUM CON LIVE-ZOOM)
// ==========================================
function LocalProductCard({ producto }: { producto: Product }) {
  const { addToCart } = useCart();
  // Estado simple que vive ÚNICAMENTE dentro de esta tarjeta
  const [isZoomed, setIsZoomed] = React.useState(false);

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-white p-4 shadow-xs border border-orange-100/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md font-sans">
        
        {/* Badge de "Nuevo" Estilizado */}
        {producto.nuevo && (
          <span className="absolute left-6 top-6 z-20 rounded-full bg-white/80 backdrop-blur-xs px-3 py-1 text-[9px] font-medium tracking-[0.15em] text-orange-500 uppercase shadow-2xs border border-orange-100/50">
            Nuevo ✨
          </span>
        )}

        {/* Contenedor de Imagen (Al hacer clic, activa el modo zoom elegante) */}
        <div 
          onClick={() => producto.imagen && setIsZoomed(true)}
          className="relative mb-4 aspect-square w-full overflow-hidden rounded-2xl bg-[#FFFDFB] cursor-zoom-in block"
        >
          {producto.imagen ? (
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300 text-lg">🌸</div>
          )}
        </div>

        {/* Información e Interacción */}
        <div className="flex flex-col flex-grow px-1">
          <div className="mb-3 flex-grow">
            <h3 className="text-sm font-light tracking-wide text-gray-800 transition-colors duration-300 group-hover:text-pink-500 line-clamp-2 min-h-[2.5rem] leading-snug">
              {producto.nombre}
            </h3>
            <span className="text-base font-normal tracking-wide text-gray-900 block mt-1">
              ${producto.precio.toLocaleString("es-AR")}
            </span>
          </div>

          <button
            onClick={() => addToCart(producto)}
            className="relative flex w-full items-center justify-center gap-1.5 rounded-xl border border-pink-100/60 bg-[#FFFDFB] py-2.5 text-xs font-light tracking-widest text-pink-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white hover:border-transparent active:scale-98"
          >
            <span>Comprar</span>
            <span className="text-xs transition-transform duration-300 group-hover:rotate-12"> ✨</span>
          </button>
        </div>
      </div>

      {/* VISTA EN DETALLE (MODAL FLOTANTE ULTRA PREMIUM) */}
      {isZoomed && producto.imagen && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-opacity duration-300 cursor-zoom-out"
        >
          {/* Botón flotante para cerrar */}
          <button 
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl font-light tracking-wide backdrop-blur-md transition hover:bg-white/20 hover:text-pink-300"
          >
            ✕
          </button>
          
          {/* Imagen expandida con marco estético sutil */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-3xl bg-white p-2 shadow-2xl transition-all duration-300 border border-white/20 animate-in fade-in zoom-in-95"
          >
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 px-4 py-2 text-center backdrop-blur-xs shadow-xs border border-orange-50/40">
              <p className="text-xs font-light tracking-widest text-gray-800 uppercase">{producto.nombre}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// 5. SECCIÓN DE PREGUNTAS FRECUENTES
// ==========================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿De qué materiales son los accesorios?",
      a: "Por ahora unicamente acero quirúrgico."
    },
    {
      q: "¿Cómo se realizan los envíos?",
      a: "En cuanto a envio se charla al confirmar la compra para ofrecerte la opcion mas comoda para vos, hacemos envios con un costo agregado o tambien tenemos puntos de retiro gratuitos."
    },
    {
      q: "¿Cuáles son los medios de pago aceptados?",
      a: "Transferencia bancaria."
    },
    {
      q: "¿Cómo debo cuidar mis accesorios para que no pierdan brillo?",
      a: "Te recomendamos evitar el contacto directo con perfumes, cremas o líquidos corrosivos. Guardalos siempre de forma individual en lugares secos lejos de la humedad para mantener su brillo intacto por años. "
    }
  ];

  return (
    <>
      
      {/* 2. SECCIÓN PREGUNTAS FRECUENTES (ABAJO) */}
      <section className="mx-auto max-w-2xl px-6 pb-20 mt-8 font-sans">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light tracking-widest text-gray-800 uppercase">Preguntas frecuentes</h2>
          <p className="mt-1.5 text-xs font-light tracking-wide text-gray-400">Todo lo que necesitas saber antes de comprar</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="overflow-hidden rounded-xl border border-orange-50/60 bg-white shadow-xs transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-light tracking-wide text-gray-700 hover:bg-orange-50/20 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-3.5 w-3.5 text-pink-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 border-t border-orange-50/30" : "max-h-0"}`}>
                  <p className="px-5 py-4 text-xs font-light tracking-wide leading-relaxed text-gray-500 bg-[#FFFDFB]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
  

}

// ==========================================
// 6. PANEL LATERAL DE COMPRAS REDISEÑADO PREMIUM (DRAWER)
// ==========================================
function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    const numeroWhatsApp = "5491121690034";
    let mensaje = "¡Hola Monna! Quiero realizar el siguiente pedido:\n\n";
    cart.forEach((item) => {
      mensaje += `• ${item.producto.nombre} (x${item.cantidad}) - $${(item.producto.precio * item.cantidad).toLocaleString("es-AR")}\n`;
    });
    mensaje += `\n*Total estimado:* $${cartTotal.toLocaleString("es-AR")}\n\n`;
    mensaje += "¿Cómo coordinamos el pago y envío? ";
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Fondo oscuro con difuminado suave */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300" 
        onClick={() => setIsCartOpen(false)} 
      />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-[#FFFBF9] shadow-2xl transition-all duration-300 rounded-l-[32px] border-l border-orange-100/40 overflow-hidden">
          <div className="flex h-full flex-col">
            
            {/* Header del Carrito */}
            <div className="flex items-center justify-between border-b border-orange-100/30 px-6 py-5 bg-white">
              <div className="flex items-center gap-2.5">
                <span className="text-base text-pink-500">🛍️</span>
                <h2 className="text-base font-light tracking-[0.15em] text-gray-800 uppercase">
                  Tu Carrito
                </h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="rounded-full p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50/50 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido de Productos */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center pb-12">
                  <span className="mb-3 text-4xl animate-bounce duration-1000">🌸</span>
                  <p className="text-sm font-light tracking-widest text-gray-800 uppercase">Tu carrito está vacío</p>
                  <p className="mt-1 text-xs font-light text-gray-400 max-w-[200px]">¡Recorré la colección y sumá tus accesorios favoritos!</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {cart.map((item) => (
                    <div 
                      key={item.producto.id} 
                      className="group flex gap-4 rounded-2xl border border-orange-100/40 bg-white p-3.5 shadow-xs hover:shadow-md transition-all duration-200"
                    >
                      {/* Imagen Miniatura */}
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-orange-50 bg-[#FFFDFB]">
                        {item.producto.imagen ? (
                          <img 
                            src={item.producto.imagen} 
                            alt={item.producto.nombre} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-xs">🌸</div>
                        )}
                      </div>

                      {/* Información Detallada */}
                      <div className="flex flex-1 flex-col justify-between py-0.5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="line-clamp-1 text-sm font-light tracking-wide text-gray-800">
                              {item.producto.nombre}
                            </h4>
                            <p className="text-[11px] font-light text-gray-400 mt-0.5 tracking-wider">
                              Precio unitario: ${item.producto.precio.toLocaleString("es-AR")}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.producto.id)} 
                            className="text-[11px] font-medium text-gray-400 hover:text-red-400 tracking-wider transition-colors p-1"
                          >
                            Quitar
                          </button>
                        </div>

                        {/* Fila de Total y Selector de cantidad */}
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-normal text-pink-500">
                            ${(item.producto.precio * item.cantidad).toLocaleString("es-AR")}
                          </span>
                          
                          {/* Selector Incremental Estilizado */}
                          <div className="flex items-center rounded-xl border border-orange-100 bg-[#FFFDFB] p-1 shadow-2xs">
                            <button 
                              onClick={() => {
                                if (item.cantidad > 1) {
                                  updateQuantity(item.producto.id, item.cantidad - 1);
                                } else {
                                  removeFromCart(item.producto.id);
                                }
                              }} 
                              className="flex h-6 w-6 items-center justify-center font-light text-gray-400 hover:text-pink-500 rounded-lg hover:bg-pink-50/30 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-light text-gray-700">
                              {item.cantidad}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)} 
                              className="flex h-6 w-6 items-center justify-center font-light text-gray-400 hover:text-pink-500 rounded-lg hover:bg-pink-50/30 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panel de Resumen e Importe Final */}
            {cart.length > 0 && (
              <div className="border-t border-orange-100/40 bg-white px-6 py-6 shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
                <div className="mb-5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-light tracking-widest text-gray-400 uppercase">Subtotal</span>
                    <span className="text-sm font-light text-gray-600">${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-orange-50/50 pt-2.5">
                    <span className="text-xs font-light tracking-[0.15em] text-gray-800 uppercase">Total Estimado</span>
                    <span className="text-xl font-light tracking-wide text-gray-800">${cartTotal.toLocaleString("es-AR")}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckoutWhatsApp} 
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-xs font-light tracking-[0.18em] text-white uppercase shadow-md transition-all duration-300 hover:bg-emerald-600/90 hover:shadow-lg active:scale-99"
                >
                  <span>Completar por WhatsApp</span>
                  <span className="text-sm transition-transform group-hover:scale-110 duration-300">💬</span>
                </button>
                <p className="text-[10px] font-light text-center text-gray-400 mt-3 tracking-wide">
                  Coordinamos los detalles del envío y pago directo con vos
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. FLUJO DE SECCIONES INTERNAS
// ==========================================
function HomeContent() {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useCart();

  const listadoFiltrado = (Array.isArray(products) ? products : []).filter((prod) => {
    const matchesCategory = selectedCategory === "Todos" || 
      (prod.categoria && prod.categoria.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch = prod.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FFF8F4] antialiased font-sans font-light">
      <LocalNavbar />

      <NewHeroMinimal />

      {/* NUEVA SECCIÓN DE COLLARES */}
      <NewArrivalsCollars />
<NewArrivalsMarina /> {/* O <NewArrivalsMarinaV2 /> */}
      <section id="productos-seccion" className="mx-auto max-w-7xl px-6 pb-20 pt-12 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-orange-100/30 pb-5">
          <div>
            <h2 className="text-xl font-light tracking-[0.2em] text-gray-800 uppercase">
              {selectedCategory === "Todos" ? "Colección general" : selectedCategory}
            </h2>
            {searchQuery && (
              <p className="mt-1 text-xs text-gray-400 font-light tracking-wide">
                Buscando por: <span className="text-pink-500">"{searchQuery}"</span>
              </p>
            )}
          </div>

          {(selectedCategory !== "Todos" || searchQuery) && (
            <button
              onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }}
              className="rounded-full border border-pink-100 bg-white px-4 py-1.5 text-[11px] font-light tracking-wider text-pink-500 shadow-xs transition duration-300 hover:bg-pink-50"
            >
              Limpiar filtros ×
            </button>
          )}
        </div>

        {listadoFiltrado.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl mt-10 p-6 border border-orange-100/30 shadow-xs">
            <span className="text-3xl mb-3">🔎</span>
            <p className="text-sm font-light text-gray-700 tracking-wide">No encontramos accesorios con ese filtro</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {listadoFiltrado.map((producto) => (
              <LocalProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}

      
      </section>

      <FAQSection />

      <CartDrawer />

      <Footer />
    </main>
  );
}

// ==========================================
// 8. EXPORTACIÓN PRINCIPAL
// ==========================================
export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}