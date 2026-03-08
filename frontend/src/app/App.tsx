import { useState, useEffect } from 'react';
import { Globe3D } from './components/Globe3D';
import { Compass, Globe as GlobeIcon, Clock, Sparkles } from 'lucide-react';

// Simplified Starfield for React background
const StarfieldBackground = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number; animDuration: number; }[]>([]);

  useEffect(() => {
    // Generate static stars for background
    const loadedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.1,
      animDuration: Math.random() * 3 + 2,
    }));
    setStars(loadedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animDuration}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative flex flex-col overflow-hidden font-sans">
      
      {/* Background Gradients & Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0" />
      <StarfieldBackground />
      
      {/* Radial Glow behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col flex-1 p-6 lg:p-8 max-w-[90rem] mx-auto w-full gap-8 h-full">
        
        {/* Top Header & Horizontal Info Cards */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 lg:gap-6 shrink-0 lg:w-auto">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md animate-pulse" />
              <Compass className="w-8 h-8 lg:w-10 lg:h-10 text-amber-500 relative z-10 animate-[spin_10s_linear_infinite]" />
            </div>
            
            <div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-amber-100 tracking-wide mb-1 lg:mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Global Time Capsule
              </h1>
              <p className="text-amber-200/70 text-sm lg:text-lg xl:text-xl font-medium">
                Journey through time and culture across the globe
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full xl:w-auto gap-4 lg:gap-6">
            
            {/* Info Card 1 */}
            <div className="flex-1 bg-slate-800/60 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-amber-600/30 flex items-center justify-center sm:justify-start gap-3 lg:gap-4 hover:bg-slate-800 hover:border-amber-500/50 transition-all">
              <GlobeIcon className="w-8 h-8 lg:w-10 lg:h-10 text-amber-400 shrink-0" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-amber-100 leading-tight">14</div>
                <div className="text-amber-200/70 text-[10px] lg:text-xs font-medium uppercase tracking-wider">Culture Capsules</div>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="flex-1 bg-slate-800/60 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-amber-600/30 flex items-center justify-center sm:justify-start gap-3 lg:gap-4 hover:bg-slate-800 hover:border-amber-500/50 transition-all">
              <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-amber-400 shrink-0" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-amber-100 leading-tight">4,500+</div>
                <div className="text-amber-200/70 text-[10px] lg:text-xs font-medium uppercase tracking-wider">Years of History</div>
              </div>
            </div>

            {/* Info Card 3 */}
            <div className="flex-1 bg-slate-800/60 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-amber-600/30 flex items-center justify-center sm:justify-start gap-3 lg:gap-4 hover:bg-slate-800 hover:border-amber-500/50 transition-all">
              <Sparkles className="w-8 h-8 lg:w-10 lg:h-10 text-amber-400 shrink-0" />
              <div>
                <div className="text-xl lg:text-2xl font-bold text-amber-100 leading-tight">AI-Powered</div>
                <div className="text-amber-200/70 text-[10px] lg:text-xs font-medium uppercase tracking-wider">Historical Summaries</div>
              </div>
            </div>

          </div>
        </div>

        {/* Globe Container Below */}
        <div className="flex-1 relative w-full flex items-center justify-center min-h-[500px]">
          <Globe3D />
        </div>

      </div>

      {/* Decorative Golden Corners mimicking Flutter app */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-600/30 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-amber-600/30 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-amber-600/30 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-600/30 rounded-br-3xl pointer-events-none" />
    </div>
  );
}