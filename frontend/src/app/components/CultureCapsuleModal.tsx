import React, { useState, useRef, useEffect } from 'react';
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
  ImagePlus,
  Coffee, 
  Mic, 
  Play, 
  Square,
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

  // Speech to Text state
  const [localVoiceNotes, setLocalVoiceNotes] = useState(capsule.voiceNotes);
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Reset perspective and notes when tab changes or capsule changes
  useEffect(() => {
    setActivePerspectiveIndex(0);
    setLocalVoiceNotes(capsule.voiceNotes);
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
    window.speechSynthesis.cancel();
    setPlayingId(null);
    setSelectedImage(null);
  }, [capsule.id, activeTab]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(fileUrl);
    }
  };

  const handlePlayVoiceNote = (id: string, text: string) => {
    if (playingId === id) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95; // slightly slower for better immersion
    
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    setPlayingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition API is not supported in this browser. Please use Chrome, Safari, or Edge.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscriptionText(currentTranscript);
      };
      
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      
      setTranscriptionText("");
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    }
  };

  const handleSaveVoiceNote = () => {
    if (transcriptionText.trim() || selectedImage) {
      const newNote = {
        id: `vn-new-${Date.now()}`,
        author: "Guest Traveler",
        date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
        transcription: transcriptionText,
        duration: "0:00",
        audioUrl: "",
        imageUrl: selectedImage || undefined,
      };
      setLocalVoiceNotes([newNote, ...localVoiceNotes]);
      setTranscriptionText("");
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
                
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-600/20 relative group">
                  {/* Badge for AI Synthesis if it's the general history */}
                  {activePerspectiveIndex === 0 && (
                    <div className="absolute -top-3 left-6 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2 py-1 rounded border border-indigo-500/30 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Synthesized
                    </div>
                  )}
                  
                  {/* TTS Audio Controls */}
                  <div className="absolute top-4 right-4 flex items-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // use a deterministic id for this TTS source
                        handlePlayVoiceNote(`history-tts-${activePerspectiveIndex}`, capsule.perspectives[activePerspectiveIndex].summary);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        playingId === `history-tts-${activePerspectiveIndex}`
                        ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(217,119,6,0.5)]' 
                        : 'bg-slate-700/50 hover:bg-amber-500/20 text-amber-500/70 hover:text-amber-400 opacity-50 group-hover:opacity-100'
                      }`}
                      title={playingId === `history-tts-${activePerspectiveIndex}` ? "Stop playback" : "Read aloud"}
                    >
                      {playingId === `history-tts-${activePerspectiveIndex}` ? (
                        <Square className="w-3 h-3 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      )}
                    </button>
                  </div>

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
              {localVoiceNotes.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Mic className="w-5 h-5 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">Voice Notes</h3>
                  </div>
                  <div className="space-y-4">
                    {localVoiceNotes.map(vn => (
                      <div key={vn.id} className="bg-slate-800/50 p-5 rounded-2xl border border-amber-600/20">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                            {vn.author[0]}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white">{vn.author}</h4>
                            <p className="text-xs text-amber-200/60">{vn.date}</p>
                          </div>
                          <button 
                            onClick={() => handlePlayVoiceNote(vn.id, vn.transcription)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                              playingId === vn.id 
                              ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.5)]' 
                              : 'bg-amber-500 hover:bg-amber-400 text-black'
                            }`}
                          >
                            {playingId === vn.id ? (
                              <Square className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-5 h-5 ml-1 fill-current" />
                            )}
                          </button>
                        </div>
                        
                        {/* Fake Waveform */}
                        <div className="flex items-end gap-[2px] h-8 mb-3 w-full">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`flex-1 rounded-sm ${playingId === vn.id ? 'bg-amber-300 animate-pulse' : 'bg-amber-400'} ${i < 15 ? 'opacity-100' : 'opacity-30'}`}
                              style={{ 
                                height: `${Math.max(10, Math.sin(i * 0.5) * 50 + 50)}%`,
                                animationDelay: `${i * 0.05}s`
                              }}
                            />
                          ))}
                        </div>
                        
                        {(vn.transcription || vn.imageUrl === undefined) && (
                          <p className="italic text-slate-300 text-sm mb-3">
                            "{vn.transcription}"
                          </p>
                        )}

                        {vn.imageUrl && (
                          <div className="mt-2 rounded-xl overflow-hidden border border-slate-700">
                            <img src={vn.imageUrl} alt="User memory" className="w-full max-h-64 object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Voice Note Recorder (Speech-to-Text) */}
              <div className="bg-slate-800 p-5 rounded-2xl border border-amber-600/30">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-bold flex items-center gap-2">
                    <Mic className="w-4 h-4 text-amber-400" /> Share Your Experience (Live Audio)
                  </h4>
                  {isRecording && (
                    <span className="flex items-center gap-2 text-red-400 text-xs font-bold animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-red-500" /> RECORDING
                    </span>
                  )}
                </div>
                
                <textarea
                  value={transcriptionText}
                  onChange={(e) => setTranscriptionText(e.target.value)}
                  placeholder="Click the microphone to start talking, or type your experience..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-300 text-sm focus:outline-none focus:border-amber-500 transition-colors mb-4 min-h-[80px]"
                />
                
                {selectedImage && (
                  <div className="relative mb-4 rounded-xl overflow-hidden border border-slate-700 h-32 w-32 group">
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => { setSelectedImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  ref={fileInputRef} 
                  onChange={handleImageSelect} 
                  className="hidden" 
                />

                <div className="flex gap-3">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-shrink-0 flex items-center justify-center p-3 rounded-xl border bg-slate-900 border-amber-600/50 text-amber-400 hover:bg-slate-800 transition-colors"
                  >
                    <ImagePlus className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={toggleRecording}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-medium transition-colors ${
                      isRecording 
                      ? 'bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500/20' 
                      : 'bg-slate-900 border-amber-600/50 text-amber-400 hover:bg-slate-800'
                    }`}
                  >
                    <Mic className={`w-5 h-5 ${isRecording ? 'animate-bounce' : ''}`} />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  
                  <button 
                    onClick={handleSaveVoiceNote}
                    disabled={(!transcriptionText.trim() && !selectedImage) || isRecording}
                    className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-slate-900 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UploadCloud className="w-5 h-5" />
                    Save Note
                  </button>
                </div>
              </div>

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
