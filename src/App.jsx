import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import AgregarProducto from './pages/AgregarProducto'
import ProductsDescription from './components/ProductsDescription'
import { useCart } from './context/CartContext'
import { useUser } from './context/UserContext'
import Puesto from './pages/Puesto'

function Cart() {
  const { productos, quitarDelCarrito } = useCart()
  return (
    <section className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Carrito</h1>
      {productos.length === 0 && <p>Tu carrito está vacío.</p>}
      <ul className="space-y-3">
        {productos.map(({ producto, cantidad }) => (
          <li key={producto.id} className="flex flex-wrap items-center justify-between gap-3 rounded border p-3">
            <Link to={'/products/' + producto.id}>{producto.nombre}</Link>
            <span>{cantidad} × ${producto.precio}</span>
            <button type="button" onClick={() => quitarDelCarrito(producto.id)} className="underline">Quitar</button>
          </li>
        ))}
      </ul>
      <Link to="/products" className="mt-5 inline-block underline">Ver catálogo</Link>
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
            <Route index element={<ProductsDescription />} />
          </Route>
          <Route path="feriantes/:id" element={<Puesto />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="agregar-producto" element={vistaAdmin ? <AgregarProducto /> : <Navigate to="/products" replace />} />
          <Route path="*" element={<p className="p-6">Página no encontrada. <Link to="/" className="underline">Volver al inicio</Link></p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
