import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Plus, Minus, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailsModalProps {
  product: Product | null;
  lang: 'ar' | 'en';
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: typeof product.colors[0], quantity: number) => void;
}

export default function ProductDetailsModal({ product, lang, onClose, onAddToCart }: ProductDetailsModalProps) {
  if (!product) return null;

  const isRtl = lang === 'ar';
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping'>('details');

  const title = isRtl ? product.titleAr : product.titleEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        {/* Modal Center Wrapper */}
        <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] overflow-y-auto md:overflow-hidden"
            id={`details-modal-${product.id}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} z-20 p-2 bg-stone-950/60 hover:bg-orange-600 text-stone-200 hover:text-stone-950 rounded-full transition-colors duration-200`}
              id="details-modal-close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Section 1: Left - Image Gallery Stage */}
            <div className="w-full md:w-1/2 bg-stone-950 p-6 flex flex-col justify-between max-h-[45vh] md:max-h-full overflow-hidden items-center">
              <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-2xl h-[30vh] md:h-[45vh] aspect-[3/4] w-full">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top rounded-2xl transition-all duration-500"
                />
                
                {discount > 0 && (
                  <span className={`absolute top-2 ${isRtl ? 'right-2' : 'left-2'} bg-orange-600 text-stone-950 text-xs font-bold px-3 py-1 rounded-full`}>
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex justify-center gap-3 mt-4 overflow-x-auto py-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIdx(idx);
                        const matchingColor = product.colors.find(c => c.imageIndex === idx);
                        if (matchingColor) {
                          setSelectedColor(matchingColor);
                        }
                      }}
                      className={`relative w-16 h-20 bg-stone-900 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIdx === idx ? 'border-orange-500 scale-105' : 'border-stone-800 opacity-60 hover:opacity-100'
                      }`}
                      id={`thumb-btn-${idx}`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: Right - Details form */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col max-h-[50vh] md:max-h-full md:overflow-y-auto">
              {/* Category & Badge */}
              <div className="mb-2">
                <span className="text-[11px] uppercase tracking-widest text-orange-500 font-bold font-mono">
                  {product.category === 'unisex' ? (isRtl ? 'تشكيلة للجنسين' : 'unisex Collection') : 
                   product.category === 'men' ? (isRtl ? 'التشكيلة الرجالية' : 'Men’s Collection') : 
                   product.category === 'women' ? (isRtl ? 'التشكيلة النسائية' : 'Women’s Collection') : (isRtl ? 'الإكسسوارات الفاخرة' : 'Luxury Accessories')}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-stone-100 mb-2">
                {title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'}`}
                    />
                  ))}
                  <span className="font-mono text-stone-300 font-semibold text-sm ms-2">{product.rating}</span>
                </div>
                <div className="h-4 w-px bg-stone-800" />
                <span className="text-xs text-stone-400 font-light font-mono underline cursor-pointer">
                  {product.reviewsCount} {isRtl ? 'تقييم موثق' : 'verified reviews'}
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6 p-3 bg-stone-950/40 rounded-xl border border-stone-800/60">
                <span className="text-2xl font-black text-orange-400 font-mono">
                  {isRtl ? `${product.price.toLocaleString()} د.ج` : `${product.price.toLocaleString()} DA`}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-stone-500 line-through font-mono text-base">
                      {isRtl ? `${product.originalPrice.toLocaleString()} د.ج` : `${product.originalPrice.toLocaleString()} DA`}
                    </span>
                    <span className="text-xs text-emerald-500 font-medium">
                      ({isRtl ? 'وفرت ' : 'Save '} {isRtl ? `${(product.originalPrice - product.price).toLocaleString()} د.ج` : `${(product.originalPrice - product.price).toLocaleString()} DA`})
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
                {description}
              </p>

              {/* Form Controls: Colors */}
              <div className="mb-5">
                <span className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                  {isRtl ? 'اختر اللون للمنتج:' : 'Select Color:'} <span className="text-orange-400 font-semibold">{isRtl ? selectedColor.nameAr : selectedColor.nameEn}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(color);
                        if (color.imageIndex !== undefined) {
                          setActiveImageIdx(color.imageIndex);
                        }
                      }}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor.code === color.code ? 'border-orange-500 scale-110 shadow-lg shadow-orange-500/25' : 'border-stone-800 hover:border-stone-500'
                      }`}
                      style={{ backgroundColor: color.code === '#D4AF37' ? '#b8860b' : color.code }}
                      title={isRtl ? color.nameAr : color.nameEn}
                      id={`color-choice-${idx}`}
                    >
                      <span className="sr-only">{color.nameEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Controls: Sizes */}
              <div className={`mb-6 p-3 rounded-2xl transition-all duration-300 ${sizeError ? 'border border-red-500/50 bg-red-500/5 ring-1 ring-red-500/30' : 'border border-transparent'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
                    {isRtl ? 'اختر المقاس الملائم:' : 'Select Size:'} <span className="text-orange-400 font-bold">{selectedSize || (isRtl ? 'الرجاء اختيار مقاس' : 'Please select a size')}</span>
                  </span>
                  <span className="text-[10px] text-stone-400 hover:text-orange-400 cursor-pointer underline transition-colors">
                    {isRtl ? 'جدول القياسات العالمي' : 'Size Chart'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSize(sz);
                        setSizeError(false);
                      }}
                      className={`px-4 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'border-orange-500 bg-orange-600/10 text-orange-400 shadow-md shadow-orange-500/10'
                          : sizeError 
                            ? 'border-red-900/60 hover:border-red-500 text-red-200 bg-red-950/20' 
                            : 'border-stone-800 hover:border-stone-600 text-stone-300'
                      }`}
                      id={`size-choice-${sz}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 font-medium mt-3 flex items-center gap-1.5"
                  >
                    <span>⚠️</span>
                    <span>{isRtl ? 'يرجى تحديد المقاس المناسب أولاً قبل إضافة هذه القطعة الفاخرة للحقيبة.' : 'Please select your size first before we can add this premium piece to your bag.'}</span>
                  </motion.div>
                )}
              </div>

              {/* Form Controls: Quantity & Action Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-8 pt-4 border-t border-stone-800/60">
                {/* Quantity adjust */}
                <div className="flex items-center justify-between border border-stone-800 rounded-xl px-3 bg-stone-950/40 h-12 w-full sm:w-32">
                  <button
                    onClick={handleDecreaseQty}
                    className="p-1 hover:text-orange-400 transition-colors"
                    id="qty-decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-bold text-stone-100 text-base">{quantity}</span>
                  <button
                    onClick={handleIncreaseQty}
                    className="p-1 hover:text-orange-400 transition-colors"
                    id="qty-increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleAdd}
                  className="flex-grow flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-bold rounded-xl h-12 transition-all shadow-lg active:scale-95 duration-200"
                  id="add-to-bag-cta"
                >
                  <span>{isRtl ? 'إضافة القطعة لحقيبتك' : 'Add to Shopping Bag'}</span>
                </button>
              </div>

              {/* Product Specifications & Details Toggles */}
              <div className="mt-2 border border-stone-800 rounded-2xl overflow-hidden bg-stone-950/20">
                <div className="flex border-b border-stone-800">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-3 text-xs font-bold uppercase transition-colors ${
                      activeTab === 'details' ? 'bg-stone-900 border-b-2 border-orange-500 text-orange-400' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {isRtl ? 'خصائص القطعة' : 'Specifications'}
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`flex-1 py-3 text-xs font-bold uppercase transition-colors ${
                      activeTab === 'shipping' ? 'bg-stone-900 border-b-2 border-orange-500 text-orange-400' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {isRtl ? 'الشحن والتبديل السهل' : 'Shipping & Returns'}
                  </button>
                </div>

                <div className="p-4 text-xs">
                  {activeTab === 'details' ? (
                    <ul className="space-y-2 text-stone-300 list-disc list-inside">
                      {(isRtl ? product.detailsAr : product.detailsEn).map((d, i) => (
                        <li key={i} className="font-light leading-relaxed">
                          {d}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3 font-light leading-relaxed text-stone-400">
                      <div className="flex gap-2.5 items-start">
                        <Truck className="w-4 h-4 text-orange-500 shrink-0" />
                        <div>
                          <strong className="text-stone-300 font-medium block">
                            {isRtl ? 'شحن فائق السرعة' : 'Express Secure Shipping'}
                          </strong>
                          <span>
                            {isRtl ? 'شحن سريع مغلف بحرص لجميع المدن خلال 2-4 أيام عمل.' : 'Dispatched via premium couriers in 2 to 4 working days.'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <RefreshCw className="w-4 h-4 text-orange-500 shrink-0" />
                        <div>
                          <strong className="text-stone-300 font-medium block">
                            {isRtl ? 'إرجاع واستبدال مرن' : 'Easy 14-day Exchanges'}
                          </strong>
                          <span>
                            {isRtl ? 'لا تقلق من المقاس! نوفر إمكانية استبدال القطعة بسهولة خلال 14 يوماً.' : 'Worried about sizing? Adjust easily with our 14-day easy return policy.'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start">
                        <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
                        <div>
                          <strong className="text-stone-300 font-medium block">
                            {isRtl ? 'تغليف الهدايا الفاخر' : 'Premium Luxe Signature Wrap'}
                          </strong>
                          <span>
                            {isRtl ? 'يصلك الطلب في الصندوق الفاخر والمبني من أوراق سميكة مخملية.' : 'Arrives in the signature heavy-gauge brand box lined with black silk paper.'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
