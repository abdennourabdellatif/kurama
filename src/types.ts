export interface TranslationStrings {
  home: string;
  shop: string;
  about: string;
  contact: string;
  cart: string;
  searchPlaceholder: string;
  categories: string;
  featuredProducts: string;
  addToCart: string;
  quickView: string;
  viewDetails: string;
  size: string;
  color: string;
  inStock: string;
  outOfStock: string;
  subtotal: string;
  shipping: string;
  freeShipping: string;
  freeShippingCongrats: string;
  secureCheckout: string;
  continueShopping: string;
  checkoutTitle: string;
  deliveryInfo: string;
  paymentInfo: string;
  orderCompleted: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  payNow: string;
  processingPayment: string;
  orderSuccessMsg: string;
  newCollection: string;
  exclusiveOffer: string;
  aboutUsText1: string;
  aboutUsText2: string;
  brandPhilosophy: string;
  brandPhilosophyDesc: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  subscribeBtn: string;
  all: string;
}

export interface Product {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'men' | 'women' | 'accessories' | 'unisex';
  sizes: string[];
  colors: { nameAr: string; nameEn: string; code: string; imageIndex?: number }[];
  isFeatured?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  detailsAr: string[];
  detailsEn: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { nameAr: string; nameEn: string; code: string };
  quantity: number;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  date: string;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped';
}
