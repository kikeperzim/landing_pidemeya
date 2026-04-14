import { useEffect, useState } from 'react';
import { NavHashLink as HashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['servicios', 'beneficios', 'proceso', 'resenas', 'contacto'];
      let current = 'inicio';
      const scrollPos = window.scrollY + 200;

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && scrollPos >= element.offsetTop) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'beneficios', label: 'Beneficios' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'resenas', label: 'Reseñas' },
    { id: 'contacto', label: 'Contáctanos' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-6 max-w-full mx-auto backdrop-blur-lg bg-surface/80 border-b border-on-surface/5 transition-all duration-300">
        <div className="flex items-center">
          <Link to="/" onClick={closeMenu} className="relative z-[70]">
            <img src="/images/LogoPidemeya.webp" alt="PidemeYa Logo" className="h-10 md:h-14 w-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-ui text-on-surface">
          {navLinks.map(({ id, label }) => (
            <HashLink
              key={id}
              smooth
              to={`/#${id}`}
              className={`relative py-2 text-sm tracking-wide transition-all duration-300 hover:text-primary-container group ${
                activeSection === id ? 'text-primary-container font-bold' : 'text-on-surface/60 font-medium'
              }`}
            >
              {label}
              <span 
                className={`absolute bottom-[-2px] left-0 h-[3px] bg-primary-container transition-all duration-300 rounded-full ${
                  activeSection === id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                }`} 
              />
            </HashLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contactanos"
            className="hidden md:flex bg-primary-container text-on-primary font-button px-7 py-3 font-bold tracking-wide active:scale-95 transition-all duration-200 rounded-xl shadow-lg shadow-primary-container/20 hover:brightness-110"
          >
            Comenzar
          </Link>

          {/* Hamburger Toggle */}
          <button
            className="lg:hidden text-on-surface p-2 relative z-[70] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-surface z-[100] lg:hidden flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button inside overlay */}
        <button
          className="absolute top-8 right-8 text-on-surface/70 hover:text-on-surface transition-colors"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        >
          <span className="material-symbols-outlined text-4xl">close</span>
        </button>

        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[100px] rounded-full"></div>

        <div className="flex flex-col items-center gap-8 translate-y-[-20px]">
          {navLinks.map(({ id, label }) => (
            <HashLink 
              key={id}
              smooth 
              to={`/#${id}`} 
              onClick={closeMenu} 
              className={`relative text-3xl font-headline transition-all duration-300 ${
                activeSection === id ? 'text-primary-container scale-110' : 'text-on-surface/90 hover:text-primary-container'
              }`}
            >
              {label}
              <span 
                className={`absolute bottom-[-8px] left-1/2 -translate-x-1/2 h-1 bg-primary-container transition-all duration-300 rounded-full ${
                  activeSection === id ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`} 
              />
            </HashLink>
          ))}
          
          <div className="mt-4 pt-8 border-t border-on-surface/10 w-48 flex justify-center">
            <Link
              to="/contactanos"
              onClick={closeMenu}
              className="bg-primary-container text-on-primary font-button px-10 py-4 font-bold text-xl rounded-2xl shadow-xl shadow-primary-container/20 active:scale-95 transition-all"
            >
              Comenzar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
