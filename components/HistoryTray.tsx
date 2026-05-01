import React from 'react';
import { EditIcon, SparklesIcon } from './Icons';

interface HistoryItem {
  url: string;
  prompt: string;
}

interface HistoryTrayProps {
  history: HistoryItem[];
  currentImageUrl: string;
  onSelect: (url: string) => void;
  onReuse: (url: string) => void;
  onRegenerate: (prompt: string) => void;
  t: any;
  lang: string;
}

const HistoryTray: React.FC<HistoryTrayProps> = ({ history, currentImageUrl, onSelect, onReuse, onRegenerate, t, lang }) => {
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editedPrompt, setEditedPrompt] = React.useState<string>('');

  const handleStartEdit = (e: React.MouseEvent, index: number, prompt: string) => {
    e.stopPropagation();
    setEditingIndex(index);
    setEditedPrompt(prompt);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editedPrompt.trim()) {
      onRegenerate(editedPrompt);
      setEditingIndex(null);
    }
  };

  return (
    <div className="w-full mt-10">
      <h2 className="text-lg font-semibold text-gray-300 mb-4 text-center">{t.historyTitle}</h2>
      
      {editingIndex !== null && (
        <div className="mb-6 animate-in fade-in zoom-in duration-200 bg-gray-800/80 p-4 rounded-xl border border-fuchsia-500/30 shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">{t.editHistoryPrompt}</h3>
            <button 
              onClick={() => setEditingIndex(null)}
              className="text-gray-500 hover:text-white text-xs"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
          <textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 font-mono mb-3 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 min-h-[100px]"
          />
          <button
            onClick={handleRegenerate}
            disabled={!editedPrompt.trim()}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {t.regenerateBtn}
          </button>
        </div>
      )}

      <div className={`flex gap-4 overflow-x-auto p-4 bg-gray-900/50 rounded-lg border border-gray-700 snap-x snap-mandatory ${lang === 'en' ? 'flex-row' : 'flex-row'}`}>
        {history.map((item, index) => (
          <div
            key={index}
            className={`relative group flex-shrink-0 w-28 h-28 rounded-lg cursor-pointer transition-all duration-200 snap-center ${currentImageUrl === item.url ? 'ring-4 ring-fuchsia-500 shadow-lg' : 'ring-2 ring-gray-600 hover:ring-fuchsia-500'}`}
            onClick={() => onSelect(item.url)}
            role="button"
            aria-label={`${t.historySelectImg} ${index + 1}`}
            tabIndex={0}
          >
            <img src={item.url} alt={`${t.historySelectImg} ${index + 1}`} className="w-full h-full object-cover rounded-md" loading="lazy" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md flex flex-col items-center justify-center gap-2 p-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReuse(item.url);
                }}
                className="w-full flex items-center justify-center gap-1.5 bg-gray-800/90 text-white text-[10px] py-1 px-1 rounded-md hover:bg-fuchsia-600 transition-colors"
                title={t.historyReuseTooltip}
              >
                <EditIcon />
                {t.historyReuseBtn}
              </button>
              <button
                onClick={(e) => handleStartEdit(e, index, item.prompt)}
                className="w-full flex items-center justify-center gap-1.5 bg-gray-800/90 text-white text-[10px] py-1 px-1 rounded-md hover:bg-cyan-600 transition-colors"
              >
                <SparklesIcon />
                {t.editHistoryPrompt}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTray;