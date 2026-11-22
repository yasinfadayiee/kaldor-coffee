import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#141210',
        color: '#F4F0E8',
        paddingTop: 'clamp(4rem, 8vw, 6.5rem)',
        paddingBottom: '2rem',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) repeat(3, minmax(0, 0.75fr))',
            gap: '2.5rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(244, 240, 232, 0.12)',
          }}
        >
          {/* Newsletter */}
          <div>
            <span className="eyebrow eyebrow--dark">ROAST DISPATCH</span>
            <h2 className="display-md" style={{ marginTop: '0.6rem', maxWidth: '18ch' }}>
              Tuesday roast drops &amp; workshop notes.
            </h2>

            {subscribed ? (
              <div
                style={{
                  marginTop: '1.35rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.1rem',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(92, 107, 88, 0.25)',
                  border: '1px solid #5C6B58',
                  fontSize: '0.84rem',
                  color: '#E9E2D4',
                }}
              >
                <Check size={15} color="#C69C60" />
                <span>Registered for Tuesday harvest notifications.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{
                  marginTop: '1.35rem',
                  display: 'flex',
                  maxWidth: '390px',
                  borderBottom: '1px solid rgba(244, 240, 232, 0.35)',
                  paddingBottom: '0.55rem',
                  gap: '0.75rem',
                }}
              >
                <input
                  type="email"
                  required
                  aria-label="Email address for roastery dispatch"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#F4F0E8',
                    fontSize: '0.92rem',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to roast dispatch"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.76rem',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.1em',
                    color: '#C69C60',
                  }}
                >
                  <span>JOIN</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Showroom */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#C69C60', letterSpacing: '0.14em', marginBottom: '1rem' }}>
              SHOWROOM
            </div>
            <p style={{ fontSize: '0.88rem', color: '#C7BEB3', lineHeight: 1.7 }}>
              Bredgade 42, Baghuset
              <br />
              1260 København K
              <br />
              Denmark
            </p>
            <p className="font-mono" style={{ fontSize: '0.72rem', color: '#A69D91', marginTop: '0.85rem' }}>
              TUE – SAT · 08:00 – 17:00
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#C69C60', letterSpacing: '0.14em', marginBottom: '1rem' }}>
              INSTRUMENTS
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#C7BEB3' }}>
              <li><a href="#anatomy">Linea-01 Dual Boiler</a></li>
              <li><a href="#catalog">Mahl-64 Grinder</a></li>
              <li><a href="#catalog">Single-Origin Lots</a></li>
              <li><a href="#brew-lab">Interactive Brew Lab</a></li>
            </ul>
          </div>

          {/* Roastery */}
          <div>
            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#C69C60', letterSpacing: '0.14em', marginBottom: '1rem' }}>
              WORKSHOP
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem', color: '#C7BEB3' }}>
              <li><a href="#roastery">Thermal Roast Curves</a></li>
              <li><a href="#gallery">Field Notes</a></li>
              <li><a href="#top">Return to Top</a></li>
            </ul>
          </div>
        </div>

        {/* Monumental Architectural Wordmark */}
        <div
          style={{
            paddingTop: '2.2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '1rem',
          }}
        >
          <span
            className="font-serif"
            style={{
              fontSize: 'clamp(4.2rem, 15vw, 12.5rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              color: '#F4F0E8',
            }}
          >
            KALDOR
          </span>
          <span className="font-mono" style={{ fontSize: '0.68rem', color: '#A69D91', letterSpacing: '0.12em' }}>
            © 2026 KALDOR INSTRUMENTS APS · ROASTED IN NORDHAVN
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
