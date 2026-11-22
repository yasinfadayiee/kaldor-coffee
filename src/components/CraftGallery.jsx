import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JOURNAL_GALLERY } from '../data/catalog';

export default function CraftGallery() {
  const trackRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#E9E2D4',
        color: '#171412',
        paddingBlock: 'clamp(4.5rem, 8vw, 6.5rem)',
        borderTop: '1px solid rgba(23, 20, 18, 0.1)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '2.25rem',
          }}
        >
          <div>
            <span className="eyebrow">FIELD NOTES &amp; WORKSHOP JOURNAL</span>
            <h2 className="display-lg" style={{ marginTop: '0.6rem' }}>
              Inside the <em style={{ fontStyle: 'italic' }}>Copenhagen atelier.</em>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll gallery left"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid rgba(23, 20, 18, 0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F4F0E8',
              }}
            >
              <ArrowLeft size={17} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll gallery right"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid rgba(23, 20, 18, 0.24)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F4F0E8',
              }}
            >
              <ArrowRight size={17} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Tactile Track */}
      <div
        ref={trackRef}
        data-cursor="DRAG"
        className="gallery-track"
        style={{
          display: 'flex',
          gap: '1.35rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingInline: 'clamp(1.25rem, 4vw, 3.5rem)',
          paddingBottom: '0.75rem',
          scrollbarWidth: 'none',
        }}
      >
        {JOURNAL_GALLERY.map((item) => (
          <figure
            key={item.id}
            style={{
              flex: '0 0 clamp(290px, 31vw, 410px)',
              scrollSnapAlign: 'start',
              backgroundColor: '#F4F0E8',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(23, 20, 18, 0.12)',
            }}
          >
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.title}
                className="gallery-card-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.04) saturate(0.88)',
                  transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </div>
            <figcaption style={{ padding: '1.15rem 1.25rem 1.35rem' }}>
              <span className="font-mono" style={{ fontSize: '0.62rem', color: '#B85D3B', letterSpacing: '0.12em' }}>
                {item.tag}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.38rem', marginTop: '0.3rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#625A51', marginTop: '0.35rem', lineHeight: 1.5 }}>
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <style>{`
        .gallery-track::-webkit-scrollbar {
          display: none;
        }
        .gallery-track figure:hover .gallery-card-img {
          transform: scale(1.045);
        }
      `}</style>
    </section>
  );
}
