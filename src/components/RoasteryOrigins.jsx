import { useState } from 'react';
import { motion } from 'framer-motion';
import { ROAST_PROFILES } from '../data/catalog';

function buildSmoothPath(points) {
  if (!points || points.length < 2) return '';
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

export default function RoasteryOrigins() {
  const [selectedId, setSelectedId] = useState(ROAST_PROFILES[0].id);
  const profile = ROAST_PROFILES.find((r) => r.id === selectedId) || ROAST_PROFILES[0];
  const pathD = buildSmoothPath(profile.curvePoints);

  return (
    <section
      id="roastery"
      style={{
        backgroundColor: '#F4F0E8',
        color: '#171412',
        paddingBlock: 'clamp(4.5rem, 9vw, 7.5rem)',
      }}
    >
      <div className="container">
        <div
          className="roastery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: Heritage København Drum Roaster Documentary Photo */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(23, 20, 18, 0.14)',
                aspectRatio: '4 / 3',
              }}
            >
              <img
                src="./images/roaster-drum.jpg"
                alt="Heritage København cast-iron coffee drum roaster trier and thermometer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.04) saturate(0.88)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '1rem',
                  bottom: '1rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(20, 18, 16, 0.84)',
                  color: '#F4F0E8',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.66rem', letterSpacing: '0.12em' }}>
                  NORDHAVN ROASTERY · CAST-IRON DRUM BATCHING
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(23, 20, 18, 0.12)',
                  aspectRatio: '16 / 10',
                }}
              >
                <img
                  src="./images/roaster-dropping.jpg"
                  alt="Freshly roasted specialty coffee beans dropping into brass cooling tray"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div
                style={{
                  borderRadius: '10px',
                  padding: '1rem 1.15rem',
                  backgroundColor: '#E9E2D4',
                  border: '1px solid rgba(23, 20, 18, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.64rem', color: '#B85D3B', letterSpacing: '0.12em' }}>
                  ROAST SCHEDULE
                </span>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', lineHeight: 1.2 }}>
                  Small 12kg batches roasted every Tuesday &amp; Friday.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Roast Curve Inspector */}
          <div>
            <span className="eyebrow">THERMAL ROAST CURVES &amp; PROVENANCE</span>
            <h2 className="display-lg" style={{ marginTop: '0.6rem', marginBottom: '1.1rem' }}>
              Every degree <em style={{ fontStyle: 'italic' }}>logged to the second.</em>
            </h2>
            <p style={{ fontSize: '0.94rem', color: '#625A51', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Select a seasonal release below to inspect its exact convective roast curve—from charge temperature and
              turning point through first crack and development time ratio.
            </p>

            {/* Interactive Lot Selector Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.5rem' }}>
              {ROAST_PROFILES.map((item) => {
                const active = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    style={{
                      padding: '0.62rem 1rem',
                      borderRadius: '8px',
                      border: active ? '1px solid #171412' : '1px solid rgba(23, 20, 18, 0.16)',
                      backgroundColor: active ? '#171412' : '#EFEAE0',
                      color: active ? '#F4F0E8' : '#3F3832',
                      textAlign: 'left',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div className="font-mono" style={{ fontSize: '0.6rem', color: active ? '#C69C60' : '#625A51' }}>
                      {item.lot}
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 500, marginTop: '0.1rem' }}>
                      {item.title.split('—')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Animated SVG Roast Curve Panel */}
            <div
              style={{
                backgroundColor: '#141210',
                color: '#F4F0E8',
                borderRadius: '12px',
                padding: '1.4rem 1.5rem',
                border: '1px solid rgba(23, 20, 18, 0.2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.9rem' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '0.64rem', color: '#C69C60', letterSpacing: '0.12em' }}>
                    {profile.origin.toUpperCase()}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', marginTop: '0.15rem' }}>
                    {profile.title}
                  </h3>
                </div>
                <div className="font-mono" style={{ fontSize: '0.82rem', color: '#E9E2D4' }}>
                  DTR {profile.dtr}
                </div>
              </div>

              <svg viewBox="0 0 500 210" style={{ width: '100%', height: 'auto', display: 'block' }}>
                {/* Subtle temperature reference grid */}
                {[40, 90, 140, 185].map((y, idx) => (
                  <g key={y}>
                    <line
                      x1="20"
                      y1={y}
                      x2="480"
                      y2={y}
                      stroke="rgba(244,240,232,0.08)"
                      strokeDasharray="3 5"
                    />
                    <text x="6" y={y + 3} fill="#7B736A" fontSize="8" fontFamily="JetBrains Mono, monospace">
                      {210 - idx * 40}°
                    </text>
                  </g>
                ))}

                {/* Animated Bean Temperature Curve */}
                <motion.path
                  key={profile.id}
                  d={pathD}
                  fill="none"
                  stroke="#C69C60"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Key Milestones: Turning Point, First Crack, Drop */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                  <circle cx={profile.tpPoint[0]} cy={profile.tpPoint[1]} r="4.5" fill="#141210" stroke="#A69D91" strokeWidth="2" />
                  <text x={profile.tpPoint[0] + 8} y={profile.tpPoint[1] + 12} fill="#A69D91" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    TP {profile.turningPoint}
                  </text>

                  <circle cx={profile.fcPoint[0]} cy={profile.fcPoint[1]} r="5" fill="#B85D3B" stroke="#F4F0E8" strokeWidth="1.5" />
                  <text x={profile.fcPoint[0] - 88} y={profile.fcPoint[1] - 10} fill="#F4F0E8" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    1ST CRACK {profile.firstCrack}
                  </text>

                  <circle cx={profile.dropPoint[0]} cy={profile.dropPoint[1]} r="5" fill="#C69C60" stroke="#F4F0E8" strokeWidth="1.5" />
                  <text x={profile.dropPoint[0] - 58} y={profile.dropPoint[1] - 11} fill="#C69C60" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                    DROP {profile.dropTemp}
                  </text>
                </motion.g>
              </svg>

              <motion.div
                key={profile.id}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
                style={{
                  marginTop: '0.85rem',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid rgba(244, 240, 232, 0.1)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                    VARIETAL
                  </div>
                  <div style={{ fontSize: '0.82rem', marginTop: '0.15rem' }}>{profile.varietal}</div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                    PROCESS
                  </div>
                  <div style={{ fontSize: '0.82rem', marginTop: '0.15rem' }}>{profile.process}</div>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.6rem', color: '#A69D91' }}>
                    TOTAL ROAST
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.86rem', color: '#C69C60', marginTop: '0.15rem' }}>
                    {profile.totalTime}
                  </div>
                </div>
              </motion.div>

              <p style={{ marginTop: '0.85rem', fontSize: '0.82rem', color: '#C7BEB3', lineHeight: 1.55 }}>
                {profile.notes}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .roastery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
