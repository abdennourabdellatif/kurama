import React, { useState, useEffect } from 'react';
import { Product, CartItem, TranslationStrings } from './types';
import { PRODUCTS, TRANSLATIONS } from './data/products';
import Logo from './components/Logo';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutLayout from './components/CheckoutLayout';
import AboutUs from './components/AboutUs';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Globe, 
  Sparkles, 
  Flame, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Heart,
  Send,
  Check,
  Instagram,
  Music2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Localization: Arabic ('ar') by default since user requested Arabic, with English ('en') support
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    const saved = localStorage.getItem('kurima_lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  const isRtl = lang === 'ar';
  const t = TRANSLATIONS[lang];

  // Search, category & sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'men' | 'women' | 'accessories' | 'unisex'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating-desc'>('default');

  // Shopping cart management
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kurima_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // View state triggers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');

  const navigateToView = (view: 'home' | 'about') => {
    setCurrentView(view);
    setShowCheckout(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Wishlist/Favorites storage helper
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kurima_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Contact support form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  // Mobile navigation trigger
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state modifications to storage
  useEffect(() => {
    localStorage.setItem('kurima_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('kurima_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('kurima_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Adjust page HTML direction based on locale
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [lang, isRtl]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, color: typeof product.colors[0], quantity: number = 1) => {
    setCartItems(prev => {
      // Check if product with identical size and color is already registered
      const matchIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor.code === color.code
      );

      if (matchIdx > -1) {
        const updated = [...prev];
        updated[matchIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });
    // Open the drawer on add for immediate gratification
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) return;
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Filter and sort computation
  const filteredProducts = PRODUCTS.filter(product => {
    const title = (isRtl ? product.titleAr : product.titleEn).toLowerCase();
    const desc = (isRtl ? product.descriptionAr : product.descriptionEn).toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = title.includes(query) || desc.includes(query);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    return 0; // default order based on index
  });

  // Newsletter form submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  // Support form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSent(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setContactSent(false), 5000);
  };

  // Total item count in cart
  const cartBadgeCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen selection:bg-orange-600 selection:text-stone-950 flex flex-col overflow-x-hidden">
      
      {/* 1. TOP PROMO BAR */}
      <div className="bg-gradient-to-r from-orange-950/20 via-orange-600 to-amber-600 text-stone-950 text-center py-2 px-4 font-mono font-bold tracking-wide text-[11px] uppercase flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 fill-current animate-spin" style={{ animationDuration: '6s' }} />
        <span>{t.freeShipping}</span>
        <span className="hidden sm:inline">✦</span>
        <span className="hidden sm:inline font-sans">{isRtl ? 'تسوق إصداراتنا الحصرية الآن' : 'Shop Our Bespoke Masterpieces'}</span>
      </div>

      {/* 2. HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center md:justify-between">
          
          {/* Brand Logo wrapper */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigateToView('home'); }} 
            className="flex items-center" 
            id="navbar-brand-logo"
          >
            <Logo height={42} />
          </a>

          {/* Desktop Nav Paths */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateToView('home'); }} 
              className={`font-semibold transition-colors ${currentView === 'home' ? 'text-orange-400' : 'text-stone-300 hover:text-orange-400'}`}
            >
              {t.home}
            </a>
            <a 
              href="#shop-grid-section" 
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  navigateToView('home');
                  setTimeout(() => {
                    const el = document.getElementById('shop-grid-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-stone-300 hover:text-orange-400 transition-colors font-medium"
            >
              {t.shop}
            </a>
            <a 
              href="#brand-philosophy-section" 
              onClick={(e) => {
                e.preventDefault();
                if (currentView !== 'home' || showCheckout) {
                  navigateToView('home');
                  setTimeout(() => {
                    const el = document.getElementById('brand-philosophy-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('brand-philosophy-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-stone-300 hover:text-orange-400 transition-colors font-semibold"
            >
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </a>
            <a 
              href="#contact-support-section" 
              onClick={(e) => {
                if (currentView !== 'home') {
                  e.preventDefault();
                  navigateToView('home');
                  setTimeout(() => {
                    const el = document.getElementById('contact-support-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-stone-300 hover:text-orange-400 transition-colors font-medium"
            >
              {t.contact}
            </a>
          </nav>

          {/* User Controls Drawer Triggers (Language & Cart & Search bar) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Locale Language selector toggle button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 hover:border-orange-500/40 text-stone-300 hover:text-orange-400 transition-all text-xs font-mono font-semibold"
              title="Change Language / تغيير اللغة"
              id="lang-toggle-btn"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* Shopping Bag Trigger button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-stone-900 hover:bg-stone-850 rounded-full border border-stone-800 hover:border-orange-500/20 text-stone-200 hover:text-orange-400 transition-all cursor-pointer"
              aria-label="Toggle Shopping Cart"
              id="shopping-bag-toggle"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartBadgeCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-orange-600 text-stone-950 font-bold text-[10px] font-mono w-5 h-5 rounded-full flex items-center justify-center animate-bounce"
                    id="cart-badge-count"
                  >
                    {cartBadgeCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Nav menu trigger button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="md:hidden p-2 text-stone-300 hover:text-orange-400 hover:bg-stone-900 rounded-lg transition-all"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown lists */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-stone-900 border-b border-stone-800 text-sm overflow-hidden"
              id="mobile-menu-drawer"
            >
              <div className="px-6 py-6 space-y-4 flex flex-col">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateToView('home'); }}
                  className={`font-bold transition-colors ${currentView === 'home' ? 'text-orange-400' : 'text-stone-350 hover:text-orange-400'}`}
                >
                  {t.home}
                </a>
                <a 
                  href="#shop-grid-section" 
                  onClick={(e) => { 
                    setMobileMenuOpen(false);
                    if (currentView !== 'home') {
                      e.preventDefault();
                      navigateToView('home');
                      setTimeout(() => {
                        const el = document.getElementById('shop-grid-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 105);
                    }
                  }}
                  className="text-stone-350 hover:text-orange-400 transition-colors font-semibold"
                >
                  {t.shop}
                </a>
                <a 
                  href="#brand-philosophy-section" 
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (currentView !== 'home' || showCheckout) {
                      navigateToView('home');
                      setTimeout(() => {
                        const el = document.getElementById('brand-philosophy-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 105);
                    } else {
                      const el = document.getElementById('brand-philosophy-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-stone-350 hover:text-orange-400 transition-colors font-bold"
                >
                  {lang === 'ar' ? 'من نحن' : 'About Us'}
                </a>
                <a 
                  href="#contact-support-section" 
                  onClick={(e) => { 
                    setMobileMenuOpen(false);
                    if (currentView !== 'home') {
                      e.preventDefault();
                      navigateToView('home');
                      setTimeout(() => {
                        const el = document.getElementById('contact-support-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 105);
                    }
                  }}
                  className="text-stone-350 hover:text-orange-400 transition-colors font-semibold"
                >
                  {t.contact}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait">
        {!showCheckout ? (
          <motion.div
            key="home-layouts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow"
          >
            {/* 3. HERO SHOWCASE STAGE */}
            <section className="relative min-h-[85vh] flex items-center justify-center bg-stone-950 overflow-hidden py-12">
              
              {/* Premium Luxury Background Graphic elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-radial from-orange-950/20 to-transparent blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-radial from-amber-950/15 to-transparent blur-[150px]" />
                
                {/* Abstract grid texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

                {/* Cover High Quality Fashion Backdrop model shot, blurred beautifully to serve as deep design layer */}
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
                  alt="Backdrop"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top opacity-15 mix-blend-color-dodge select-none pointer-events-none filter saturate-50"
                />
              </div>

              {/* Hero content container */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-100 space-y-8 flex flex-col items-center">
                
                {/* Micro logo badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-900 border border-stone-800 shadow-xl"
                >
                  <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-300 font-bold">{t.newCollection}</span>
                </motion.div>

                {/* Massive Typography Statements */}
                <div className="space-y-4 max-w-4xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-stone-50 via-stone-100 to-stone-300"
                  >
                    {isRtl ? 'أناقة تعكس شخصيتك' : 'ELEGANCE THAT REFLECTS YOU'}
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm sm:text-base lg:text-lg text-stone-400 font-light max-w-2xl mx-auto leading-relaxed"
                  >
                    {t.exclusiveOffer}
                  </motion.p>
                </div>

                {/* Hero CTAs */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <a
                    href="#shop-grid-section"
                    className="px-8 h-14 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-extrabold rounded-xl shadow-lg shadow-orange-600/10 flex items-center justify-center gap-2 transition-all active:scale-95 duration-200"
                    id="hero-shop-now-btn"
                  >
                    <span>{isRtl ? 'تسوق الآن' : 'Shop Now'}</span>
                    <ShoppingBag className="w-4 h-4 text-stone-950" />
                  </a>
                  <a
                    href="#brand-philosophy-section"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentView !== 'home' || showCheckout) {
                        navigateToView('home');
                        setTimeout(() => {
                          const el = document.getElementById('brand-philosophy-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        const el = document.getElementById('brand-philosophy-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-8 h-14 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-orange-400 font-bold rounded-xl border border-stone-800 flex items-center justify-center transition-all"
                    id="hero-philosophy-btn"
                  >
                    {isRtl ? 'تعرّف علينا' : 'Our Story'}
                  </a>
                </motion.div>

                {/* Trust values markers footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 pt-16 border-t border-stone-900/60 w-full max-w-4xl text-[11px] font-mono uppercase tracking-wider text-stone-500"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-orange-400 text-lg font-bold font-sans">100% Cotton</span>
                    <span>{isRtl ? 'قطن عضوي فاخر' : 'Organic Raw Materials'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-400 text-lg font-bold font-sans">Cash On Delivery</span>
                    <span>{isRtl ? 'الدفع الآمن عند الاستلام' : 'Pay at your doorstep'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-400 text-lg font-bold font-sans">Handcrafted</span>
                    <span>{isRtl ? 'صياغة يدوية فخمة' : 'Signature Detailing'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-400 text-lg font-bold font-sans">2-4 Days</span>
                    <span>{isRtl ? 'شحن محلي سريع' : 'Express Deliveries'}</span>
                  </div>
                </motion.div>

              </div>
            </section>

            {/* 4. MAIN STORE CATALOG GRID & FILTERS */}
            <section className="py-24 bg-stone-950 border-t border-stone-900" id="shop-grid-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center md:text-start flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest block mb-2 font-mono">✦ KORAMA COLLECTION</span>
                    <h2 className="text-2xl sm:text-4xl font-black text-stone-100">
                      {isRtl ? 'تسوّق تشكيلتنا المميزة' : 'Our Special Collection'}
                    </h2>
                  </div>
                  <p className="text-stone-400 font-light max-w-sm text-sm leading-relaxed md:text-right">
                    {isRtl 
                      ? 'اكتشف مجموعة من القطع المختارة بعناية، بتصاميم أنيقة وجودة عالية لترافقك في مختلف مناسباتك.' 
                      : 'Discover a carefully curated selection of clothing combining sleek designs with exceptional quality to suit your daily life.'}
                  </p>
                </div>

                {/* Filters, Search bar and categorization controls */}
                <div className="bg-stone-900 border border-stone-850 p-6 rounded-3xl mb-10 flex flex-col lg:flex-row gap-6 justify-between items-stretch shadow-lg">
                  
                  {/* Category select buttons */}
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <span className="px-4 py-2 bg-orange-950/20 text-orange-400 border border-orange-500/20 text-xs font-mono font-bold rounded-xl">
                      {isRtl ? '✦ مجموعة البولو المضلع الفاخرة' : '✦ Limited Ribbed Polo Collection'}
                    </span>
                  </div>

                  {/* Search box & Sorting select */}
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch lg:min-w-[400px]">
                    
                    {/* Live search input field */}
                    <div className="relative flex-grow">
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="w-full bg-stone-950 border border-stone-800 focus:border-orange-500 focus:outline-none pl-10 pr-4 py-3 rounded-xl text-xs text-stone-100 placeholder-stone-500 transition-colors"
                        id="search-input-field"
                      />
                    </div>

                    {/* Sorting selections */}
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      className="bg-stone-950 border border-stone-800 focus:border-orange-500 focus:outline-none px-4 py-3 rounded-xl text-xs text-stone-300 font-semibold cursor-pointer select-none"
                      id="sorting-select-dropdown"
                    >
                      <option value="default">{isRtl ? 'الترتيب: الافتراضي' : 'Sort: Featured'}</option>
                      <option value="price-asc">{isRtl ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                      <option value="price-desc">{isRtl ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                      <option value="rating-desc">{isRtl ? 'التقييم: الأعلى تقييماً' : 'Rating: Top Rated'}</option>
                    </select>
                  </div>

                </div>

                {/* Main Cards grid rendering (or Empty State) */}
                {filteredProducts.length === 0 ? (
                  <div className="py-24 text-center bg-stone-900/40 border border-dashed border-stone-800 rounded-3xl" id="search-empty-state">
                    <p className="text-stone-400 font-light mb-4 text-sm">
                      {isRtl ? 'لم نجد أي قطعة فريدة بمحركات البحث تطابق كلماتك.' : 'No items match your specific query.'}
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                      className="px-5 py-2.5 bg-stone-900 border border-stone-800 text-xs font-bold text-orange-400 rounded-xl"
                    >
                      {isRtl ? 'مسح فلاتر البحث والعودة' : 'Reset Filters'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" id="product-cards-grid">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        lang={lang}
                        onQuickView={setSelectedProduct}
                        onAddToCartDirect={handleAddToCart}
                      />
                    ))}
                  </div>
                )}

              </div>
            </section>

            {/* 5. BRAND PHILOSOPHY STORY SECTION */}
            <section className="py-24 bg-stone-900 border-y border-stone-850 relative" id="brand-philosophy-section">
              
              {/* background graphic glows */}
              <div className="absolute top-1/2 left-0 w-32 h-32 bg-orange-600/5 blur-[80px]" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  
                  {/* Text Description Part (7 spans) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-orange-600/10 border border-orange-500/20">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      <span className="text-[10px] font-bold font-mono tracking-wider text-orange-400 uppercase">{t.about}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
                      {lang === 'ar' ? 'قصة كوراما' : 'The KORAMA Story'}
                    </h2>
                    <div className="h-1.5 w-16 bg-orange-600 rounded-full" />
                    <p className="text-sm sm:text-base font-light text-stone-300 leading-relaxed">
                      {t.aboutUsText1}
                    </p>

                    {/* Dedicated 'من نحن' (About Us) prominent text section */}
                    <div className="border-t border-stone-850/85 pt-6 mt-6 space-y-3.5">
                      <h3 className="text-lg font-black text-orange-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span>{isRtl ? 'من نحن' : 'About Us'}</span>
                      </h3>
                      <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
                        {isRtl 
                          ? 'كوراما علامة جزائرية تهتم بتقديم ألبسة تجمع بين التصميم العصري والخامات الجيدة. نعمل بعناية لاختيار أفضل المواد ونركز على التفاصيل التي تصنع الفرق، لنمنحك تجربة ترتديها بثقة وراحة.' 
                          : 'KORAMA is an Algerian brand dedicated to offering clothing that combines modern design and quality materials. We select the best fabrics with care and focus on detailing that makes a difference, giving you a confident and comfortable wearing experience.'}
                      </p>
                    </div>

                    {/* Sub philosophical block */}
                    <div className="bg-stone-950/50 border border-stone-800 p-6 rounded-2xl">
                      <h4 className="text-sm font-bold text-orange-400 mb-2 uppercase tracking-wide">
                        {t.brandPhilosophy}
                      </h4>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">
                        {t.brandPhilosophyDesc}
                      </p>
                    </div>
                  </div>

                  {/* Visual Portrait Image element (5 spans) */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    {/* Shadow box */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-amber-500 blur-2xl opacity-10 rounded-3xl" />
                    
                    <div className="relative aspect-[4/5] w-full max-w-[400px] bg-stone-950 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
                      {/* High portrait fashion image */}
                      <img
                        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
                        alt="KORAMA philosophy artwork"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center filter saturate-50 hover:saturate-100 transition-all duration-700"
                      />
                      {/* Mini bottom banner badge info */}
                      <div className="absolute bottom-5 inset-x-5 p-4 bg-stone-900/95 backdrop-blur-sm border border-stone-800 rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-stone-950 text-sm">
                          K
                        </div>
                        <div>
                          <strong className="text-xs font-semibold text-stone-200 block">KORAMA Couture</strong>
                          <span className="text-[10px] text-stone-500 font-mono">EST. 2026 ✦ EXCLUSIVE BRAND</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 6. CONTACT & CUSTOMER SUPPORT FORM SECTION */}
            <section className="py-24 bg-stone-950" id="contact-support-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 bg-stone-900 border border-stone-850 rounded-3xl overflow-hidden shadow-xl">
                  
                  {/* Left Column: info (5 spans) */}
                  <div className="md:col-span-5 p-6 sm:p-8 bg-stone-950/80 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-850">
                    <div className="space-y-6">
                      <div>
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2 font-mono">SUPPORT & DISPATCH</span>
                        <h3 className="text-xl sm:text-2xl font-black text-stone-100">{isRtl ? 'جاهزون لخدمتك دائماً' : 'We are here for you'}</h3>
                      </div>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">
                        {isRtl 
                          ? 'هل لديك تساؤلات متعلقة بقياسات الملابس، حالات الشحن الرقمية، أو ترتيبات الهدايا المخصصة؟ فريقنا جاهز للتواصل الفوري وإرشادك.'
                          : 'Do you have questions about custom sizing tables, order dispatch states, or customized private gift preparations? Get in touch instantly.'}
                      </p>

                      <div className="space-y-4 pt-4 text-xs font-mono">
                        <div className="flex gap-3 items-center text-stone-300">
                          <Mail className="w-4 h-4 text-orange-500" />
                          <span>care@korama-fashion.com</span>
                        </div>
                        <div className="flex gap-3 items-center text-stone-300">
                          <Phone className="w-4 h-4 text-orange-500" />
                          <span>+213 550 00 00 00</span>
                        </div>
                        <div className="flex gap-3 items-center text-stone-300">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span>{isRtl ? 'الجزائر العاصمة، الجزائر' : 'Algiers, Algeria'}</span>
                        </div>
                        <div className="flex gap-3 items-center text-stone-300">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>9:00 AM - 6:00 PM (GMT+1)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-stone-900/60 flex items-center justify-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-[10px] text-stone-500 tracking-wider font-mono">GUARANTEED AUTHENTIC PRODUCTS</span>
                    </div>
                  </div>

                  {/* Right Column: Contact form (7 spans) */}
                  <form onSubmit={handleContactSubmit} className="md:col-span-7 p-6 sm:p-8 space-y-4">
                    <h4 className="text-base font-bold text-stone-100 mb-4">{isRtl ? 'أرسل لنا رسالة مباشرة' : 'Send us a direct message'}</h4>
                    
                    <AnimatePresence>
                      {contactSent ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>{isRtl ? 'تم إرسال رسالتك بنجاح! سيقوم مستشارونا بمراسلتك فوراً.' : 'Message sent successfully! Our advisors will write back shortly.'}</span>
                        </motion.div>
                      ) : (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-stone-400 mb-1">{isRtl ? 'الاسم' : 'Name'}</label>
                              <input
                                type="text"
                                required
                                value={contactForm.name}
                                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                className="w-full bg-stone-950 border border-stone-850 focus:border-orange-500 focus:outline-none px-4 py-2.5 rounded-lg text-xs"
                                id="contact-name"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-stone-400 mb-1">{isRtl ? 'البريد الإلكتروني' : 'Email'}</label>
                              <input
                                type="email"
                                required
                                value={contactForm.email}
                                onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                className="w-full bg-stone-950 border border-stone-850 focus:border-orange-500 focus:outline-none px-4 py-2.5 rounded-lg text-xs"
                                id="contact-email"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-stone-400 mb-1">{isRtl ? 'نص رسالتك أو استفسارك' : 'Your Message'}</label>
                            <textarea
                              rows={4}
                              required
                              value={contactForm.message}
                              onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                              className="w-full bg-stone-950 border border-stone-850 focus:border-orange-500 focus:outline-none px-4 py-2.5 rounded-lg text-xs"
                              id="contact-message"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full h-11 bg-stone-100 hover:bg-orange-600 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 duration-150"
                            id="contact-submit-btn"
                          >
                            <Send className="w-3.5 h-3.5 text-stone-950" />
                            <span>{isRtl ? 'إرسال الرسالة للمستشارين' : 'Send Message'}</span>
                          </button>
                        </div>
                      )}
                    </AnimatePresence>
                  </form>

                </div>
              </div>
            </section>
          </motion.div>
        ) : currentView === 'about' ? (
          <AboutUs
            key="about-view"
            lang={lang}
            onBackToHome={() => navigateToView('home')}
          />
        ) : (
          /* SECURE CHECKOUT PAGE DIRECT MOUNT */
          <CheckoutLayout
            key="checkout-view"
            cartItems={cartItems}
            lang={lang}
            onClose={() => setShowCheckout(false)}
            onClearCart={handleClearCart}
          />
        )}
      </AnimatePresence>

      {/* 7. PREMIUM NEWSLETTER BANNER */}
      <section className="py-16 bg-stone-900 border-t border-stone-850">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex p-3 bg-stone-950 rounded-full border border-stone-800">
            <Mail className="w-6 h-6 text-orange-500 animate-bounce" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-100">
            {t.newsletterTitle}
          </h3>
          <p className="text-xs text-stone-400 font-light max-w-sm mx-auto leading-relaxed">
            {t.newsletterSubtitle}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3 flex-col sm:flex-row items-stretch">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder={isRtl ? 'بريدك الإلكتروني الفاخر' : 'Your email address...'}
              className="flex-grow bg-stone-950 border border-stone-800 focus:border-orange-500 focus:outline-none px-4 py-3 rounded-xl text-xs placeholder-stone-600"
              id="newsletter-email"
            />
            <button
              type="submit"
              className="px-6 h-11 bg-orange-600 hover:bg-orange-500 text-stone-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 transition-all"
              id="newsletter-submit-btn"
            >
              <span>{t.subscribeBtn}</span>
            </button>
          </form>

          <AnimatePresence>
            {newsletterSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-emerald-400 font-medium font-sans"
              >
                {isRtl ? 'تهانينا! لقد انضممت لنادي النخبة كوراما بنجاح.' : 'Congratulations! You joined the KORAMA newsletter circle.'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 8. LUXURY FOOTER PATHS */}
      <footer className="mt-auto bg-stone-950 border-t border-stone-900 py-12 text-xs text-stone-550">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Col 1: Brand description and logo (4 spans) */}
          <div className="md:col-span-4 space-y-4">
            <Logo height={32} />
            <p className="text-stone-400 font-light leading-relaxed max-w-sm">
              {isRtl 
                ? 'علامة كوراما (KORAMA): علامة جزائرية تقدم ألبسة تجمع بين التصميم العصري والخامات الجيدة لتمنحك الأناقة والراحة التي تستحقها.'
                : 'KORAMA: An Algerian brand offering clothing that combines modern design and quality fabrics to give you the elegance and comfort you deserve.'}
            </p>
            {/* Social media connections */}
            <div className="flex gap-3 text-stone-500">
              <a 
                href="https://www.instagram.com/kurama_familles/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
                className="p-2.5 bg-stone-900 border border-stone-850 hover:border-orange-500/20 rounded-full hover:text-orange-550 hover:bg-stone-850 transition-all cursor-pointer flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@ku_ra_ma27?_t=ZS-90TKQdCyLsV&_r=1&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnVqUJ8Vavw9t_MxpmGYaPI1cgFsjYN33GQ10gtLbJN_I6DX8u86Y5_t178c4_aem_vRgPvl5Ff6-kM3UU_2PMVg" 
                target="_blank" 
                rel="noopener noreferrer"
                title="TikTok"
                className="p-2.5 bg-stone-900 border border-stone-850 hover:border-orange-500/20 rounded-full hover:text-orange-550 hover:bg-stone-850 transition-all cursor-pointer flex items-center justify-center"
              >
                <Music2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Fast Links (4 spans) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-stone-400">
            <div>
              <strong className="text-stone-300 font-bold block mb-3 uppercase tracking-wider">{isRtl ? 'تصفح المتجر' : 'Shop Collections'}</strong>
              <ul className="space-y-2">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToView('home'); setSelectedCategory('unisex'); }} className="hover:text-orange-500">{isRtl ? 'للجنسين' : 'Unisex'}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToView('home'); setSelectedCategory('men'); }} className="hover:text-orange-500">{isRtl ? 'تصاميم رجالية' : 'Men’s Wear'}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToView('home'); setSelectedCategory('women'); }} className="hover:text-orange-550">{isRtl ? 'فساتين وأزياء نسائية' : 'Women’s Wear'}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToView('home'); setSelectedCategory('accessories'); }} className="hover:text-orange-500">{isRtl ? 'إكسسوارات جليدية وذهبية' : 'Accessories'}</a></li>
              </ul>
            </div>
            <div>
              <strong className="text-stone-300 font-bold block mb-3 uppercase tracking-wider">{isRtl ? 'القوانين والشفافية' : 'Corporate'}</strong>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#brand-philosophy-section" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (currentView !== 'home' || showCheckout) {
                        navigateToView('home');
                        setTimeout(() => {
                          const el = document.getElementById('brand-philosophy-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        const el = document.getElementById('brand-philosophy-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} 
                    className="hover:text-orange-500"
                  >
                    {lang === 'ar' ? 'من نحن' : 'About Us'}
                  </a>
                </li>
                <li><span className="cursor-not-allowed hover:text-orange-500 block">{isRtl ? 'شروط الخدمة والخصوصية' : 'Terms & Privacy'}</span></li>
                <li><span className="cursor-not-allowed hover:text-orange-500 block">{isRtl ? 'حقوق النشر الفكرية' : 'IP Rights'}</span></li>
                <li><span className="cursor-not-allowed hover:text-orange-500 block">{isRtl ? 'سياسات الاستبدال والتعديل' : 'Fulfillment Policy'}</span></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Safe Badges (4 spans) */}
          <div className="md:col-span-4 space-y-4">
            <strong className="text-stone-300 font-bold block uppercase tracking-wider">{isRtl ? 'تراخيص الحماية المشفرة' : 'Security Standards'}</strong>
            <p className="text-stone-400 font-light leading-relaxed">
              {isRtl 
                ? 'متجر كوراما مرخص بشهادات حماية SSL ويتبع المعايير العالمية لحماية البيانات المصرفية لجميع العملاء عبر خوارزميات غير قابلة للتتبع.' 
                : 'KORAMA uses multi-layered security gates to protect credit card and electronic transactions. Secured with secure socket layers.'}
            </p>
            <div className="pt-2 flex items-center gap-2 px-3 py-1.5 bg-stone-900 border border-stone-850 rounded-lg text-stone-500 text-[10px] uppercase font-mono tracking-wider w-full">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>SSL SECURE COMPLIANT CHECKOUT</span>
            </div>
          </div>

        </div>

        {/* copyright sub footer row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-900/60 text-center text-stone-550 flex justify-between items-center flex-wrap gap-4 font-mono text-[10px]">
          <span>© {new Date().getFullYear()} KORAMA Fashion. All Rights Reserved.</span>
          <span>{isRtl ? 'تم التصميم بالتزام كلي للهوية البصرية لـ كوراما' : 'Designed in strict compliance with the KORAMA visual standards'}</span>
        </div>
      </footer>

      {/* Spacer for Floating Mobile Navigation bar on phone screens */}
      <div className="h-28 md:hidden" />

      {/* 9. MODALS CONTAINER */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            lang={lang}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* 10. CART SIDE DRAWER DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        lang={lang}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => { setIsCartOpen(false); setShowCheckout(true); }}
      />

      {/* 11. CUSTOM DESIGN FOR MOBILE/PHONE SCREEN - FLOATING BOTTOM NAVIGATION DOCK */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-stone-900/95 backdrop-blur-lg border border-stone-800 p-3 rounded-2xl shadow-2xl flex justify-between items-center transition-all duration-300">
        
        {/* Toggle View: Home */}
        <button
          onClick={() => navigateToView('home')}
          className={`flex flex-col items-center gap-1.5 flex-1 py-1 transition-all ${currentView === 'home' && !showCheckout ? 'text-orange-400 scale-105 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
          id="mob-nav-home"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[9px] tracking-wide">{isRtl ? 'الرئيسية' : 'Home'}</span>
        </button>

        {/* Toggle View: Shop Collections section */}
        <a
          href="#shop-grid-section"
          onClick={() => {
            if (currentView !== 'home' || showCheckout) {
              navigateToView('home');
            }
          }}
          className={`flex flex-col items-center gap-1.5 flex-1 py-1 transition-all text-stone-400 hover:text-stone-250`}
          id="mob-nav-shop"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[9px] tracking-wide">{isRtl ? 'المتجر' : 'Shop'}</span>
        </a>

        {/* Action: Open Cart Drawer with dynamic badge indicators */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1.5 flex-1 py-1 transition-all text-stone-400 hover:text-stone-200 relative"
          id="mob-nav-cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-stone-950 font-mono font-black text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-stone-900 animate-bounce">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-wide">{isRtl ? 'السلة' : 'Bag'}</span>
        </button>

        {/* Toggle View: About Us corporate history */}
        <button
          onClick={() => {
            if (currentView !== 'home' || showCheckout) {
              navigateToView('home');
              setTimeout(() => {
                const el = document.getElementById('brand-philosophy-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              const el = document.getElementById('brand-philosophy-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-1.5 flex-1 py-1 transition-all text-stone-400 hover:text-stone-200"
          id="mob-nav-about"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[9px] tracking-wide">{isRtl ? 'من نحن' : 'Story'}</span>
        </button>

        {/* Action: Toggle Language */}
        <button
          onClick={toggleLanguage}
          className="flex flex-col items-center gap-1.5 flex-1 py-1 transition-all text-stone-400 hover:text-stone-200"
          id="mob-nav-lang"
        >
          <Globe className="w-5 h-5 text-orange-400/80" />
          <span className="text-[9px] tracking-widest font-black leading-none">{isRtl ? 'EN' : 'عربي'}</span>
        </button>

      </div>

    </div>
  );
}
