import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [pressure, setPressure] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 850;
    let frame;

    const tick = (now) => {
      const elapsed = Math.min((now - start) / duration, 1);
      // Ease out cubic curve simulating rotary pump pressure build-up
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setPressure((eased * 9.0).toFixed(1));
      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 180);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: '#141210',
            color: '#F4F0E8',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(244, 240, 232, 0.12)',
              paddingBottom: '1rem',
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.16em', color: '#A69D91' }}>
              KALDOR · COPENHAGEN
            </span>
            <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#C69C60' }}>
              CALIBRATING GROUPHEAD
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.75rem)', letterSpacing: '0.04em' }}
            >
              KALDOR
            </motion.span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span
                className="font-mono"
                style={{ fontSize: '1.35rem', color: '#C69C60', minWidth: '3.2ch', textAlign: 'right' }}
              >
                {pressure}
              </span>
              <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.14em', color: '#A69D91' }}>
                BAR · 93.2°C PID
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(244, 240, 232, 0.12)', overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#C69C60',
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
