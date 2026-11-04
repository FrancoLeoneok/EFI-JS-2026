export default function CabeceraPuesto({ feriante, findeConfirmado = false }) {
  const { nombre_fantasia, logo_url, descripcion_bio, numero_puesto, rubro, feria, usuario } =
    feriante

  return (
    <header className="rounded-3xl border border-stone-200 bg-white p-5 shadow-lg sm:p-8">
      <div className="flex flex-wrap items-center gap-5">
        {logo_url && (
          <img src={logo_url} alt="" width={112} height={112} className="size-20 rounded-2xl border-4 border-white object-cover shadow-md sm:size-28" />
        )}
        <div>
          <div className="mb-2 flex flex-wrap gap-2 text-xs font-semibold">
            {rubro?.nombre && <p className="rounded-full bg-[#f3e1da] px-3 py-1 uppercase text-[#a63b19]">{rubro.nombre}</p>}
            <p className={findeConfirmado ? 'rounded-full bg-[#dfebe0] px-3 py-1 text-[#2e5134]' : 'rounded-full bg-stone-100 px-3 py-1 text-stone-600'}>
              {findeConfirmado ? 'Finde confirmado' : 'Finde sin confirmar'}
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-950 sm:text-5xl">{nombre_fantasia}</h1>
          {usuario?.nombre_completo && <p className="mt-1 font-medium text-[#b94421]">Artesano responsable: {usuario.nombre_completo}</p>}
        </div>
      </div>

      <div className="mt-6 grid gap-5 border-t border-stone-200 pt-6 sm:grid-cols-3">
        <section className="sm:col-span-2">
          <h2 className="mb-2 text-sm font-semibold uppercase text-stone-600">Sobre el emprendimiento</h2>
          <p>{descripcion_bio || 'Sin descripción disponible.'}</p>
        </section>

        <section className="rounded-2xl border border-stone-100 bg-[#f8f7f5] p-4 text-sm">
          <h2 className="mb-2 font-semibold uppercase text-stone-600">Ubicación del puesto en feria</h2>
          <p className="font-semibold">{feria?.nombre ?? 'Feria sin asignar'}</p>
          {numero_puesto && <p className="text-stone-600">Puesto {numero_puesto}</p>}
          {feria?.ubicacion && <p className="text-stone-600">{feria.ubicacion}</p>}
        </section>
      </div>
    </header>
  )
}
