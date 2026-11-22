import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Shop', href: '#catalog' },
  { label: 'Instruments', href: '#anatomy' },
  { label: 'Brew Lab', href: '#brew-lab' },
  { label: 'Roastery', href: '#roastery' },
  { label: 'Field Notes', href: '#gallery' },
];

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          transition: 'background-color 0.38s ease, border-color 0.38s ease, color 0.38s ease, backdrop-filter 0.38s ease',
          backgroundColor: scrolled ? 'rgba(244, 240, 232, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(23, 20, 18, 0.12)' : '1px solid rgba(244, 240, 232, 0.12)',
          color: scrolled ? '#171412' : '#F4F0E8',
        }}
      >
        <div
          className="container"
          style={{
            height: '74px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Left: Brand Wordmark + Live Roastery Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            <a
              href="#top"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                letterSpacing: '0.06em',
                lineHeight: 1,
              }}
            >
              KALDOR
            </a>

            <div
              className="nav-roast-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.32rem 0.72rem',
                borderRadius: '999px',
                border: scrolled ? '1px solid rgba(23, 20, 18, 0.14)' : '1px solid rgba(244, 240, 232, 0.22)',
                fontSize: '0.66rem',
                letterSpacing: '0.11em',
              }}
            >
              <motion.span
                animate={{ opacity: [0.45, 1, 0.45], scale: [0.95, 1.2, 0.95] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#C69C60',
                  display: 'inline-block',
                }}
              />
              <span className="font-mono" style={{ opacity: 0.9 }}>
                ROASTING TODAY · LOT #26-041
              </span>
            </div>
          </div>

          {/* Center: Architectural Navigation */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  opacity: 0.88,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.88')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Cart & Mobile Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping bag with ${cartCount} items`}
              data-cursor="BAG"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                border: scrolled ? '1px solid rgba(23, 20, 18, 0.2)' : '1px solid rgba(244, 240, 232, 0.28)',
                backgroundColor: scrolled ? 'rgba(23, 20, 18, 0.04)' : 'rgba(20, 18, 16, 0.35)',
                fontSize: '0.78rem',
                fontWeight: 500,
                transition: 'background-color 0.25s ease',
              }}
            >
              <ShoppingBag size={15} strokeWidth={1.6} />
              <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                BAG ({cartCount})
              </span>
            </button>

            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: scrolled ? '1px solid rgba(23, 20, 18, 0.18)' : '1px solid rgba(244, 240, 232, 0.25)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileOpen ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '74px',
              left: 0,
              right: 0,
              zIndex: 79,
              backgroundColor: '#141210',
              color: '#F4F0E8',
              borderBottom: '1px solid rgba(244, 240, 232, 0.14)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    paddingBlock: '0.35rem',
                    borderBottom: '1px solid rgba(244, 240, 232, 0.08)',
                  }}
                >
                  {item.label}
                </a>
              ))}
              <p className="font-mono" style={{ fontSize: '0.7rem', color: '#C69C60', marginTop: '0.4rem' }}>
                SHOWROOM: BREDGADE 42, COPENHAGEN K
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2.1rem;
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 960px) {
          .desktop-nav, .nav-roast-pill {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  );
}
