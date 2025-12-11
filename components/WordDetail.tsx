import React, { useEffect, useState } from 'react';
import { Volume2, ArrowLeft, BookOpen, Star, Layers, Share2, Quote, GitBranch, AlignLeft, Globe, Loader2, Tag } from 'lucide-react';
import { playWordAudio, playUrl } from '../utils/audio';

interface WordDetailProps {
  word: string;
  onBack: () => void;
}

// Interfaces specific to Youdao raw JSON structure
interface YoudaoResponse {
  meta?: { input?: string; guessLanguage?: string };
  ec?: { word?: { usphone?: string; ukphone?: string; trs?: { tr?: { l?: { i?: string[] } }[] }[] }[]; exam_type?: string[] };
  collins?: { collins_entries?: { entries?: { entry?: { tran_entry?: { pos_entry?: { pos?: string; pos_tips?: string }; tran?: string; exam_sents?: { sent_orig?: string; sent_trans?: string }[] }[] }[] }[] }; star?: number }[] };
  phrs?: { phrs?: { phr?: { headword?: { l?: { i?: string } }; trs?: { tr?: { l?: { i?: string } }[] }[] } }[] };
  syno?: { synos?: { syno?: { pos?: string; tran?: string; ws?: { w?: string }[] } }[] };
  rel_word?: { rels?: { rel?: { pos?: string; words?: { word?: string; tran?: string }[] } }[] };
  etym?: { etyms?: { zh?: { word?: string; desc?: string; source?: string } } }; // Etymology structure varies greatly
  blng_sents_part?: { sentence?: { pair?: { sentence?: string; translation?: string; "aligned-words"?: { src?: { chars?: string } } } }[] }; // Bilingual sentences
  ee?: { word?: { trs?: { tr?: { l?: { i?: string }; pos?: string }[] }[] } }; // English-English
}

export const WordDetail: React.FC<WordDetailProps> = ({ word, onBack }) => {
  const [data, setData] = useState<YoudaoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://dict.youdao.com/jsonapi?q=${encodeURIComponent(word)}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    if (word) fetchData();
  }, [word]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">正在查询详细词典数据...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="text-red-500 text-lg mb-2">查询失败</div>
        <p className="text-slate-400 mb-6">{error || '未找到该单词的详细数据'}</p>
        <button onClick={onBack} className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition">返回</button>
      </div>
    );
  }

  // --- Safe Data Extraction ---
  const metaInput = data.meta?.input || word;
  
  // Phonetics
  const ecWord = data.ec?.word?.[0];
  const usPhone = ecWord?.usphone;
  const ukPhone = ecWord?.ukphone;
  
  // Basic Definitions (EC)
  const basicDefs = ecWord?.trs?.map(tr => tr.tr?.[0]?.l?.i?.[0]).filter(Boolean) as string[] || [];
  const tags = data.ec?.exam_type || [];

  // Collins
  const collinsEntries = data.collins?.collins_entries?.[0]?.entries?.entry || [];
  const star = data.collins?.collins_entries?.[0]?.star || 0;

  // Phrases
  const phrases = data.phrs?.phrs || [];

  // Synonyms
  const synonyms = data.syno?.synos || [];

  // Cognates (Roots)
  const relWords = data.rel_word?.rels || [];

  // Etymology (Structure is unstable in API, simple check)
  const etym = data.etym?.etyms?.zh?.desc || "";

  // Bilingual Sentences
  const sentences = data.blng_sents_part?.sentence || [];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-500 transition"
          title="返回"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{metaInput}</h1>
        <div className="ml-auto flex items-center gap-2">
           {tags.map(tag => (
               <span key={tag} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full font-medium whitespace-nowrap">{tag}</span>
           ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* 1. Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <BookOpen className="w-32 h-32" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end gap-6 relative z-10">
                <div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">{metaInput}</h2>
                    <div className="flex items-center gap-6">
                        {ukPhone && (
                            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => playWordAudio(metaInput, 'UK')}>
                                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">UK</span>
                                <span className="font-mono text-slate-600 text-lg">/{ukPhone}/</span>
                                <Volume2 className="w-5 h-5 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                        {usPhone && (
                            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => playWordAudio(metaInput, 'US')}>
                                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">US</span>
                                <span className="font-mono text-slate-600 text-lg">/{usPhone}/</span>
                                <Volume2 className="w-5 h-5 text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                    </div>
                </div>
                
                {star > 0 && (
                    <div className="md:ml-auto flex flex-col items-end">
                        <div className="flex gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < star ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            ))}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">Collins Frequency</span>
                    </div>
                )}
            </div>

            {/* Basic Defs */}
            <div className="mt-8 space-y-2">
                {basicDefs.map((def, idx) => (
                    <div key={idx} className="text-lg text-slate-700 font-medium leading-relaxed border-l-4 border-blue-500 pl-4 bg-slate-50 py-2 pr-4 rounded-r-lg">
                        {def}
                    </div>
                ))}
            </div>
        </div>

        {/* 2. Collins Dictionary */}
        {collinsEntries.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-amber-50/50 px-6 py-4 border-b border-amber-100 flex items-center">
                    <BookOpen className="w-5 h-5 text-amber-600 mr-2" />
                    <h3 className="font-bold text-slate-800">柯林斯英汉双解 (Collins)</h3>
                </div>
                <div className="p-6 space-y-6">
                    {collinsEntries.map((entry: any, i: number) => {
                        const tranEntry = entry.tran_entry?.[0];
                        if (!tranEntry) return null;
                        
                        const pos = tranEntry.pos_entry?.pos || '';
                        const def = tranEntry.tran;
                        const sents = tranEntry.exam_sents || [];

                        return (
                            <div key={i} className="group">
                                <div className="flex gap-3 mb-2">
                                    <span className="shrink-0 px-2 py-0.5 bg-slate-100 rounded text-xs font-bold text-slate-500 h-fit mt-1 font-serif">{pos}</span>
                                    <div className="text-slate-800 leading-relaxed font-medium">
                                        <span dangerouslySetInnerHTML={{__html: def}} />
                                    </div>
                                </div>
                                {sents.length > 0 && (
                                    <div className="ml-10 space-y-2 mt-2">
                                        {sents.map((sent: any, j: number) => (
                                            <div key={j} className="text-sm">
                                                <div className="text-slate-600 italic mb-0.5" dangerouslySetInnerHTML={{__html: sent.sent_orig}} />
                                                <div className="text-slate-400" dangerouslySetInnerHTML={{__html: sent.sent_trans}} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {i < collinsEntries.length - 1 && <div className="h-px bg-slate-100 my-4" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* 3. Grid Layout: Phrases & Synonyms & Roots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phrases */}
            {phrases.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="bg-indigo-50/50 px-6 py-4 border-b border-indigo-100 flex items-center">
                        <Layers className="w-5 h-5 text-indigo-600 mr-2" />
                        <h3 className="font-bold text-slate-800">短语搭配 (Phrases)</h3>
                    </div>
                    <div className="p-4 flex-1">
                        <ul className="space-y-3">
                            {phrases.slice(0, 8).map((p: any, i: number) => (
                                <li key={i} className="flex justify-between items-start text-sm pb-2 border-b border-dashed border-slate-100 last:border-0">
                                    <span className="font-bold text-slate-700 mr-2">{p.phr?.headword?.l?.i}</span>
                                    <span className="text-slate-500 text-right">{p.phr?.trs?.[0]?.tr?.l?.i}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Synonyms & Cognates */}
            <div className="space-y-6">
                {synonyms.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100 flex items-center">
                            <GitBranch className="w-5 h-5 text-emerald-600 mr-2" />
                            <h3 className="font-bold text-slate-800">同近义词 (Synonyms)</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            {synonyms.slice(0, 3).map((group: any, i: number) => (
                                <div key={i}>
                                    <div className="text-xs text-slate-400 mb-1">{group.syno?.pos}. {group.syno?.tran}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {group.syno?.ws?.map((w: any, j: number) => (
                                            <span key={j} className="px-2 py-1 bg-slate-50 text-slate-700 text-sm rounded border border-slate-200">{w.w}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {relWords.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-rose-50/50 px-6 py-4 border-b border-rose-100 flex items-center">
                            <Share2 className="w-5 h-5 text-rose-600 mr-2" />
                            <h3 className="font-bold text-slate-800">同根词 (Cognates)</h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {relWords.map((group: any, i: number) => (
                                <div key={i} className="flex gap-2 text-sm">
                                    <span className="font-mono font-bold text-slate-400 w-12 shrink-0">{group.rel?.pos}</span>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                        {group.rel?.words?.map((w: any, j: number) => (
                                            <span key={j} className="text-slate-600">
                                                <span className="font-medium text-slate-800">{w.word}</span>
                                                <span className="text-slate-400 text-xs ml-1">({w.tran})</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* 4. Etymology */}
        {etym && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100 flex items-center">
                    <AlignLeft className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-bold text-slate-800">词源 (Etymology)</h3>
                </div>
                <div className="p-6 text-slate-700 leading-relaxed text-sm">
                    {etym}
                </div>
            </div>
        )}

        {/* 5. Bilingual Sentences */}
        {sentences.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center">
                    <Globe className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-bold text-slate-800">双语例句 (Bilingual Sentences)</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {sentences.slice(0, 5).map((item: any, i: number) => (
                        <div key={i} className="p-4 hover:bg-slate-50 transition cursor-pointer group" onClick={() => playUrl(item.pair?.["sentence-audio"], 1)}>
                            <div className="flex gap-3">
                                <Quote className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                                <div>
                                    <p className="text-slate-800 font-medium mb-1 group-hover:text-blue-700 transition-colors" dangerouslySetInnerHTML={{__html: item.pair?.sentence || ""}}></p>
                                    <p className="text-sm text-slate-500">{item.pair?.translation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};