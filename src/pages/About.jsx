export default function About() {
  const integrantes = [
    {
      nombre: 'Alejo Alaminos',
      rol: 'Desarrollo Frontend & Componentes',
      iniciales: 'AA',
    },
    {
      nombre: 'Franco Lopez Leone',
      rol: 'Desarrollo Frontend & Arquitectura',
      iniciales: 'FL',
    },
    {
      nombre: 'Joaquin Fornasari',
      rol: 'Desarrollo Frontend & Estado Global',
      iniciales: 'JF',
    },
    {
      nombre: 'Quiroga Mauricio Nicolas',
      rol: 'Desarrollo Frontend & UI/UX',
      iniciales: 'QN',
    },
  ]

  const tecnologias = [
    {
      nombre: 'React',
      version: 'v19',
      descripcion:
        'Biblioteca modular para construir interfaces de usuario interactivas, declarativas y componentes reutilizables.',
      color: 'bg-cyan-50 border-cyan-200 text-cyan-800',
      badge: 'bg-cyan-100 text-cyan-800',
    },
    {
      nombre: 'Vite',
      version: 'v8',
      descripcion:
        'Entorno de desarrollo ágil y empaquetador de última generación con Hot Module Replacement (HMR) ultrarrápido.',
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      badge: 'bg-purple-100 text-purple-800',
    },
    {
      nombre: 'Tailwind CSS',
      version: 'v4',
      descripcion:
        'Framework de utilidades CSS enfocado en diseño moderno, responsivo y adaptado a la estética artesanal de la feria.',
      color: 'bg-teal-50 border-teal-200 text-teal-800',
      badge: 'bg-teal-100 text-teal-800',
    },
    {
      nombre: 'React Router',
      version: 'SPA Router',
      descripcion:
        'Enrutamiento dinámico y declarativo del lado del cliente para navegar fluidamente entre páginas y catálogos.',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      badge: 'bg-orange-100 text-orange-800',
    },
  ]

  return (
    <div className="bg-[#FAF8F5] text-stone-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HERO / ENCABEZADO */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded-full bg-[#dfebe0] text-[#2e5134] tracking-wide uppercase">
            Sobre Nosotros • Río Cuarto
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Feria <span className="text-[#C85A32]">Imperio</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Catálogo digital unificado para los artesanos y emprendedores de Río Cuarto. 
            Conectamos la economía social del <strong>Paseo del Andino</strong> y el <strong>Parque Sarmiento</strong> con 
            toda la comunidad los 365 días del año.
          </p>
        </section>

        {/* ¿QUÉ ES Y QUÉ OFRECE? */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              ¿Qué es Feria Imperio y qué ofrece?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Un puente entre la tradición ferial riocuartense y las herramientas del comercio digital moderno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#f3e1da] text-[#C85A32] flex items-center justify-center font-bold text-xl">
                🛍️
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Catálogo Digital Unificado
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Centralizamos la oferta de creaciones locales en un solo espacio: mates, marroquinería, indumentaria, 
                cerámica, textiles y productos gastronómicos elaborados artesanalmente.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#dfebe0] text-[#2e5134] flex items-center justify-center font-bold text-xl">
                📍
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Puestos & Paseos Feriales
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Cada artesano cuenta con su perfil digital donde indica la ubicación exacta de su puesto y confirma si 
                asiste a la feria el próximo fin de semana.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">
                🤝
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Economía Social y Comercio Justo
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Impulsamos el valor del trabajo manual autogestionado, facilitando el contacto directo entre vecinos y 
                productores sin comisiones abusivas ni intermediarios.
              </p>
            </article>
          </div>
        </section>

        {/* DESCRIPCIÓN DE LA TIENDA */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
              Nuestra Propuesta
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Una tienda pensada para la comunidad y sus creadores
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              La plataforma de <strong>Feria Imperio</strong> recrea la calidez del paseo ferial tradicional en una experiencia 
              web rápida, accesible y confiable. 
            </p>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Permite a los visitantes explorar las creaciones por categorías o feriante, conocer la historia detrás de cada taller 
              y sumar artículos a su carrito para coordinar su compra de manera sencilla.
            </p>
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/60 space-y-4">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">
              Puntos clave de la experiencia:
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-start gap-3">
                <span className="text-[#2e5134] font-bold">✓</span>
                <span>Visibilidad permanente para emprendimientos locales los 365 días del año.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2e5134] font-bold">✓</span>
                <span>Filtros ágiles por rubros, puestos confirmados y productos destacados.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#2e5134] font-bold">✓</span>
                <span>Gestión de inventario y publicación de productos para los feriantes registrados.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* TECNOLOGÍAS UTILIZADAS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#2e5134] uppercase tracking-wider">
              Stack Tecnológico
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Tecnologías utilizadas en el proyecto
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Desarrollado bajo estándares modernos del ecosistema JavaScript para garantizar rendimiento, escalabilidad y accesibilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tecnologias.map((tec) => (
              <div
                key={tec.nombre}
                className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-stone-900">{tec.nombre}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tec.badge}`}>
                      {tec.version}
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {tec.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPO O AUTORES */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
              EFI JavaScript 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Equipo de Desarrollo
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Integrantes y autores que forman parte del desarrollo colaborativo de esta aplicación web.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrantes.map((miembro) => (
              <article
                key={miembro.nombre}
                className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col items-center text-center space-y-3 hover:shadow-sm transition"
              >
                <div className="w-16 h-16 rounded-full bg-[#f3e1da] border-2 border-[#C85A32]/30 flex items-center justify-center text-[#C85A32] font-extrabold text-lg shadow-inner">
                  {miembro.iniciales}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">{miembro.nombre}</h3>
                  <p className="text-xs text-[#2e5134] font-semibold mt-0.5">{miembro.rol}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* DATOS DE CONTACTO Y REDES */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-stone-900">
              Canales de Contacto y Comunidad
            </h2>
            <p className="text-sm text-stone-600">
              Conectate con los paseos feriales y seguí todas las novedades de feriantes, eventos y convocatorias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="rounded-2xl bg-[#FAF8F5] p-5 border border-stone-200/60 text-center space-y-2">
              <span className="text-2xl">📍</span>
              <h3 className="font-bold text-stone-900 text-sm">Paseos Feriales</h3>
              <p className="text-xs text-stone-600">
                Paseo del Andino & Parque Sarmiento<br />
                Río Cuarto, Córdoba, Argentina
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] p-5 border border-stone-200/60 text-center space-y-2">
              <span className="text-2xl">📱</span>
              <h3 className="font-bold text-stone-900 text-sm">Redes Oficiales</h3>
              <div className="flex justify-center items-center gap-3 text-xs pt-1">
                <a
                  href="https://www.instagram.com/feriaimperiorc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-700 hover:text-[#C85A32] transition underline"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://www.facebook.com/feriaimperiorc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-700 hover:text-[#C85A32] transition underline"
                >
                  Facebook
                </a>
                <span>•</span>
                <a
                  href="https://www.youtube.com/@feriaimperiorc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-stone-700 hover:text-[#C85A32] transition underline"
                >
                  YouTube
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] p-5 border border-stone-200/60 text-center space-y-2">
              <span className="text-2xl">🎪</span>
              <h3 className="font-bold text-stone-900 text-sm">¿Sos Feriante?</h3>
              <p className="text-xs text-stone-600">
                Sumá tu puesto al catálogo digital y mostrá tus creaciones a toda la ciudad.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
