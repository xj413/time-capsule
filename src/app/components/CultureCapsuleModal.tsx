import React, { useState } from 'react';
import { CultureCapsule } from '../models/cultureCapsule';
import { 
  X, 
  MapPin, 
  Clock, 
  Compass, 
  BookOpen, 
  Sun, 
  Users, 
  Sparkles, 
  Image as ImageIcon, 
  Coffee, 
  Mic, 
  Play, 
  UploadCloud, 
  PenTool, 
  User, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  Send
} from 'lucide-react';

interface CultureCapsuleModalProps {
  capsule: CultureCapsule;
  onClose: () => void;
}

export function CultureCapsuleModal({ capsule, onClose }: CultureCapsuleModalProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'life' | 'community'>('history');
  const [activePerspectiveIndex, setActivePerspectiveIndex] = useState(0);

  // Reset perspective when tab changes or capsule changes
  React.useEffect(() => {
    setActivePerspectiveIndex(0);
  }, [capsule.id, activeTab]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl border border-amber-600/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform transition-all animate-in slide-in-from-bottom-8 fade-in duration-300"
      >
        {/* Header */}
        <div className="bg-slate-800 p-6 border-b border-amber-600/20 relative">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-amber-500/20 rounded-2xl border border-amber-500/40 flex items-center justify-center shrink-0">
              <Compass className="w-8 h-8 text-amber-400" />
            </div>
            
            <div className="flex-1 pr-8">
              <h2 className="text-3xl font-bold text-amber-100 mb-2 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {capsule.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-amber-200/70 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{capsule.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{capsule.timelinePeriod}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-amber-100/70 hover:text-amber-100 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-700 bg-slate-900">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${activeTab === 'history' ? 'text-amber-400' : 'text-amber-100/50 hover:text-amber-100/80'}`}
          >
            <BookOpen className="w-4 h-4" />
            History
            {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
          </button>
          <button
            onClick={() => setActiveTab('life')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${activeTab === 'life' ? 'text-amber-400' : 'text-amber-100/50 hover:text-amber-100/80'}`}
          >
            <Sun className="w-4 h-4" />
            Life Today
            {activeTab === 'life' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${activeTab === 'community' ? 'text-amber-400' : 'text-amber-100/50 hover:text-amber-100/80'}`}
          >
            <Users className="w-4 h-4" />
            Community Voices
            {activeTab === 'community' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900 scrollbar-thin scrollbar-thumb-amber-600/30 scrollbar-track-transparent">
          
          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">Historical Context</h3>
                  </div>
                  
                  {/* Perspective Selector */}
                  <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                    {capsule.perspectives.map((p, idx) => (
                      <button
                        key={p.role}
                        onClick={() => setActivePerspectiveIndex(idx)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                          idx === activePerspectiveIndex 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {p.role}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-600/20 relative">
                  {/* Badge for AI Synthesis if it's the general history */}
                  {activePerspectiveIndex === 0 && (
                    <div className="absolute -top-3 left-6 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded border border-indigo-500/30 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Synthesized
                    </div>
                  )}
                  <p className="text-slate-300 leading-relaxed text-[15px] animate-in fade-in zoom-in duration-300" key={activePerspectiveIndex}>
                    {capsule.perspectives[activePerspectiveIndex].summary}
                  </p>
                </div>
              </div>

              {capsule.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <ImageIcon className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">Gallery</h3>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-slate-700">
                    <img 
                      src={capsule.images[0]} 
                      alt={capsule.name} 
                      className="w-full h-[300px] object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LIFE TODAY TAB */}
          {activeTab === 'life' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Coffee className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Life Today</h3>
                  <span className="text-xs text-slate-400 ml-auto bg-slate-800 px-2 py-1 rounded">Community Contributions</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {capsule.lifeTodayCards.map((card, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-amber-600/20 hover:border-amber-500/40 transition-colors flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{card.category}</span>
                        {card.category === 'Misconception vs Reality' && <HelpCircle className="w-4 h-4 text-slate-500" />}
                        {card.category === 'Food' && <Coffee className="w-4 h-4 text-slate-500" />}
                        {card.category === 'Slang' && <MessageSquare className="w-4 h-4 text-slate-500" />}
                        {card.category === 'Routines' && <Sun className="w-4 h-4 text-slate-500" />}
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                      <p className="text-slate-300 text-[14px] leading-relaxed flex-1 whitespace-pre-line">
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COMMUNITY VOICES TAB */}
          {activeTab === 'community' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Voice Notes */}
              {capsule.voiceNotes.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mic className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">Voice Notes</h3>
                  </div>
                  <div className="space-y-4">
                    {capsule.voiceNotes.map(vn => (
                      <div key={vn.id} className="bg-slate-800/50 p-5 rounded-2xl border border-amber-600/20">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                            {vn.author[0]}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white">{vn.author}</h4>
                            <p className="text-xs text-amber-200/60">{vn.date}</p>
                          </div>
                          <button className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center hover:bg-amber-400 transition-colors">
                            <Play className="w-5 h-5 text-black ml-1" />
                          </button>
                        </div>
                        
                        {/* Fake Waveform */}
                        <div className="flex items-end gap-[2px] h-8 mb-3 w-full">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-sm bg-amber-400 ${i < 15 ? 'opacity-100' : 'opacity-30'}`}
                              style={{ 
                                height: `${Math.max(10, Math.sin(i * 0.5) * 50 + 50)}%` 
                              }}
                            />
                          ))}
                        </div>
                        
                        <p className="italic text-slate-300 text-sm">
                          "{vn.transcription}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Voice Note Button */}
              <button 
                onClick={() => alert("ElevenLabs Integration Pending")}
                className="w-full flex items-center justify-center gap-3 bg-slate-800 py-4 rounded-xl border border-amber-600/50 text-amber-400 hover:bg-slate-700 transition-colors font-medium"
              >
                <UploadCloud className="w-5 h-5" />
                Upload Voice Note
              </button>

              {/* Traveler Memories */}
              {capsule.stories.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <PenTool className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">Traveler Memories</h3>
                  </div>
                  <div className="space-y-4">
                    {capsule.stories.map(story => (
                      <div key={story.id} className="bg-slate-800/30 p-5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4 text-amber-200" />
                          <span className="font-bold text-white text-sm">{story.author}</span>
                          <span className="text-xs text-white/50 ml-auto">{story.date}</span>
                        </div>
                        <p className="text-slate-300 text-[15px] leading-relaxed">
                          {story.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ask a Local */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Ask A Local</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {capsule.questions.map(q => (
                    <div key={q.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 mb-1">{q.author}</p>
                          <p className="text-white font-medium">{q.question}</p>
                        </div>
                      </div>
                      
                      {q.answer && (
                        <>
                          <hr className="border-white/10 my-4" />
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-amber-400 mb-1">{q.answeredBy} <span className="text-amber-400/70 font-normal">(Local)</span></p>
                              <p className="text-slate-300 text-[15px]">{q.answer}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Input Field */}
                <div className="flex items-center gap-3 bg-slate-900 border border-white/20 rounded-full py-2 px-4 focus-within:border-amber-500 transition-colors">
                  <MessageSquare className="w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Leave a question for locals..."
                    className="flex-1 bg-transparent text-white placeholder:text-slate-500 focus:outline-none text-sm"
                  />
                  <button className="p-2 text-amber-400 hover:bg-amber-400/10 rounded-full transition-colors">
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
