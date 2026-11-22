import { useState, useCallback } from 'react';
import { MotionConfig, motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import MachineAnatomy from './components/MachineAnatomy';
import ProductCatalog from './components/ProductCatalog';
import BrewLab from './components/BrewLab';
import RoasteryOrigins from './components/RoasteryOrigins';
import CraftGallery from './components/CraftGallery';
import TestimonialsBar from './components/TestimonialsBar';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = useState([
    {
      id: 'worka-sakaro-ethiopia',
      name: 'Worka Sakaro — Ethiopia',
      price: 26,
      image: './images/beans-macro-1.jpg',
      variant: 'Whole Bean (250g)',
      qty: 1,
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = useCallback((message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(''), 2200);
  }, []);

  const handleAddToCart = useCallback(
    (product, variant) => {
      const chosenVariant = variant || product.variants[0];
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id && i.variant === chosenVariant);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id && i.variant === chosenVariant ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            variant: chosenVariant,
            qty: 1,
          },
        ];
      });
      showToast(`${product.name} added to bag`);
    },
    [showToast]
  );

  const handleUpdateQty = useCallback((id, variant, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.variant === variant ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const handleRemove = useCallback((id, variant) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.variant === variant)));
  }, []);

  const handleClearCart = useCallback(() => setCart([]), []);

  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="film-grain-overlay" aria-hidden="true" />
      <Preloader />
      <CustomCursor />

      <Navbar cartCount={totalCount} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <MarqueeStrip />
        <MachineAnatomy
          onInspectProduct={(p) => setModalProduct(p)}
          onAddToCart={handleAddToCart}
        />
        <ProductCatalog
          onInspectProduct={(p) => setModalProduct(p)}
          onAddToCart={handleAddToCart}
        />
        <BrewLab onAddToCart={handleAddToCart} />
        <RoasteryOrigins />
        <CraftGallery />
        <TestimonialsBar />
      </main>

      <Footer />

      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClearCart={handleClearCart}
      />

      {/* Subtle Bottom Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '50%',
              x: '-50%',
              zIndex: 120,
              backgroundColor: '#141210',
              color: '#F4F0E8',
              border: '1px solid #C69C60',
              borderRadius: '999px',
              padding: '0.68rem 1.35rem',
              fontSize: '0.8rem',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.28)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
