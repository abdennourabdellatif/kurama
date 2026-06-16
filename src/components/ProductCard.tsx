import React, { useState } from 'react';
import { Product } from '../types';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  lang: 'ar' | 'en';
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product, size: string, color: typeof product.colors[0], quantity?: number) => void;
}

export default function ProductCard({ product, lang, onQuickView, onAddToCartDirect }: ProductCardProps) {
  const isRtl = lang === 'ar';
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const title = isRtl ? product.titleAr : product.titleEn;
  const description = isRtl ? product.descriptionAr : product.descriptionEn;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open quick view to let user select the appropriate size first as requested
    onQuickView(product);
  };

  const activeColor = product.colors[activeColorIdx];
  const activeImageIndex = activeColor?.imageIndex !== undefined ? activeColor.imageIndex : activeColorIdx;
  const activeImage = product.images[activeImageIndex] || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 hover:border-orange-500/40 transition-colors duration-300"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-950">
        <img
          src={activeImage}
          alt={title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} flex flex-col gap-2 z-10`}>
          {product.isNew && (
            <span className="bg-orange-600 text-stone-950 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase" id={`badge-new-${product.id}`}>
              {isRtl ? 'جديد' : 'NEW'}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-amber-400 text-stone-950 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full" id={`badge-discount-${product.id}`}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Hover quick action overlay */}
        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-stone-900 hover:bg-orange-500 text-stone-100 hover:text-stone-950 rounded-full shadow-lg transition-colors duration-200"
            title={isRtl ? 'نظرة سريعة' : 'Quick View'}
            id={`btn-quickview-${product.id}`}
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleQuickAdd}
            className="p-3 bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold rounded-full shadow-lg transition-colors duration-200"
            title={isRtl ? 'اختيار المقاس وإضافة للحقيبة' : 'Select size and add to bag'}
            id={`btn-quickadd-${product.id}`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">
            {product.category === 'unisex' ? (isRtl ? 'للجنسين' : 'unisex') : 
             product.category === 'men' ? (isRtl ? 'رجالي' : 'men') : 
             product.category === 'women' ? (isRtl ? 'نسائي' : 'women') : (isRtl ? 'إكسسوارات' : 'accessories')}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-mono">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base text-stone-100 font-medium group-hover:text-orange-400 transition-colors duration-200 line-clamp-1 mb-1.5">
          {title}
        </h3>

        {/* Colors Selectors on Card */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-2 mb-2.5">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColorIdx(idx);
                }}
                className={`w-4 h-4 rounded-full border p-0 transition-all ${
                  activeColorIdx === idx 
                    ? 'border-orange-500 scale-125 ring-2 ring-orange-500/10' 
                    : 'border-stone-800 hover:border-stone-600'
                }`}
                style={{ backgroundColor: color.code }}
                title={isRtl ? color.nameAr : color.nameEn}
              >
                <span className="sr-only">{color.nameEn}</span>
              </button>
            ))}
          </div>
        )}

        {/* Short description */}
        <p className="text-xs text-stone-400 line-clamp-2 mb-4 flex-grow font-light leading-relaxed">
          {description}
        </p>

        {/* Pricing & Call to Action */}
        <div className="flex items-end justify-between pt-3 border-t border-stone-800">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-stone-500 line-through text-xs font-mono mb-0.5">
                {isRtl ? `${product.originalPrice.toLocaleString()} د.ج` : `${product.originalPrice.toLocaleString()} DA`}
              </span>
            )}
            <span className="text-lg font-bold text-orange-400 font-mono">
              {isRtl ? `${product.price.toLocaleString()} د.ج` : `${product.price.toLocaleString()} DA`}
            </span>
          </div>

          <button
            onClick={() => onQuickView(product)}
            className="text-xs font-medium text-stone-300 hover:text-orange-500 transition-colors duration-150 flex items-center gap-1 py-1"
            id={`btn-viewdetails-${product.id}`}
          >
            {isRtl ? 'عرض الخيارات ←' : 'View options →'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
