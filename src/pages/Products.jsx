import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api, items } from '../api'
import { puestosPermitidos } from '../puestos'
import { useApi } from '../useApi'
import { useCart } from '../context/CartContext'
import Card from '../components/Card'

const pageSize = 50

async function loadCatalog(path, options) {
  const productsBySeller = await Promise.all(puestosPermitidos.map(async (id) => {
    const sellerPath = path + '&emprendedor_id=' + id
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
  const [category, setCategory] = useState('')
  const { agregarAlCarrito } = useCart()
  const search = params.get('q') ?? ''
  const requestedPage = Number(params.get('page'))
  const query = new URLSearchParams({ q: search.trim() })
  if (category) query.set('categoria_id', category)
  const { data, loading, error } = useApi('/productos/?' + query, loadCatalog)
  const { data: categoryData } = useApi('/categorias/?size=100')

  const pages = Math.ceil((data?.length ?? 0) / pageSize)
  const page = Number.isInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, Math.max(pages, 1))
    : 1
  const products = data?.slice((page - 1) * pageSize, page * pageSize) ?? []
  const categories = categoryData?.items ?? []
  const names = new Map(categories.map(({ id, nombre }) => [id, nombre]))
  const setPage = (next) => setParams({ ...(search ? { q: search } : {}), page: next })

  return (
    <section className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Catálogo</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <input aria-label="Buscar producto" placeholder="Buscar producto…" value={search}
          onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })}
          className="rounded border p-3" />
        <select aria-label="Categoría" value={category} onChange={(event) => { setCategory(event.target.value); setPage(1) }} className="rounded border p-3">
          <option value="">Todas las categorías</option>
          {categories.map(({ id, nombre }) => <option key={id} value={id}>{nombre}</option>)}
        </select>
      </div>
      {loading ? <p role="status">Cargando catálogo…</p> : error ? <p role="alert">{error}</p> : products.length === 0 ? <p>No se encontraron productos.</p> : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id} className="space-y-2">
              <Card producto={{ ...product, en_stock: product.en_stock ?? Number(product.stock) > 0 }}
                categoria={names.get(product.categoria_id)} onAgregarAlCarrito={agregarAlCarrito} />
              <Link className="underline" to={'/products/' + product.id}>Ver detalle de {product.nombre}</Link>
            </li>
          ))}
        </ul>
      )}
      {pages > 1 && <nav aria-label="Páginas del catálogo" className="mt-6 flex gap-4">
        <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span>{page} / {pages}</span>
        <button type="button" disabled={page >= pages} onClick={() => setPage(page + 1)}>Siguiente</button>
      </nav>}
    </section>
  )
}
