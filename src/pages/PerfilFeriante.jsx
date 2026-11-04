import { useState } from 'react'
import CabeceraPuesto from '../components/CabeceraPuesto'
import Card from '../components/Card'

export default function PerfilFeriante({ feriante, findeConfirmado, onAgregarAlCarrito }) {
  const [busqueda, setBusqueda] = useState('')
  const textoBuscado = busqueda.trim().toLocaleLowerCase('es-AR')
  const creaciones = (feriante.productos ?? []).filter(
    (producto) =>
      producto.activo !== false &&
      producto.nombre.toLocaleLowerCase('es-AR').includes(textoBuscado),
  )

  return (
    <div className="bg-[#f8f7f5] px-4 py-6 text-stone-950 sm:px-8 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <CabeceraPuesto feriante={feriante} findeConfirmado={findeConfirmado} />

        <section className="mt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 w-fit rounded-full bg-[#dfebe0] px-3 py-1 text-xs font-semibold text-[#2e5134]">
                Catálogo del puesto
              </p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Creaciones de {feriante.nombre_fantasia}</h2>
              <p className="mt-1 text-sm text-stone-600" role="status">
                {creaciones.length} {creaciones.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </p>
            </div>
            <label className="w-full sm:w-72">
              <span className="sr-only">Buscar en este puesto</span>
              <input
                className="w-full rounded-full bg-stone-100 px-4 py-2.5 text-sm placeholder:text-stone-600 focus-visible:outline-2 focus-visible:outline-[#2e5134]"
                type="search"
                placeholder="Buscar en este puesto…"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
              />
            </label>
          </div>

          {creaciones.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {creaciones.map((producto) => (
                <li key={producto.id} className="flex">
                  <Card producto={producto} onAgregarAlCarrito={onAgregarAlCarrito} mostrarDetalle />
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron creaciones.</p>
          )}
        </section>
      </div>
    </div>
  )
}
