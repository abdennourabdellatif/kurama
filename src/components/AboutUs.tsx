import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Eye, 
  Award, 
  History, 
  Paintbrush, 
  Layers, 
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import Logo from './Logo';

interface AboutUsProps {
  key?: string | number;
  lang: 'ar' | 'en';
  onBackToHome: () => void;
}

export default function AboutUs({ lang, onBackToHome }: AboutUsProps) {
  const isRtl = lang === 'ar';

  // State for interactive logo philosophy parts
  const [activeElement, setActiveElement] = useState<'flame' | 'pillar' | 'canvas'>('flame');

  const content = {
    ar: {
      title: 'من نحن - كوراما',
      subtitle: 'كوراما علامة تهتم بتقديم ألبسة تجمع بين التصميم العصري والخامات الجيدة',
      backBtn: 'العودة للمتجر الرئيسي',
      foundingTitle: 'قصة كوراما',
      foundingText1: 'قصة كوراما بدأت بشغف لصناعة ملابس تجمع بين الأناقة والجودة. نؤمن أن الملابس ليست مجرد مظهر، بل وسيلة للتعبير عن الشخصية والثقة بالنفس، لذلك نهتم بكل تفصيل لنقدم لك قطعاً تدوم وترافقك في مختلف لحظاتك.',
      foundingText2: 'كوراما علامة جزائرية تهتم بتقديم ألبسة تجمع بين التصميم العصري والخامات الجيدة. نعمل بعناية لاختيار أفضل المواد ونركز على التفاصيل التي تصنع الفرق، لنمنحك تجربة ترتديها بثقة وراحة.',
      
      visionTitle: 'رؤيتنا',
      visionText: 'أن نكون العلامة الجزائرية الرائدة لتقديم ألبسة تجمع بين الراحة والتصميم العصري، مستخدمين أفضل الخامات المتاحة لنمنحك تجربة تسوق تلبي احتياجاتك اليومية وتمنحك إطلالة تثق بها.',
      
      valuesTitle: 'قيمنا الأساسية',
      valueQualityTitle: 'أعلى معايير الجودة',
      valueQualityDesc: 'نختار أجود أنواع الخامات الخفيفة والمريحة لضمان متانة الألبسة وبقائها محتفظة بمرونتها ومظهرها الأنيق طوال فترات ارتدائها.',
      valueArtTitle: 'الاهتمام بالتفاصيل',
      valueArtDesc: 'كل قطعة نصممها نهتم بقصتها وتفاصليها الدقيقة وخياطتها لتكون عملية وسهلة التنسيق وتلائم يومك بامتياز.',
      valuePassionTitle: 'الثقة والراحة المستمرة',
      valuePassionDesc: 'لا نسعى خلف الموضة السريعة والمستعجلة، بل نركز على توفير ملابس كلاسيكية وسهلة الارتداء تمنحك إطلالة رزينة واثقة في كل وقت.',
 

      logoIdentityTitle: 'تفاصيل تصميم شعارنا وقطعنا',
      logoIdentityDesc: 'يجسد شعار كوراما تصميماً يجمع بين البساطة والجمال؛ النجمة الذهبية وهيكل العمود الأنيق يعكسان دقة عملنا ورغبتنا في تقديم الأفضل دائماً. انقر على عناصر الشعار لمعرفة الفلسفة من ورائها:',
      
      flameTitle: 'النجمة اللامعة ولون التصميم',
      flameText: 'ترمز النجمة إلى التميز والجودة العالية التي نسعى لتقديمها في كل خيط. كما تظهر في لمسات الألوان الدافئة مثل البيج والذهبي التي نستخدمها لتزيين ملابسنا بشكل بسيط وراقٍ.',
      
      pillarTitle: 'العمود ومتانة الأنسجة',
      pillarText: 'يجسد العمود القوة، والصلابة، والثبات. هذا يعني أننا نصنع ملابسنا اعتماداً على خامات متينة وقصات مدروسة تمنحك الثقة والراحة التامة عند ارتدائها وتدوم معك طويلاً.',
      
      canvasTitle: 'الألوان الداكنة والعميقة',
      canvasText: 'يمثل اللون الأسود والكحلي والرمادي الداكن أساس تشكيلتنا. إنها ألوان كلاسيكية أنيقة تتناسب بسهولة مع مختلف القطع والأذواق وتمنح حضورك طابعاً من الهدوء والجاذبية في كل مناسبة.',

      heritageBadge: 'جودة وتصميم متقن',
      statsTitle: 'أرقام من مسيرتنا',
      stat1Val: '+15k',
      stat1Lbl: 'عميل نعتز بثقتهم في جودة وتصاميم ألبستنا',
      stat2Val: '100%',
      stat2Lbl: 'خامات جيدة واختيار دقيق لأدق التفاصيل',
      stat3Val: '2026',
      stat3Lbl: 'عام انطلاق علامتنا التجارية لتقديم الأفضل دائماً',
    },
    en: {
      title: 'About Us - KORAMA',
      subtitle: 'KORAMA is a brand focused on delivering outerwear combining modern design and fine fabrics',
      backBtn: 'Back to Main Store',
      foundingTitle: 'The KORAMA Story',
      foundingText1: 'The KORAMA story started with a passion for designing clothes combining elegance and quality. We believe that clothing is not just an appearance, but a way to express personality and confidence. We focus on every detail to offer pieces that endure.',
      foundingText2: 'KORAMA is an Algerian brand dedicated to offering clothing that combines modern design and quality materials. We select the best fabrics with care and focus on detailing that makes a difference, giving you a confident and comfortable wearing experience.',
      
      visionTitle: 'Our Vision',
      visionText: 'To serve as a trusted brand for modern and comfortable clothing, using quality, reliable fabrics to provide apparel that perfectly suits your daily details and special events.',
      
      valuesTitle: 'Our Core Values',
      valueQualityTitle: 'Unyielding Quality Standards',
      valueQualityDesc: 'We source comfortable, sturdy fabrics to ensure all items are durable, soft, and maintain their refined appearance over time.',
      valueArtTitle: 'Attention to Details',
      valueArtDesc: 'Every garment is tailored with careful attention to stitches, accessories, and cut parameters to remain practical and easy to coordinate.',
      valuePassionTitle: 'Confidence & Lasting Ease',
      valuePassionDesc: 'We focus on reliable, timeless garments instead of temporary fast fashion trends, delivering a relaxed look you can wear confidently.',
 

      logoIdentityTitle: 'Logo-Derived Design Philosophy',
      logoIdentityDesc: 'The KORAMA logo represents a synergy of quality and reliable aesthetics, combining a prestigious star and sturdy column. Select any element to reveal the ideas behind our designs:',
      
      flameTitle: 'The Shining Star & Quality Seal',
      flameText: 'The stellar icon represents high quality and the pursuit of refined tailoring in every thread. This inspires our warm highlight accents, like camel, sandy tones, and soft beige applied elegantly.',
      
      pillarTitle: 'The Structural Column & Seams',
      pillarText: 'The pillar stands for durability, support, and longevity. We frame our outerwear and trousers on reliable structural patterns that maintain their shape and provide enduring comfort.',
      
      canvasTitle: 'Deep Classic Dark Accents',
      canvasText: 'Deep navy, black, and slate grey tones form the core of our collection. These classic shades match easily with other colors and offer a quiet, respectable presence on any occasion.',

      heritageBadge: 'Bespoke Quality Heritage',
      statsTitle: 'KORAMA in Numbers',
      stat1Val: '+15k',
      stat1Lbl: 'Customers who trust our quality and service',
      stat2Val: '100%',
      stat2Lbl: 'Premium fabrics and precise attention to drafts',
      stat3Val: '2026',
      stat3Lbl: 'Established & Launched to serve you the best',
    }
  };

  const t = lang === 'ar' ? content.ar : content.en;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-stone-950 text-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden"
    >
      {/* Decorative ambient elements matching fire theme */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Header Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-stone-900 pb-8">
          <div>
            <button 
              onClick={onBackToHome}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-orange-400 font-bold text-xs rounded-xl border border-stone-800 hover:border-orange-500/20 transition-all active:scale-95 duration-200"
              id="back-home-btn"
            >
              <ArrowLeft className={`w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 ${isRtl ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
              <span>{t.backBtn}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Logo height={42} />
          </div>
        </div>

        {/* Hero Title Intro section with real visual styling */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-500/20"
          >
            <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-orange-400 font-bold uppercase">{t.heritageBadge}</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-stone-50 via-stone-100 to-stone-400 tracking-tight leading-tight">
            {t.subtitle}
          </h1>
          <p className="text-stone-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            {lang === 'ar' 
              ? 'نهتم بكل تفصيل لنقدم لك قطعاً عصرية ومريحة تدوم وترافقك بثقة في مختلف لحظاتك.'
              : 'We focus on every detail to offer you modern, comfortable pieces that endure and accompany you confidently.'}
          </p>
        </div>

        {/* SECTION 1: FOUNDING OF THE COMPANY & STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-stone-900/60 border border-stone-900/80 rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="lg:col-span-12 absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-stone-500 text-xs font-mono tracking-widest uppercase">
              <History className="w-4 h-4 text-orange-500" />
              <span>KORAMA ORIGIN STORY</span>
            </div>
            
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-stone-100">
              {t.foundingTitle}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full" />
            
            <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed">
              {t.foundingText1}
            </p>
            <p className="text-stone-400 font-light text-sm leading-relaxed">
              {t.foundingText2}
            </p>

            {/* Micro quote card */}
            <div className="border-l-2 border-orange-500 pl-4 py-1 italic text-stone-300 font-mono text-xs sm:text-sm rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
              {lang === 'ar' 
                ? '“نهتم بالجودة والراحة لنعزز ثقتك بإطلالة مميزة وتجربة استثنائية كل يوم.”' 
                : '“We focus on quality and comfort to boost your confidence with an exceptional, stylish look every day.”'}
            </div>
          </div>

          <div className="lg:col-span-5 relative z-10 flex justify-center">
            <div className="relative aspect-[4/5] w-full max-w-[360px] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop" 
                alt="Finest Fabric Work"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 bg-stone-950/90 border border-stone-850 p-4 rounded-xl backdrop-blur-sm">
                <span className="text-[10px] uppercase font-mono text-stone-500 tracking-wider block">Haut-Couture Ateliers</span>
                <span className="text-xs font-semibold text-orange-400">{lang === 'ar' ? 'حيكت بعناية في الجزائر العاصمة' : 'Meticulously Sewn in Algiers'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: VISION & CORE VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision card */}
          <div className="bg-stone-900/40 border border-stone-900 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:border-orange-500/20 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-100">{t.visionTitle}</h3>
              <p className="text-stone-300 font-light text-xs sm:text-sm leading-relaxed">
                {t.visionText}
              </p>
            </div>
            <div className="pt-4 border-t border-stone-950/50 flex items-center gap-2 text-stone-500 text-xs font-mono font-bold">
              <span>KORAMA FUTURE FOCUS ✦</span>
            </div>
          </div>

          {/* Stats quick card */}
          <div className="bg-stone-900/40 border border-stone-100/5 p-8 rounded-3xl flex flex-col justify-between hover:border-orange-500/20 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 blur-3xl pointer-events-none" />
            
            <h3 className="text-xl sm:text-2xl font-bold text-stone-100 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              <span>{t.statsTitle}</span>
            </h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">{t.stat1Val}</div>
                <div className="text-[10px] text-stone-400 font-light leading-snug">{t.stat1Lbl}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">{t.stat2Val}</div>
                <div className="text-[10px] text-stone-400 font-light leading-snug">{t.stat2Lbl}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">{t.stat3Val}</div>
                <div className="text-[10px] text-stone-400 font-light leading-snug">{t.stat3Lbl}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-955/50 text-[10px] text-stone-500 font-mono uppercase tracking-widest text-center mt-6">
              {lang === 'ar' ? '✦ الالتزام التام بالجودة والأناقة ✦' : '✦ TOTAL COMMITMENT TO LUXURY ✦'}
            </div>
          </div>

        </div>

        {/* CORE VALUES DETAIL PANELS */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-stone-100">{t.valuesTitle}</h3>
            <p className="text-xs text-stone-400">{lang === 'ar' ? 'المبادئ الصلبة التي تحرك كل لمسة تطريز ومقاس نعده' : 'The unyielding pillars directive of all operations and fits we engineer'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Value 1 */}
            <div className="bg-stone-900/30 border border-stone-900 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:bg-stone-900/50 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/15 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-base font-bold text-stone-200">{t.valueQualityTitle}</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{t.valueQualityDesc}</p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="bg-stone-900/30 border border-stone-900 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:bg-stone-900/50 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/15 flex items-center justify-center">
                  <Paintbrush className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-base font-bold text-stone-200">{t.valueArtTitle}</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{t.valueArtDesc}</p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="bg-stone-900/30 border border-stone-900 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:bg-stone-900/50 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/15 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-base font-bold text-stone-200">{t.valuePassionTitle}</h4>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{t.valuePassionDesc}</p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: DEEP INTERACTIVE VISUAL IDENTITY (LOGO DIRECT INSPIRATION) */}
        <div className="border border-stone-900/80 bg-stone-900/40 rounded-[32px] p-8 sm:p-12 space-y-8 relative overflow-hidden" id="logo-derived-identity-section">
          <div className="absolute bottom-0 left-0 w-84 h-84 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-widest block">✦ VISUAL DISCIPLINE & DIRECT LOGO INSIGHTS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100">
              {t.logoIdentityTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              {t.logoIdentityDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left Box: Element Selector buttons + Render (5 spans) */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4">
              
              {/* Flame control */}
              <button
                onClick={() => setActiveElement('flame')}
                className={`p-5 rounded-2xl text-right border transition-all flex items-center gap-4 cursor-pointer w-full text-stone-200 ${
                  activeElement === 'flame' 
                    ? 'bg-gradient-to-r from-orange-650/10 to-orange-600/10 border-orange-500/40 shadow-lg' 
                    : 'bg-stone-950/60 border-stone-900 hover:border-stone-800'
                }`}
                style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                id="phi-flame-btn"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeElement === 'flame' ? 'bg-orange-600 text-stone-950 animate-pulse' : 'bg-stone-900 text-stone-400'
                }`}>
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <strong className="text-xs block text-stone-150">{lang === 'ar' ? 'النجمة الذهبية اللامعة' : 'The Golden Prestige Star'}</strong>
                  <span className="text-[10px] text-stone-500 font-mono tracking-wider">COLORS & CREATIVE ENERGY</span>
                </div>
              </button>

              {/* Pillar control */}
              <button
                onClick={() => setActiveElement('pillar')}
                className={`p-5 rounded-2xl text-right border transition-all flex items-center gap-4 cursor-pointer w-full text-stone-200 ${
                  activeElement === 'pillar' 
                    ? 'bg-gradient-to-r from-orange-650/10 to-orange-600/10 border-orange-500/40 shadow-lg' 
                    : 'bg-stone-950/60 border-stone-900 hover:border-stone-800'
                }`}
                style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                id="phi-pillar-btn"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeElement === 'pillar' ? 'bg-orange-600 text-stone-950 animate-pulse' : 'bg-stone-900 text-stone-400'
                }`}>
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <strong className="text-xs block text-stone-150">{lang === 'ar' ? 'العمود الإغريقي الراسخ' : 'The Standing Pedestal'}</strong>
                  <span className="text-[10px] text-stone-500 font-mono tracking-wider">TAILOR STRUCTURE & INTEGRITY</span>
                </div>
              </button>

              {/* Canvas control */}
              <button
                onClick={() => setActiveElement('canvas')}
                className={`p-5 rounded-2xl text-right border transition-all flex items-center gap-4 cursor-pointer w-full text-stone-200 ${
                  activeElement === 'canvas' 
                    ? 'bg-gradient-to-r from-orange-650/10 to-orange-600/10 border-orange-500/40 shadow-lg' 
                    : 'bg-stone-950/60 border-stone-900 hover:border-stone-800'
                }`}
                style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                id="phi-canvas-btn"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  activeElement === 'canvas' ? 'bg-orange-600 text-stone-950 animate-pulse' : 'bg-stone-900 text-stone-400'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="text-start">
                  <strong className="text-xs block text-stone-150">{lang === 'ar' ? 'الخلفية الداكنة العميقة' : 'Midnight Obsidian Space'}</strong>
                  <span className="text-[10px] text-stone-500 font-mono tracking-wider">DEPTH & GRAPHIC CANVAS</span>
                </div>
              </button>

            </div>

            {/* Right Box: Dynamic Output with real image frame and description (7 spans) */}
            <div className="lg:col-span-12 xl:col-span-7 bg-stone-950 border border-stone-900 p-6 sm:p-8 rounded-2xl min-h-[300px] flex flex-col lg:flex-row gap-6 items-center justify-between shadow-inner">
              
              <div className="space-y-4 flex-grow max-w-md">
                <span className="text-[10px] font-mono text-orange-400 font-bold block bg-orange-650/10 border border-orange-500/20 px-2.5 py-1 rounded inline-block">
                  {activeElement.toUpperCase()} PHILOSOPHY
                </span>

                <h4 className="text-lg sm:text-xl font-bold text-stone-100">
                  {activeElement === 'flame' && t.flameTitle}
                  {activeElement === 'pillar' && t.pillarTitle}
                  {activeElement === 'canvas' && t.canvasTitle}
                </h4>

                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {activeElement === 'flame' && t.flameText}
                  {activeElement === 'pillar' && t.pillarText}
                  {activeElement === 'canvas' && t.canvasText}
                </p>

                {/* Micro badge values */}
                <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono tracking-wider uppercase text-stone-500">
                  <span>✦ Dynamic Fire Colors</span>
                  <span>✦ Structured Fabrics</span>
                  <span>✦ Elite Status</span>
                </div>
              </div>

              {/* Large element visualizer rendering */}
              <div className="w-full sm:w-48 h-48 bg-stone-900 border border-stone-850 rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0 shadow-lg">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
                
                {activeElement === 'flame' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-yellow-300 rounded-full animate-ping filter blur-md opacity-30 absolute" />
                    <Sparkles className="w-12 h-12 text-amber-500 animate-bounce" />
                    <span className="text-[10px] text-orange-400 font-mono font-bold mt-2">GOLDEN PRESTIGE</span>
                  </motion.div>
                )}

                {activeElement === 'pillar' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-14 h-2 bg-amber-600 rounded" />
                    <div className="w-10 h-16 bg-stone-950 border border-amber-500/40 flex items-center justify-center text-orange-400 font-mono text-xs text-center font-bold px-1 rounded">
                      SOLID CORE
                    </div>
                    <div className="w-14 h-2 bg-amber-600 rounded" />
                  </motion.div>
                )}

                {activeElement === 'canvas' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full bg-stone-950 flex flex-col items-center justify-center p-4 text-center space-y-2"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-600 filter blur-xl animate-pulse opacity-40" />
                    <span className="text-[10px] text-stone-400 font-mono block">OBSIDIAN DEPTH</span>
                    <span className="text-[9px] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 font-mono">ENHANCING CONTRAST</span>
                  </motion.div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Dynamic CTA box at bottom */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-850 p-8 sm:p-12 rounded-[2.5rem] text-center space-y-6 shadow-xl">
          <h3 className="text-2xl font-bold text-stone-100">
            {lang === 'ar' ? 'اكتشف حكايتنا في كل خط تطريز' : 'Examine our history inside each embroidered seam'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
            {lang === 'ar' 
              ? 'تصفح تشكيلتنا الاستثنائية ودع جوهر علامتنا يرتقي بحضورك اليومي.' 
              : 'Witness our premium execution in the flesh. Elevate your presence to true high-couture standards.'}
          </p>
          <button
            onClick={onBackToHome}
            className="px-8 h-12 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-extrabold rounded-xl transition-all active:scale-95 duration-200"
            id="about-shop-btn"
          >
            {lang === 'ar' ? 'تصفح فئات الملابس الراقية' : 'Shop Bespoke Collections Now'}
          </button>
        </div>

      </div>
    </motion.div>
  );
}
