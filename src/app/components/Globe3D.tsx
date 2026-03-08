import { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { MapPin, Search, ZoomIn, ZoomOut, RotateCw, Hand, Sparkles, Navigation } from 'lucide-react';
import { cultureCapsules } from '../data/cultureCapsules';
import { countryLabels } from '../data/countries';
import { oceanLabels } from '../data/oceans';
import { capitalLabels } from '../data/capitals';
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
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [altitude, setAltitude] = useState(2.5);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation permission denied or error:", error);
        }
      );
    }
  }, []);

  // Convert plain capital data into CultureCapsule objects
  const capitalCapsules: CultureCapsule[] = capitalLabels.map(c => {
    // Attempt to extract city and country if stored as "City, Country"
    const parts = c.name.split(', ');
    const name = parts[0];
    const country = parts.length > 1 ? parts[1] : '';
    
    return {
      id: `capital-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: name,
      country: country,
      lat: c.lat,
      lng: c.lng,
      timelinePeriod: "Capital City",
      capsuleColor: "#10B981", // Emerald green for capitals
      isCapital: true,
      perspectives: [
        {
          role: "Global Citizen",
          summary: `This is the capital city of ${country || 'this nation'}. It serves as the political and cultural heart of the country.`
        }
      ],
      lifeTodayCards: [
        {
          category: "Community Capture",
          title: "Be the First to Share",
          content: "No local insights have been recorded for this capital yet. If you live here or have visited, share what life looks like around you!"
        }
      ],
      images: [],
      stories: [],
      voiceNotes: [],
      questions: []
    };
  });

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

  const handleMyLocationClick = async () => {
    if (userLocation) {
      // Smoothly fly to the location
      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: userLocation.lat, lng: userLocation.lng, altitude: 0.6 }, 1000);
      }
      
      // Calculate distance to find if there's a nearby capsule
      const R = 6371; // Radius of the earth in km
      let closestCapsule = null;
      let minDistance = Infinity;
      
      for (const capsule of cultureCapsules) {
        const dLat = (capsule.lat - userLocation.lat) * Math.PI / 180;
        const dLon = (capsule.lng - userLocation.lng) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(capsule.lat * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCapsule = capsule;
        }
      }

      // If within 50km, just show the existing capsule
      if (minDistance < 50 && closestCapsule) {
        setTimeout(() => setSelectedCapsule(closestCapsule), 600);
        return;
      }

      let locName = "Your Exact Location";
      let countryName = "Current Area";
      let historySummary = "This is your current location! You serve as the historian here. By adding your unique experiences, photos, and voice notes into this capsule, you help document the lived reality of this spot for the future.";
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.lat}&lon=${userLocation.lng}`);
        const data = await res.json();
        
        if (data && data.address) {
          locName = data.address.city || data.address.town || data.address.village || data.address.suburb || data.address.county || "Your Exact Location";
          countryName = data.address.country || "Current Area";
        }

        // Try to fetch Wikipedia summary for pre-existing info
        if (locName !== "Your Exact Location" && locName !== "Your Location") {
          const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(locName)}`);
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            if (wikiData.extract) {
              historySummary = wikiData.extract;
            }
          }
        }
      } catch (e) {
        console.error("Error fetching location data:", e);
      }

      // Delay opening the modal slightly so the user sees the globe spinning to their location
      setTimeout(() => {
        const userCapsule: CultureCapsule = {
          id: "user-location",
          name: locName,
          country: countryName,
          lat: userLocation.lat,
          lng: userLocation.lng,
          timelinePeriod: "Present Day",
          capsuleColor: "#3B82F6", // Blue marker
          perspectives: [
            {
              role: "Local Explorer",
              summary: historySummary
            }
          ],
          lifeTodayCards: [
            {
              category: "Community Capture",
              title: "Be the First to Share",
              content: "There are no local insights recorded here yet. Head over to the Community Voices tab to capture the moment, tell a story, or snap a photo of what life looks like around you."
            }
          ],
          images: [],
          stories: [],
          voiceNotes: [],
          questions: []
        };
        setSelectedCapsule(userCapsule);
      }, 600);
    } else {
      alert("Unable to find your location. Please ensure location services are enabled and you have granted permission.");
    }
  };

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
          onZoom={(pov: any) => setAltitude(pov.altitude)}
          
          // Realistic textures
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
          
          // Data pins for hover interactions
          pointsData={[
            ...cultureCapsules,
            ...capitalCapsules,
            ...cultureCapsules.map(c => ({ ...c, isHitArea: true })),
            ...capitalCapsules.map(c => ({ ...c, isHitArea: true }))
          ]}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d: any) => d.isHitArea ? 'rgba(0,0,0,0.01)' : d.capsuleColor}
          pointAltitude={(d: any) => d.isHitArea ? 0.011 : 0.01}
          pointRadius={(d: any) => d.isHitArea ? 2.5 : d.isCapital ? 0.3 : 0.4}
          pointsMerge={false}
          pointLabel={(d: any) => `
            <div class="bg-gray-900/95 border border-[${d.capsuleColor}]/30 p-3 rounded-xl shadow-2xl backdrop-blur-sm -mt-2 pointer-events-none">
              <div class="flex items-center gap-2 mb-1">
                <svg class="w-4 h-4" style="color: ${d.capsuleColor}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span class="font-bold text-white text-sm">${d.name}${d.isCapital ? '' : (d.country ? ', ' + d.country : '')}</span>
              </div>
              <div class="text-xs text-gray-400">
                ${d.timelinePeriod || 'Capital City'}
              </div>
              <div class="text-[10px] text-amber-300/80 mt-2 border-t border-gray-700/50 pt-1 uppercase tracking-wider font-bold">
                Click to explore capsule
              </div>
            </div>
          `}
          onPointClick={(d: any) => {
            if (d.isUserLocation) return;
            setSelectedCapsule(d);
            setSearchQuery('');
            if (globeRef.current) {
              globeRef.current.pointOfView({ lat: d.lat, lng: d.lng, altitude: 0.6 }, 1000);
            }
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
          htmlElementsData={userLocation ? [{ ...userLocation, isUserLocation: true }] : []}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.innerHTML = `
              <div class="flex flex-col items-center pointer-events-none -mt-8">
                <div class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 shadow-lg border border-blue-400 whitespace-nowrap">You are here</div>
                <div class="relative w-4 h-4">
                  <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  <div class="relative w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>
            `;
            return el;
          }}
          ringsData={isGlowMode ? cultureCapsules : []}
          ringLat="lat"
          ringLng="lng"
          ringColor={(d: any) => d.capsuleColor}
          ringMaxRadius={(d: any) => Math.max(2, getInteractionVolume(d) * 1.5)}
          ringPropagationSpeed={(d: any) => Math.max(1, getInteractionVolume(d) * 0.5)}
          ringRepeatPeriod={(d: any) => Math.max(300, 1500 - getInteractionVolume(d) * 200)}
          labelsData={[...countryLabels, ...oceanLabels]}
          labelLat={(d: any) => d.lat}
          labelLng={(d: any) => d.lng}
          labelText={(d: any) => d.name}
          labelSize={(d: any) => {
            const baseSize = d.isOcean ? 5.0 : Math.max(1.8, Math.min(3.5, (d.area || 100000) / 400000));
            // Invert scale: higher altitude (zoomed out) = smaller text
            // For oceans, we cap the multiplier much lower so they don't become massive when zooming in
            const zoomMultiplier = d.isOcean 
              ? Math.max(0.4, Math.min(0.8, 1.8 / altitude)) 
              : Math.max(0.4, 1.8 / altitude);
            return baseSize * zoomMultiplier;
          }}
          labelDotRadius={(d: any) => d.isOcean ? 0 : 0.2}
          labelColor={(d: any) => d.isOcean ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.75)'}
          labelResolution={3}
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
          
          {/* My Location Toggle */}
          <button
            onClick={handleMyLocationClick}
            className="p-3 rounded-xl border backdrop-blur-md shadow-xl transition-all group flex items-center justify-center relative bg-slate-900/60 border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 w-12 h-12"
            title="Go to My Location"
          >
            {userLocation && <div className="absolute inset-0 bg-blue-500/5 animate-pulse rounded-xl pointer-events-none" />}
            <Navigation className="w-5 h-5 relative z-10" />
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