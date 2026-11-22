import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { MACHINE_HOTSPOTS, PRODUCTS } from '../data/catalog';

export default function MachineAnatomy({ onInspectProduct, onAddToCart }) {
  const [activeId, setActiveId] = useState(MACHINE_HOTSPOTS[0].id);
  const activeHotspot = MACHINE_HOTSPOTS.find((h) => h.id === activeId) || MACHINE_HOTSPOTS[0];
  const lineaMachine = PRODUCTS[0];

  // Dynamic pressure curve path shifting slightly based on selected subsystem
  const curveMap = {
    gauge: 'M 10 112 C 48 110, 62 78, 92 78 C 125 78, 138 24, 178 24 L 250 24 C 276 24, 294 52, 315 62',
    timers: 'M 10 112 C 52 108, 72 80, 108 80 C 138 80, 152 24, 188 24 L 245 24 C 270 24, 290 48, 315 58',
    grouphead: 'M 10 112 C 42 110, 60 72, 88 72 C 120 72, 135 22, 175 22 L 258 22 C 280 22, 298 46, 315 54',
    driptray: 'M 10 112 C 46 110, 66 76, 98 76 C 128 76, 142 26, 182 26 L 252 26 C 276 26, 295 60, 315 66',
    tamper: 'M 10 112 C 40 110, 56 76, 86 76 C 115 76, 128 24, 168 24 L 260 24 C 282 24, 296 42, 315 48',
  };

  return (
    <section
      id="anatomy"
      style={{
        backgroundColor: '#141210',
        color: '#F4F0E8',
        paddingBlock: 'clamp(4.5rem, 9vw, 7.5rem)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(244, 240, 232, 0.12)',
            marginBottom: '3rem',
          }}
        >
          <div>
            <span className="eyebrow eyebrow--dark">INSTRUMENT ANATOMY · LINEA-01</span>
            <h2 className="display-lg" style={{ marginTop: '0.65rem', maxWidth: '16ch' }}>
              Machined tolerances, <em style={{ fontStyle: 'italic', color: '#C69C60' }}>exposed.</em>
            </h2>
          </div>

          <p
            style={{
              maxWidth: '42ch',
              color: '#A69D91',
              fontSize: '0.94rem',
              lineHeight: 1.65,
            }}
          >
            Select any architectural beacon on the chassis to inspect its thermal behavior, mechanical clearances, and
            9-bar pressure curve.
          </p>
        </div>

        {/* Interactive Split Anatomy */}
        <div
          className="anatomy-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.38fr) minmax(0, 0.92fr)',
            gap: 'clamp(1.75rem, 4vw, 3.25rem)',
            alignItems: 'start',
          }}
        >
          {/* Left Column: High-Resolution Studio Image + Index Strip */}
          <div style={{ minWidth: 0, width: '100%' }}>
            <div
              data-cursor="INSPECT"
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(244, 240, 232, 0.14)',
                backgroundColor: '#1D1A17',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src="./images/machine-solo.jpg"
                alt="Kaldor Linea-01 espresso machine hardware anatomy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.06) saturate(0.92)',
                }}
              />

              {/* Subtle top/bottom vignette for clear beacon visibility */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at center, transparent 45%, rgba(20,18,16,0.45) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* 5 Interactive Pulsing Brass Beacons */}
              {MACHINE_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    onMouseEnter={() => setActiveId(spot.id)}
                    aria-label={`Inspect ${spot.title}`}
                    style={{
                      position: 'absolute',
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: isSelected ? 6 : 4,
                    }}
                  >
                    {/* Expanding pulse ring */}
                    <motion.span
                      animate={{
                        scale: isSelected ? [1, 1.9, 1] : [1, 1.45, 1],
                        opacity: isSelected ? [0.85, 0, 0.85] : [0.45, 0, 0.45],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: `1px solid ${isSelected ? '#C69C60' : 'rgba(244, 240, 232, 0.7)'}`,
                      }}
                    />
                    {/* Core marker pill */}
                    <span
                      className="font-mono"
                      style={{
                        position: 'relative',
                        width: isSelected ? 28 : 22,
                        height: isSelected ? 28 : 22,
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#C69C60' : 'rgba(20, 18, 16, 0.85)',
                        color: isSelected ? '#141210' : '#F4F0E8',
                        border: `1.5px solid ${isSelected ? '#F4F0E8' : '#C69C60'}`,
                        fontSize: '0.62rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.45)',
                      }}
                    >
                      {spot.code}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clean Quick Index Selector Strip Below Chassis Frame */}
            <div
              style={{
                marginTop: '0.9rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
              }}
            >
              {MACHINE_HOTSPOTS.map((spot) => {
                const selected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    className="font-mono"
                    style={{
                      fontSize: '0.64rem',
                      letterSpacing: '0.08em',
                      padding: '0.38rem 0.72rem',
                      borderRadius: '999px',
                      backgroundColor: selected ? '#C69C60' : '#1D1A17',
                      color: selected ? '#141210' : '#E9E2D4',
                      border: `1px solid ${selected ? '#C69C60' : 'rgba(244, 240, 232, 0.16)'}`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {spot.code} · {spot.title.split(' ')[0].toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Telemetry & Live Extraction Curve */}
          <div
            style={{
              backgroundColor: '#1D1A17',
              border: '1px solid rgba(244, 240, 232, 0.12)',
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0.25, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: '#C69C60' }}>
                    SUBSYSTEM {activeHotspot.code} / 05
                  </span>
                  <span className="font-mono" style={{ fontSize: '0.68rem', color: '#A69D91' }}>
                    {activeHotspot.spec}
                  </span>
                </div>

                <h3 className="display-md" style={{ color: '#F4F0E8', marginBottom: '0.85rem' }}>
                  {activeHotspot.title}
                </h3>

                <p style={{ color: '#C7BEB3', fontSize: '0.94rem', lineHeight: 1.65 }}>
                  {activeHotspot.description}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginTop: '1.5rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(244, 240, 232, 0.1)',
                  }}
                >
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: '#A69D91', letterSpacing: '0.1em' }}>
                      OPERATING TARGET
                    </div>
                    <div className="font-mono" style={{ fontSize: '1.08rem', color: '#F4F0E8', marginTop: '0.2rem' }}>
                      {activeHotspot.peakBar}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.65rem', color: '#A69D91', letterSpacing: '0.1em' }}>
                      TOLERANCE SPEC
                    </div>
                    <div className="font-mono" style={{ fontSize: '1.08rem', color: '#C69C60', marginTop: '0.2rem' }}>
                      {activeHotspot.tempRange}
                    </div>
                  </div>
                </div>
              </motion.div>

            {/* Live SVG Pressure Profile Graph */}
            <div
              style={{
                backgroundColor: '#141210',
                border: '1px solid rgba(244, 240, 232, 0.1)',
                borderRadius: '8px',
                padding: '1rem 1.1rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span className="font-mono" style={{ fontSize: '0.64rem', color: '#A69D91', letterSpacing: '0.12em' }}>
                  28S PRESSURE PROFILE (BAR)
                </span>
                <span className="font-mono" style={{ fontSize: '0.64rem', color: '#C69C60' }}>
                  PRE-INFUSION → 9.0 → TAPER
                </span>
              </div>

              <svg viewBox="0 0 325 125" style={{ width: '100%', height: 'auto', display: 'block' }}>
                {/* Subtle grid lines */}
                {[30, 62, 94].map((y) => (
                  <line
                    key={y}
                    x1="10"
                    y1={y}
                    x2="315"
                    y2={y}
                    stroke="rgba(244,240,232,0.08)"
                    strokeDasharray="3 4"
                  />
                ))}
                {/* Y-axis markers */}
                <text x="10" y="20" fill="#A69D91" fontSize="8" fontFamily="JetBrains Mono, monospace">
                  9 BAR
                </text>
                <text x="10" y="72" fill="#A69D91" fontSize="8" fontFamily="JetBrains Mono, monospace">
                  3 BAR
                </text>

                {/* Animated Extraction Curve */}
                <motion.path
                  key={activeHotspot.id}
                  d={curveMap[activeHotspot.id]}
                  fill="none"
                  stroke="#C69C60"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Pulsing endpoint indicator */}
                <motion.circle
                  key={`dot-${activeHotspot.id}`}
                  cx="315"
                  cy={activeHotspot.id === 'tamper' ? 48 : activeHotspot.id === 'driptray' ? 66 : 58}
                  r="4"
                  fill="#B85D3B"
                  stroke="#F4F0E8"
                  strokeWidth="1.5"
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </svg>
            </div>

            {/* Direct Hardware CTA */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => onInspectProduct(lineaMachine)}
                className="btn-pill btn-pill--light"
                style={{ flex: 1, minWidth: '175px' }}
              >
                <span>Inspect Linea-01</span>
                <ArrowUpRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => onAddToCart(lineaMachine, lineaMachine.variants[0])}
                className="btn-pill btn-pill--outline-light"
              >
                <Plus size={15} />
                <span>Add · ${lineaMachine.price.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .anatomy-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
