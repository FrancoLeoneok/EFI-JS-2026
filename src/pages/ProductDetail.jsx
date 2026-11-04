import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import Card from '../components/Card'
import { useCart } from '../context/CartContext'
import { useApi } from '../useApi'

export default function ProductDetail() {
  const { id } = useParams()
  const { agregarAlCarrito } = useCart()
  const { data: product, loading, error } = useApi('/productos/' + encodeURIComponent(id))
  return (
    <section className="mx-auto max-w-5xl space-y-4 p-6">
      <Link to="/products" className="underline">Volver al catálogo</Link>
      {loading && <p role="status">Cargando producto…</p>}
      {error && <p role="alert">{error}</p>}
      {product && <>
        <Card producto={{ ...product, en_stock: product.en_stock ?? Number(product.stock) > 0 }} onAgregarAlCarrito={agregarAlCarrito} />
        {product.emprendedor_id && <Link className="block underline" to={'/feriantes/' + product.emprendedor_id}>Ver puesto</Link>}
        <nav aria-label="Detalle del producto" className="flex gap-4 underline">
          <NavLink to="." end>Descripción</NavLink>
          <NavLink to="opiniones">Opiniones</NavLink>
        </nav>
        <Outlet context={{ product }} />
      </>}
    </section>
  )
}
