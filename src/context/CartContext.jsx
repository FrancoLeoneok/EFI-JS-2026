import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [productos, setProductos] = useState([])

  function agregarAlCarrito(producto) {
    setProductos((actuales) => {
      const existente = actuales.find((item) => item.producto.id === producto.id)

      if (!existente) {
        return [...actuales, { producto, cantidad: 1 }]
      }

      return actuales.map((item) =>
        item === existente ? { ...item, cantidad: item.cantidad + 1 } : item,
      )
    })
  }

  const cantidadTotal = productos.reduce((total, item) => total + item.cantidad, 0)

  return (
    <CartContext.Provider value={{ productos, agregarAlCarrito, cantidadTotal }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- El hook expone el contexto del proveedor.
export function useCart() {
  const carrito = useContext(CartContext)

  if (!carrito) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return carrito
}
