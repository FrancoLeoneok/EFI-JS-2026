import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useApi } from '../useApi'
import { useCart } from '../context/CartContext'

const initialForm = { nombre: '', descripcion: '', precio: '', categoria_id: '', emprendedor_id: '', en_stock: true }
const puestosPermitidos = new Set(['Mates El Imperio', 'Cerámicas del Sur'])

const field = 'block w-full rounded-lg border border-stone-300 bg-white p-3'
const button = 'rounded-lg bg-[#2e5134] px-4 py-2 font-semibold text-white disabled:opacity-50'

export default function AgregarProducto() {
  const categories = useApi('/categorias/?size=100')
  const sellers = useApi('/emprendedores/?size=100')
  const { quitarDelCarrito } = useCart()
  const [values, setValues] = useState(initialForm)
  const bind = (name) => ({ name, value: values[name], onChange: (event) => setValues({ ...values, [name]: event.target.value }) })
  const [created, setCreated] = useState([])
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return
    const nombre = values.nombre.trim()
    const precio = Number(values.precio)
    const categoria_id = Number(values.categoria_id)
    const emprendedor_id = Number(values.emprendedor_id)
    if (!nombre || nombre.length > 150 || !values.precio || !Number.isFinite(precio) || precio < 0 ||
        !Number.isInteger(categoria_id) || categoria_id < 1 || !Number.isInteger(emprendedor_id) || emprendedor_id < 1) {
      setNotice({ error: 'Completá el nombre, precio, categoría y puesto con valores válidos.' })
      return
    }
    setBusy(true)
    setNotice(null)
    try {
      const product = await api('/productos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio, categoria_id, emprendedor_id, descripcion: values.descripcion.trim() || null, en_stock: values.en_stock }),
      })
      setCreated((current) => [...current, product])
      setNotice({ message: 'Producto publicado.' })
      setValues(initialForm)
    } catch (error) {
      setNotice({ error: error.message })
    } finally {
      setBusy(false)
    }
  }

  async function remove(product) {
    if (busy || !window.confirm('¿Eliminar del catálogo «' + product.nombre + '»?')) return
    setBusy(true)
    setNotice(null)
    try {
      await api('/productos/' + product.id, { method: 'DELETE' })
      setCreated((current) => current.filter(({ id }) => id !== product.id))
      quitarDelCarrito(product.id)
      setNotice({ message: 'Producto eliminado.' })
    } catch (error) {
      setNotice({ error: error.message })
    } finally {
      setBusy(false)
    }
  }

  const loading = categories.loading || sellers.loading
  const error = categories.error || sellers.error

  return (
    <section className="mx-auto max-w-xl space-y-5 p-6">
      <h1 className="text-3xl font-bold">Agregar producto</h1>
      <p>Elegí una categoría y un puesto para publicar en el catálogo.</p>
      {loading && <p role="status">Cargando categorías y puestos…</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
          <label className="block">Nombre <input className={field} {...bind('nombre')} required maxLength={150} /></label>
          <label className="block">Descripción <textarea className={field} {...bind('descripcion')} maxLength={500} /></label>
          <label className="block">Precio (ARS) <input className={field} {...bind('precio')} type="number" min="0" step="0.01" required /></label>
          <label className="block">Categoría
            <select className={field} {...bind('categoria_id')} required>
              <option value="" disabled>Elegí una categoría</option>
              {categories.data?.items?.filter((item) => item.activo).map(({ id, nombre }) => <option key={id} value={id}>{nombre}</option>)}
            </select>
          </label>
          <label className="block">Puesto
            <select className={field} {...bind('emprendedor_id')} required>
              <option value="" disabled>Elegí un puesto</option>
              {sellers.data?.items
                ?.filter(({ activo, nombre_fantasia }) => activo && puestosPermitidos.has(nombre_fantasia))
                .map(({ id, nombre_fantasia }) => <option key={id} value={id}>{nombre_fantasia}</option>)}
            </select>
          </label>
          <label className="block"><input type="checkbox" name="en_stock" checked={values.en_stock} onChange={(event) => setValues({ ...values, en_stock: event.target.checked })} /> Disponible</label>
          <button type="submit" className={button} disabled={busy}>Guardar producto</button>
        </form>
      )}
      {notice && <p role={notice.error ? 'alert' : 'status'}>{notice.error || notice.message}</p>}
      {created.length > 0 && (
        <section>
          <h2 className="mb-2 text-xl font-semibold">Productos publicados en esta pantalla</h2>
          <ul className="space-y-2">
            {created.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-4 rounded border p-3">
                <Link className="underline" to={'/products/' + product.id}>{product.nombre}</Link>
                <button type="button" className="text-red-800 underline disabled:opacity-50" disabled={busy} onClick={() => remove(product)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}
