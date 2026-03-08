import { useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  label: string;
}

interface GlobeSelectorProps {
  onLocationSelect: (location: Location) => void;
  selectedLocations: Location[];
}

export function GlobeSelector({ onLocationSelect, selectedLocations }: GlobeSelectorProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert pixel coordinates to lat/lng
    // Map dimensions: width = 360 degrees, height = 180 degrees
    const lng = (x / rect.width) * 360 - 180;
    const lat = 90 - (y / rect.height) * 180;

    const location = {
      lat: parseFloat(lat.toFixed(4)),
      lng: parseFloat(lng.toFixed(4)),
      label: `Location ${selectedLocations.length + 1}`
    };
    onLocationSelect(location);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setHoveredPoint({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Convert lat/lng to pixel coordinates
  const latLngToPixel = (lat: number, lng: number) => {
    if (!mapRef.current) return { x: 0, y: 0 };
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((lng + 180) / 360) * rect.width;
    const y = ((90 - lat) / 180) * rect.height;
    
    return { x, y };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-green-500" />
        <h2 className="text-xl font-semibold">Select Locations</h2>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        Click anywhere on the map to mark a location
      </div>
      
      <div 
        ref={mapRef}
        className="relative w-full aspect-[2/1] bg-gradient-to-b from-sky-400 to-blue-500 rounded-lg overflow-hidden cursor-crosshair border-2 border-gray-200"
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* World Map Background Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Continents Simplified Shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="none">
          {/* Simplified continent representations */}
          <ellipse cx="90" cy="50" rx="35" ry="25" fill="#10b981" opacity="0.7" /> {/* Europe/Asia */}
          <ellipse cx="140" cy="70" rx="30" ry="20" fill="#10b981" opacity="0.7" /> {/* Asia */}
          <ellipse cx="110" cy="110" rx="20" ry="25" fill="#10b981" opacity="0.7" /> {/* Africa */}
          <ellipse cx="50" cy="60" rx="25" ry="15" fill="#10b981" opacity="0.7" /> {/* North America */}
          <ellipse cx="70" cy="130" rx="15" ry="20" fill="#10b981" opacity="0.7" /> {/* South America */}
          <ellipse cx="270" cy="140" rx="20" ry="15" fill="#10b981" opacity="0.7" /> {/* Australia */}
        </svg>

        {/* Selected Location Markers */}
        {selectedLocations.map((location, index) => {
          const pos = latLngToPixel(location.lat, location.lng);
          return (
            <div
              key={index}
              className="absolute w-8 h-8 -ml-4 -mt-4 pointer-events-none"
              style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-red-500 rounded-full w-8 h-8 border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Hover Indicator */}
        {hoveredPoint && (
          <div
            className="absolute w-2 h-2 bg-white rounded-full border border-gray-400 pointer-events-none"
            style={{ left: `${hoveredPoint.x - 4}px`, top: `${hoveredPoint.y - 4}px` }}
          />
        )}
      </div>

      {/* Coordinates Display */}
      {hoveredPoint && mapRef.current && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Hover coordinates: 
          Lat {(90 - (hoveredPoint.y / mapRef.current.getBoundingClientRect().height) * 180).toFixed(2)}°, 
          Lng {((hoveredPoint.x / mapRef.current.getBoundingClientRect().width) * 360 - 180).toFixed(2)}°
        </div>
      )}
    </div>
  );
}