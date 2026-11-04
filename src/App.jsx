import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import AgregarProducto, { EditarProducto } from './pages/AgregarProducto'
import ProductsDescription from './components/ProductsDescription'
import { useCart } from './context/CartContext'
import { useUser } from './context/UserContext'
import Puesto from './pages/Puesto'

const precioCarrito = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' })

function Cart() {
  const { productos, quitarDelCarrito } = useCart()
  return (
    <section className="mx-auto max-w-4xl p-6">
      <h1 className="mb-5 text-3xl font-bold text-stone-900">Carrito</h1>
      {productos.length === 0 && <p className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-stone-600">Tu carrito está vacío.</p>}
      <ul className="space-y-3">
        {productos.map(({ producto, cantidad }) => (
          <li key={producto.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
            <Link to={'/products/' + producto.id} className="w-full font-semibold text-stone-900 hover:text-[#2e5134] hover:underline sm:w-auto sm:flex-1">
              {producto.nombre}
            </Link>
            <span className="mr-auto text-sm tabular-nums text-stone-600 sm:mr-0">{cantidad} × {precioCarrito.format(producto.precio)}</span>
            <button type="button" aria-label={'Quitar ' + producto.nombre + ' del carrito'} onClick={() => quitarDelCarrito(producto.id)}
              className="min-h-11 rounded-xl px-3 text-sm font-semibold text-red-800 hover:bg-red-50 focus-visible:outline-2">
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <Link to="/products" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#dfebe0] px-4 text-sm font-semibold text-[#2e5134] hover:bg-[#cddfce] focus-visible:outline-2">
        <span aria-hidden="true">←</span> Ver catálogo
      </Link>
    </section>
  )
}

export default function App() {
  const { cantidadTotal } = useCart()
  const { vistaAdmin } = useUser()
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar cartCount={cantidadTotal} />
      <main className="grow">
        <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />}>
            <Route index element={<Navigate to="descripcion" replace />} />
            <Route path="descripcion" element={<ProductsDescription />} />
          </Route>
          <Route path="feriantes/:id" element={<Puesto />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="agregar-producto" element={vistaAdmin ? <AgregarProducto /> : <Navigate to="/products" replace />} />
          <Route path="products/:id/editar" element={vistaAdmin ? <EditarProducto /> : <Navigate to="/products" replace />} />
          <Route path="*" element={<p className="p-6">Página no encontrada. <Link to="/" className="underline">Volver al inicio</Link></p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
