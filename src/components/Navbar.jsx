import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

export default function Navbar({cartCount = 0}){
  const navigate = useNavigate();
  const { usuario, esVisitante } = useUser();
  const[searchTerm, setSearchTerm] = useState("");
  const[userMenuOpen, setUserMenuOpen] = useState(false);
  
    const handleSearch = (e) => {
    e.preventDefault();
    navigate('/products?' + new URLSearchParams({ q: searchTerm.trim() }));
  };
  return(
    <header className="sticky top-0 z-50 bg-[#FBF9F5] border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-12 h-12 rounded-full border border-stone-200/80 bg-white shadow-xs flex items-center justify-center overflow-hidden p-1 transition group-hover:scale-105">
              <img
                src="/logo.png"
                alt="Logo Feria Imperio"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#C85A32] leading-tight">Feria Imperio</span>
              <span className="text-sm text-stone-500 leading-tight">Río Cuarto • Tienda Locales </span>
            </div>
          </Link>
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-4 items-center bg-[#EFECE6] rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-[#C85A32]/40 transition shadow-inner">
            <svg className="w-5 h-5 text-stone-400 mr-2 shrink-0" fill= "none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              aria-label="Buscar en el catálogo" placeholder="Buscar productos…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden" />
              <button
                type="submit"
                className="ml-2 px-5 py-2 bg-[#C85A32] hover:bg-[#b24e29] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition shrink-0 shadow-sm"
               >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Buscar</span>
              </button>              
          </form>

          <div className="flex items-center gap-3">
            <Link to="/products" className="text-sm font-semibold">Catálogo</Link>
            <Link
              to="/cart"
              className="relative p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition"
              aria-label="Ver carrito">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C85A32] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
            </Link>
                <div className="relative">
                <button
                  type="button" aria-label="Menú de la feria" aria-expanded={userMenuOpen} onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50 transition shadow-2xs"
                >
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-stone-800 leading-tight">
                      {usuario?.nombre_completo || 'Menú'}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {esVisitante ? 'Visitante' : 'Mi cuenta'}
                    </span>
                  </div>
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 py-1 z-50 text-xs">
                    <Link 
                      to="/agregar-producto" 
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-stone-700 hover:bg-stone-50 font-medium"
                    >
                      + Agregar Producto
                    </Link>
                    <Link 
                      to="/about" 
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-stone-700 hover:bg-stone-50"
                    >
                      Acerca de la feria
                    </Link>
                  </div>
                )}
              </div>
          </div>    

        </div>  
      </div>
    </header>
  );
}
