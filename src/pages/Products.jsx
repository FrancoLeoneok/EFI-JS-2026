import { Link, useSearchParams } from 'react-router-dom'
import { api, items } from '../api'
import { puestosCatalogo, puestosPermitidos } from '../puestos'
import { useApi } from '../useApi'
import { useCart } from '../context/CartContext'
import Card from '../components/Card'

const pageSize = 50

async function loadCatalog(path, options) {
  const query = new URLSearchParams(path.split('?')[1])
  const selectedSeller = Number(query.get('emprendedor_id'))
  const sellerIds = puestosPermitidos.includes(selectedSeller) ? [selectedSeller] : puestosPermitidos
  const productsBySeller = await Promise.all(sellerIds.map(async (id) => {
    const sellerQuery = new URLSearchParams(query)
    sellerQuery.set('emprendedor_id', id)
    const sellerPath = '/productos/?' + sellerQuery
    const firstPage = await api(sellerPath, options)
    const products = [...items(firstPage)]
    for (let page = 2; page <= firstPage.pages; page += 1) {
      products.push(...items(await api(sellerPath + '&page=' + page, options)))
    }
    return products.filter((product) => product.emprendedor_id === id && product.activo !== false)
  }))
  return productsBySeller.flat().sort((a, b) => b.id - a.id)
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const { agregarAlCarrito } = useCart()
  const search = params.get('q') ?? ''
  const requestedSeller = Number(params.get('puesto'))
  const seller = puestosPermitidos.includes(requestedSeller) ? String(requestedSeller) : ''
  const requestedPage = Number(params.get('page'))
  const query = new URLSearchParams({ q: search.trim() })
  if (seller) query.set('emprendedor_id', seller)
  const { data, loading, error } = useApi('/productos/?' + query, loadCatalog)
  const { data: categoryData } = useApi('/categorias/?size=100')

  const pages = Math.ceil((data?.length ?? 0) / pageSize)
  const page = Number.isInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, Math.max(pages, 1))
    : 1
  const products = data?.slice((page - 1) * pageSize, page * pageSize) ?? []
  const categories = categoryData?.items ?? []
  const names = new Map(categories.map(({ id, nombre }) => [id, nombre]))
  function updateFilters({ q = search, puesto = seller, page: next = 1 }, replace = false) {
    setParams({ ...(q && { q }), ...(puesto && { puesto }), ...(next > 1 && { page: next }) }, { replace })
  }

  return (
    <section className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Catálogo</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <input aria-label="Buscar producto" placeholder="Buscar producto…" value={search}
          onChange={(event) => updateFilters({ q: event.target.value }, true)}
          className="rounded border p-3" />
        <select aria-label="Puesto" value={seller} onChange={(event) => updateFilters({ puesto: event.target.value })} className="rounded border p-3">
          <option value="">Todos los puestos</option>
          {puestosCatalogo.map(({ id, nombre }) => <option key={id} value={id}>{nombre}</option>)}
        </select>
      </div>
      {loading ? <p role="status">Cargando catálogo…</p> : error ? <p role="alert">{error}</p> : products.length === 0 ? <p>No se encontraron productos.</p> : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="flex w-full max-w-xs flex-col gap-3">
              <div className="flex grow">
                <Card producto={{ ...product, en_stock: product.en_stock ?? Number(product.stock) > 0 }}
                  categoria={names.get(product.categoria_id)} onAgregarAlCarrito={agregarAlCarrito} />
              </div>
              <Link
                aria-label={'Ver detalle de ' + product.nombre}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#2e5134]/25 bg-[#dfebe0] px-4 text-sm font-semibold text-[#2e5134] transition hover:bg-[#cddfce] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e5134]"
                to={'/products/' + product.id}
              >
                Ver detalle <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {pages > 1 && <nav aria-label="Páginas del catálogo" className="mt-6 flex gap-4">
        <button type="button" disabled={page <= 1} onClick={() => updateFilters({ page: page - 1 })}>Anterior</button>
        <span>{page} / {pages}</span>
        <button type="button" disabled={page >= pages} onClick={() => updateFilters({ page: page + 1 })}>Siguiente</button>
      </nav>}
    </section>
  )
}
