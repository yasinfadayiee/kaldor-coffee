import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setActiveTab('overview');
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  return (
    <>
      <AnimatePresence>
        {product && (
          <motion.div
            key={product.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 130,
            backgroundColor: 'rgba(20, 18, 16, 0.72)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            style={{
              width: '100%',
              maxWidth: '920px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#F4F0E8',
              color: '#171412',
              borderRadius: '14px',
              border: '1px solid rgba(23, 20, 18, 0.16)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.08fr)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: '#E9E2D4',
                border: '1px solid rgba(23, 20, 18, 0.16)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
              }}
            >
              <X size={16} />
            </button>

            {/* Left Photo */}
            <div style={{ backgroundColor: '#DFD7C7', minHeight: '300px' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: product.imagePosition || 'center center',
                  filter: 'contrast(1.04) saturate(0.9)',
                }}
              />
            </div>

            {/* Right Specs & Tabs */}
            <div style={{ padding: 'clamp(1.5rem, 3.2vw, 2.35rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '0.66rem', color: '#B85D3B', letterSpacing: '0.14em' }}>
                  {product.badge}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginTop: '0.35rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', lineHeight: 1.08 }}>
                    {product.name}
                  </h2>
                  <span className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 500 }}>
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#625A51', marginTop: '0.35rem' }}>{product.subtitle}</p>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '1.25rem', borderBottom: '1px solid rgba(23, 20, 18, 0.12)' }}>
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'specs', label: 'Technical Specs' },
                  { id: 'recipe', label: 'Brew Recipe' },
                ].map((t) => {
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTab(t.id)}
                      style={{
                        paddingBottom: '0.6rem',
                        fontSize: '0.82rem',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#171412' : '#625A51',
                        borderBottom: active ? '2px solid #B85D3B' : '2px solid transparent',
                        marginBottom: '-1px',
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div style={{ minHeight: '140px' }}>
                {activeTab === 'overview' && (
                  <div>
                    <p style={{ fontSize: '0.92rem', color: '#3F3832', lineHeight: 1.65 }}>
                      {product.description}
                    </p>
                    {product.tastingNotes && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1rem' }}>
                        {product.tastingNotes.map((n) => (
                          <span
                            key={n}
                            className="font-mono"
                            style={{
                              fontSize: '0.68rem',
                              padding: '0.28rem 0.65rem',
                              backgroundColor: '#E9E2D4',
                              borderRadius: '4px',
                            }}
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {product.specs.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          paddingBottom: '0.5rem',
                          borderBottom: '1px solid rgba(23,20,18,0.08)',
                          fontSize: '0.84rem',
                        }}
                      >
                        <dt className="font-mono" style={{ fontSize: '0.72rem', color: '#625A51' }}>
                          {s.label}
                        </dt>
                        <dd style={{ fontWeight: 500, textAlign: 'right' }}>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {activeTab === 'recipe' && (
                  <div style={{ backgroundColor: '#E9E2D4', padding: '1rem 1.15rem', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div className="font-mono" style={{ fontSize: '0.62rem', color: '#625A51' }}>DOSE</div>
                        <div className="font-mono" style={{ fontSize: '0.95rem' }}>{product.brewRecipe.dose}</div>
                      </div>
                      <div>
                        <div className="font-mono" style={{ fontSize: '0.62rem', color: '#625A51' }}>YIELD</div>
                        <div className="font-mono" style={{ fontSize: '0.95rem' }}>{product.brewRecipe.yield}</div>
                      </div>
                      <div>
                        <div className="font-mono" style={{ fontSize: '0.62rem', color: '#625A51' }}>TEMP / RPM</div>
                        <div className="font-mono" style={{ fontSize: '0.95rem' }}>{product.brewRecipe.temp}</div>
                      </div>
                      <div>
                        <div className="font-mono" style={{ fontSize: '0.62rem', color: '#625A51' }}>TIME</div>
                        <div className="font-mono" style={{ fontSize: '0.95rem' }}>{product.brewRecipe.time}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#4E463F', borderTop: '1px solid rgba(23,20,18,0.1)', paddingTop: '0.65rem' }}>
                      {product.brewRecipe.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Variant Selection */}
              <div>
                <div className="font-mono" style={{ fontSize: '0.66rem', color: '#625A51', marginBottom: '0.5rem' }}>
                  CONFIGURATION / GRIND
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {product.variants.map((v) => {
                    const active = v === selectedVariant;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          padding: '0.45rem 0.9rem',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          border: active ? '1px solid #171412' : '1px solid rgba(23,20,18,0.2)',
                          backgroundColor: active ? '#171412' : 'transparent',
                          color: active ? '#F4F0E8' : '#171412',
                        }}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Bag Action */}
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, selectedVariant || product.variants[0]);
                  onClose();
                }}
                className="btn-pill btn-pill--dark"
                style={{ width: '100%', paddingBlock: '0.95rem' }}
              >
                <Plus size={16} />
                <span>Add to Bag · ${product.price.toLocaleString()}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 760px) {
          .modal-panel {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
