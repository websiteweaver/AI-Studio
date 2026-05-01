import React, { useState, useEffect } from 'react';
import { GenerationMode, AspectRatio, PromptTemplate } from './types';
import { generateProductImage, analyzeImage, removeBackground } from './services/geminiService';
import { RefreshIcon, SparklesIcon, SearchIcon, TagIcon, SaveIcon, FolderIcon, TrashIcon, CheckIcon, PlusIcon } from './components/Icons';
import ImageUploader from './components/ImageUploader';
import ImageComparator from './components/ImageComparator';
import HistoryTray from './components/HistoryTray';
import { translations, mockupTranslations, Language } from './translations';

interface HistoryItem {
  url: string;
  prompt: string;
}

interface SavedProject {
  id: string;
  title: string;
  date: string;
  mode: GenerationMode;
  productImageUrl: string | null;
  productImageBase64: string | null;
  swapImageBase64: string | null;
  selectedMockup: string;
  history: HistoryItem[];
  customPrompts?: Record<GenerationMode, string>;
  aspectRatio: AspectRatio;
  qualitySettings?: { detail: number, artistic: number, noise: number };
}

const DEFAULT_PROMPTS: Record<GenerationMode, string> = {
  [GenerationMode.Mockup]: "", // Defaults to selectedMockup
  [GenerationMode.Swap]: "Take the main product from the first image and place it realistically in the second image, matching the lighting, shadows, and overall style of the scene.",
  [GenerationMode.Analyze]: "Analyze this product image. Provide a list of objects detected and a brief professional description for marketing. Return the result in JSON format like this: {\"objects\": [\"object1\", \"object2\"], \"description\": \"...\"}"
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [mode, setMode] = useState<GenerationMode>(GenerationMode.Mockup);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
  const [swapImage, setSwapImage] = useState<File | null>(null);
  const [selectedMockup, setSelectedMockup] = useState<string>('on a studio white background with soft shadows');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
  
  const [currentGeneratedImageUrl, setCurrentGeneratedImageUrl] = useState<string | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<{ objects: string[], description: string } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [showProjects, setShowProjects] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>('');

  const [customPrompts, setCustomPrompts] = useState<Record<GenerationMode, string>>({...DEFAULT_PROMPTS});
  const [showPromptEditor, setShowPromptEditor] = useState<boolean>(false);

  const [promptTemplates, setPromptTemplates] = useState<Record<GenerationMode, PromptTemplate[]>>({
    [GenerationMode.Mockup]: [],
    [GenerationMode.Swap]: [],
    [GenerationMode.Analyze]: [],
  });

  const [isRemovingBg, setIsRemovingBg] = useState<boolean>(false);

  const [qualitySettings, setQualitySettings] = useState<{ detail: number, artistic: number, noise: number }>({ detail: 5, artistic: 5, noise: 5 });
  const [showQualityEditor, setShowQualityEditor] = useState<boolean>(false);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    const saved = localStorage.getItem('ai_product_projects');
    if (saved) {
      try {
        setSavedProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load projects from localStorage");
      }
    }
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('ai_product_projects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    const savedTemplates = localStorage.getItem('product-studio-templates');
    if (savedTemplates) {
      try {
        setPromptTemplates(JSON.parse(savedTemplates));
      } catch (e) {
        console.error("Failed to load templates", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('product-studio-templates', JSON.stringify(promptTemplates));
  }, [promptTemplates]);

  const handleSaveTemplate = (name: string) => {
    const prompt = customPrompts[mode];
    if (!prompt.trim()) return;

    const newTemplate: PromptTemplate = {
      id: Date.now().toString(),
      name,
      prompt
    };

    setPromptTemplates({
      ...promptTemplates,
      [mode]: [...promptTemplates[mode], newTemplate]
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setPromptTemplates({
      ...promptTemplates,
      [mode]: promptTemplates[mode].filter(t => t.id !== id)
    });
  };

  const handlePromptChange = (val: string) => {
    setCustomPrompts({ ...customPrompts, [mode]: val });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const base64ToFile = async (base64: string, filename: string): Promise<File> => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  const handleSaveProject = async () => {
    if (!productImageUrl && history.length === 0) return;
    
    setIsLoading(true);
    try {
      const pImageBase64 = productImage ? await fileToBase64(productImage) : null;
      const sImageBase64 = swapImage ? await fileToBase64(swapImage) : null;
      
      const newProject: SavedProject = {
        id: Date.now().toString(),
        title: projectTitle || `${t.modeMockup} - ${new Date().toLocaleDateString()}`,
        date: new Date().toLocaleString(),
        mode,
        productImageUrl,
        productImageBase64: pImageBase64,
        swapImageBase64: sImageBase64,
        selectedMockup,
        history,
        customPrompts,
        aspectRatio,
        qualitySettings,
      };

      setSavedProjects([newProject, ...savedProjects]);
      setProjectTitle('');
      alert(t.saveSuccess);
    } catch (err) {
      console.error(err);
      setError("Failed to save project.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadProject = async (project: SavedProject) => {
    setIsLoading(true);
    try {
      setMode(project.mode);
      setSelectedMockup(project.selectedMockup);
      setAspectRatio(project.aspectRatio || AspectRatio.Square);
      setQualitySettings(project.qualitySettings || { detail: 5, artistic: 5, noise: 5 });
      setHistory(project.history || []);
      setCustomPrompts(project.customPrompts || {...DEFAULT_PROMPTS});
      if (project.history && project.history.length > 0) {
        setCurrentGeneratedImageUrl(project.history[0].url);
      } else {
        setCurrentGeneratedImageUrl(null);
      }
      
      if (project.productImageBase64) {
        const file = await base64ToFile(project.productImageBase64, 'saved-product.png');
        setProductImage(file);
        setProductImageUrl(project.productImageUrl || project.productImageBase64);
      } else {
        setProductImage(null);
        setProductImageUrl(null);
      }

      if (project.swapImageBase64) {
        const file = await base64ToFile(project.swapImageBase64, 'saved-swap.png');
        setSwapImage(file);
      } else {
        setSwapImage(null);
      }

      setAnalyzeResult(null);
      setShowProjects(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load project.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    setSavedProjects(savedProjects.filter(p => p.id !== id));
  };

  const handleModeChange = (newMode: GenerationMode) => {
    setMode(newMode);
    setError(null);
    setSwapImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productImage) {
      setError(t.errorNoProduct);
      return;
    }

    setIsLoading(true);
    setError(null);

    let finalPrompt = '';
    let finalSwapImage: File | null = null;

    switch (mode) {
      case GenerationMode.Mockup:
        finalPrompt = customPrompts[GenerationMode.Mockup] || selectedMockup;
        break;
      case GenerationMode.Swap:
        if (!swapImage) {
            setError(t.errorNoScene);
            setIsLoading(false);
            return;
        }
        finalPrompt = customPrompts[GenerationMode.Swap] || DEFAULT_PROMPTS[GenerationMode.Swap];
        finalSwapImage = swapImage;
        break;
      case GenerationMode.Analyze:
        try {
          const result = await analyzeImage(productImage, customPrompts[GenerationMode.Analyze] || DEFAULT_PROMPTS[GenerationMode.Analyze]);
          setAnalyzeResult(result);
          setIsLoading(false);
          return;
        } catch (err) {
          console.error(err);
          setError(t.errorAnalyze);
          setIsLoading(false);
          return;
        }
    }
    
    try {
      const base64Data = await generateProductImage(productImage, finalPrompt, finalSwapImage, aspectRatio, qualitySettings);
      const newImageUrl = `data:image/png;base64,${base64Data}`;
      setCurrentGeneratedImageUrl(newImageUrl);
      setHistory(prevHistory => [{ url: newImageUrl, prompt: finalPrompt }, ...prevHistory]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t.errorGenerate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!productImage) return;
    
    setIsRemovingBg(true);
    setError(null);

    try {
      const base64Data = await removeBackground(productImage);
      const newImageUrl = `data:image/png;base64,${base64Data}`;
      
      // Convert base64 to File object to update state
      const res = await fetch(newImageUrl);
      const blob = await res.blob();
      const file = new File([blob], "isolated_product.png", { type: "image/png" });
      
      setProductImage(file);
      setProductImageUrl(newImageUrl);
    } catch (err) {
      console.error(err);
      setError(lang === 'ar' ? 'فشل مسح الخلفية' : 'Failed to remove background');
    } finally {
      setIsRemovingBg(false);
    }
  };

  const handleRegenerate = async (prompt: string) => {
    if (!productImage) return;
    
    setIsLoading(true);
    setError(null);
    setShowProjects(false);

    try {
      let finalSwapImage: File | null = null;
      if (mode === GenerationMode.Swap && swapImage) {
        finalSwapImage = swapImage;
      }

      const base64Data = await generateProductImage(productImage, prompt, finalSwapImage, aspectRatio, qualitySettings);
      const newImageUrl = `data:image/png;base64,${base64Data}`;
      setCurrentGeneratedImageUrl(newImageUrl);
      setHistory(prevHistory => [{ url: newImageUrl, prompt: prompt }, ...prevHistory]);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : t.errorGenerate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentGeneratedImageUrl(null);
    setAnalyzeResult(null);
    setError(null);
  };

  const dataURLtoFile = async (dataUrl: string, filename: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  const handleReuseImage = async (imageUrl: string) => {
    const file = await dataURLtoFile(imageUrl, 'reused-product.png');
    setProductImage(file);
    setProductImageUrl(imageUrl);
    setCurrentGeneratedImageUrl(null);
    setHistory([]);
    setError(null);
  };
  
  if (analyzeResult && productImageUrl) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="w-full max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">{t.analyzeResultTitle}</h1>
            <p className="text-gray-400">{t.analyzeResultDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl">
            <div className={`order-2 md:order-1 space-y-6 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
              <div>
                <h3 className={`text-fuchsia-400 font-bold mb-3 flex items-center gap-2 ${lang === 'en' ? 'justify-start' : 'justify-end'}`}>
                  {lang === 'ar' && <TagIcon />}
                  {t.detectedObjects}
                  {lang === 'en' && <TagIcon />}
                </h3>
                <div className={`flex flex-wrap gap-2 ${lang === 'en' ? 'justify-start' : 'justify-end'}`}>
                  {analyzeResult.objects.map((obj, i) => (
                    <span key={i} className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 px-3 py-1 rounded-full text-sm">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-cyan-400 font-bold mb-3 flex items-center gap-2 ${lang === 'en' ? 'justify-start' : 'justify-end'}`}>
                  {lang === 'ar' && <SearchIcon />}
                  {t.suggestedDesc}
                  {lang === 'en' && <SearchIcon />}
                </h3>
                <p className="text-gray-300 leading-relaxed bg-gray-900/40 p-4 rounded-xl border border-gray-700/50">
                  {analyzeResult.description}
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img src={productImageUrl} alt="Product" className="w-full h-auto rounded-xl shadow-lg border border-gray-700" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCreateNew}
              className="w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <RefreshIcon />
              {t.tryAnother}
            </button>
          </div>

          <footer className="mt-12 opacity-70">
            <p className="text-sm text-gray-400 font-medium">
              Created by <a href="https://www.instagram.com/visions.by.elissa" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline">@visions.by.elissa</a> & <a href="https://www.instagram.com/website.weaver" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@website.weaver</a>
            </p>
          </footer>
        </div>
      </div>
    );
  }

  if (currentGeneratedImageUrl && productImageUrl) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="w-full max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 mb-4">{t.resultReady}</h1>
          <p className="text-gray-400 mb-8">{t.resultCompare}</p>
          
          <ImageComparator beforeImageUrl={productImageUrl} afterImageUrl={currentGeneratedImageUrl} />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={currentGeneratedImageUrl}
              download="generated-product-image.png"
              className="w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
            >
              {t.downloadBtn}
            </a>
            <button
              onClick={handleCreateNew}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <RefreshIcon />
              {t.createNewBtn}
            </button>
          </div>
          
          {history.length > 0 && (
            <HistoryTray
              history={history}
              currentImageUrl={currentGeneratedImageUrl || ''}
              onSelect={(imageUrl) => setCurrentGeneratedImageUrl(imageUrl)}
              onReuse={handleReuseImage}
              onRegenerate={handleRegenerate}
              t={t}
              lang={lang}
            />
          )}

          <footer className="mt-12 opacity-70">
            <p className="text-sm text-gray-400 font-medium">
              Created by <a href="https://www.instagram.com/visions.by.elissa" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline">@visions.by.elissa</a> & <a href="https://www.instagram.com/website.weaver" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@website.weaver</a>
            </p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-10 relative">
          <div className={`absolute top-0 flex gap-2 ${lang === 'en' ? 'right-0' : 'left-0'}`}>
            <button 
              type="button" 
              onClick={() => setShowProjects(!showProjects)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-gray-700 transition-colors flex items-center gap-1.5"
            >
              <FolderIcon />
              {t.loadProjectsBtn}
            </button>
            <button 
              type="button" 
              onClick={toggleLanguage}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-gray-700 transition-colors"
            >
              {t.languageToggle}
            </button>
          </div>

          <div className="inline-block p-4 bg-gray-800 rounded-full mb-4 ring-2 ring-fuchsia-500/50">
            <SparklesIcon />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">{t.title}</h1>
          <p className="mt-4 text-lg text-gray-400">{t.description}</p>
        </header>

        {showProjects ? (
          <div className="space-y-6 bg-gray-800/50 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">{t.projectsLabel}</h2>
            {savedProjects.length === 0 ? (
              <p className="text-gray-400 text-center py-8">{t.noSavedProjects}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[60vh] pr-2">
                {savedProjects.map((project) => (
                  <div key={project.id} className="bg-gray-900/80 p-4 rounded-xl border border-gray-700 flex items-center gap-4 transition-all hover:border-fuchsia-500/50">
                    <img 
                      src={project.productImageBase64 || project.productImageUrl || ''} 
                      alt="Project preview" 
                      className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">{project.title}</h3>
                      <p className="text-xs text-gray-500">{project.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => handleLoadProject(project)}
                        className="p-2 text-fuchsia-400 hover:bg-fuchsia-500/10 rounded-lg transition-colors"
                        title={t.loadBtn}
                      >
                        <RefreshIcon />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title={t.deleteBtn}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button 
              type="button" 
              onClick={() => setShowProjects(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-4"
            >
              {lang === 'ar' ? 'رجوع' : 'Back'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-gray-800/50 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <ImageUploader 
                  id="product-image"
                  label={t.uploadProductLabel}
                  onFileSelect={(file, url) => {
                    setProductImage(file);
                    setProductImageUrl(url);
                    setHistory([]);
                  }}
                  onRemoveBg={handleRemoveBackground}
                  isRemovingBg={isRemovingBg}
                  previewUrl={productImageUrl}
                  isRequired
                  t={t}
                  lang={lang}
                />
              </div>
              
              <div className="w-full sm:w-auto">
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder={t.projectTitlePlaceholder}
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:ring-fuchsia-500 focus:border-fuchsia-500 flex-1 min-w-0"
                    />
                    <button
                      type="button"
                      disabled={!productImage && history.length === 0}
                      onClick={handleSaveProject}
                      className="bg-fuchsia-600/20 hover:bg-fuchsia-600/30 text-fuchsia-400 border border-fuchsia-500/30 p-2 rounded-lg transition-colors flex items-center justify-center min-w-[40px]"
                      title={t.saveProjectBtn}
                    >
                      <SaveIcon />
                    </button>
                 </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.whatToDo}</label>
              <div className="grid grid-cols-3 gap-3">
                {(Object.values(GenerationMode)).map((value) => {
                  const labels = {
                      [GenerationMode.Mockup]: t.modeMockup,
                      [GenerationMode.Swap]: t.modeSwap,
                      [GenerationMode.Analyze]: t.modeAnalyze,
                  };
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleModeChange(value)}
                      className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-fuchsia-500 ${
                        mode === value ? 'bg-fuchsia-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {labels[value]}
                    </button>
                  )
                })}
              </div>
            </div>
            
            <div className="min-h-[15rem] flex flex-col justify-center">
              {mode === GenerationMode.Mockup && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mockup-select" className="block text-sm font-medium text-gray-300 mb-2">{t.selectBackground}</label>
                    <select
                      id="mockup-select"
                      value={selectedMockup}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedMockup(val);
                        // Reset custom prompt if it matches a suggestion or default of another mockup
                        setCustomPrompts({...customPrompts, [GenerationMode.Mockup]: ""});
                      }}
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-3 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    >
                      {Object.entries(mockupTranslations).map(([promptValue, trans]) => (
                        <option key={promptValue} value={promptValue}>{trans[lang]}</option>
                      ))}
                    </select>
                  </div>

                  {mockupTranslations[selectedMockup]?.suggestions && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">
                        {lang === 'ar' ? 'اقتراحات إضافية:' : 'Suggested variations:'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {mockupTranslations[selectedMockup].suggestions!.map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setCustomPrompts({
                                ...customPrompts,
                                [GenerationMode.Mockup]: suggestion.value
                              });
                              setShowPromptEditor(true);
                            }}
                            className="bg-gray-800/80 hover:bg-fuchsia-600/20 border border-gray-700 hover:border-fuchsia-500/50 text-gray-400 hover:text-fuchsia-300 px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5"
                          >
                            <SparklesIcon />
                            {suggestion[lang]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {mode === GenerationMode.Analyze && (
                  <div className="space-y-4">
                      <p className="text-sm text-center text-gray-400 bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                          {t.analyzeInfo}
                      </p>
                  </div>
              )}

              {mode === GenerationMode.Swap && (
                  <div className="space-y-4">
                      <p className="text-sm text-center text-gray-400 bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                          {t.swapInfo}
                      </p>
                      <ImageUploader
                          id="swap-image"
                          label={t.uploadSceneLabel}
                          onFileSelect={(file) => setSwapImage(file)}
                          isRequired
                          t={t}
                          lang={lang}
                      />
                  </div>
              )}
            </div>

            {mode !== GenerationMode.Analyze && (
              <div className="pt-4 border-t border-gray-700/50">
                <label className="block text-sm font-medium text-gray-300 mb-3">{t.aspectRatioLabel}</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {Object.values(AspectRatio).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        aspectRatio === ratio
                          ? 'bg-fuchsia-600/20 border-fuchsia-500 text-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.2)]'
                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-2 border-t border-gray-700/50">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPromptEditor(!showPromptEditor)}
                  className="text-xs text-gray-400 hover:text-fuchsia-400 transition-colors flex items-center gap-1"
                >
                  {showPromptEditor ? t.hidePromptBtn : t.editPromptBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setShowQualityEditor(!showQualityEditor)}
                  className="text-xs text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  {t.qualityControlsBtn}
                </button>
              </div>

              {showPromptEditor && (
                <div className="mt-3 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t.customPromptLabel}</label>
                  </div>
                  
                  {/* Template Selector */}
                  {promptTemplates[mode].length > 0 && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-1">{t.templateLabel}</label>
                      <select
                        className="w-full bg-gray-900/60 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        onChange={(e) => {
                          const template = promptTemplates[mode].find(t => t.id === e.target.value);
                          if (template) {
                            setCustomPrompts({ ...customPrompts, [mode]: template.prompt });
                          }
                        }}
                        value=""
                      >
                        <option value="">{lang === 'ar' ? '-- اختار قالب --' : '-- Select Template --'}</option>
                        {promptTemplates[mode].map(template => (
                          <option key={template.id} value={template.id}>{template.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <textarea
                    value={customPrompts[mode]}
                    onChange={(e) => setCustomPrompts({...customPrompts, [mode]: e.target.value})}
                    placeholder={mode === GenerationMode.Mockup ? selectedMockup : DEFAULT_PROMPTS[mode]}
                    className="w-full bg-gray-900/80 border border-gray-700 text-gray-300 rounded-lg p-3 text-xs font-mono focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 min-h-[100px]"
                  />

                  {/* Save Template UI */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t.templateNamePlaceholder}
                      id={`template-name-${mode}`}
                      className="flex-1 bg-gray-900/50 border border-gray-700 text-white rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById(`template-name-${mode}`) as HTMLInputElement;
                        if (input && input.value) {
                          handleSaveTemplate(input.value);
                          input.value = '';
                        }
                      }}
                      className="bg-fuchsia-600/10 hover:bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/20 px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all"
                    >
                      <PlusIcon />
                      <span className="hidden sm:inline">{t.saveAsTemplateBtn}</span>
                    </button>
                  </div>

                  {/* Mini list of templates with delete option */}
                  {promptTemplates[mode].length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {promptTemplates[mode].map(template => (
                        <div key={template.id} className="group flex items-center gap-1.5 bg-gray-900/60 border border-gray-700 rounded-full pl-2.5 pr-1 py-0.5 max-w-[150px]">
                          <span 
                            className="text-[10px] text-gray-500 truncate cursor-pointer hover:text-fuchsia-400"
                            onClick={() => setCustomPrompts({ ...customPrompts, [mode]: template.prompt })}
                            title={template.prompt}
                          >
                            {template.name}
                          </span>
                          <button 
                            type="button"
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="text-gray-600 hover:text-red-400 p-0.5 rounded-full transition-colors"
                            title={t.deleteTemplateBtn}
                          >
                            <XCircleIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {showQualityEditor && (
                <div className="mt-3 space-y-4 bg-gray-900/40 p-4 rounded-xl border border-gray-700/50">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs text-gray-400">{t.detailLevelLabel}</label>
                      <span className="text-xs text-fuchsia-400 font-mono">{qualitySettings.detail}/10</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      value={qualitySettings.detail}
                      onChange={(e) => setQualitySettings({...qualitySettings, detail: parseInt(e.target.value)})}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs text-gray-400">{t.artisticIntensityLabel}</label>
                      <span className="text-xs text-fuchsia-400 font-mono">{qualitySettings.artistic}/10</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      value={qualitySettings.artistic}
                      onChange={(e) => setQualitySettings({...qualitySettings, artistic: parseInt(e.target.value)})}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-xs text-gray-400">{t.noiseReductionLabel}</label>
                      <span className="text-xs text-fuchsia-400 font-mono">{qualitySettings.noise}/10</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" 
                      value={qualitySettings.noise}
                      onChange={(e) => setQualitySettings({...qualitySettings, noise: parseInt(e.target.value)})}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {error && <p className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={isLoading || !productImage}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {mode === GenerationMode.Analyze ? t.processingAnalyze : t.processingImage}
                </>
              ) : (
                <>
                  <SparklesIcon />
                  {mode === GenerationMode.Analyze ? t.analyzeBtn : t.generateBtn}
                </>
              )}
            </button>
          </form>
        )}
      </div>
      <footer className="mt-12 mb-6 text-center opacity-70">
        <p className="text-sm text-gray-400 font-medium">
          Created by <a href="https://www.instagram.com/visions.by.elissa" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline">@visions.by.elissa</a> & <a href="https://www.instagram.com/website.weaver" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@website.weaver</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
