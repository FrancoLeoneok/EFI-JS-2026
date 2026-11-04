const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export default function Card({ producto, categoria, onAgregarAlCarrito }) {
  const { nombre, precio, imagen_url, descripcion, destacado, en_stock = true } = producto

  return (
    <article className="flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-square bg-stone-100">
        {imagen_url ? (
          <img src={imagen_url} alt={nombre} className="h-full w-full object-cover" />
        ) : (
          <p className="grid h-full place-items-center text-sm text-stone-600">Sin imagen</p>
        )}
        <div className="absolute inset-x-3 top-3 flex flex-wrap justify-between gap-2">
          <span className="rounded-full bg-stone-900/85 px-2.5 py-1 text-xs font-bold uppercase text-white">
            {categoria ?? producto.categoria?.nombre ?? 'Sin categoría'}
          </span>
          {destacado && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950">
              Destacado
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {producto.emprendedor?.nombre && (
          <p className="mb-1 text-xs text-[#2e5134]">{producto.emprendedor.nombre}</p>
        )}
        <h2 className="text-base leading-snug font-semibold text-stone-950">{nombre}</h2>
        {descripcion && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">{descripcion}</p>
        )}
        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3">
            <div>
              <p className="text-xs text-stone-600">{en_stock ? 'Disponible' : 'Sin stock'}</p>
              <p className="text-lg font-bold text-[#b94421]">{formatoPrecio.format(precio)} ARS</p>
            </div>
            <button
              type="button"
              aria-label={`Agregar ${nombre} al carrito`}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#2e5134] px-3 py-2 text-sm font-semibold text-white hover:bg-[#234028] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e5134] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!onAgregarAlCarrito || !en_stock}
              onClick={() => onAgregarAlCarrito(producto)}
            >
              <span aria-hidden="true">+</span>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
