const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
})

export default function Card({ producto, categoria, onAgregarAlCarrito }) {
  const { nombre, precio, imagen_url } = producto

  return (
    <article>
      {imagen_url && <img src={imagen_url} alt={nombre} />}
      <span>{categoria ?? producto.categoria?.nombre ?? 'Sin categoría'}</span>
      <h2>{nombre}</h2>
      <p>{formatoPrecio.format(precio)}</p>
      <button
        type="button"
        disabled={!onAgregarAlCarrito}
        onClick={() => onAgregarAlCarrito(producto)}
      >
        Agregar al carrito
      </button>
    </article>
  )
}
