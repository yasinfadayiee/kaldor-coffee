import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, SlidersHorizontal } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

  // Subtle living organic steam wisps rising off the espresso extraction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: 0.44 + Math.random() * 0.14,
      y: 0.56 + Math.random() * 0.34,
      radius: 18 + Math.random() * 44,
      speedY: 0.00045 + Math.random() * 0.00055,
      swayAmp: 0.00025 + Math.random() * 0.0003,
      phase: i * 0.7 + Math.random() * 3,
      alpha: 0.025 + Math.random() * 0.04,
    }));

    const render = (time) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += Math.sin(time * 0.0008 + p.phase) * p.swayAmp;
        if (p.y < 0.12) {
          p.y = 0.86 + Math.random() * 0.08;
          p.x = 0.44 + Math.random() * 0.14;
        }

        const lifeFade = Math.sin(Math.min(1, Math.max(0, (0.9 - p.y) / 0.76)) * Math.PI);
        const px = p.x * w;
        const py = p.y * h;
        const grad = ctx.createRadialGradient(px, py, 2, px, py, p.radius);
        grad.addColorStop(0, `rgba(244, 240, 232, ${p.alpha * lifeFade})`);
        grad.addColorStop(1, 'rgba(244, 240, 232, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        maxHeight: '1040px',
        backgroundColor: '#141210',
        color: '#F4F0E8',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Parallax Editorial Photograph */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-4% 0',
          y: imageY,
          scale: imageScale,
          zIndex: 1,
        }}
      >
        <img
          src="./images/espresso-extra-2.jpg"
          alt="Tiger-striped espresso extracting from a bottomless walnut portafilter"
          className="editorial-photo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: 'contrast(1.06) saturate(0.88) brightness(0.78)',
          }}
        />
      </motion.div>

      {/* Atmospheric Architectural Scrims for Deep Contrast */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(95deg, rgba(20,18,16,0.92) 0%, rgba(20,18,16,0.68) 44%, rgba(20,18,16,0.28) 100%), linear-gradient(180deg, rgba(20,18,16,0.55) 0%, rgba(20,18,16,0.08) 42%, rgba(20,18,16,0.88) 100%)',
        }}
      />

      {/* Living Canvas Steam Wisps */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Foreground Content */}
      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          y: textY,
          opacity: textOpacity,
          paddingTop: '7.5rem',
          paddingBottom: 'clamp(2.5rem, 6vh, 4.5rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.75fr)',
          gap: '2.5rem',
          alignItems: 'end',
        }}
      >
        <div className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.35rem',
            }}
          >
            <span style={{ width: 28, height: 1, backgroundColor: '#C69C60' }} />
            <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.16em', color: '#C69C60' }}>
              COPENHAGEN ROASTERY &amp; HARDWARE WORKSHOP
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl"
            style={{ color: '#F4F0E8', maxWidth: '14ch' }}
          >
            Precision instruments{' '}
            <em style={{ fontStyle: 'italic', color: '#E9E2D4' }}>for the morning ritual.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: '1.5rem',
              maxWidth: '46ch',
              fontSize: 'clamp(0.96rem, 1.3vw, 1.08rem)',
              color: 'rgba(244, 240, 232, 0.82)',
              fontWeight: 300,
              lineHeight: 1.65,
            }}
          >
            Dual-boiler espresso machines milled from solid stainless steel, 64mm flat-burr grinders, and seasonal
            high-altitude coffees roasted to order in Nordhavn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: '2.1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.9rem',
              alignItems: 'center',
            }}
          >
            <a href="#catalog" className="btn-pill btn-pill--light" data-cursor="EXPLORE">
              <span>Explore Collection</span>
              <ArrowDownRight size={16} strokeWidth={1.7} />
            </a>
            <a href="#brew-lab" className="btn-pill btn-pill--outline-light" data-cursor="BREW LAB">
              <SlidersHorizontal size={15} strokeWidth={1.6} />
              <span>Dial-In Brew Lab</span>
            </a>
          </motion.div>
        </div>

        {/* Right: Minimal Live Machine Telemetry Card */}
        <motion.div
          className="hero-telemetry-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            justifySelf: 'end',
            width: '100%',
            maxWidth: '330px',
            padding: '1.35rem 1.45rem',
            borderRadius: '10px',
            border: '1px solid rgba(244, 240, 232, 0.16)',
            backgroundColor: 'rgba(20, 18, 16, 0.72)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '0.8rem',
              borderBottom: '1px solid rgba(244, 240, 232, 0.12)',
              marginBottom: '0.9rem',
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: '#C69C60' }}>
              LINEA-01 TELEMETRY
            </span>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: '#A69D91' }}>
              LIVE BENCH
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
            <div>
              <div className="font-mono" style={{ fontSize: '0.66rem', color: '#A69D91' }}>
                BREW BOILER
              </div>
              <div className="font-mono" style={{ fontSize: '1.2rem', color: '#F4F0E8', marginTop: '0.15rem' }}>
                93.2°C
              </div>
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '0.66rem', color: '#A69D91' }}>
                GROUP PRESSURE
              </div>
              <div className="font-mono" style={{ fontSize: '1.2rem', color: '#C69C60', marginTop: '0.15rem' }}>
                9.0 BAR
              </div>
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '0.66rem', color: '#A69D91' }}>
                CURRENT LOT
              </div>
              <div style={{ fontSize: '0.82rem', color: '#F4F0E8', marginTop: '0.15rem' }}>
                Worka Sakaro
              </div>
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '0.66rem', color: '#A69D91' }}>
                EXTRACTION
              </div>
              <div className="font-mono" style={{ fontSize: '0.86rem', color: '#E9E2D4', marginTop: '0.15rem' }}>
                18g → 38g · 28s
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          #top .container {
            grid-template-columns: 1fr !important;
          }
          .hero-telemetry-card {
            justify-self: start !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
