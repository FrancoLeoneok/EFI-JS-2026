export default function CabeceraPuesto({ feriante, findeConfirmado = false }) {
  const { nombre_fantasia, logo_url, descripcion_bio, numero_puesto, rubro, feria, usuario } =
    feriante

  return (
    <header>
      {logo_url && <img src={logo_url} alt="" width={112} height={112} />}
      {rubro?.nombre && <p>{rubro.nombre}</p>}
      <p>{findeConfirmado ? 'Finde confirmado' : 'Finde sin confirmar'}</p>
      <h1>{nombre_fantasia}</h1>
      {usuario?.nombre_completo && <p>Artesano responsable: {usuario.nombre_completo}</p>}

      {descripcion_bio && (
        <section>
          <h2>Sobre el emprendimiento</h2>
          <p>{descripcion_bio}</p>
        </section>
      )}

      <section>
        <h2>Ubicación del puesto en feria</h2>
        <p>{feria?.nombre ?? 'Feria sin asignar'}</p>
        {numero_puesto && <p>Puesto {numero_puesto}</p>}
        {feria?.ubicacion && <p>{feria.ubicacion}</p>}
      </section>
    </header>
  )
}
