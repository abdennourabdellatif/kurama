import React from 'react';
import { CartItem } from '../types';
import { X, Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  lang: 'ar' | 'en';
  onClose: () => void;
  onUpdateQty: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  cartItems,
  lang,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const isRtl = lang === 'ar';
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 15000;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;
  const isFreeShipping = remainingForFreeShipping <= 0;
  const shippingCost = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 800);
  const total = subtotal + shippingCost;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        {/* Drawer container - positioning based on RTL */}
        <div className={`fixed inset-y-0 ${isRtl ? 'left-0' : 'right-0'} max-w-full flex ${isRtl ? 'pr-10' : 'pl-10'}`}>
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col h-full shadow-2xl relative"
            id="shopping-cart-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold text-stone-100">
                  {isRtl ? 'حقيبة التسوّق' : 'Shopping Bag'}
                </h2>
                <span className="bg-stone-800 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold text-orange-400">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-800 text-stone-400 hover:text-stone-100 rounded-full transition-colors"
                id="cart-drawer-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Dynamic Meter */}
            {cartItems.length > 0 && (
              <div className="bg-stone-950/60 p-4 border-b border-stone-800/80">
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-stone-300 font-light">
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-medium">
                        ✦ {isRtl ? 'تهانينا! لقد تأهلت للحصول على شحن مجاني فاخر' : 'Congratulations! You qualify for Free Luxury Shipping!'}
                      </span>
                    ) : (
                      <span>
                        {isRtl ? 'بقيت ' : 'You are only '}
                        <strong className="text-orange-400 font-mono font-bold">{remainingForFreeShipping.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</strong>
                        {isRtl ? ' فقط للحصول على الشحن المجاني' : ' away from FREE premium shipping.'}
                      </span>
                    )}
                  </span>
                  <span className="text-stone-400 font-mono text-[10px]">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-stone-800/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-600 to-amber-400 h-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4" id="cart-empty-state">
                  <div className="w-16 h-16 rounded-full bg-stone-950 flex items-center justify-center mb-4 border border-stone-800">
                    <ShoppingBag className="w-8 h-8 text-stone-500 animate-pulse" />
                  </div>
                  <h3 className="text-base font-semibold text-stone-200 mb-1">
                    {isRtl ? 'حقيبة التسوّق فارغة حالياً' : 'Your Shopping Bag is empty'}
                  </h3>
                  <p className="text-xs text-stone-400 max-w-[250px] leading-relaxed mb-6">
                    {isRtl ? 'استعرض مجموعات كوريما الراقية واملأها بالقطع التي تعبر عن حضورك الفريد.' : 'Browse our high-end garments and load it with pieces expressing your style.'}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-orange-600 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md"
                  >
                    {isRtl ? 'استعراض تصاميم كوريما' : 'Explore Collections'}
                  </button>
                </div>
              ) : (
                 cartItems.map((item, idx) => {
                  const title = isRtl ? item.product.titleAr : item.product.titleEn;
                  const colorName = isRtl ? item.selectedColor.nameAr : item.selectedColor.nameEn;
                  const colorImgIdx = (item.selectedColor as any).imageIndex ?? 0;
                  const displayImage = item.product.images[colorImgIdx] || item.product.images[0];
                  return (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-stone-950/30 rounded-2xl border border-stone-850 hover:border-stone-800 transition-colors"
                      id={`cart-item-${idx}`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-20 bg-stone-950 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={displayImage}
                          alt={title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info & Modifiers */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          {/* Heading & Delete info */}
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-stone-100 line-clamp-1">
                              {title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-stone-500 hover:text-red-500 transition-colors p-1"
                              id={`cart-item-delete-${idx}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Selections metadata */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-stone-400">
                            <span className="font-mono">
                              {isRtl ? 'المقاس: ' : 'Size: '}
                              <strong className="text-orange-400">{item.selectedSize}</strong>
                            </span>
                            <span className="h-2 w-px bg-stone-800" />
                            <span className="flex items-center gap-1">
                              <span>{isRtl ? 'اللون: ' : 'Color: '}</span>
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-stone-700"
                                style={{ backgroundColor: item.selectedColor.code }}
                              />
                              <strong className="text-stone-300 font-light">{colorName}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Quantity Counter & Subtotal */}
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-3 border border-stone-800 bg-stone-950/60 rounded-lg px-2 py-0.5 scale-90 origin-left">
                            <button
                              onClick={() => onUpdateQty(idx, item.quantity - 1)}
                              className="p-1 hover:text-orange-400 transition-colors text-stone-500"
                              disabled={item.quantity <= 1}
                              id={`item-qty-dec-${idx}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-stone-200 text-xs">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(idx, item.quantity + 1)}
                              className="p-1 hover:text-orange-400 transition-colors text-stone-500"
                              id={`item-qty-inc-${idx}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-bold text-orange-400">
                            {(item.product.price * item.quantity).toLocaleString()} {isRtl ? 'د.ج' : 'DA'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Calculations & CTA Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-stone-950/80 border-t border-stone-800 space-y-4">
                <div className="space-y-2 text-sm text-stone-400">
                  <div className="flex justify-between">
                    <span>{isRtl ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span className="font-mono text-stone-200">{subtotal.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{isRtl ? 'رسوم الشحن والتأمين:' : 'Shipping & Handling:'}</span>
                    <span className="font-mono text-stone-200">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-500 text-xs uppercase font-bold">
                          {isRtl ? 'مجاني' : 'FREE'}
                        </span>
                      ) : (
                        `${shippingCost.toLocaleString()} ${isRtl ? 'د.ج' : 'DA'}`
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-stone-800/80 my-2" />
                  <div className="flex justify-between text-base font-bold text-stone-100">
                    <span>{isRtl ? 'المجموع الإجمالي:' : 'Total Invoice:'}</span>
                    <span className="font-mono text-orange-400 text-lg">{total.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                  </div>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center justify-center gap-1.5 bg-stone-900 border border-emerald-500/10 text-[11px] text-stone-400 py-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>
                    {isRtl ? 'عملية مشفرة بالكامل بدرجة تشفير بنكية آمنة' : 'Bank-level encryptions protecting your session'}
                  </span>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={onCheckout}
                  className="w-full h-12 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/10 active:scale-95 transition-all duration-200 text-sm cursor-pointer"
                  id="checkout-cta"
                >
                  <span>{isRtl ? 'الانتقال إلى الدفع الآمن' : 'Proceed to Secure Checkout'}</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
