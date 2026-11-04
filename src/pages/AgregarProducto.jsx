import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import { useApi } from '../useApi'
import { useCart } from '../context/CartContext'
import { puestosPermitidos } from '../puestos'

const initialForm = { nombre: '', descripcion: '', imagen_url: '', precio: '', categoria_id: '', emprendedor_id: '', en_stock: true }

const field = 'block w-full rounded-lg border border-stone-300 bg-white p-3'
const button = 'rounded-lg bg-[#2e5134] px-4 py-2 font-semibold text-white disabled:opacity-50'

export function EditarProducto() {
  const { id } = useParams()
  const { data, loading, error } = useApi('/productos/' + encodeURIComponent(id))
  if (loading) return <p className="p-6" role="status">Cargando producto…</p>
  if (error || !data) return <p className="p-6" role="alert">{error || 'Producto no encontrado.'}</p>
  return <AgregarProducto key={data.id} producto={data} />
}

export default function AgregarProducto({ producto }) {
  const navigate = useNavigate()
  const categories = useApi('/categorias/?size=100')
  const sellers = useApi('/emprendedores/?size=100')
  const { quitarDelCarrito } = useCart()
  const [values, setValues] = useState(() => producto ? {
    nombre: producto.nombre,
    descripcion: producto.descripcion ?? '',
    imagen_url: producto.imagen_url ?? '',
    precio: String(producto.precio),
    categoria_id: String(producto.categoria_id),
    emprendedor_id: String(producto.emprendedor_id),
    en_stock: producto.en_stock ?? true,
  } : initialForm)
  const bind = (name) => ({ name, value: values[name], onChange: (event) => setValues({ ...values, [name]: event.target.value }) })
  const [created, setCreated] = useState([])
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const [failedPhoto, setFailedPhoto] = useState('')
  const imagen_url = values.imagen_url.trim()
  const fotoSinCambios = Boolean(producto) && imagen_url === (producto.imagen_url ?? '')
  const validPhotoUrl = !imagen_url || (imagen_url.length <= 255 && /^https:\/\//i.test(imagen_url) && URL.canParse(imagen_url))
  const fotoInvalida = !fotoSinCambios && (!validPhotoUrl || Boolean(imagen_url && failedPhoto === imagen_url))

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy || fotoInvalida) return
    const nombre = values.nombre.trim()
    const precio = Number(values.precio)
    const categoria_id = Number(values.categoria_id)
    const emprendedor_id = Number(values.emprendedor_id)
    if (!nombre || nombre.length > 150 || !values.precio || !Number.isFinite(precio) || precio < 0 ||
        !Number.isInteger(categoria_id) || categoria_id < 1 || !Number.isInteger(emprendedor_id) || emprendedor_id < 1) {
      setNotice({ error: 'Completá el nombre, precio, categoría y puesto con valores válidos.' })
      return
    }
    if (producto && !window.confirm('¿Guardar los cambios del producto?')) return
    setBusy(true)
    setNotice(null)
    try {
      const product = await api(producto ? '/productos/' + producto.id : '/productos/', {
        method: producto ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, precio, categoria_id, emprendedor_id, descripcion: values.descripcion.trim() || null, en_stock: values.en_stock, imagen_url: fotoSinCambios ? undefined : imagen_url || null }),
      })
      if (producto) {
        navigate('/products/' + producto.id, { replace: true })
      } else {
        setCreated((current) => [...current, product])
        setNotice({ message: 'Producto publicado.' })
        setValues(initialForm)
        setFailedPhoto('')
      }
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
      <h1 className="text-3xl font-bold">{producto ? 'Editar producto' : 'Agregar producto'}</h1>
      {producto ? <Link className="underline" to={'/products/' + producto.id}>Volver al detalle</Link>
        : <p>Elegí una categoría y un puesto para publicar en el catálogo.</p>}
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
                ?.filter(({ activo, id }) => activo && puestosPermitidos.includes(id))
                .map(({ id, nombre_fantasia }) => <option key={id} value={id}>{nombre_fantasia}</option>)}
            </select>
          </label>
          <label className="block"><input type="checkbox" name="en_stock" checked={values.en_stock} onChange={(event) => setValues({ ...values, en_stock: event.target.checked })} /> Disponible</label>
          <div className="space-y-2">
            <label htmlFor="foto-producto" className="block">URL de la foto (opcional)</label>
            <input id="foto-producto" type="url" {...bind('imagen_url')} onChange={(event) => { setFailedPhoto(''); bind('imagen_url').onChange(event) }} maxLength={255}
              placeholder="https://i.ibb.co/…" aria-describedby="foto-ayuda" className={field} />
            <p id="foto-ayuda" className="text-sm text-stone-600">Pegá el enlace directo a la imagen de ImgBB.</p>
            {!validPhotoUrl && <p role="alert" className="text-sm text-red-800">Ingresá una URL válida que empiece con https://.</p>}
            {imagen_url && validPhotoUrl && (failedPhoto === imagen_url ? (
              <p role="alert" className="text-sm text-red-800">No se pudo mostrar la foto. Revisá el enlace directo.</p>
            ) : (
              <img key={imagen_url} src={imagen_url} alt="Vista previa de la foto del producto"
                onError={() => setFailedPhoto(imagen_url)} className="aspect-square w-40 rounded-lg bg-stone-100 object-contain" />
            ))}
          </div>
          <button type="submit" className={button} disabled={busy || fotoInvalida}>
            {busy ? 'Procesando…' : producto ? 'Guardar cambios' : 'Guardar producto'}
          </button>
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
