import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onClearCart,
}) {
  const [step, setStep] = useState('bag'); // 'bag' | 'checkout' | 'confirmed'
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    if (!isOpen && step === 'confirmed') {
      setStep('bag');
    }
  }, [isOpen, step]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !address.trim()) return;
    const code = `KLD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderRef(code);
    setStep('confirmed');
    onClearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 140,
            backgroundColor: 'rgba(20, 18, 16, 0.58)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Shopping Bag"
            style={{
              width: '100%',
              maxWidth: '450px',
              height: '100%',
              backgroundColor: '#F4F0E8',
              color: '#171412',
              borderLeft: '1px solid rgba(23, 20, 18, 0.14)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.35rem 1.5rem',
                borderBottom: '1px solid rgba(23, 20, 18, 0.12)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: '#B85D3B', letterSpacing: '0.14em' }}>
                  KALDOR DISPATCH
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', lineHeight: 1.1 }}>
                  {step === 'bag' ? 'Your Selection' : step === 'checkout' ? 'Courier Dispatch' : 'Batch Confirmed'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close shopping bag"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(23, 20, 18, 0.16)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Free Courier Progress Bar */}
            {step === 'bag' && (
              <div
                style={{
                  padding: '0.85rem 1.5rem',
                  backgroundColor: '#E9E2D4',
                  borderBottom: '1px solid rgba(23, 20, 18, 0.1)',
                }}
              >
                <div className="font-mono" style={{ fontSize: '0.68rem', color: '#3F3832', marginBottom: '0.45rem' }}>
                  {remaining === 0
                    ? 'COMPLIMENTARY INSURED COURIER SHIPPING UNLOCKED'
                    : `ADD $${remaining.toLocaleString()} MORE FOR COMPLIMENTARY COURIER SHIPPING`}
                </div>
                <div style={{ height: 3, backgroundColor: 'rgba(23,20,18,0.12)', borderRadius: 99, overflow: 'hidden' }}>
                  <motion.div
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%', backgroundColor: '#5C6B58' }}
                  />
                </div>
              </div>
            )}

            {/* Main Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.35rem 1.5rem' }}>
              {step === 'confirmed' ? (
                <div style={{ paddingBlock: '2.5rem', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="#5C6B58" strokeWidth={1.5} style={{ marginInline: 'auto' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '1rem' }}>
                    Thank you, {email.split('@')[0]}.
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#625A51', marginTop: '0.65rem', lineHeight: 1.6 }}>
                    Your instruments and fresh roastery lots are queued for inspection &amp; dispatch from Copenhagen.
                  </p>
                  <div
                    style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      borderRadius: '10px',
                      backgroundColor: '#E9E2D4',
                      border: '1px solid rgba(23,20,18,0.12)',
                      textAlign: 'left',
                    }}
                  >
                    <div className="font-mono" style={{ fontSize: '0.66rem', color: '#625A51' }}>
                      ORDER REFERENCE
                    </div>
                    <div className="font-mono" style={{ fontSize: '1.05rem', color: '#B85D3B', marginTop: '0.2rem' }}>
                      {orderRef}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#3F3832', marginTop: '0.45rem' }}>
                      Destination: {address}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('bag');
                      onClose();
                    }}
                    className="btn-pill btn-pill--dark"
                    style={{ marginTop: '1.75rem', width: '100%' }}
                  >
                    <span>Return to Storefront</span>
                  </button>
                </div>
              ) : step === 'checkout' ? (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <label htmlFor="checkout-email" className="font-mono" style={{ display: 'block', fontSize: '0.66rem', color: '#625A51', marginBottom: '0.4rem' }}>
                      DISPATCH EMAIL
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      placeholder="name@studio.dk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.78rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(23,20,18,0.2)',
                        backgroundColor: '#EFEAE0',
                        fontSize: '0.9rem',
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-address" className="font-mono" style={{ display: 'block', fontSize: '0.66rem', color: '#625A51', marginBottom: '0.4rem' }}>
                      SHIPPING ADDRESS &amp; CITY
                    </label>
                    <textarea
                      id="checkout-address"
                      required
                      rows={3}
                      placeholder="Bredgade 42, 1260 København K, Denmark"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.78rem 0.9rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(23,20,18,0.2)',
                        backgroundColor: '#EFEAE0',
                        fontSize: '0.9rem',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <div style={{ padding: '0.9rem 1rem', borderRadius: '8px', backgroundColor: '#E9E2D4', fontSize: '0.82rem', color: '#4E463F' }}>
                    Order simulation mode: no card charge will occur. Submitting generates your live Copenhagen batch receipt.
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setStep('bag')}
                      className="btn-pill btn-pill--outline-dark"
                      style={{ flex: 0.7 }}
                    >
                      <span>Back</span>
                    </button>
                    <button type="submit" className="btn-pill btn-pill--dark" style={{ flex: 1.3 }}>
                      <span>Place Order · ${subtotal.toLocaleString()}</span>
                    </button>
                  </div>
                </form>
              ) : items.length === 0 ? (
                <div style={{ paddingBlock: '3.5rem', textAlign: 'center', color: '#625A51' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#171412' }}>
                    Your bag is currently empty.
                  </p>
                  <p style={{ fontSize: '0.86rem', marginTop: '0.5rem' }}>
                    Explore espresso instruments or fresh seasonal coffees to begin.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variant}`}
                      style={{
                        display: 'flex',
                        gap: '0.9rem',
                        paddingBottom: '1.1rem',
                        borderBottom: '1px solid rgba(23, 20, 18, 0.1)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: '8px',
                          objectFit: 'cover',
                          backgroundColor: '#DFD7C7',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', lineHeight: 1.15 }}>
                            {item.name}
                          </div>
                          <span className="font-mono" style={{ fontSize: '0.86rem' }}>
                            ${(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                        <div className="font-mono" style={{ fontSize: '0.68rem', color: '#625A51', marginTop: '0.2rem' }}>
                          {item.variant}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.65rem' }}>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              border: '1px solid rgba(23,20,18,0.18)',
                              borderRadius: '999px',
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, item.variant, -1)}
                              aria-label="Decrease quantity"
                              style={{ padding: '0.3rem 0.6rem' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono" style={{ fontSize: '0.76rem', paddingInline: '0.45rem' }}>
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.id, item.variant, 1)}
                              aria-label="Increase quantity"
                              style={{ padding: '0.3rem 0.6rem' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(item.id, item.variant)}
                            aria-label={`Remove ${item.name}`}
                            style={{ color: '#625A51', padding: '0.25rem' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {step === 'bag' && items.length > 0 && (
              <div
                style={{
                  padding: '1.25rem 1.5rem 1.5rem',
                  borderTop: '1px solid rgba(23, 20, 18, 0.12)',
                  backgroundColor: '#EFEAE0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#625A51' }}>Subtotal</span>
                  <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="btn-pill btn-pill--dark"
                  style={{ width: '100%', paddingBlock: '0.95rem' }}
                >
                  <span>Proceed to Dispatch</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
