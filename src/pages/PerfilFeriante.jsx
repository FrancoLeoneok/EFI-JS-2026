import { useState } from 'react'
import CabeceraPuesto from '../components/CabeceraPuesto'

export default function PerfilFeriante({ feriante, findeConfirmado }) {
  const [busqueda, setBusqueda] = useState('')
  const textoBuscado = busqueda.trim().toLocaleLowerCase('es-AR')
  const creaciones = (feriante.productos ?? []).filter(
    (producto) =>
      producto.activo !== false &&
      producto.nombre.toLocaleLowerCase('es-AR').includes(textoBuscado),
  )

  return (
    <div>
      <CabeceraPuesto feriante={feriante} findeConfirmado={findeConfirmado} />

      <section>
        <h2>Creaciones de {feriante.nombre_fantasia}</h2>
        <label>
          Buscar en este puesto
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </label>

        {creaciones.length > 0 ? (
          <ul>
            {creaciones.map((producto) => (
              <li key={producto.id}>{producto.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron creaciones.</p>
        )}
      </section>
    </div>
  )
}
