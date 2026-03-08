import { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { MapPin, Search, ZoomIn, ZoomOut, RotateCw, Hand, Sparkles } from 'lucide-react';
import { cultureCapsules } from '../data/cultureCapsules';
import { CultureCapsule } from '../models/cultureCapsule';
import { CultureCapsuleModal } from './CultureCapsuleModal';

interface Location {
  lat: number;
  lng: number;
  label: string;
}

interface Globe3DProps {
  onLocationSelect?: (location: Location) => void;
  selectedLocations?: Location[];
}

export function Globe3D({ onLocationSelect, selectedLocations = [] }: Globe3DProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isRotating, setIsRotating] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CultureCapsule[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [globeReady, setGlobeReady] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<CultureCapsule | null>(null);
  const [isGlowMode, setIsGlowMode] = useState(false);

  // Calculate interaction volume for a capsule
  const getInteractionVolume = (capsule: CultureCapsule) => {
    return capsule.stories.length + capsule.voiceNotes.length + capsule.questions.length;
  };

  // Resize observer to keep the 3D globe matching container size
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update auto-rotation when toggled
  useEffect(() => {
    if (globeRef.current && globeReady) {
      globeRef.current.controls().autoRotate = isRotating;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableDamping = true;
    }
  }, [isRotating, globeReady]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const results = cultureCapsules.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase()) || 
        city.country.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSelectCity = (city: CultureCapsule) => {
    setSearchQuery(city.name);
    setShowResults(false);
    
    // Smoothly fly to the city exactly like Google Earth
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: city.lat, lng: city.lng, altitude: 0.8 }, 1500);
    }
  };

  const handleZoomIn = () => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView();
      globeRef.current.pointOfView({ altitude: Math.max(0.2, currentPov.altitude - 0.4) }, 500);
    }
  };

  const handleZoomOut = () => {
    if (globeRef.current) {
      const currentPov = globeRef.current.pointOfView();
      globeRef.current.pointOfView({ altitude: Math.min(3, currentPov.altitude + 0.4) }, 500);
    }
  };

  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="w-full h-full relative">
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-black/40 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          onGlobeReady={() => setGlobeReady(true)}
          
          // Realistic textures
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
          
          // Data pins for hover interactions
          pointsData={[
            ...cultureCapsules,
            ...cultureCapsules.map(c => ({ ...c, isHitArea: true }))
          ]}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d: any) => d.isHitArea ? 'rgba(0,0,0,0.01)' : d.capsuleColor}
          pointAltitude={(d: any) => d.isHitArea ? 0.011 : 0.01}
          pointRadius={(d: any) => d.isHitArea ? 2.5 : 0.4}
          pointsMerge={false}
          pointLabel={(d: any) => `
            <div class="bg-gray-900/95 border border-[${d.capsuleColor}]/30 p-3 rounded-xl shadow-2xl backdrop-blur-sm -mt-2 pointer-events-none">
              <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4" style="color: ${d.capsuleColor}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="font-bold text-white text-sm">${d.name}, ${d.country}</span>
              </div>
              <div class="text-xs text-gray-400">
                ${d.timelinePeriod}
              </div>
              <div class="text-[10px] text-amber-300/80 mt-2 border-t border-gray-700/50 pt-1 uppercase tracking-wider font-bold">
                Click to explore capsule
              </div>
            </div>
          `}
          onPointClick={(d: any) => {
            setSelectedCapsule(d);
            setSearchQuery('');
          }}
          onGlobeClick={(coords) => {
            if (onLocationSelect) {
              onLocationSelect({ 
                lat: parseFloat(coords.lat.toFixed(4)), 
                lng: parseFloat(coords.lng.toFixed(4)), 
                label: searchQuery || `Location ${selectedLocations.length + 1}` 
              });
            }
            setSearchQuery('');
          }}
          ringsData={isGlowMode ? cultureCapsules : []}
          ringLat="lat"
          ringLng="lng"
          ringColor={(d: any) => d.capsuleColor}
          ringMaxRadius={(d: any) => Math.max(2, getInteractionVolume(d) * 1.5)}
          ringPropagationSpeed={(d: any) => Math.max(1, getInteractionVolume(d) * 0.5)}
          ringRepeatPeriod={(d: any) => Math.max(300, 1500 - getInteractionVolume(d) * 200)}
          ringLabel={(d: any) => `
            <div class="bg-gray-900/95 border border-[${d.capsuleColor}]/30 p-3 rounded-xl shadow-2xl backdrop-blur-sm -mt-2 pointer-events-none">
              <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4" style="color: ${d.capsuleColor}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="font-bold text-white text-sm">${d.name}, ${d.country}</span>
              </div>
              <div class="text-xs text-gray-400">
                ${d.timelinePeriod}
              </div>
              <div class="text-[10px] text-amber-300/80 mt-2 border-t border-gray-700/50 pt-1 uppercase tracking-wider font-bold">
                Click to explore capsule
              </div>
            </div>
          `}
          onRingClick={(d: any) => {
            setSelectedCapsule(d);
            setSearchQuery('');
          }}

        />

        {/* Top-Right Tools Menu */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 pointer-events-auto">
          {/* Glow Mode Toggle */}
          <button
            onClick={() => setIsGlowMode(!isGlowMode)}
            className={`p-3 rounded-xl border backdrop-blur-md shadow-xl transition-all group flex items-center justify-center relative overflown-hidden w-12 h-12 ${
              isGlowMode 
                ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-amber-200 hover:border-amber-600/50'
            }`}
            title="Toggle Activity Glow Mode"
          >
            {isGlowMode && <div className="absolute inset-0 bg-amber-400/10 animate-pulse rounded-xl" />}
            <Sparkles className={`w-5 h-5 relative z-10 ${isGlowMode ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-gray-400 text-sm px-4 pointer-events-none">
          <div className="flex items-center justify-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-amber-600/30 shadow-xl">
            {isGlowMode ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-100 font-bold">Activity Mode</span>
                <span className="text-amber-100/70">showing community stories</span>
              </>
            ) : (
              <>
                <span>🌍</span>
                <span className="text-amber-100 font-medium">Click markers</span>
                <span className="text-amber-100/70">to open culture capsules  •  🖱️</span>
                <span className="text-amber-100 font-medium">Drag to rotate</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Culture Capsule Modal Overlay */}
      {selectedCapsule && (
        <CultureCapsuleModal 
          capsule={selectedCapsule} 
          onClose={() => setSelectedCapsule(null)} 
        />
      )}
    </div>
  );
}