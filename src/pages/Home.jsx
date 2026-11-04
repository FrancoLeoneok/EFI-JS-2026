export default function Home({ feriantes = [] }) {
  const destacados = feriantes.filter((feriante) => feriante.destacado && feriante.activo !== false)

  return (
    <>
      <section aria-labelledby="titulo-inicio">
        <h1 id="titulo-inicio">Feria Imperio</h1>
        <p>Conocé a los feriantes de Río Cuarto y descubrí sus creaciones.</p>
        <a href="#feriantes-destacados">Ver feriantes destacados</a>
      </section>

      <section id="feriantes-destacados" aria-labelledby="titulo-destacados">
        <h2 id="titulo-destacados">Feriantes destacados</h2>
        {destacados.length > 0 ? (
          <ul>
            {destacados.map((feriante) => (
              <li key={feriante.id}>
                <article>
                  {feriante.logo_url && <img src={feriante.logo_url} alt="" />}
                  <h3>{feriante.nombre_fantasia}</h3>
                  {feriante.descripcion_bio && <p>{feriante.descripcion_bio}</p>}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>Todavía no hay feriantes destacados.</p>
        )}
      </section>
    </>
  )
}
