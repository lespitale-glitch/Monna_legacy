import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-52 -left-40 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl"></div>

      <div className="absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-pink-200/30 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 py-24 lg:grid-cols-2">
        <div className="max-w-xl">
          <span className="rounded-full bg-gradient-to-r from-orange-100 to-pink-100 px-5 py-2 text-sm font-semibold text-pink-600 shadow-sm">
            ✨ Nueva colección 2026
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-gray-900">
            Para que te veas
            <span className="block bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              monísima
            </span>
          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-600">
            Descubrí accesorios delicados, modernos y únicos para acompañarte
            todos los días.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-105">
              Comprar ahora
            </button>

            <button className="rounded-full border border-orange-200 bg-white px-8 py-4 font-semibold hover:bg-orange-50">
              Ver catálogo
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[40px] shadow-2xl">
            <Image
              src="/hero/hero.jpg"
              alt="Hero Monna"
              width={700}
              height={900}
              className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}