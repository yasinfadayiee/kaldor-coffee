import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Plus, Check } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';

function ProductCard({ product, onInspect, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#EFEAE0',
        border: '1px solid rgba(23, 20, 18, 0.11)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      {/* Photo Stage */}
      <div
        onClick={() => onInspect(product)}
        data-cursor="INSPECT"
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          backgroundColor: '#DFD7C7',
          cursor: 'pointer',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: product.imagePosition || 'center center',
            filter: 'contrast(1.04) saturate(0.9)',
            transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <span
          className="font-mono"
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            fontSize: '0.64rem',
            letterSpacing: '0.12em',
            padding: '0.28rem 0.62rem',
            borderRadius: '999px',
            backgroundColor: 'rgba(20, 18, 16, 0.82)',
            color: '#F4F0E8',
            backdropFilter: 'blur(6px)',
          }}
        >
          {product.badge}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onInspect(product);
          }}
          aria-label={`Quick view ${product.name}`}
          style={{
            position: 'absolute',
            bottom: '0.85rem',
            right: '0.85rem',
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: 'rgba(244, 240, 232, 0.92)',
            color: '#171412',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.14)',
          }}
        >
          <Eye size={16} strokeWidth={1.6} />
        </button>
      </div>

      {/* Card Body */}
      <div
        style={{
          padding: '1.35rem 1.35rem 1.45rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '1.05rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}
          >
            <h3
              onClick={() => onInspect(product)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.48rem',
                lineHeight: 1.15,
                cursor: 'pointer',
              }}
            >
              {product.name}
            </h3>
            <span
              className="font-mono"
              style={{
                fontSize: '0.96rem',
                fontWeight: 500,
                color: '#171412',
                whiteSpace: 'nowrap',
              }}
            >
              ${product.price.toLocaleString()}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.8rem',
              color: '#625A51',
              marginTop: '0.35rem',
              lineHeight: 1.45,
            }}
          >
            {product.subtitle}
          </p>

          {/* Tasting Notes & Sensory Bars for Coffee Lots */}
          {product.tastingNotes && (
            <div style={{ marginTop: '0.95rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.7rem' }}>
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.18rem 0.52rem',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(23, 20, 18, 0.06)',
                      color: '#3F3832',
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.55rem' }}>
                {Object.entries(product.tastingScores).map(([key, val]) => (
                  <div key={key}>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.58rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#625A51',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {key}
                    </div>
                    <div style={{ height: 3, backgroundColor: 'rgba(23,20,18,0.12)', borderRadius: 99 }}>
                      <div
                        style={{
                          width: `${val}%`,
                          height: '100%',
                          backgroundColor: '#B85D3B',
                          borderRadius: 99,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Variant Quick Picker + Add Button */}
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.85rem' }}>
            {product.variants.map((v) => {
              const active = v === selectedVariant;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    fontSize: '0.68rem',
                    padding: '0.25rem 0.58rem',
                    borderRadius: '999px',
                    border: active ? '1px solid #171412' : '1px solid rgba(23, 20, 18, 0.16)',
                    backgroundColor: active ? '#171412' : 'transparent',
                    color: active ? '#F4F0E8' : '#4E463F',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.55rem' }}>
            <button
              type="button"
              onClick={handleAdd}
              className="btn-pill btn-pill--dark"
              style={{
                flex: 1,
                padding: '0.72rem 1rem',
                fontSize: '0.8rem',
                backgroundColor: justAdded ? '#5C6B58' : undefined,
                borderColor: justAdded ? '#5C6B58' : undefined,
              }}
            >
              {justAdded ? <Check size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={1.8} />}
              <span>{justAdded ? 'Added to Bag' : 'Add to Bag'}</span>
            </button>
            <button
              type="button"
              onClick={() => onInspect(product)}
              className="btn-pill btn-pill--outline-dark"
              style={{ padding: '0.72rem 1rem', fontSize: '0.8rem' }}
            >
              <span>Specs</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductCatalog({ onInspectProduct, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="catalog"
      style={{
        backgroundColor: '#F4F0E8',
        color: '#171412',
        paddingBlock: 'clamp(4.5rem, 9vw, 7.5rem)',
      }}
    >
      <div className="container">
        {/* Editorial Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <span className="eyebrow">CURATED COLLECTION · AUTUMN HARVEST</span>
            <h2 className="display-lg" style={{ marginTop: '0.6rem' }}>
              Hardware &amp; <em style={{ fontStyle: 'italic' }}>single-origin lots.</em>
            </h2>
          </div>

          <p style={{ maxWidth: '40ch', fontSize: '0.92rem', color: '#625A51', lineHeight: 1.6 }}>
            Every machine is bench-tested in Copenhagen prior to crating; all coffees ship within 48 hours of roasting.
          </p>
        </div>

        {/* Category Filter Tabs with Sliding layoutId Underline */}
        <div
          role="tablist"
          aria-label="Filter collection by category"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem 1.75rem',
            borderBottom: '1px solid rgba(23, 20, 18, 0.12)',
            paddingBottom: '0.1rem',
            marginBottom: '2.5rem',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  position: 'relative',
                  paddingBlock: '0.8rem',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#171412' : '#625A51',
                  transition: 'color 0.2s ease',
                }}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="activeCatalogTab"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -1,
                      height: 2,
                      backgroundColor: '#B85D3B',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Responsive Product Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="catalog-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1.65rem',
          }}
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onInspect={onInspectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        article:hover .product-card-img {
          transform: scale(1.045);
        }
        @media (max-width: 1080px) {
          .catalog-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 680px) {
          .catalog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
