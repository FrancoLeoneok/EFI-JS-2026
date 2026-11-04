import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export default function Card({ producto, categoria, onAgregarAlCarrito, mostrarDetalle = false }) {
  const { nombre, precio, imagen_url, descripcion, destacado, en_stock = true } = producto
  const { vistaAdmin } = useUser()
  const { quitarDelCarrito } = useCart()
  const navigate = useNavigate()
  const [eliminando, setEliminando] = useState(false)
  const [eliminado, setEliminado] = useState(false)
  const [error, setError] = useState('')

  async function eliminarProducto() {
    if (!vistaAdmin || eliminando || !window.confirm('¿Eliminar del catálogo «' + nombre + '»?')) return
    setEliminando(true)
    setError('')
    try {
      await api('/productos/' + producto.id, { method: 'DELETE' })
      quitarDelCarrito(producto.id)
      setEliminado(true)
      if (!mostrarDetalle) navigate('/products', { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setEliminando(false)
    }
  }

  if (eliminado) return null

  return (
    <article className="flex w-full max-w-xs flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-square bg-stone-100">
        <p className="absolute inset-0 grid place-items-center text-sm text-stone-600">Sin imagen</p>
        {imagen_url && (
          <img key={imagen_url} src={imagen_url} alt={nombre}
            onError={(event) => { event.currentTarget.hidden = true }}
            className="absolute inset-0 h-full w-full bg-stone-100 object-contain" />
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
        {producto.emprendedor?.nombre_fantasia && (
          <p className="mb-1 text-xs text-[#2e5134]">{producto.emprendedor.nombre_fantasia}</p>
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
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#2e5134] px-4 py-2 text-sm font-semibold text-white transition-colors enabled:hover:bg-[#234028] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e5134] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!onAgregarAlCarrito || !en_stock}
              onClick={() => onAgregarAlCarrito(producto)}
            >
              <span aria-hidden="true">+</span>
              Agregar
            </button>
          </div>
          {mostrarDetalle && (
            <Link
              to={'/products/' + producto.id}
              aria-label={'Ver detalle de ' + nombre}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#2e5134]/25 bg-[#dfebe0] px-4 text-sm font-semibold text-[#2e5134] transition-colors hover:bg-[#cddfce] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e5134]"
            >
              Ver detalle <span aria-hidden="true">→</span>
            </Link>
          )}
          {vistaAdmin && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-stone-100 pt-3">
              <Link to={'/products/' + producto.id + '/editar'} aria-label={'Editar ' + nombre}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 px-3 text-sm font-semibold text-stone-700 hover:bg-stone-100">
                <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="m14 5 5 5M4 20l5-1L21 7l-5-5L4 14z" />
                </svg>
                Editar
              </Link>
              <button type="button" disabled={eliminando} onClick={eliminarProducto} aria-label={'Eliminar ' + nombre}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-semibold text-red-800 enabled:hover:bg-red-50 disabled:opacity-50">
                <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7" />
                </svg>
                {eliminando ? 'Eliminando…' : 'Eliminar'}
              </button>
            </div>
          )}
          {error && <p role="alert" className="mt-2 text-sm text-red-800">{error}</p>}
        </div>
      </div>
    </article>
  )
}
