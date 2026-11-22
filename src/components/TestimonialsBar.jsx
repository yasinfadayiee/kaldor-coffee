import { ENDORSEMENTS } from '../data/catalog';

export default function TestimonialsBar() {
  return (
    <section
      style={{
        backgroundColor: '#F4F0E8',
        color: '#171412',
        paddingBlock: 'clamp(3.75rem, 7vw, 5.75rem)',
        borderTop: '1px solid rgba(23, 20, 18, 0.12)',
      }}
    >
      <div className="container">
        <div style={{ marginBottom: '2.25rem' }}>
          <span className="eyebrow">IN THE WILD · PARTNER STUDIOS</span>
        </div>

        <div
          className="endorsements-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '2rem',
          }}
        >
          {ENDORSEMENTS.map((item) => (
            <blockquote
              key={item.author}
              style={{
                borderTop: '1px solid rgba(23, 20, 18, 0.18)',
                paddingTop: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.32rem',
                  lineHeight: 1.32,
                  color: '#171412',
                }}
              >
                “{item.quote}”
              </p>
              <footer>
                <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{item.author}</div>
                <div className="font-mono" style={{ fontSize: '0.68rem', color: '#625A51', marginTop: '0.2rem' }}>
                  {item.role}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .endorsements-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
