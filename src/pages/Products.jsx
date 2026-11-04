import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("Todas")

    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        fetch(`${API_URL}/articulos/`)
            .then(res => res.json())
            .then((data) => {
                setProducts(data.items)
                setLoading(false)
            })
    }, [])

    if (loading) return <h1 className="text-6xl font-bold">Cargando...</h1>

    // Obtener categorías
    const categories = [
        "Todas",
        ...new Set(products.map(product => product.categoria))
    ]

    // Buscador y filtro
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.nombre
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesCategory =
            category === "Todas" || product.categoria === category

        return matchesSearch && matchesCategory
    })

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6">

            <h1 className="text-3xl font-bold mb-6">
                Productos
            </h1>

            {/* Buscador y filtro */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-3 rounded border border-gray-300 text-black flex-1"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 rounded border border-gray-300 text-black"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

            </div>

            {/* Grilla responsiva */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="p-4 bg-zinc-800 rounded"
                        >
                            <div className="flex justify-between gap-4">
                                <h2>{product.nombre}</h2>

                                <p className="mb-2">
                                    ${product.precio}
                                </p>
                            </div>

                            <p className="mb-6">
                                Stock: {product.stock}
                            </p>

                            <Link
                                to={`/products/${product.id}`}
                                className="mt-4 px-3 py-2 flex justify-center rounded bg-blue-600 hover:bg-blue-500"
                            >
                                Ver producto
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}

            </div>
        </div>
    )
}

