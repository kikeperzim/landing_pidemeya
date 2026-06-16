import { useEffect, useState, useRef } from 'react';
import { NavHashLink as HashLink } from 'react-router-hash-link';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'contacto', label: 'Contáctanos' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      // Update Progress Bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
      if (progressRef.current) {
        gsap.to(progressRef.current, { scaleX: progress, duration: 0.1, ease: "none" });
      }

      if (location.pathname !== '/') return;
      
      const sections = ['servicios', 'beneficios', 'proceso', 'resenas', 'contacto'];
      let current = 'inicio';
      const scrollPos = scrollY + 200;

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && scrollPos >= element.offsetTop) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle Active Indicator Movement
  useGSAP(() => {
    const activeIndex = navLinks.findIndex(link => link.id === activeSection);
    const activeEl = navLinksRef.current[activeIndex];
    
    if (activeEl && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeEl;
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.5,
        ease: "elastic.out(1, 0.8)",
      });
    }
  }, { dependencies: [activeSection] });

  // Entrance Animation
  useGSAP(() => {
    if (!headerRef.current) return;
    
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        delay: 1.8, // Wait for preloader to fade out for a premium reveal
        clearProps: "all"
      }
    );
  }, []);

  // Magnetic Effect for Nav Links and Logo
  useEffect(() => {
    const links = navLinksRef.current;
    const logo = logoRef.current;
    const cleanups: (() => void)[] = [];

    const applyMagnetic = (el: HTMLElement, strength = 0.3) => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power2.out" });
      };
      const onMouseLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      };
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };

    links.forEach(link => link && applyMagnetic(link));
    if (logo) applyMagnetic(logo, 0.2);

    return () => cleanups.forEach(fn => fn());
  }, []);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "expo.out",
        display: "flex"
      });
      gsap.fromTo(linksRef.current?.children || [], 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
        display: "none"
      });
    }
  }, { dependencies: [isMenuOpen] });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 w-full z-50 flex justify-center px-4 transition-[padding] duration-700 ease-out ${
          isScrolled ? 'pt-4' : 'pt-6 md:pt-10'
        }`}
      >
        <nav 
          ref={navRef}
          className={`
            relative flex justify-between items-center px-6 md:px-8 py-3 md:py-4 w-full max-w-7xl mx-auto 
            backdrop-blur-xl transition-all duration-500 ease-out overflow-hidden
            ${isScrolled 
              ? 'bg-surface/70 rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-2 md:py-3' 
              : 'bg-transparent border-b border-transparent py-4 md:py-6'
            }
          `}
        >
          {/* Scroll Progress Bar */}
          <div 
            ref={progressRef}
            className="absolute bottom-0 left-0 h-[2px] bg-primary-container/40 w-full origin-left scale-x-0 transition-opacity duration-300"
            style={{ opacity: isScrolled ? 1 : 0 }}
          />

          {/* Logo Section */}
          <div ref={logoRef} className="flex items-center">
            <Link to="/" onClick={closeMenu} className="relative z-[70] transition-transform hover:scale-105 active:scale-95 duration-300">
              <img src="/images/LogoPidemeya.webp" alt="PidemeYa Logo" className={`transition-all duration-500 ${isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-14'} w-auto`} />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center relative gap-2 font-ui">
            {/* Active Indicator Pill */}
            <div 
              ref={indicatorRef}
              className="absolute h-10 bg-primary-container/10 rounded-full border border-primary-container/20 pointer-events-none z-0 shadow-[0_0_20px_rgba(251,101,10,0.1)]"
              style={{ display: isScrolled ? 'block' : 'none' }}
            />

            {navLinks.map(({ id, label }, index) => (
              <HashLink
                key={id}
                smooth
                to={`/#${id}`}
                ref={el => { navLinksRef.current[index] = el; }}
                className={`relative px-5 py-2 text-sm tracking-wide transition-all duration-300 z-10 ${
                  activeSection === id ? 'text-primary-container font-bold' : 'text-on-surface/60 font-medium hover:text-on-surface'
                }`}
              >
                {label}
                {!isScrolled && (
                  <span 
                    className={`absolute bottom-[-2px] left-1/2 -translate-x-1/2 h-[2px] bg-primary-container transition-all duration-500 rounded-full ${
                      activeSection === id ? 'w-1/2 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2'
                    }`} 
                  />
                )}
              </HashLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-on-surface/5 hover:bg-on-surface/10 transition-colors flex items-center justify-center text-on-surface border border-on-surface/5 group"
              aria-label="Alternar tema"
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-12">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            
            <Link
              to="/contactanos"
              className={`
                hidden md:flex bg-primary-container text-on-primary font-button px-6 py-2.5 font-bold tracking-wide 
                active:scale-95 transition-all duration-500 rounded-full shadow-lg shadow-primary-container/20 
                hover:shadow-primary-container/40 hover:-translate-y-0.5
                ${isScrolled ? 'text-sm px-5 py-2' : 'text-base'}
              `}
            >
              Comenzar
            </Link>


            {/* Hamburger Toggle */}
            <button
              className={`
                lg:hidden p-2.5 relative z-[110] flex items-center justify-center rounded-full border transition-all duration-300
                ${isMenuOpen ? 'bg-primary-container text-on-primary border-transparent' : 'bg-on-surface/5 text-on-surface border-on-surface/5'}
              `}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-surface/95 backdrop-blur-2xl z-[100] lg:hidden flex flex-col items-center justify-center hidden opacity-0"
      >
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div ref={linksRef} className="flex flex-col items-center gap-8 w-full px-12">
          {navLinks.map(({ id, label }) => (
            <HashLink 
              key={id}
              smooth 
              to={`/#${id}`} 
              onClick={closeMenu} 
              className={`text-4xl font-headline tracking-tighter transition-all duration-300 ${
                activeSection === id ? 'text-primary-container' : 'text-on-surface/90 hover:text-primary-container'
              }`}
            >
              {label}
            </HashLink>
          ))}
          
          <div className="mt-8 pt-8 border-t border-on-surface/10 w-full max-w-xs flex justify-center">
            <Link
              to="/contactanos"
              onClick={closeMenu}
              className="w-full bg-primary-container text-on-primary font-button px-10 py-5 font-bold text-xl rounded-full shadow-2xl shadow-primary-container/20 text-center active:scale-95 transition-all"
            >
              Comenzar ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

