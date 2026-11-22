const ITEMS = [
  'DIRECT TRADE MICROLOTS',
  'DUAL-BOILER ARCHITECTURE',
  'ROASTED TUESDAYS & FRIDAYS',
  '64MM DLC FLAT BURR PRECISION',
  'BREDGADE 42 · COPENHAGEN',
  '±0.1°C PID THERMAL STABILITY',
];

export default function MarqueeStrip() {
  return (
    <div
      className="marquee-wrapper"
      style={{
        backgroundColor: '#141210',
        color: '#F4F0E8',
        borderTop: '1px solid rgba(244, 240, 232, 0.12)',
        borderBottom: '1px solid rgba(244, 240, 232, 0.12)',
        paddingBlock: '1rem',
        overflow: 'hidden',
      }}
    >
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div
            key={dup}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              paddingRight: '2.5rem',
            }}
          >
            {ITEMS.map((text, idx) => (
              <div
                key={`${dup}-${idx}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2.5rem',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#E9E2D4',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {text}
                </span>
                <span style={{ color: '#C69C60', fontSize: '0.65rem' }}>◆</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
