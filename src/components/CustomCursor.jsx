import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [label, setLabel] = useState('');
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 450, damping: 32, mass: 0.4 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 32, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;
    setEnabled(true);

    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target?.closest?.('[data-cursor]');
      if (target) {
        setLabel(target.getAttribute('data-cursor') || '');
        setActive(true);
      } else {
        setLabel('');
        setActive(false);
      }
    };

    const onLeave = () => setActive(false);
    const onDown = () => {
      setLabel('');
      setActive(false);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 150,
      }}
    >
      <motion.div
        animate={{
          width: active && label ? 'auto' : 14,
          height: active && label ? 32 : 14,
          paddingLeft: active && label ? 14 : 0,
          paddingRight: active && label ? 14 : 0,
          backgroundColor: active && label ? '#171412' : 'rgba(198, 156, 96, 0.35)',
          borderColor: active && label ? '#C69C60' : 'rgba(198, 156, 96, 0.85)',
          scale: active ? 1 : 0.9,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderRadius: '999px',
          border: '1px solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: active && label ? 'blur(6px)' : 'none',
          boxShadow: active && label ? '0 8px 24px rgba(0, 0, 0, 0.25)' : 'none',
        }}
      >
        {active && label && (
          <span
            className="font-mono"
            style={{
              fontSize: '0.66rem',
              letterSpacing: '0.14em',
              color: '#F4F0E8',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
