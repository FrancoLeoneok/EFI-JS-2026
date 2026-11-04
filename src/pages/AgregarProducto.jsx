
import { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"

export default function AgregarProducto() {

    const { user } = useContext(UserContext)

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
    })

    const [errors, setErrors] = useState({})
    const [mensaje, setMensaje] = useState("")

    const API_URL = import.meta.env.VITE_API_URL

    // Control de los campos
    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Validaciones
    const validate = () => {
        const newErrors = {}

        if (!form.nombre.trim()) {
            newErrors.nombre = "El nombre es obligatorio"
        }

        if (!form.precio) {
            newErrors.precio = "El precio es obligatorio"
        } else if (Number(form.precio) <= 0) {
            newErrors.precio = "El precio debe ser mayor a 0"
        }

        if (!form.stock.trim()) {
            newErrors.stock = "El stock es obligatorio"
        } else if (Number(form.stock) < 0 || !Number.isInteger(Number(form.stock))) {
            newErrors.stock = "El stock debe ser un número entero mayor o igual a 0"
        }

        return newErrors
    }

    // Enviar producto a la API
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = validate()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setMensaje("")
            return
        }

        try {
            const res = await fetch(`${API_URL}/articulos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: form.nombre,
                    precio: Number(form.precio),
                    stock: Number(form.stock),
                    activo: true,
                    proveedor_id: 0
                })
            })

            if (!res.ok) {
                throw new Error("No se pudo agregar el producto")
            }

            setMensaje("¡Producto agregado correctamente!")
            setErrors({})

            setForm({
                nombre: "",
                precio: "",
                stock: "",
            })

        } catch (err) {
            console.error("Error al agregar producto:", err)
            setMensaje("Error al agregar el producto. Intentá nuevamente.")
        }
    }

    // Control de administrador
    if (!user?.admin) {
        return (
            <section className="flex-1 flex justify-center items-center p-6">
                <p className="text-red-600 text-2xl font-bold text-center">
                    No tienes acceso a este formulario.
                </p>
            </section>
        )
    }

    return (
        <section className="flex-1 flex flex-col items-center pt-10 px-4 pb-10">

            <div className="w-full max-w-xl">

                <div className="mb-6">
                    <p className="text-sm font-semibold text-orange-600 mb-2">
                        FERIA IMPERIO / ADMINISTRACIÓN
                    </p>

                    <h1 className="text-3xl font-bold text-zinc-900">
                        Agregar producto
                    </h1>

                    <p className="text-sm text-zinc-500 mt-2">
                        Completá los datos para publicar un nuevo artículo.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="w-full bg-white border border-zinc-200 shadow-sm p-6 md:p-8 rounded-2xl"
                >

                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Nombre del producto
                        </label>

                        {errors.nombre && (
                            <p className="text-sm text-red-600 mb-2">
                                {errors.nombre}
                            </p>
                        )}

                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Mate Imperial"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Precio */}
                    <div className="mt-6">
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Precio (ARS)
                        </label>

                        {errors.precio && (
                            <p className="text-sm text-red-600 mb-2">
                                {errors.precio}
                            </p>
                        )}

                        <input
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            placeholder="Ej: 15000"
                            min="0.01"
                            step="0.01"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Stock */}
                    <div className="mt-6">
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Stock disponible
                        </label>

                        {errors.stock && (
                            <p className="text-sm text-red-600 mb-2">
                                {errors.stock}
                            </p>
                        )}

                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Ej: 10"
                            min="0"
                            step="1"
                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-300 text-zinc-900 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Mensaje */}
                    {mensaje && (
                        <p className={`mt-5 text-sm font-semibold ${
                            mensaje.includes("correctamente")
                                ? "text-green-600"
                                : "text-red-600"
                        }`}>
                            {mensaje}
                        </p>
                    )}

                    {/* Botón */}
                    <button
                        type="submit"
                        className="w-full mt-8 py-3 rounded-lg bg-green-800 text-white font-semibold hover:bg-green-700 transition cursor-pointer"
                    >
                        Guardar producto
                    </button>

                </form>
            </div>

        </section>
    )
}
