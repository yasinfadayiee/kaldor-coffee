import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';

const METHODS = [
  {
    id: 'espresso',
    label: 'Espresso · 9 Bar',
    minDose: 16,
    maxDose: 22,
    defaultDose: 18.5,
    minMicron: 200,
    maxMicron: 360,
    defaultMicron: 260,
    ratioBase: 2.05,
  },
  {
    id: 'pourover',
    label: 'Pour-Over V60',
    minDose: 13,
    maxDose: 28,
    defaultDose: 16,
    minMicron: 560,
    maxMicron: 860,
    defaultMicron: 690,
    ratioBase: 16.0,
  },
  {
    id: 'aeropress',
    label: 'AeroPress Press',
    minDose: 12,
    maxDose: 20,
    defaultDose: 15,
    minMicron: 420,
    maxMicron: 660,
    defaultMicron: 520,
    ratioBase: 14.5,
  },
];

const ROAST_STYLES = [
  { id: 'light', label: 'Light Nordic', tempOffset: 1.5, coffeeId: 'worka-sakaro-ethiopia', liquidColor: '#8B451B' },
  { id: 'medium', label: 'Omni Roast', tempOffset: 0, coffeeId: 'el-paraiso-colombia', liquidColor: '#5C2C14' },
  { id: 'dark', label: 'Classic Espresso', tempOffset: -1.8, coffeeId: 'house-no-04-espresso', liquidColor: '#2B170E' },
];

export default function BrewLab({ onAddToCart }) {
  const [methodId, setMethodId] = useState('espresso');
  const [dose, setDose] = useState(18.5);
  const [microns, setMicrons] = useState(260);
  const [roastId, setRoastId] = useState('medium');

  const method = METHODS.find((m) => m.id === methodId) || METHODS[0];
  const roast = ROAST_STYLES.find((r) => r.id === roastId) || ROAST_STYLES[1];

  const handleMethodChange = (nextId) => {
    const next = METHODS.find((m) => m.id === nextId);
    if (!next) return;
    setMethodId(nextId);
    setDose(next.defaultDose);
    setMicrons(next.defaultMicron);
  };

  const telemetry = useMemo(() => {
    const ratioAdjustment = roastId === 'light' ? 0.15 : roastId === 'dark' ? -0.15 : 0;
    const effectiveRatio =
      methodId === 'espresso' ? Number((method.ratioBase + ratioAdjustment).toFixed(1)) : method.ratioBase;
    const yieldGrams = Math.round(dose * effectiveRatio);
    const baseTemp = methodId === 'espresso' ? 93.0 : methodId === 'pourover' ? 94.0 : 91.5;
    const targetTemp = (baseTemp + roast.tempOffset).toFixed(1);

    // Finer grind increases extraction resistance -> longer draw/shot time
    const micronNorm = (microns - method.minMicron) / (method.maxMicron - method.minMicron);
    const brewSeconds =
      methodId === 'espresso'
        ? Math.round(35 - micronNorm * 13 + (dose - method.minDose) * 0.6)
        : methodId === 'pourover'
        ? Math.round(195 - micronNorm * 52 + (dose - method.minDose) * 2.1)
        : Math.round(135 - micronNorm * 35);

    const mahlSetting = (1.6 + ((microns - 180) / 720) * 5.6).toFixed(1);
    const fillRatio = Math.min(0.86, Math.max(0.28, (dose - method.minDose) / (method.maxDose - method.minDose) * 0.45 + 0.36));

    return {
      yieldGrams,
      effectiveRatio,
      targetTemp,
      brewSeconds,
      mahlSetting,
      fillRatio,
      flowRate: 1.5 - micronNorm * 0.65,
    };
  }, [dose, microns, method, methodId, roast.tempOffset, roastId]);

  const matchedCoffee = PRODUCTS.find((p) => p.id === roast.coffeeId) || PRODUCTS[5];

  const formatTime = (sec) => {
    if (sec < 60) return `${sec} sec`;
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}:${String(rem).padStart(2, '0')} min`;
  };

  return (
    <section
      id="brew-lab"
      style={{
        backgroundColor: '#E9E2D4',
        color: '#171412',
        paddingBlock: 'clamp(4.5rem, 9vw, 7.5rem)',
        borderTop: '1px solid rgba(23, 20, 18, 0.1)',
        borderBottom: '1px solid rgba(23, 20, 18, 0.1)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '2.75rem',
          }}
        >
          <div>
            <span className="eyebrow">INTERACTIVE EXTRACTION BENCH</span>
            <h2 className="display-lg" style={{ marginTop: '0.6rem' }}>
              Dial in your <em style={{ fontStyle: 'italic' }}>morning ratio.</em>
            </h2>
          </div>
          <p style={{ maxWidth: '42ch', fontSize: '0.93rem', color: '#625A51', lineHeight: 1.65 }}>
            Adjust dose weight, particle grind size, and roast development to calculate real-time thermal targets and
            Mahl-64 dial settings.
          </p>
        </div>

        {/* Main Workbench Grid */}
        <div
          className="brewlab-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.15fr)',
            gap: 'clamp(1.75rem, 4vw, 3.25rem)',
            backgroundColor: '#F4F0E8',
            border: '1px solid rgba(23, 20, 18, 0.14)',
            borderRadius: '14px',
            padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
          }}
        >
          {/* Left Column: Tactile Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
            <div>
              <div className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: '#625A51', marginBottom: '0.75rem' }}>
                01 · BREWING INSTRUMENT
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {METHODS.map((m) => {
                  const active = m.id === methodId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleMethodChange(m.id)}
                      style={{
                        padding: '0.65rem 1.1rem',
                        borderRadius: '999px',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        border: active ? '1px solid #171412' : '1px solid rgba(23,20,18,0.18)',
                        backgroundColor: active ? '#171412' : 'transparent',
                        color: active ? '#F4F0E8' : '#4E463F',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <label htmlFor="dose-slider" className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                    02 · DRY COFFEE DOSE
                  </label>
                  <span className="font-mono" style={{ fontSize: '0.92rem', fontWeight: 500, color: '#B85D3B' }}>
                    {dose.toFixed(1)} g
                  </span>
                </div>
                <input
                  id="dose-slider"
                  type="range"
                  className="tactile-range"
                  min={method.minDose}
                  max={method.maxDose}
                  step="0.5"
                  value={dose}
                  onChange={(e) => setDose(Number(e.target.value))}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <label htmlFor="grind-slider" className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                    03 · BURR PARTICLE GAP (μm)
                  </label>
                  <span className="font-mono" style={{ fontSize: '0.92rem', fontWeight: 500, color: '#B85D3B' }}>
                    {microns} μm
                  </span>
                </div>
                <input
                  id="grind-slider"
                  type="range"
                  className="tactile-range"
                  min={method.minMicron}
                  max={method.maxMicron}
                  step="10"
                  value={microns}
                  onChange={(e) => setMicrons(Number(e.target.value))}
                />
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                  04 · ROAST DEVELOPMENT
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {ROAST_STYLES.map((r) => {
                    const active = r.id === roastId;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRoastId(r.id)}
                        style={{
                          padding: '0.6rem 0.65rem',
                          borderRadius: '8px',
                          border: active ? '1px solid #B85D3B' : '1px solid rgba(23,20,18,0.14)',
                          backgroundColor: active ? 'rgba(184, 93, 59, 0.1)' : '#EFEAE0',
                          fontSize: '0.76rem',
                          fontWeight: active ? 600 : 400,
                          color: '#171412',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Matched Bean Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '1rem 1.15rem',
                borderRadius: '10px',
                backgroundColor: '#E9E2D4',
                border: '1px solid rgba(23, 20, 18, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={matchedCoffee.image}
                  alt={matchedCoffee.name}
                  style={{ width: 52, height: 52, borderRadius: '6px', objectFit: 'cover' }}
                />
                <div>
                  <div className="font-mono" style={{ fontSize: '0.62rem', color: '#B85D3B', letterSpacing: '0.1em' }}>
                    PAIRED ROASTERY LOT
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', lineHeight: 1.2 }}>
                    {matchedCoffee.name}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onAddToCart(matchedCoffee, matchedCoffee.variants[0])}
                className="btn-pill btn-pill--dark"
                style={{ padding: '0.58rem 0.95rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
              >
                <Plus size={13} />
                <span>Add ${matchedCoffee.price}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Animated Vessel & Extraction Telemetry */}
          <div
            style={{
              backgroundColor: '#141210',
              color: '#F4F0E8',
              borderRadius: '12px',
              padding: 'clamp(1.35rem, 3vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: '#C69C60' }}>
                LIVE EXTRACTION SIMULATION
              </span>
              <span className="font-mono" style={{ fontSize: '0.68rem', color: '#A69D91', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Flame size={12} color="#C69C60" /> {targetTempLabel(telemetry.targetTemp)}
              </span>
            </div>

            {/* Dynamic Animated Vessel SVG */}
            <div
              style={{
                flex: 1,
                minHeight: '235px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <svg viewBox="0 0 280 230" style={{ width: '100%', maxWidth: '300px', height: 'auto' }}>
                {/* Subtle animated rising steam lines */}
                {[115, 140, 165].map((sx, idx) => (
                  <motion.path
                    key={`steam-${idx}`}
                    d={`M ${sx} 52 Q ${sx - 6} 34 ${sx + 3} 16`}
                    fill="none"
                    stroke="rgba(244,240,232,0.22)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    animate={{ y: [0, -10, 0], opacity: [0.15, 0.45, 0.15] }}
                    transition={{ duration: 2.6 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}

                {methodId === 'espresso' && (
                  <g>
                    {/* Bottomless Portafilter Head */}
                    <rect x="92" y="34" width="96" height="16" rx="4" fill="#3B3530" stroke="#C69C60" strokeWidth="1.2" />
                    <rect x="188" y="38" width="54" height="8" rx="4" fill="#6F4C33" />
                    {/* Animated extraction drip cone */}
                    <motion.path
                      d="M 122 50 Q 140 68 158 50 L 142 128 L 138 128 Z"
                      fill="#C69C60"
                      animate={{ opacity: [0.8, 1, 0.85], scaleY: [0.96, 1.04, 0.96] }}
                      transition={{ duration: telemetry.flowRate, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ transformOrigin: '140px 50px' }}
                    />
                    {/* Double-walled glass silhouette */}
                    <path
                      d="M 88 102 L 98 196 Q 100 206 112 206 L 168 206 Q 180 206 182 196 L 192 102 Z"
                      fill="rgba(244,240,232,0.04)"
                      stroke="rgba(244,240,232,0.5)"
                      strokeWidth="1.8"
                    />
                    <defs>
                      <clipPath id="espressoClip">
                        <path d="M 91 104 L 100 194 Q 102 202 112 202 L 168 202 Q 178 202 180 194 L 189 104 Z" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#espressoClip)">
                      <motion.rect
                        x="85"
                        width="110"
                        y={202 - telemetry.fillRatio * 88}
                        height={telemetry.fillRatio * 88 + 10}
                        fill={roast.liquidColor}
                        initial={{
                          y: 202 - telemetry.fillRatio * 88,
                          height: telemetry.fillRatio * 88 + 10,
                        }}
                        animate={{
                          y: 202 - telemetry.fillRatio * 88,
                          height: telemetry.fillRatio * 88 + 10,
                        }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      />
                      {/* Velvety Golden Crema Band */}
                      <motion.rect
                        x="85"
                        width="110"
                        y={202 - telemetry.fillRatio * 88 - 8}
                        height={13}
                        fill="#C69C60"
                        initial={{ y: 202 - telemetry.fillRatio * 88 - 8 }}
                        animate={{ y: 202 - telemetry.fillRatio * 88 - 8 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      />
                    </g>
                  </g>
                )}

                {methodId === 'pourover' && (
                  <g>
                    {/* Porcelain V60 Cone */}
                    <path
                      d="M 86 52 L 194 52 L 154 114 L 126 114 Z"
                      fill="#EAE3D5"
                      stroke="#C69C60"
                      strokeWidth="1.2"
                    />
                    {/* Laminar water pour stream */}
                    <motion.line
                      x1="140"
                      y1="14"
                      x2="140"
                      y2="58"
                      stroke="rgba(244, 240, 232, 0.72)"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: telemetry.flowRate * 0.7, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Dripper stream into glass server */}
                    <motion.line
                      x1="140"
                      y1="114"
                      x2="140"
                      y2="165"
                      stroke={roast.liquidColor}
                      strokeWidth="2.2"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: [0, -16] }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Borosilicate Carafe */}
                    <path
                      d="M 116 116 L 164 116 L 194 188 Q 196 206 176 206 L 104 206 Q 84 206 86 188 Z"
                      fill="rgba(244,240,232,0.04)"
                      stroke="rgba(244,240,232,0.55)"
                      strokeWidth="1.8"
                    />
                    <defs>
                      <clipPath id="v60Clip">
                        <path d="M 118 118 L 162 118 L 191 187 Q 193 203 175 203 L 105 203 Q 87 203 89 187 Z" />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#v60Clip)">
                      <motion.rect
                        x="80"
                        width="120"
                        y={204 - telemetry.fillRatio * 74}
                        height={telemetry.fillRatio * 74 + 10}
                        fill={roast.liquidColor}
                        initial={{
                          y: 204 - telemetry.fillRatio * 74,
                          height: telemetry.fillRatio * 74 + 10,
                        }}
                        animate={{
                          y: 204 - telemetry.fillRatio * 74,
                          height: telemetry.fillRatio * 74 + 10,
                        }}
                        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
                      />
                    </g>
                  </g>
                )}

                {methodId === 'aeropress' && (
                  <g>
                    {/* AeroPress Plunger */}
                    <rect x="108" y="34" width="64" height="54" rx="4" fill="#2A2622" stroke="#C69C60" strokeWidth="1.2" />
                    <rect x="98" y="88" width="84" height="44" rx="3" fill="rgba(244,240,232,0.12)" stroke="rgba(244,240,232,0.45)" strokeWidth="1.4" />
                    <rect x="102" y="132" width="76" height="8" rx="2" fill="#B85D3B" />
                    {/* Ceramic Mug below */}
                    <path
                      d="M 94 144 L 186 144 L 180 202 Q 178 210 166 210 L 114 210 Q 102 210 100 202 Z"
                      fill="rgba(244,240,232,0.06)"
                      stroke="rgba(244,240,232,0.5)"
                      strokeWidth="1.8"
                    />
                    <path d="M 186 154 C 206 154 206 190 183 190" fill="none" stroke="rgba(244,240,232,0.45)" strokeWidth="2" />
                    <motion.line
                      x1="140"
                      y1="140"
                      x2="140"
                      y2="178"
                      stroke="#C69C60"
                      strokeWidth="2.5"
                      strokeDasharray="5 4"
                      animate={{ strokeDashoffset: [0, -18] }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.rect
                      x="103"
                      width="74"
                      rx="3"
                      y={208 - telemetry.fillRatio * 56}
                      height={telemetry.fillRatio * 56}
                      fill={roast.liquidColor}
                      initial={{
                        y: 208 - telemetry.fillRatio * 56,
                        height: telemetry.fillRatio * 56,
                      }}
                      animate={{
                        y: 208 - telemetry.fillRatio * 56,
                        height: telemetry.fillRatio * 56,
                      }}
                      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                    />
                  </g>
                )}

                {/* Stainless Scale Baseplate */}
                <rect x="64" y="212" width="152" height="7" rx="3" fill="#2B2622" stroke="rgba(244,240,232,0.22)" />
              </svg>
            </div>

            {/* Live Computed Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0.75rem',
                paddingTop: '1.15rem',
                borderTop: '1px solid rgba(244, 240, 232, 0.12)',
              }}
              className="brewlab-metrics"
            >
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                  TARGET YIELD
                </div>
                <div className="font-mono" style={{ fontSize: '1.08rem', color: '#F4F0E8', marginTop: '0.2rem' }}>
                  {telemetry.yieldGrams} g
                </div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                  BREW RATIO
                </div>
                <div className="font-mono" style={{ fontSize: '1.08rem', color: '#C69C60', marginTop: '0.2rem' }}>
                  1 : {telemetry.effectiveRatio}
                </div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                  DRAW TIME
                </div>
                <div className="font-mono" style={{ fontSize: '1.08rem', color: '#F4F0E8', marginTop: '0.2rem' }}>
                  {formatTime(telemetry.brewSeconds)}
                </div>
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                  MAHL-64 DIAL
                </div>
                <div className="font-mono" style={{ fontSize: '1.08rem', color: '#B85D3B', marginTop: '0.2rem' }}>
                  #{telemetry.mahlSetting}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .brewlab-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .brewlab-metrics {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function targetTempLabel(temp) {
  return `${temp}°C PID`;
}
