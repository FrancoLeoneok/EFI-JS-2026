export default function Home({ feriantes = [] }) {
  const destacados = feriantes.filter((feriante) => feriante.destacado && feriante.activo !== false)

  return (
    <div className="bg-[#f8f7f5] text-stone-950">
      <section aria-labelledby="titulo-inicio" className="relative isolate overflow-hidden bg-stone-900 text-white">
        <img
          src="/banner-feria.png"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-stone-950/95 to-stone-950/60" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="mb-3 text-sm font-semibold text-[#dfebe0]">Río Cuarto · Tiendas locales</p>
          <h1 id="titulo-inicio" className="text-4xl font-bold tracking-tight sm:text-6xl">Feria Imperio</h1>
          <p className="mt-4 max-w-md text-base text-stone-100 sm:text-lg">
            Conocé a los feriantes de Río Cuarto y descubrí sus creaciones.
          </p>
          <a
            href="#feriantes-destacados"
            className="mt-7 inline-flex rounded-full bg-[#b94421] px-5 py-3 text-sm font-semibold text-white hover:bg-[#983719] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Ver feriantes destacados
          </a>
        </div>
      </section>

      <section id="feriantes-destacados" aria-labelledby="titulo-destacados" className="mx-auto max-w-7xl scroll-mt-6 px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-2 inline-block rounded-full bg-[#dfebe0] px-3 py-1 text-xs font-semibold text-[#2e5134]">Catálogo de la feria</p>
        <h2 id="titulo-destacados" className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">Feriantes destacados</h2>
        {destacados.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destacados.map((feriante) => (
              <li key={feriante.id}>
                <article className="h-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-4">
                    {feriante.logo_url && (
                      <img src={feriante.logo_url} alt="" loading="lazy" className="size-16 shrink-0 rounded-xl object-cover" />
                    )}
                    <h3 className="text-lg font-semibold">{feriante.nombre_fantasia}</h3>
                  </div>
                  {feriante.descripcion_bio && <p className="mt-3 text-sm leading-relaxed text-stone-600">{feriante.descripcion_bio}</p>}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-600">Todavía no hay feriantes destacados.</p>
        )}
      </section>
    </div>
  )
}
