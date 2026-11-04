import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({cartCount = 0}){
  const navigate = useNavigate();
  const[searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (e) => {
    e.preventDefault();
    navigate('/products?' + new URLSearchParams({ q: searchTerm.trim() }));
  };
  return(
    <header className="sticky top-0 z-50 bg-[#FBF9F5] border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 md:h-20 md:flex-nowrap md:py-0">

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

          <nav aria-label="Navegación principal" className="flex w-full items-center gap-3 sm:w-auto sm:gap-4">
            <Link to="/products" className="whitespace-nowrap text-sm font-semibold hover:text-[#C85A32]">Catálogo</Link>
            <Link to="/agregar-producto" className="whitespace-nowrap text-sm font-semibold hover:text-[#C85A32]">Agregar producto</Link>
            <Link to="/about" className="whitespace-nowrap text-sm font-semibold hover:text-[#C85A32]">Acerca de</Link>
            <Link
              to="/cart"
              className="relative ml-auto grid size-11 shrink-0 place-items-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              aria-label={cartCount > 0 ? 'Ver carrito (' + cartCount + ')' : 'Ver carrito'}
            >
              <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h3l2.5 12h11l2-8H6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {cartCount > 0 && (
                <span aria-hidden="true" className="absolute right-0 top-0 grid min-w-4 place-items-center rounded-full bg-[#C85A32] px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
