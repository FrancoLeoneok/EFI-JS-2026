import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  function iniciarSesion(usuarioRegistrado) {
    setUsuario(usuarioRegistrado)
  }

  function cerrarSesion() {
    setUsuario(null)
  }

  const esVisitante = usuario === null

  return (
    <UserContext.Provider value={{ usuario, esVisitante, iniciarSesion, cerrarSesion }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- El hook expone el contexto del proveedor.
export function useUser() {
  const sesion = useContext(UserContext)

  if (!sesion) {
    throw new Error('useUser debe usarse dentro de UserProvider')
  }

  return sesion
}
