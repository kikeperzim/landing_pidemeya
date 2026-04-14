import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-on-surface/5 bg-surface/80 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 md:px-12 py-6 md:py-8 w-full gap-8 md:gap-6 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-3">
          <Link to="/">
            <img src="/images/LogoPidemeya.webp" alt="PidemeYa Logo" className="h-8 md:h-10 w-auto" />
          </Link>
          <p className="font-body text-on-surface/50 max-w-xs text-[10px] md:text-xs">
            © {new Date().getFullYear()} PidemeYa. Todos los derechos reservados.
            <br className="md:hidden" /> Innovación digital para el sector energético.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface">
          <Link className="text-on-surface/40 hover:text-primary-container transition-colors" to="/proyectos">Proyectos</Link>
          <Link className="text-on-surface/40 hover:text-primary-container transition-colors" to="/privacidad">Privacidad</Link>
          <Link className="text-on-surface/40 hover:text-primary-container transition-colors" to="/terminos">Términos</Link>
          <Link className="text-on-surface/40 hover:text-primary-container transition-colors" to="/contactanos">Contactanos</Link>
        </div>
        <div className="flex gap-6 md:gap-8 justify-center lg:justify-end">
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/51904773671"
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col items-center gap-2 text-[#25D366] transition-all active:scale-90"
            title="WhatsApp"
          >
            <div className="p-3 bg-[#25D366]/10 group-hover:bg-[#25D366]/20 rounded-xl border border-[#25D366]/20 group-hover:border-[#25D366]/40 transition-all shadow-sm">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <span className="text-[9px] md:text-[10px] font-label uppercase tracking-widest text-[#25D366] font-bold">WhatsApp</span>
          </a>

          {/* Facebook Icon */}
          <a
            href="https://www.facebook.com/share/1DfQnzCZKy/"
            target="_blank"
            className="group flex flex-col items-center gap-2 text-[#1877F2] transition-all active:scale-90"
            title="Facebook"
          >
            <div className="p-3 bg-[#1877F2]/10 group-hover:bg-[#1877F2]/20 rounded-xl border border-[#1877F2]/20 group-hover:border-[#1877F2]/40 transition-all shadow-sm">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </div>
            <span className="text-[9px] md:text-[10px] font-label uppercase tracking-widest text-[#1877F2] font-bold">Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
