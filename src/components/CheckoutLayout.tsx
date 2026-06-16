import React, { useState, useRef, useEffect } from 'react';
import { CartItem, OrderDetails } from '../types';
import { ShieldCheck, Lock, CreditCard, Calendar, User, EyeOff, MapPin, Phone, Mail, FileCheck, CheckCircle2, QrCode, ArrowRight, ArrowLeft, Truck, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutLayoutProps {
  key?: string | number;
  cartItems: CartItem[];
  lang: 'ar' | 'en';
  onClose: () => void;
  onClearCart: () => void;
}

const ALGERIAN_WILAYAS = [
  { code: '01', ar: '01 - أدرار', en: '01 - Adrar' },
  { code: '02', ar: '02 - الشلف', en: '02 - Chlef' },
  { code: '03', ar: '03 - الأغواط', en: '03 - Laghouat' },
  { code: '04', ar: '04 - أم البواقي', en: '04 - Oum El Bouaghi' },
  { code: '05', ar: '05 - باتنة', en: '05 - Batna' },
  { code: '06', ar: '06 - بجاية', en: '06 - Béjaïa' },
  { code: '07', ar: '07 - بسكرة', en: '07 - Biskra' },
  { code: '08', ar: '08 - بشار', en: '08 - Béchar' },
  { code: '09', ar: '09 - البليدة', en: '09 - Blida' },
  { code: '10', ar: '10 - البويرة', en: '10 - Bouira' },
  { code: '11', ar: '11 - تمنراست', en: '11 - Tamanrasset' },
  { code: '12', ar: '12 - تبسة', en: '12 - Tébessa' },
  { code: '13', ar: '13 - تلمسان', en: '13 - Tlemcen' },
  { code: '14', ar: '14 - تيارت', en: '14 - Tiaret' },
  { code: '15', ar: '15 - تيزي وزو', en: '15 - Tizi Ouzou' },
  { code: '16', ar: '16 - الجزائر العاصمة', en: '16 - Algiers' },
  { code: '17', ar: '17 - الجلفة', en: '17 - Djelfa' },
  { code: '18', ar: '18 - جيجل', en: '18 - Jijel' },
  { code: '19', ar: '19 - سطيف', en: '19 - Sétif' },
  { code: '20', ar: '20 - سعيدة', en: '20 - Saïda' },
  { code: '21', ar: '21 - سكيكدة', en: '21 - Skikda' },
  { code: '22', ar: '22 - سيدي بلعباس', en: '22 - Sidi Bel Abbès' },
  { code: '23', ar: '23 - عنابة', en: '23 - Annaba' },
  { code: '24', ar: '24 - قالمة', en: '24 - Guelma' },
  { code: '25', ar: '25 - قسنطينة', en: '25 - Constantine' },
  { code: '26', ar: '26 - المدية', en: '26 - Médéa' },
  { code: '27', ar: '27 - مستغانم', en: '27 - Mostaganem' },
  { code: '28', ar: '28 - المسيلة', en: '28 - M\'Sila' },
  { code: '29', ar: '29 - معسكر', en: '29 - Mascara' },
  { code: '30', ar: '30 - ورقلة', en: '30 - Ouargla' },
  { code: '31', ar: '31 - وهران', en: '31 - Oran' },
  { code: '32', ar: '32 - البيض', en: '32 - El Bayadh' },
  { code: '33', ar: '33 - إليزي', en: '33 - Illizi' },
  { code: '34', ar: '34 - برج بوعريريج', en: '34 - Bordj Bou Arréridj' },
  { code: '35', ar: '35 - بومرداس', en: '35 - Boumerdès' },
  { code: '36', ar: '36 - الطارف', en: '36 - El Tarf' },
  { code: '37', ar: '37 - تندوف', en: '37 - Tindouf' },
  { code: '38', ar: '38 - تسمسيلت', en: '38 - Tissemsilt' },
  { code: '39', ar: '39 - الوادي', en: '39 - El Oued' },
  { code: '40', ar: '40 - خنشلة', en: '40 - Khenchela' },
  { code: '41', ar: '41 - سوق أهراس', en: '41 - Souk Ahras' },
  { code: '42', ar: '42 - تيبازة', en: '42 - Tipaza' },
  { code: '43', ar: '43 - ميلة', en: '43 - Mila' },
  { code: '44', ar: '44 - عين الدفلى', en: '44 - Aïn Defla' },
  { code: '45', ar: '45 - النعامة', en: '45 - Naâma' },
  { code: '46', ar: '46 - عين تموشنت', en: '46 - Aïn Témouchent' },
  { code: '47', ar: '47 - غرداية', en: '47 - Ghardaïa' },
  { code: '48', ar: '48 - غليزان', en: '48 - Relizane' },
  { code: '49', ar: '49 - تيميمون', en: '49 - Timimoun' },
  { code: '50', ar: '50 - برج باجي مختار', en: '50 - Bordj Badji Mokhtar' },
  { code: '51', ar: '51 - أولاد جلال', en: '51 - Ouled Djellal' },
  { code: '52', ar: '52 - بني عباس', en: '52 - Béni Abbès' },
  { code: '53', ar: '53 - عين صالح', en: '53 - In Salah' },
  { code: '54', ar: '54 - عين قزام', en: '54 - In Guezzam' },
  { code: '55', ar: '55 - تقرت', en: '55 - Touggourt' },
  { code: '56', ar: '56 - جانت', en: '56 - Djanet' },
  { code: '57', ar: '57 - المغير', en: '57 - El M\'Ghair' },
  { code: '58', ar: '58 - المنيعة', en: '58 - El Meniaa' }
];

export default function CheckoutLayout({ cartItems, lang, onClose, onClearCart }: CheckoutLayoutProps) {
  const isRtl = lang === 'ar';
  
  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 15000;
  const shippingCost = isFreeShipping ? 0 : 800;
  const total = subtotal + shippingCost;

  // Checkout steps state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  const [focusedField, setFocusedField] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<OrderDetails | null>(null);

  // Auto scroll to top on step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isProcessing, orderConfirmed]);

  // Form field inputs handlers
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;

    // Custom formatting helpers
    if (name === 'cardNumber') {
      // Remove any non-digits, chunk to groups of 4
      const digitsOnly = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const trimmed = digitsOnly.substring(0, 16);
      const matches = trimmed.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      value = parts.length > 0 ? parts.join(' ') : trimmed;
    } else if (name === 'expiryDate') {
      const clean = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const mm = clean.substring(0, 2);
      const yy = clean.substring(2, 4);

      if (clean.length > 2) {
        value = `${mm}/${yy}`;
      } else {
        value = mm;
      }
    } else if (name === 'cvv') {
      value = value.replace(/[^0-9]/gi, '').substring(0, 4);
    }

    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Basic payment and shipping validations
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!shippingInfo.fullName.trim()) {
      errors.fullName = isRtl ? 'الاسم الكامل مطلوب للتسجيل' : 'Full Name is required';
    }
    if (!shippingInfo.email.trim() || !/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      errors.email = isRtl ? 'البريد الإلكتروني المدخل غير صحيح' : 'Provide a valid email address';
    }
    if (!shippingInfo.phone.trim() || shippingInfo.phone.length < 8) {
      errors.phone = isRtl ? 'رقم الهاتف المعتمد غير صالح' : 'Provide a valid phone number';
    }
    if (!shippingInfo.address.trim()) {
      errors.address = isRtl ? 'العنوان مطلوب لتسهيل شحن الطرد' : 'Shipping Address is required';
    }
    if (!shippingInfo.city.trim()) {
      errors.city = isRtl ? 'الرجاء اختيار ولاية التوصيل' : 'Please select delivery Wilaya';
    }

    // Payment fields (only validate if paying with card)
    if (paymentMethod === 'card') {
      const cardNumClean = paymentInfo.cardNumber.replace(/\s/g, '');
      if (cardNumClean.length < 16) {
        errors.cardNumber = isRtl ? 'رقم البطاقة غير مكتمل (16 رقم)' : 'Card number must be 16 digits';
      }
      if (!paymentInfo.cardholderName.trim()) {
        errors.cardholderName = isRtl ? 'اسم صاحب البطاقة مطلوب' : 'Cardholder name is required';
      }
      if (!paymentInfo.expiryDate.includes('/') || paymentInfo.expiryDate.length < 5) {
        errors.expiryDate = isRtl ? 'تاريخ الصلاحية غير صحيح (MM/YY)' : 'Expiry must be in MM/YY format';
      }
      if (paymentInfo.cvv.length < 3) {
        errors.cvv = isRtl ? 'الرمز السري غير مكتمل (3-4 أرقام)' : 'CVV must be 3 or 4 digits';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate secure registration / bank-level connection (2.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Success response order details generator
    const orderId = `KR-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedDate = new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const confirmedOrder: OrderDetails = {
      id: orderId,
      customerName: shippingInfo.fullName,
      email: shippingInfo.email,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      city: shippingInfo.city,
      items: [...cartItems],
      subtotal,
      shippingCost,
      total,
      date: formattedDate,
      paymentMethod: paymentMethod === 'cod' 
        ? (isRtl ? 'الدفع نقدًا عند الاستلام (COD)' : 'Cash on Delivery (COD)')
        : `Credit Card (Visa/Mastercard Ending in ${paymentInfo.cardNumber.slice(-4)})`,
      status: 'processing'
    };

    setOrderConfirmed(confirmedOrder);
    setIsProcessing(false);
    onClearCart(); // empty real user basket
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8 mt-16" id="checkout-main-view">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Link Nav */}
        {!orderConfirmed && !isProcessing && (
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-stone-400 hover:text-orange-400 mb-8 transition-colors text-sm font-semibold cursor-pointer"
            id="checkout-back-link"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isRtl ? 'العودة لحقيبة المشتريات' : 'Back to Shopping Bag'}</span>
          </button>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: Processing Loader Screen */}
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-stone-900 border border-stone-850 rounded-3xl max-w-2xl mx-auto p-8"
              id="checkout-processing-stage"
            >
              {/* Spinning visual secure shields */}
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-t-orange-500 border-r-transparent border-b-amber-400 border-l-transparent"
                />
                <div className="absolute inset-2 bg-stone-950 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-orange-500 animate-pulse" />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3">
                {isRtl ? 'جاري تأمين وتشفير علميتك المالية...' : 'Securing and Encrypting transaction...'}
              </h2>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed mb-6 font-light">
                {isRtl 
                  ? 'يتم الآن تمرير بيانات الدفع عبر قناة SSL المشفرة برمز حماية 256 بت للتأكيد مع مخدمات بروتوكول البنك عالي الحماية.'
                  : 'Processing details through high-grade 256-bit secure SSL tunnel straight to payment network. Please do not close this window.'}
              </p>
              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-emerald-500 font-bold font-mono">
                <ShieldCheck className="w-4 h-4 fill-emerald-500/10" />
                <span>PCI-DSS COMPLIANT SECURITY</span>
              </div>
            </motion.div>
          ) : orderConfirmed ? (
            
            /* STEP 2: ORDER COMPLETED INVOICE COMPONENT */
            <motion.div
              key="receipt"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
              id="checkout-receipt-stage"
            >
              {/* Congrats Header */}
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h1 className="text-2xl font-extrabold text-stone-100 mb-2">
                  {isRtl ? 'تم تأكيد طلبك بنجاح!' : 'Order Confirmed!'}
                </h1>
                <p className="text-sm text-stone-400 leading-relaxed max-w-md mx-auto">
                  {isRtl 
                    ? `شكرًا لثقتك الفاخرة بـ كوراما (KORAMA) فاميلي. لقد تمت صياغة وتأكيد فاتورتك بنجاح.` 
                    : `Thank you for selecting KORAMA. Your order is registered and currently in active fulfillment.`}
                </p>
              </div>

              {/* Invoice styled box */}
              <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-xl overflow-hidden mb-8">
                
                {/* Visual Receipt Header */}
                <div className="p-6 bg-gradient-to-r from-orange-950/40 via-stone-900 to-amber-950/20 border-b border-stone-800 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <span className="text-[10px] text-orange-400 uppercase tracking-widest font-bold font-mono">INVOICE NO</span>
                    <h3 className="text-lg font-bold font-mono text-stone-200">{orderConfirmed.id}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">ORDER DATE</span>
                    <p className="text-sm font-medium font-mono text-stone-300">{orderConfirmed.date}</p>
                  </div>
                </div>

                {/* Delivery Information details */}
                <div className="p-6 border-b border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                  <div>
                    <strong className="text-stone-400 font-bold uppercase tracking-wider block mb-2">{isRtl ? 'بيانات المستلم والتوصيل:' : 'Deliver To:'}</strong>
                    <p className="text-sm text-stone-100 font-semibold mb-1">{orderConfirmed.customerName}</p>
                    <p className="text-stone-300">{orderConfirmed.address}</p>
                    <p className="text-stone-300 mb-1">{orderConfirmed.city}</p>
                    <p className="text-stone-400 font-mono text-[11px]">{orderConfirmed.phone}</p>
                    <p className="text-stone-400 font-mono text-[11px]">{orderConfirmed.email}</p>
                  </div>
                  <div>
                    <strong className="text-stone-400 font-bold uppercase tracking-wider block mb-2">{isRtl ? 'تفاصيل حالة الشحنة:' : 'Shipping Details:'}</strong>
                    <div className="bg-stone-950/40 p-3 rounded-xl border border-stone-800/80">
                      <p className="text-stone-300 mb-1.5 flex justify-between">
                        <span>{isRtl ? 'حالة الطلب:' : 'Fulfillment Status:'}</span>
                        <span className="text-orange-400 font-bold uppercase font-mono">{isRtl ? 'جاري التنسيق للتغليف' : 'Processing'}</span>
                      </p>
                      <p className="text-stone-300 flex justify-between">
                        <span>{isRtl ? 'التسليم المـتوقّع:' : 'Estimated Delivery:'}</span>
                        <span className="text-stone-200 font-semibold font-mono">2 - 4 {isRtl ? 'أيام عمل' : 'business days'}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items Summaries */}
                <div className="p-6 border-b border-stone-800 space-y-4">
                  <strong className="text-stone-400 text-xs font-bold uppercase tracking-wider block mb-1">{isRtl ? 'المواد المحجوزة:' : 'Ordered Items:'}</strong>
                  {orderConfirmed.items.map((item, idx) => {
                    const title = isRtl ? item.product.titleAr : item.product.titleEn;
                    return (
                      <div key={idx} className="flex justify-between items-center text-xs text-stone-300">
                        <div className="flex items-center gap-3">
                          <span className="bg-stone-850 px-2 py-0.5 rounded text-orange-400 font-mono font-bold">x{item.quantity}</span>
                          <div>
                            <span className="font-medium text-stone-100 block">{title}</span>
                            <span className="text-stone-400 text-[10px] font-mono uppercase tracking-wider">Size: {item.selectedSize} | Color: {isRtl ? item.selectedColor.nameAr : item.selectedColor.nameEn}</span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-stone-100">{(item.product.price * item.quantity).toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Financial invoice values */}
                <div className="p-6 bg-stone-950/30 space-y-3">
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>{isRtl ? 'المجموع الفرعي لأسعار المنتجات' : 'Subtotal'}</span>
                    <span className="font-mono">{orderConfirmed.subtotal.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>{isRtl ? 'رسوم الشحن الآمن والتعبئة' : 'Express Insured Delivery'}</span>
                    <span className="font-mono">
                      {orderConfirmed.shippingCost === 0 ? (
                        <span className="text-emerald-500 font-bold uppercase">{isRtl ? 'مجاني' : 'FREE'}</span>
                      ) : (
                        `${orderConfirmed.shippingCost.toLocaleString()} ${isRtl ? 'د.ج' : 'DA'}`
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-stone-800 my-1" />
                  <div className="flex justify-between text-sm font-bold text-stone-100">
                    <span>{isRtl ? 'المجموع الإجمالي المدفوع ' : 'Total Invoice Paid'}</span>
                    <span className="font-mono text-orange-400 text-base">{orderConfirmed.total.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                  </div>
                </div>
              </div>

              {/* Downloader & Action button bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 h-12 bg-stone-100 hover:bg-orange-600 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                  id="receipt-return-home"
                >
                  <span>{isRtl ? 'العودة للمتجر والاستمرار بالتـسوّق' : 'Back to Shop & Explore'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 h-12 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-orange-400 font-medium rounded-xl flex items-center justify-center gap-2 border border-stone-800 transition-all font-mono text-sm"
                  id="receipt-print-invoice"
                >
                  <FileCheck className="w-4 h-4 text-orange-500" />
                  <span>{isRtl ? 'طباعة الفاتورة الرقمية' : 'Print Digital Invoice'}</span>
                </button>
              </div>
            </motion.div>
          ) : (

            /* STEP 3: MAIN CHECKOUT DOUBLE COLUMN WRAPPER */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Checkout input details (8 Blocks spans) */}
              <div className="lg:col-span-7 xl:col-span-8 bg-stone-900 border border-stone-850 p-6 sm:p-8 rounded-3xl shadow-xl">
                <h1 className="text-xl sm:text-2xl font-extrabold text-stone-100 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-orange-500" />
                  <span>{isRtl ? 'تفاصيل الشراء الآمن' : 'Secure SSL Checkout'}</span>
                </h1>
                <p className="text-xs text-stone-400 mb-8 font-light max-w-lg">
                  {isRtl 
                    ? 'الرجاء إدخال تفاصيل تسليم الشحنة بدقة وبيانات الدفع الخاصة بك لتبسيط معالجة العملية.' 
                    : 'Your information is encrypted and treated with strict bank-level cybersecurity models.'}
                </p>

                <form onSubmit={handlePayNow} className="space-y-8">
                  {/* Part 1: Shipping Addresses fields */}
                  <div>
                    <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 pb-2 border-b border-stone-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span>{isRtl ? '1. معلومات الشحن والتسليم' : '1. Delivery Information'}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-stone-400 mb-1.5">{isRtl ? 'الاسم الكامل للمستلم' : 'Receiver Full Name'}</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                          <input
                            type="text"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleShippingChange}
                            required
                            placeholder={isRtl ? 'مثل: سليمان الفضيل' : 'e.g., Slimane Fodil'}
                            className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors ${
                              formErrors.fullName ? 'border-red-500' : 'border-stone-800'
                            }`}
                            id="shipping-fullName"
                          />
                        </div>
                        {formErrors.fullName && <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs text-stone-400 mb-1.5">{isRtl ? 'البريد الإلكتروني للفواتير' : 'Email Address'}</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                          <input
                            type="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleShippingChange}
                            required
                            placeholder="john@example.com"
                            className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors ${
                              formErrors.email ? 'border-red-500' : 'border-stone-800'
                            }`}
                            id="shipping-email"
                          />
                        </div>
                        {formErrors.email && <p className="text-[11px] text-red-500 mt-1">{formErrors.email}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs text-stone-400 mb-1.5">{isRtl ? 'رقم الهاتف للتواصل' : 'Phone Number'}</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingChange}
                            required
                            placeholder="009665..."
                            className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors ${
                              formErrors.phone ? 'border-red-500' : 'border-stone-800'
                            }`}
                            id="shipping-phone"
                          />
                        </div>
                        {formErrors.phone && <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>}
                      </div>

                      {/* Full Address */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-stone-400 mb-1.5">{isRtl ? 'العنوان بالتفصيل (الحي، الشارع، رقم الشقة)' : 'Shipping Address Detail'}</label>
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          required
                          placeholder={isRtl ? 'مثال: شارع العليا، عمارة الياسمين، شقة 5' : 'e.g., 42 High Street, Flat 5'}
                          className={`w-full bg-stone-950 border rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors ${
                            formErrors.address ? 'border-red-500' : 'border-stone-800'
                          }`}
                          id="shipping-address"
                        />
                        {formErrors.address && <p className="text-[11px] text-red-500 mt-1">{formErrors.address}</p>}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-xs text-stone-400 mb-1.5">{isRtl ? 'الولاية (الجزائر)' : 'Wilaya (Algeria)'}</label>
                        <select
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          required
                          className={`w-full bg-stone-950 border rounded-xl px-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors text-stone-300 ${
                            formErrors.city ? 'border-red-500' : 'border-stone-800'
                          }`}
                          id="shipping-city"
                        >
                          <option value="">{isRtl ? 'اختر الولاية...' : 'Select Wilaya...'}</option>
                          {ALGERIAN_WILAYAS.map((w) => (
                            <option key={w.code} value={isRtl ? w.ar : w.en}>
                              {isRtl ? w.ar : w.en}
                            </option>
                          ))}
                        </select>
                        {formErrors.city && <p className="text-[11px] text-red-500 mt-1">{formErrors.city}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Secure Payment Options */}
                  <div>
                    <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-6 pb-2 border-b border-stone-800 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-orange-500" />
                        <span>{isRtl ? '2. طريقة الدفع وتأكيد الحجز' : '2. Payment Method & Confirmation'}</span>
                      </span>
                      {/* Safety Logo badges */}
                      <span className="flex items-center gap-2.5 opacity-70">
                        <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold bg-stone-950 px-2.5 py-0.5 rounded-md border border-emerald-500/10">{paymentMethod === 'cod' ? 'COD GUARANTEED' : 'SSL SECURE'}</span>
                      </span>
                    </h3>

                    {/* Payment Method Selector Tab */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 rounded-2xl border text-right sm:text-start transition-all cursor-pointer flex items-center gap-4 relative ${
                          paymentMethod === 'cod'
                            ? 'border-orange-500 bg-orange-600/5'
                            : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                        }`}
                        id="select-payment-cod"
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          paymentMethod === 'cod' ? 'border-orange-500' : 'border-stone-700'
                        }`}>
                          {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                        </div>
                        <div className="flex-1">
                          <span className="block text-xs font-bold text-stone-200">
                            {isRtl ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery (COD)'}
                          </span>
                          <span className="block text-[10px] text-stone-400 mt-0.5">
                            {isRtl ? 'الدفع نقدًا عند استلام طلبيتك' : 'Pay in cash at your doorstep'}
                          </span>
                        </div>
                        <Truck className={`w-5 h-5 opacity-20 absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 ${
                          paymentMethod === 'cod' ? 'text-orange-500 opacity-60' : 'text-stone-500'
                        }`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-2xl border text-right sm:text-start transition-all cursor-pointer flex items-center gap-4 relative ${
                          paymentMethod === 'card'
                            ? 'border-orange-500 bg-orange-600/5'
                            : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                        }`}
                        id="select-payment-card"
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          paymentMethod === 'card' ? 'border-orange-500' : 'border-stone-700'
                        }`}>
                          {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                        </div>
                        <div className="flex-1">
                          <span className="block text-xs font-bold text-stone-200">
                            {isRtl ? 'الدفع بالبطاقة البنكية / الائتمان' : 'Pay via Credit Card / CIB'}
                          </span>
                          <span className="block text-[10px] text-stone-400 mt-0.5">
                            {isRtl ? 'بطاقة الذهبية، CIB أو فيزا' : 'Dahabia, CIB or Visa Card'}
                          </span>
                        </div>
                        <CreditCard className={`w-5 h-5 opacity-20 absolute ${isRtl ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 ${
                          paymentMethod === 'card' ? 'text-orange-500 opacity-60' : 'text-stone-500'
                        }`} />
                      </button>
                    </div>

                    {/* DYNAMIC VIEW BASED ON SELECTED PAYMENT METHOD */}
                    {paymentMethod === 'cod' ? (
                      <motion.div
                        key="view-cod"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="bg-stone-950/40 border border-stone-850 rounded-2xl p-6 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent blur-3xl pointer-events-none" />
                        
                        <div className="flex flex-col sm:flex-row gap-5 items-start">
                          <div className="p-3.5 bg-orange-500/10 rounded-xl border border-orange-500/20 shrink-0 text-orange-500">
                            <Coins className="w-6 h-6 animate-pulse" />
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-stone-200">
                              {isRtl ? 'بروتوكول تفاصيل الشحن الفاخر والدفع عند الاستلام' : 'Luxe Delivery & COD Protocol'}
                            </h4>
                            <p className="text-xs text-stone-300 leading-relaxed font-light">
                              {isRtl 
                                ? 'سيتم تسليم الطرد الفاخر الخاص بك في عبوة هدايا كوراما فاميلي المغلفة بأناقة، ولن تحتاج لدفع أي مبلغ الآن. سوف تقوم بدفع القيمة الإجمالية نقداً للمندوب فور وصول الشحنة وباب بيتك وتفقّدك للملابس.'
                                : 'Your pristine KORAMA family package is shipped in a bespoke custom gift wrapping. No payment is required right now. Simply pay the delivery courier in cash at your doorstep once you inspect the premium goods.'}
                            </p>
                            
                            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono text-stone-400">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                <span>{isRtl ? 'إمكانية فتح الطرد والمعاينة قبل الدفع' : 'Package viewing allowed before payment'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                <span>{isRtl ? 'التوصيل لكافة الـ 58 ولاية جزائرية' : 'Coverage across all 58 Wilayas'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                <span>{isRtl ? 'شحن سريع ومضمون عبر Yalidine' : 'Fast, insured logistics via Yalidine'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                <span>{isRtl ? 'دعم العملاء متوفر 24/7' : '24/7 dedicated support desk'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Credit Card Block */
                      <motion.div
                        key="view-card"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col xl:flex-row gap-8 items-start"
                      >
                        {/* Card fields inputs */}
                        <div className="w-full xl:w-1/2 space-y-4">
                          {/* Card Number */}
                          <div>
                            <label className="block text-xs text-stone-400 mb-1.5">
                              {isRtl ? 'رقم البطاقة الائتمانية:' : 'Card Number:'}
                            </label>
                            <div className="relative">
                              <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                              <input
                                type="text"
                                name="cardNumber"
                                value={paymentInfo.cardNumber}
                                onChange={handlePaymentChange}
                                onFocus={() => setFocusedField('number')}
                                onBlur={() => setFocusedField('')}
                                required={paymentMethod === 'card'}
                                placeholder="4000 1234 5678 9010"
                                className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors font-mono ${
                                  formErrors.cardNumber ? 'border-red-500' : 'border-stone-800'
                                }`}
                                id="payment-cardNumber"
                              />
                            </div>
                            {formErrors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{formErrors.cardNumber}</p>}
                          </div>

                          {/* Cardholder Name */}
                          <div>
                            <label className="block text-xs text-stone-400 mb-1.5">
                              {isRtl ? 'الاسم المدون على البطاقة:' : 'Cardholder Name:'}
                            </label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                              <input
                                type="text"
                                name="cardholderName"
                                value={paymentInfo.cardholderName}
                                onChange={handlePaymentChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField('')}
                                required={paymentMethod === 'card'}
                                placeholder="SLIMANE FODIL"
                                className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors uppercase ${
                                  formErrors.cardholderName ? 'border-red-500' : 'border-stone-800'
                                }`}
                                id="payment-cardholderName"
                              />
                            </div>
                            {formErrors.cardholderName && <p className="text-[11px] text-red-500 mt-1">{formErrors.cardholderName}</p>}
                          </div>

                          {/* Expiry & CVV */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-stone-400 mb-1.5">
                                {isRtl ? 'صلاحية الانتهاء:' : 'Expiry Date:'}
                              </label>
                              <div className="relative">
                                <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                                <input
                                  type="text"
                                  name="expiryDate"
                                  value={paymentInfo.expiryDate}
                                  onChange={handlePaymentChange}
                                  onFocus={() => setFocusedField('expiry')}
                                  onBlur={() => setFocusedField('')}
                                  required={paymentMethod === 'card'}
                                  placeholder="MM/YY"
                                  className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors font-mono ${
                                    formErrors.expiryDate ? 'border-red-500' : 'border-stone-800'
                                  }`}
                                  id="payment-expiryDate"
                                />
                              </div>
                              {formErrors.expiryDate && <p className="text-[11px] text-red-500 mt-1">{formErrors.expiryDate}</p>}
                            </div>

                            <div>
                              <label className="block text-xs text-stone-400 mb-1.5">
                                {isRtl ? 'الرمز السري (CVV):' : 'Security (CVV):'}
                              </label>
                              <div className="relative">
                                <EyeOff className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                                <input
                                  type="password"
                                  name="cvv"
                                  value={paymentInfo.cvv}
                                  onChange={handlePaymentChange}
                                  onFocus={() => setFocusedField('cvv')}
                                  onBlur={() => setFocusedField('')}
                                  required={paymentMethod === 'card'}
                                  placeholder="•••"
                                  className={`w-full bg-stone-950 border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-orange-500 focus:outline-none transition-colors font-mono tracking-widest ${
                                    formErrors.cvv ? 'border-red-500' : 'border-stone-800'
                                  }`}
                                  id="payment-cvv"
                                />
                              </div>
                              {formErrors.cvv && <p className="text-[11px] text-red-500 mt-1">{formErrors.cvv}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Live Visual Credit Card Mockup */}
                        <div className="w-full xl:w-1/2 flex justify-center items-center py-4">
                          <div className="w-full max-w-[340px] h-48 [perspective:1000px] select-none pointer-events-none">
                            <motion.div
                              animate={{ rotateY: focusedField === 'cvv' ? 180 : 0 }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]"
                            >
                              {/* FRONT SIDE OF CARD */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-stone-950 via-stone-900 to-amber-950/80 border border-amber-600/20 text-stone-100 flex flex-col justify-between shadow-xl backface-hidden">
                                <div className="flex justify-between items-start">
                                  <span className="font-display font-black text-amber-500 tracking-widest text-sm">KORAMA</span>
                                  <div className="flex flex-col items-end">
                                    <div className="w-8 h-6 bg-amber-400/20 rounded border border-amber-500/30 flex items-center justify-center">
                                      <div className="w-5 h-4 bg-amber-500/50 rounded-sm" />
                                    </div>
                                  </div>
                                </div>
                                <div className="text-lg font-mono font-bold tracking-wider text-center py-2 text-stone-200">
                                  {paymentInfo.cardNumber || '•••• •••• •••• ••••'}
                                </div>
                                <div className="flex justify-between items-end">
                                  <div>
                                    <span className="text-[8px] uppercase tracking-wider text-stone-500 block mb-0.5">Cardholder</span>
                                    <span className="text-xs uppercase font-mono font-medium text-stone-300 line-clamp-1 h-4">
                                      {paymentInfo.cardholderName || 'SLIMANE FODIL'}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[8px] uppercase tracking-wider text-stone-500 block mb-0.5">Expires</span>
                                    <span className="text-xs font-mono font-medium text-stone-300">
                                      {paymentInfo.expiryDate || 'MM/YY'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* REVERSE SIDE OF THE CARD */}
                              <div className="absolute inset-0 w-full h-full rounded-2xl bg-stone-900 border border-stone-850 text-stone-100 flex flex-col justify-between shadow-xl [transform:rotateY(180deg)] backface-hidden py-6">
                                <div className="w-full bg-stone-950 h-10 mb-2" />
                                <div className="px-6 space-y-4">
                                  <div className="flex justify-between items-center bg-stone-950/80 p-2.5 rounded-lg border border-stone-800">
                                    <div className="w-3/4 h-4 bg-gradient-to-r from-stone-800 to-stone-700 opacity-50" />
                                    <span className="font-mono text-stone-950 bg-stone-100 font-bold px-2.5 py-0.5 rounded shadow text-xs">
                                      {paymentInfo.cvv || '•••'}
                                    </span>
                                  </div>
                                  <div className="text-[8px] leading-relaxed text-stone-500 text-center font-light">
                                    This is a cryptographically secured transaction for KORAMA Retail collections. System compliance validated by high-tier standards.
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 items-center justify-between pt-6 border-t border-stone-800">
                    <div className="flex flex-col text-xs text-stone-400 max-w-sm text-right sm:text-start w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1.5 justify-end sm:justify-start">
                        {paymentMethod === 'cod' ? (
                          <>
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-stone-300 font-bold">{isRtl ? 'حجز مؤكد ومضمون:' : 'Guaranteed Safe Reservation:'}</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-emerald-500" />
                            <span className="text-stone-300 font-bold">{isRtl ? 'تشفير معلومات آمن تماماً:' : 'Fully Encrypted Connection:'}</span>
                          </>
                        )}
                      </div>
                      <p className="font-light">
                        {paymentMethod === 'cod' ? (
                          isRtl 
                            ? 'طلبك مسجل وسيصلك اتصال من فريق كوراما لتأكيد موعد وخيارات التوصيل.' 
                            : 'Your application with KORAMA is ready. You will receive a feedback confirmation call.'
                        ) : (
                          isRtl 
                            ? 'نحن نضمن تشفير بياناتك المصرفية ولا يتم تخزينها على مخدماتنا ميزة أمان إضافية.' 
                            : 'Your private credentials remain in-channel without database registration. Security strictly enforced.'
                        )}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 h-14 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-black rounded-xl shadow-lg flex items-center justify-center gap-2.5 cursor-pointer hover:shadow-orange-500/10 active:scale-95 transition-all duration-200 text-base"
                      id="btn-execute-payment"
                    >
                      {paymentMethod === 'cod' ? (
                        <>
                          <Truck className="w-5 h-5 text-stone-950" />
                          <span>{isRtl ? 'تأكيد الحجز والدفع عند الاستلام' : 'Confirm Order & Pay on Delivery'}</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5 text-stone-950" />
                          <span>{isProcessing ? (isRtl ? 'جاري التشفير...' : 'Encrypting...') : (isRtl ? 'ادفع بأمان وسرية الآن' : 'Pay Safely & Securely Now')}</span>
                        </>
                      )}
                    </button>
                  </div>

              </form>
            </div>

              {/* Right Side: Order Summaries (4 Blocks spans) */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                
                {/* Visual Order summary Box */}
                <div className="bg-stone-900 border border-stone-850 p-6 rounded-3xl shadow-lg">
                  <h3 className="text-sm font-bold text-stone-100 uppercase tracking-wider mb-4 pb-2 border-b border-stone-800 flex items-center justify-between">
                    <span>{isRtl ? 'تفاصيل فاتورة حجزك' : 'Order Invoice'}</span>
                    <span className="text-xs text-stone-400 font-mono font-medium">({cartItems.length} {isRtl ? 'قطع' : 'items'})</span>
                  </h3>

                  {/* Mini-list scroll */}
                  <div className="space-y-3 max-h-72 overflow-y-auto mb-6 pr-1">
                    {cartItems.map((item, idx) => {
                      const title = isRtl ? item.product.titleAr : item.product.titleEn;
                      const colorImgIdx = (item.selectedColor as any).imageIndex ?? 0;
                      const displayImage = item.product.images[colorImgIdx] || item.product.images[0];
                      return (
                        <div key={idx} className="flex gap-3 justify-between items-center text-xs text-stone-300">
                          <div className="flex gap-2.5 items-center">
                            <div className="w-10 h-12 bg-stone-950 rounded overflow-hidden shadow">
                              <img src={displayImage} alt={title} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                              <span className="font-medium text-stone-100 block line-clamp-1">{title}</span>
                              <span className="text-stone-500 text-[10px] font-mono">Qty: {item.quantity} | Size: {item.selectedSize}</span>
                            </div>
                          </div>
                          <span className="font-mono text-stone-200 font-medium">{(item.product.price * item.quantity).toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Computations */}
                  <div className="space-y-3 pt-4 border-t border-stone-800 text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>{isRtl ? 'المجموع للمنتجات:' : 'Subtotal:'}</span>
                      <span className="font-mono text-stone-200">{subtotal.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                    </div>
                    
                    <div className="flex justify-between text-stone-400">
                      <span>{isRtl ? 'توصيل مـؤمّن سريع:' : 'Insured Post Delivery:'}</span>
                      <span className="font-mono text-stone-200">
                        {shippingCost === 0 ? (
                          <span className="text-emerald-500 font-bold uppercase">{isRtl ? 'مجاني' : 'FREE'}</span>
                        ) : (
                          `${shippingCost.toLocaleString()} ${isRtl ? 'د.ج' : 'DA'}`
                        )}
                      </span>
                    </div>

                    <div className="h-px bg-stone-800/80 my-2" />
                    
                    <div className="flex justify-between text-sm font-bold text-stone-100">
                      <span>{isRtl ? 'المجموع النهائي للفاتورة:' : 'Total Amount Due:'}</span>
                      <span className="font-mono text-orange-400 text-base">{total.toLocaleString()} {isRtl ? 'د.ج' : 'DA'}</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Payment / Delivery Badges depending on selected paymentMethod */}
                <div className="bg-stone-900 border border-stone-850 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center">
                  {paymentMethod === 'cod' ? (
                    <>
                      <div className="flex gap-2.5 justify-center items-center opacity-80">
                        <span className="font-mono text-[9px] font-black text-orange-400 tracking-wider px-2 py-0.5 border border-orange-500/15 rounded bg-orange-500/5">YALIDINE EXPRESS</span>
                        <span className="font-mono text-[9px] font-black text-stone-300 tracking-wider px-2 py-0.5 border border-stone-800 rounded bg-stone-950">58 WILAYAS</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-sans tracking-wide">
                        {isRtl 
                          ? 'الشحن متوفر عبر شبكات Yalidine لجميع الولايات مع خيار تفقد الطرد قبل الدفع.'
                          : 'Shipping across Yalidine delivery network to 58 Wilayas with complete order-unpacking preview option.'}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-3 justify-center items-center opacity-65">
                        <span className="font-mono text-[10px] font-bold text-stone-300 tracking-tighter px-1.5 py-0.5 border border-stone-700 rounded-md">VISA</span>
                        <span className="font-mono text-[10px] font-bold text-stone-300 tracking-tighter px-1.5 py-0.5 border border-stone-700 rounded-md">MASTERCARD</span>
                        <span className="font-mono text-[10px] font-bold text-stone-300 tracking-tighter px-1.5 py-0.5 border border-stone-700 rounded-md">AMEX</span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-sans tracking-wide">
                        {isRtl 
                          ? 'جميع المدفوعات مؤمنة ومشفرة تماماً عبر مزود بوابات الدفع المرخص.'
                          : 'All credit details parsed with complete direct network-level security.'}
                      </span>
                    </>
                  )}
                </div>

              </div>

            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
