import { useParams } from 'react-router-dom'
import { useApi } from '../useApi'
import { useCart } from '../context/CartContext'
import PerfilFeriante from './PerfilFeriante'

export default function Puesto() {
  const { id } = useParams()
  const { agregarAlCarrito } = useCart()
  const { data, loading, error } = useApi('/emprendedores/' + encodeURIComponent(id))
  if (loading) return <p className="p-6" role="status">Cargando puesto…</p>
  if (error || !data) return <p className="p-6" role="alert">{error || 'No se encontró el puesto.'}</p>
  return <PerfilFeriante feriante={data} findeConfirmado={data.finde_confirmado} onAgregarAlCarrito={agregarAlCarrito} />
}
