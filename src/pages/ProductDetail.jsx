import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import Card from '../components/Card'
import { useCart } from '../context/CartContext'
import { useApi } from '../useApi'

const control = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e5134]'

function tabClass({ isActive }) {
  return control + (isActive ? ' bg-[#2e5134] text-white' : ' text-stone-700 hover:bg-white hover:text-[#2e5134]')
}

export default function ProductDetail() {
  const { id } = useParams()
  const { agregarAlCarrito } = useCart()
  const { data: product, loading, error } = useApi('/productos/' + encodeURIComponent(id))
  return (
    <section className="mx-auto max-w-5xl space-y-4 p-6">
      <div>
        <Link to="/products" className={control + ' border border-stone-200 bg-white text-stone-700 hover:bg-stone-100'}>
          <span aria-hidden="true">←</span> Volver al catálogo
        </Link>
      </div>
      {loading && <p role="status">Cargando producto…</p>}
      {error && <p role="alert">{error}</p>}
      {product && <>
        <Card producto={{ ...product, en_stock: product.en_stock ?? Number(product.stock) > 0 }} onAgregarAlCarrito={agregarAlCarrito} />
        {product.emprendedor_id && (
          <div>
            <Link className={control + ' border border-[#2e5134]/25 bg-[#dfebe0] text-[#2e5134] hover:bg-[#cddfce]'} to={'/feriantes/' + product.emprendedor_id}>
              Ver puesto <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
        <nav aria-label="Detalle del producto" className="flex w-fit flex-wrap gap-1 rounded-2xl border border-stone-200 bg-stone-100 p-1">
          <NavLink className={tabClass} to="." end>Descripción</NavLink>
          <NavLink className={tabClass} to="opiniones">Opiniones</NavLink>
        </nav>
        <Outlet context={{ product }} />
      </>}
    </section>
  )
}
