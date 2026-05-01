export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    title: "استوديو تصوير المنتجات بالذكاء الاصطناعي",
    description: "ارفع صورة منتجك، واختار من الموكابس الجاهزة أو ادمجه في أي مشهد تاني عشان تطلع صور احترافية في ثواني ✨",
    uploadProductLabel: "📦 صورة المنتج الأساسي",
    uploadSceneLabel: "📸 ارفع صورة المشهد",
    whatToDo: "عايز تعمل إيه؟",
    modeMockup: "موكابس جاهزة",
    modeSwap: "دمج في مشهد",
    modeAnalyze: "تحليل ذكي",
    selectBackground: "اختار الخلفية:",
    analyzeInfo: "الذكاء الاصطناعي هيحلل الصورة ويطلع لك العناصر اللي فيها وكمان وصف تسويقي احترافي.",
    swapInfo: "هناخد المنتج من الصورة الأساسية ونحطه في صورة المشهد اللي هترفعها.",
    errorNoProduct: "لو سمحت، ارفع صورة المنتج الأول.",
    errorNoScene: "لو سمحت، ارفع صورة المشهد اللي عايز تدمج فيه المنتج.",
    errorAnalyze: "للأسف فشلنا في تحليل الصورة. حاول تاني.",
    errorGenerate: "للأسف حصل خطأ واحنا بنعمل الصورة. حاول تاني.",
    processingImage: "ثواني بنحضر الصورة...",
    processingAnalyze: "ثواني بنحلل الصورة...",
    generateBtn: "يلا نعمل الصورة",
    analyzeBtn: "تحليل ذكي للصورة",
    analyzeResultTitle: "نتائج التحليل الذكي",
    analyzeResultDesc: "دي العناصر اللي الذكاء الاصطناعي اكتشفها في صورتك وكمان وصف مقترح للمنتج.",
    detectedObjects: "العناصر المكتشفة",
    suggestedDesc: "وصف المنتج المقترح",
    tryAnother: "جرب صورة تانية",
    resultReady: "صورتك الجديدة جاهزة!",
    resultCompare: "حرك السلايدر عشان تقارن بين الصورة الأصلية والصورة اللي عملها الذكاء الاصطناعي.",
    downloadBtn: "نزّل الصورة",
    createNewBtn: "اعمل صورة جديدة",
    historyTitle: "كل الصور اللي عملتها",
    historySelectImg: "اختار صورة رقم",
    historyReuseTooltip: "استخدم الصورة دي كصورة أساسية",
    historyReuseBtn: "استخدم دي",
    uploaderRemove: "شيل الصورة",
    uploaderUpload: "ارفع صورة",
    uploaderOrDrag: "أو اسحبها وارميها هنا",
    uploaderLimit: "PNG, JPG, JPEG لحد 10MB",
    languageToggle: "English",
    aspectRatioLabel: "نسبة العرض للطول:",
    qualityControlsBtn: "إعدادات الجودة المتقدمة",
    detailLevelLabel: "مستوى التفاصيل:",
    artisticIntensityLabel: "قوة اللمسة الفنية:",
    noiseReductionLabel: "تقليل الضوضاء (Noise):",
    editPromptBtn: "تعديل البرومبت (للمحترفين)",
    hidePromptBtn: "إخفاء البرومبت",
    customPromptLabel: "البرومبت المخصص:",
    saveProjectBtn: "حفظ المشروع",
    loadProjectsBtn: "مشاريعك المحفوظة",
    noSavedProjects: "مفيش مشاريع محفوظة لسه.",
    projectTitlePlaceholder: "اسم المشروع",
    saveSuccess: "تم حفظ المشروع بنجاح!",
    loadBtn: "فتح",
    deleteBtn: "مسح",
    projectsLabel: "المشاريع المحفوظة",
    editHistoryPrompt: "تعديل البرومبت",
    regenerateBtn: "إعادة توليد",
    removeBgBtn: "مسح الخلفية (بالذكاء الاصطناعي)",
    removingBgStatus: "جاري مسح الخلفية...",
    templateLabel: "قوالب البرومبت:",
    saveAsTemplateBtn: "حفظ كقالب جديد",
    templateNamePlaceholder: "اسم القالب",
    noTemplates: "مفيش قوالب محفوظة لسه.",
    deleteTemplateBtn: "مسح القالب",
  },
  en: {
    title: "AI Product Photo Studio",
    description: "Upload your product photo, choose from ready mockups, or merge it into any scene to create professional photos in seconds ✨",
    uploadProductLabel: "📦 Primary Product Image",
    uploadSceneLabel: "📸 Upload Scene Image",
    whatToDo: "What do you want to do?",
    modeMockup: "Ready Mockups",
    modeSwap: "Scene Integration",
    modeAnalyze: "Smart Analysis",
    selectBackground: "Choose background:",
    analyzeInfo: "AI will analyze the image and extract elements along with a professional marketing description.",
    swapInfo: "We will take the product from the primary image and place it in the scene image you upload.",
    errorNoProduct: "Please upload the product image first.",
    errorNoScene: "Please upload the scene image you want to integrate the product into.",
    errorAnalyze: "Unfortunately, we failed to analyze the image. Please try again.",
    errorGenerate: "Unfortunately, an error occurred while generating the image. Please try again.",
    processingImage: "Moment, preparing your image...",
    processingAnalyze: "Moment, analyzing the image...",
    generateBtn: "Generate Image",
    analyzeBtn: "Smart Image Analysis",
    analyzeResultTitle: "Smart Analysis Results",
    analyzeResultDesc: "These are the elements AI discovered in your photo along with a suggested product description.",
    detectedObjects: "Detected Elements",
    suggestedDesc: "Suggested Description",
    tryAnother: "Try another image",
    resultReady: "Your new image is ready!",
    resultCompare: "Move the slider to compare original image with AI-generated one.",
    downloadBtn: "Download Image",
    createNewBtn: "Create New Image",
    historyTitle: "Generation History",
    historySelectImg: "Select image number",
    historyReuseTooltip: "Use this image as the primary product",
    historyReuseBtn: "Reuse this",
    uploaderRemove: "Remove image",
    uploaderUpload: "Upload image",
    uploaderOrDrag: "or drag and drop it here",
    uploaderLimit: "PNG, JPG, JPEG up to 10MB",
    languageToggle: "العربية",
    aspectRatioLabel: "Aspect Ratio:",
    qualityControlsBtn: "Advanced Quality Settings",
    detailLevelLabel: "Detail Level:",
    artisticIntensityLabel: "Artistic Intensity:",
    noiseReductionLabel: "Noise Reduction:",
    editPromptBtn: "Edit Prompt (Expert)",
    hidePromptBtn: "Hide Prompt",
    customPromptLabel: "Custom Prompt:",
    saveProjectBtn: "Save Project",
    loadProjectsBtn: "Saved Projects",
    noSavedProjects: "No saved projects yet.",
    projectTitlePlaceholder: "Project Name",
    saveSuccess: "Project saved successfully!",
    loadBtn: "Open",
    deleteBtn: "Delete",
    projectsLabel: "Saved Projects",
    editHistoryPrompt: "Edit Prompt",
    regenerateBtn: "Regenerate",
    removeBgBtn: "Remove Background (AI)",
    removingBgStatus: "Removing background...",
    templateLabel: "Prompt Templates:",
    saveAsTemplateBtn: "Save as Template",
    templateNamePlaceholder: "Template Name",
    noTemplates: "No templates saved yet.",
    deleteTemplateBtn: "Delete template",
  }
};

export const mockupTranslations: { [key: string]: { [lang in Language]: string, suggestions?: { [l in Language]: string, value: string }[] } } = {
  "on a studio white background with soft shadows": { 
    ar: "خلفية ستوديو بيضا", 
    en: "White studio background",
    suggestions: [
      { ar: "مع إضاءة نيون ملونة", en: "with colorful neon rim light", value: "on a studio white background with a vibrant cyan and purple neon rim light" },
      { ar: "مع عناصر طايرة", en: "with floating particles", value: "on a studio white background with soft floating dust particles and golden bokeh" },
      { ar: "مع بودرة ملونة", en: "with colored powder explosion", value: "on a studio white background with a dynamic explosion of vibrant pink and blue powder around the product" },
      { ar: "مع ظل نباتات", en: "with botanical shadows", value: "on a studio white background with elegant soft shadows of palm leaves stretching across the frame" },
      { ar: "على قاعدة مراية", en: "on a mirror pedestal", value: "on a perfectly clean mirror pedestal with a sharp reflection on a studio white background" },
      { ar: "مع رشة تلج", en: "with a light dusting of snow", value: "on a studio white background with a light dusting of fresh white snow around the base and soft cool lighting" },
      { ar: "عناصر هولوجرافيك", en: "with holographic elements", value: "on a studio white background with subtle holographic rainbow reflections and geometric prism shapes" },
      { ar: "مود ريتمك", en: "with rhythmic light tubes", value: "on a studio white background surrounded by vertical glowing white light tubes and futuristic shadows" }
    ]
  },
  "on a clean marble surface": { 
    ar: "سطح رخام", 
    en: "Clean marble surface",
    suggestions: [
      { ar: "مع ورد مجفف", en: "with dried flowers", value: "on a clean white marble surface surrounded by elegant dried eucalyptus and rose petals" },
      { ar: "مود فخم ومظلم", en: "dark luxury mood", value: "on a dark black marble surface with dramatic expensive lighting" },
      { ar: "مع دهبي ولمعان", en: "with gold leaf accents", value: "on a white marble surface with scattered flakes of gold leaf and luxury soft lighting" },
      { ar: "مود حمام مودرن", en: "modern bathroom spa", value: "on a clean marble surface in a bright luxury bathroom with soft towels and warm lighting" },
      { ar: "مع حرير ناعم", en: "with soft silk fabric", value: "on a clean marble surface with flowing folds of white silk fabric and natural side lighting" },
      { ar: "مع مجوهرات", en: "with scattered jewelry", value: "on a white marble surface with elegant scattered pearls and gold chains with high-end lighting" },
      { ar: "مود الصبح", en: "morning breakfast marble", value: "on a marble countertop with a croissant, a glass of orange juice, and bright morning sun" },
      { ar: "مع كريستال", en: "with crystal prisms", value: "on a clean marble surface with crystal glass prisms reflecting rainbow light leaks" }
    ]
  },
  "on a wooden desk with soft daylight": { 
    ar: "على مكتب خشب", 
    en: "Wooden desk with daylight",
    suggestions: [
      { ar: "ستايل عتيق", en: "vintage style", value: "on an old weathered wooden desk with a vintage camera and morning sunlight" },
      { ar: "مكتب مودرن", en: "modern office", value: "on a sleek minimalist oak desk with a laptop and a coffee cup in the corner" },
      { ar: "مكتب كاتب", en: "writer's workspace", value: "on a dark wood desk with an old typewriter, scattered papers, and a warm desk lamp" },
      { ar: "مكتب فنان", en: "artist's studio", value: "on a wooden artist desk with paint brushes, sketches, and messy creative vibes" },
      { ar: "تحت شجرة", en: "under a garden tree", value: "on a rustic wooden garden table with dappled sunlight through tree leaves" },
      { ar: "كوخ دافي", en: "cosy mountain cabin", value: "on a thick redwood table in front of a warm fireplace with a wool blanket nearby" },
      { ar: "مكتب معماري", en: "architect's desk", value: "on a large wooden drafting table with blueprints, a compass, and sharp industrial lighting" },
      { ar: "مود خريفي", en: "autumn study mood", value: "on a dark wood desk with dried orange leaves, a tea cup, and soft rainy window light" }
    ]
  },
  "on a modern kitchen countertop with natural light": { 
    ar: "على رخامة المطبخ", 
    en: "Modern kitchen countertop",
    suggestions: [
      { ar: "مع مكونات أكل", en: "with fresh ingredients", value: "on a modern kitchen countertop surrounded by fresh herbs, sliced lemons, and spices" },
      { ar: "وقت الفطار", en: "morning breakfast mood", value: "on a modern kitchen countertop with a steaming cup of coffee and morning sun through a window" },
      { ar: "مود نيون ليلي", en: "night kitchen neon", value: "on a dark kitchen countertop reflecting magenta and cyan neon city lights from outside" },
      { ar: "ستايل ريفي", en: "rustic farmhouse kitchen", value: "on a granite kitchen countertop with wooden utensils and warm farmhouse lighting" },
      { ar: "خبز دافي", en: "fresh bakery mood", value: "on a kitchen countertop with scattered flour, a rolling pin, and freshly baked bread" },
      { ar: "مود كوكتيل", en: "evening cocktail bar", value: "on a dark stone countertop with a cocktail shaker, ice cubes, and warm amber bar lighting" },
      { ar: "مطبخ مينيمال", en: "minimalist white kitchen", value: "on a seamless white Corian countertop with a single green plant and sharp high-key lighting" }
    ]
  },
  "on an outdoor cafe table with a blurred background": { 
    ar: "على ترابيزة كافيه", 
    en: "Outdoor cafe table",
    suggestions: [
      { ar: "وقت المطر", en: "rainy day mood", value: "on a wet cafe table during a rainy afternoon with city lights blurred in the background" },
      { ar: "وقت الغروب", en: "golden hour sunset", value: "on an outdoor cafe table during golden hour with warm orange light and long shadows" },
      { ar: "شارع أوروبي", en: "European street vibe", value: "on a small round cafe table in a cobblestone European street with flowers nearby" },
      { ar: "يوم صيفي مشمس", en: "sunny summer day", value: "on a bright white cafe table under an umbrella with sunglasses and a cold drink" },
      { ar: "مود باريس", en: "Parisian sidewalk cafe", value: "on a classic wicker cafe chair and small metal table with a view of the Eiffel Tower blurred in the distance" },
      { ar: "كافيه مودرن", en: "industrial urban cafe", value: "on a raw concrete cafe table with a view of a busy city intersection and traffic light bokeh" },
      { ar: "مود ليلي", en: "night cafe terrace", value: "on a dark cafe table under strings of warm fairy lights with deep blue night sky" }
    ]
  },
  "on a podium surrounded by smooth stones and green leaves, with soft, clean lighting": { 
    ar: "على منصة وسط أحجار وأوراق شجر", 
    en: "Podium with stones & leaves",
    suggestions: [
      { ar: "مود صحراوي", en: "desert sands mood", value: "on a sandstone podium in a desert at sunset with dry cacti and warm sand" },
      { ar: "تحت الماية", en: "underwater zen", value: "on a podium at the bottom of a clear pool with rays of light and floating bubbles" },
      { ar: "غابة خريفية", en: "autumn forest vibe", value: "on a stone podium surrounded by red and orange autumn leaves and misty air" },
      { ar: "مود أبيض", en: "all-white zen", value: "on a white minimalist podium surrounded by white smooth stones and white translucent leaves" },
      { ar: "بركان ورماد", en: "volcanic podium", value: "on a black basalt podium surrounded by dark volcanic sand and glowing ember highlights" },
      { ar: "مود ثلجي", en: "frozen arctic podium", value: "on a block of clear ice as a podium surrounded by frosted pine branches and snowflakes" }
    ]
  },
  "on a wooden plate with chamomile flowers and soft smoke, placed on a gentle linen cloth": { 
    ar: "على طبق خشب مع ورد و دخان خفيف", 
    en: "Wooden plate with flowers",
    suggestions: [
      { ar: "مود ليلي هادي", en: "calm night mood", value: "on a wooden plate with lavender flowers and a glowing candle in a dark room" },
      { ar: "فطار ريفي", en: "country breakfast", value: "on a wooden plate with wildflowers and warm morning light in a wooden cabin" },
      { ar: "سبا طبيعي", en: "nature spa vibes", value: "on a wooden plate with eucalyptus leaves and smooth river stones" },
      { ar: "مود شرقي", en: "oriental spice mood", value: "on a wooden plate with cinnamon sticks, star anise, and swirls of incense smoke" },
      { ar: "بحر وصيف", en: "beach picnic vibes", value: "on a wooden plate with sea shells and blue linen cloth in bright beach sunlight" },
      { ar: "مود الورد", en: "spring flower garden", value: "on a wooden plate overflowing with pink cherry blossoms and soft morning dew" }
    ]
  },
  "on a mossy log in a misty forest, surrounded by small wildflowers and water droplets": { 
    ar: "في غابة وسط الضباب والزرع", 
    en: "Misty forest floor",
    suggestions: [
      { ar: "وسط فطر ملون", en: "with magical mushrooms", value: "on a mossy log surrounded by glowing small mushrooms and fireflies in a dark forest" },
      { ar: "وقت الشروق", en: "forest sunrise", value: "on a mossy log with bright golden sunbeams cutting through the thick morning mist" },
      { ar: "بعد المطر", en: "after the rain", value: "on a soaking wet mossy log with large water droplets and fresh forest air" },
      { ar: "مود خنشاري", en: "among wild ferns", value: "deep in a primeval forest on a mossy log surrounded by giant ferns and prehistoric vibes" },
      { ar: "غابة سحرية", en: "enchanted forest glow", value: "on a mossy log with floating wisps of magical light and ethereal blue fog" },
      { ar: "مود الشتا", en: "winter forest log", value: "on a mossy log partially covered in frost and light snow with evergreen pine needles" }
    ]
  },
  "with dramatic, sharp shadows from a window, creating a high-contrast, artistic look": { 
    ar: "بإضاءة شباك درامية وظل حاد", 
    en: "Dramatic window shadows",
    suggestions: [
      { ar: "مود سينمائي", en: "cinematic noir", value: "with heavy dramatic window shadows in a black and white noir style with smoke" },
      { ar: "إضاءة ملونة", en: "colored filters", value: "with dramatic window shadows using a warm orange sunset filter and dust motes" },
      { ar: "مود مودرن", en: "modern minimalist", value: "with clean geometric window shadows on a raw concrete background" },
      { ar: "ظل نباتات", en: "tropical leaf shadows", value: "with dramatic sharp shadows of monstera leaves against a bright terracotta wall" },
      { ar: "إضاءة ملونى", en: "stained glass light", value: "with dramatic shadows and vibrant colorful light patterns from a stained glass window" },
      { ar: "مود المطر", en: "rain on window shadows", value: "with dramatic window shadows reflecting rain droplets running down the glass" }
    ]
  },
  "on a concrete pedestal with dramatic, focused lighting and a minimalist, luxurious feel": { 
    ar: "على قاعدة أسمنتية بإضاءة فخمة", 
    en: "Luxury concrete pedestal",
    suggestions: [
      { ar: "أسود فخم", en: "total black luxury", value: "on a black concrete pedestal with a single sharp spotlight and deep shadows" },
      { ar: "مود صناعي عتيق", en: "vintage industrial", value: "on a weathered concrete pedestal in an old factory with dramatic light leaks" },
      { ar: "دهب وأسمنت", en: "gold and concrete", value: "on a concrete pedestal with gold cracks and luxury lighting" },
      { ar: "مود معرض فني", en: "art gallery display", value: "on a polished concrete pedestal in a white minimalist art gallery with soft overhead lighting" },
      { ar: "بحر وأسمنت", en: "concrete by the sea", value: "on a raw concrete pedestal on a cliff over the ocean with crashing waves and sunset sky" },
      { ar: "ضوء القمر", en: "moonlit pedestal", value: "on a concrete pedestal bathed in cold silver moonlight with a starry sky background" }
    ]
  },
  "product held by a hand with a background of lush greenery and a pink, bubbly aesthetic": { 
    ar: "المنتج في إيد وسط زرع ومود لونه وردي", 
    en: "Held in hand / Greenery",
    suggestions: [
      { ar: "بحر وصيف", en: "ocean summer trip", value: "product held by a hand over a sparkling blue ocean background with beach vibes" },
      { ar: "جبال وتلج", en: "mountain adventure", value: "product held by a hand wrapped in a winter glove with a snowy mountain background" },
      { ar: "مود المدينة", en: "urban city walk", value: "product held by a hand with a blurred background of busy city street signs and lights" },
      { ar: "يوم في الحديقة", en: "garden picnic day", value: "product held by a hand over a checkered picnic blanket with grass and flowers" },
      { ar: "مود الغروب", en: "sunset hand hold", value: "product held by a hand against a deep purple and orange sunset sky" },
      { ar: "مود الشتا", en: "hot drink in winter", value: "product held by a hand in a chunky knit sweater with falling snowflakes background" }
    ]
  },
  "bathed in the warm, golden light of a sunset, creating long, soft shadows": { 
    ar: "بإضاءة الشمس وقت الغروب (Golden Hour)", 
    en: "Golden hour sunset",
    suggestions: [
      { ar: "شاطئ البحر", en: "sunset beach", value: "bathed in warm golden sunset light on a sandy beach with crashing waves in the background" },
      { ar: "سطح مركب", en: "boat deck at sunset", value: "bathed in golden hour light on a wooden boat deck in the middle of the sea" },
      { ar: "مود الصحرا", en: "desert sunset", value: "bathed in deep orange sunset light on a sand dune with long dramatic shadows" },
      { ar: "بالكونة قديمة", en: "vintage balcony", value: "bathed in golden sunset light on a wrought iron balcony in an old European city" },
      { ar: "مود الحقول", en: "wheat field sunset", value: "bathed in golden hour light in the middle of a golden wheat field with flying birds" },
      { ar: "بين الجبال", en: "mountain lake sunset", value: "bathed in warm sunset light reflecting on a calm mountain lake with purple peaks" }
    ]
  },
  "on a dark surface with a single, dramatic spotlight shining down from above": { 
    ar: "على سطح غامق ومتسلط عليه ضوء سبوت", 
    en: "Dark surface spotlight",
    suggestions: [
      { ar: "سبوت أحمر", en: "red dramatic spotlight", value: "on a dark surface with a deep red dramatic spotlight create a mysterious look" },
      { ar: "أرضية مراية", en: "black mirror floor", value: "on a black mirror surface with a sharp white spotlight and perfect reflection" },
      { ar: "مود المسرح", en: "stage light mood", value: "on a dark wooden stage with dust particles floating in the spotlight beam" },
      { ar: "سبوت أزرق", en: "cyan laser beam", value: "on a dark metallic surface with a sharp cyan laser beam spotlight" },
      { ar: "مود المطر", en: "rain under spotlight", value: "on a dark wet surface with a single spotlight illuminating falling rain drops" },
      { ar: "دخان وسينما", en: "smoky spotlight", value: "on a dark surface with a dramatic spotlight cutting through thick cinematic smoke" }
    ]
  },
  "on a wet surface reflecting vibrant neon lights, creating a futuristic, dreamy mood": { 
    ar: "على سطح مبلول وعاكس أضواء نيون", 
    en: "Wet neon reflections",
    suggestions: [
      { ar: "سايبربانك", en: "cyberpunk city", value: "on a wet asphalt surface reflecting chaotic pink and blue cyberpunk neon signs" },
      { ar: "بعد المطر", en: "city after rain", value: "on a wet pavement reflecting yellow street lights and traffic signals at night" },
      { ar: "مود فضائي", en: "sci-fi laboratory", value: "on a wet metallic surface with cold blue neon lights and a futuristic feel" },
      { ar: "نيون طوكيو", en: "Tokyo night rain", value: "on a wet street in Tokyo with vibrant kanji neon reflections and colorful umbrellas" },
      { ar: "بركة ميه نيون", en: "neon puddle", value: "on the surface of a deep puddle reflecting a massive pink neon heart sign" },
      { ar: "مود النادي", en: "electric dance floor", value: "on a wet glass floor reflecting flashing multicolor strobe and neon lights" }
    ]
  },
  "with blurred background of twinkling bokeh lights, giving a magical and festive feel": { 
    ar: "مع خلفية فيها أضواء بوكيه سايحة", 
    en: "Magical bokeh lights",
    suggestions: [
      { ar: "أضواء كريسماس", en: "Christmas lights", value: "with twinkling red and green Christmas bokeh lights and a festive atmosphere" },
      { ar: "ملاهي بالليل", en: "night carnival", value: "with colorful vibrant bokeh lights of a moving Ferris wheel in the background" },
      { ar: "نجوم ساطعة", en: "starlit night", value: "with subtle white bokeh lights resembling a clear starry night sky" },
      { ar: "مود الرومانسية", en: "romantic candle bokeh", value: "with warm orange heart-shaped bokeh lights from hundreds of glowing candles" },
      { ar: "مدينة سايحة", en: "city traffic bokeh", value: "with long streaks of red and white bokeh from a busy city highway at night" },
      { ar: "غابة سحرية", en: "will-o-the-wisp bokeh", value: "with floating tiny gold and blue bokeh lights in a dark mystical forest" }
    ]
  },
  "in a high-contrast black and white style, focusing on texture and form": { 
    ar: "صورة أبيض وأسود بتبرز ملامح المنتج", 
    en: "B&W high contrast",
    suggestions: [
      { ar: "مود معماري", en: "architectural lines", value: "in a high-contrast B&W style with harsh shadows of modern building structures" },
      { ar: "حبوب فيلم قديم", en: "grainy film style", value: "in a high-contrast B&W style with heavy film grain and a vintage classic feel" },
      { ar: "مود دخان", en: "B&W smoke art", value: "in a high-contrast B&W style with wisps of white smoke against a black background" },
      { ar: "مود الجريدة", en: "newspaper print", value: "in a high-contrast B&W halftone style like a vintage newspaper photograph" },
      { ar: "ظل وشباك", en: "B&W Venetian blinds", value: "in a high-contrast B&W style with striped shadows from Venetian blinds across the product" },
      { ar: "مينيمال وشطرنج", en: "B&W chess board", value: "in a high-contrast B&W style on a glossy checkerboard floor with sharp reflections" }
    ]
  },
  "floating in the air, surrounded by elements like wood fragments and botanicals, against a warm gradient background": { 
    ar: "المنتج طاير في الهوا مع عناصر تانية", 
    en: "Floating in air",
    suggestions: [
      { ar: "طاير في الفضاء", en: "floating in deep space", value: "floating in zero-gravity space surrounded by asteroids and distant nebulae" },
      { ar: "انفجار ميه", en: "water splash float", value: "floating in the air surrounded by dynamic water splashes and frozen droplets" },
      { ar: "عالم الخيال", en: "fantasy world", value: "floating in a magical realm surrounded by floating islands and glowing orbs" },
      { ar: "مود تجميلي", en: "liquid petal float", value: "floating in the air surrounded by suspended flower petals and thick liquid gold droplets" },
      { ar: "انفجار وقت", en: "shattered glass float", value: "floating in a frozen moment surrounded by hundreds of tiny shards of shattered glass" },
      { ar: "مود طبيعي", en: "floating on a cloud", value: "floating high in a bright blue sky on a soft white fluffy cloud with golden sun" }
    ]
  },
  "in a modern minimalist apartment with large windows and soft city light": {
    ar: "شقة مودرن هادية",
    en: "Modern minimalist apartment",
    suggestions: [
      { ar: "على كنبة رمادي", en: "on a grey sofa", value: "placed on a sleek light grey fabric sofa in a minimalist living room with large windows and soft afternoon light" },
      { ar: "بجانب نبات منزلي", en: "next to a house plant", value: "on a white side table next to a large monstera plant in a bright, airy modern apartment" },
      { ar: "على رف كتب", en: "on a designer bookshelf", value: "on a minimalist black metal bookshelf with a few carefully curated books and warm ambient lighting" }
    ]
  },
  "in a rustic barn setting with weathered wood and warm hay": {
    ar: "بيت ريفي قديم (Barn)",
    en: "Rustic barn setting",
    suggestions: [
      { ar: "فوق كومة قش", en: "on a haystack", value: "on a golden haystack in a rustic barn with sunbeams streaming through gaps in the wooden walls" },
      { ar: "على خشب قديم", en: "on weathered barn wood", value: "placed on a thick, cracked wooden beam in an old barn with vintage farming tools in the background" },
      { ar: "إضاءة شروق ريفية", en: "rustic sunrise light", value: "in a rustic barn entrance during sunrise with warm orange light and a beautiful countryside view" }
    ]
  },
  "in a bustling street market with colorful stalls and blurred crowds": {
    ar: "سوق شعبي مزدحم",
    en: "Bustling street market",
    suggestions: [
      { ar: "بين الفواكه", en: "among fresh fruits", value: "on a wooden stall in a busy market surrounded by colorful piles of oranges, grapes, and exotic fruits" },
      { ar: "مود السوق الليلي", en: "night market vibes", value: "in a bustling night market with colorful glowing lanterns and blurred crowds of people in the background" },
      { ar: "سوق توابل قديم", en: "ancient spice market", value: "on a stone counter in an old spice market surrounded by sacks of colorful aromatic spices and warm morning sun" }
    ]
  },
  "in an ethereal fantasy landscape with glowing flora and floating crystals": {
    ar: "عالم خيالي ساحر",
    en: "Ethereal fantasy landscape",
    suggestions: [
      { ar: "بجانب نهر مضيء", en: "by a glowing river", value: "on a mossy rock next to a glowing cyan river in an enchanted forest with giant purple mushrooms" },
      { ar: "تحت سماء وردية", en: "under a pink aurora", value: "in a magical meadow of silver grass under a vibrant pink and blue swirling aurora sky" },
      { ar: "على قمة جبل طاير", en: "on a floating mountain top", value: "on the edge of a floating island in the sky with waterfalls falling into the clouds and a golden sunset" }
    ]
  },
};
