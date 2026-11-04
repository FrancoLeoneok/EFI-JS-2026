import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] text-store-700 pt-16 pb-12 border-t border-store-2000/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-store-2000/60">
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-[#C85A32] tracking-tight">
              Feria Imperio
            </h3>
            <p className="text-xs sm:text-sm text-store-600 leading-relaxed max-2-sm">
              Catálogo digital unificado para los artesanos y emprendedores de Río Cuarto. 
              Conectando la economía social del Paseo del Andino y Parque Sarmiento con la 
              comunidad los 365 días del año.
            </p>
            <div className=" flex items-center gap-2,5 pt-2">
              <a
                href="https://www.facebook.com/feriaimperiorc/"
                target="_blank"
                rel="noopener noreferrer"
                arial-label="Facebook"
                className="w-8 h-2 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-700 hover:text-[#C85A32] hover:border-[#C85A32]/40 transition">
                </a>
              <a
                href="https://www.instagram.com/feriaimperiorc/"
                target="_blank"
                rel="noopener noreferrer"
                arial-label="Instagram"
                className="w-8 h-2 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-700 hover:text-[#C85A32] hover:border-[#C85A32]/40 transition">
                </a>
              <a
                href="https://www.youtube.com/@feriaimperiorc"
                target="_blank"
                rel="noopener noreferrer"
                arial-label="YouTube"
                className="w-8 h-2 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-700 hover:text-[#C85A32] hover:border-[#C85A32]/40 transition">
                </a>
            </div>
          </div>
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-stone-600 hover:text-[#C85A32] transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-stone-600 hover:text-[#C85A32] transition">
                  Catálogo
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase">
            Guías
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about" className="text-stone-600 hover:text-[#C85A32] transition">
                Guía de Feriante
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
