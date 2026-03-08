import { Info, Trash2, Volume2 } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  label: string;
}

interface InfoDisplayProps {
  ideas: string[];
  locations: Location[];
  onRemoveIdea: (index: number) => void;
  onRemoveLocation: (index: number) => void;
}

export function InfoDisplay({ ideas, locations, onRemoveIdea, onRemoveLocation }: InfoDisplayProps) {
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const readAllInfo = () => {
    let fullText = '';
    
    if (ideas.length > 0) {
      fullText += `You have ${ideas.length} idea${ideas.length > 1 ? 's' : ''}. `;
      ideas.forEach((idea, index) => {
        fullText += `Idea ${index + 1}: ${idea}. `;
      });
    }
    
    if (locations.length > 0) {
      fullText += `You have selected ${locations.length} location${locations.length > 1 ? 's' : ''}. `;
      locations.forEach((location, index) => {
        fullText += `Location ${index + 1}: Latitude ${location.lat.toFixed(2)}, Longitude ${location.lng.toFixed(2)}. `;
      });
    }

    if (!fullText) {
      fullText = 'No information has been entered yet.';
    }

    speakText(fullText);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-semibold">Your Information</h2>
        </div>
        <button
          onClick={readAllInfo}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          title="Read all information aloud"
        >
          <Volume2 className="w-4 h-4" />
          Read Aloud
        </button>
      </div>

      <div className="space-y-6">
        {/* Ideas Section */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Ideas ({ideas.length})</h3>
          {ideas.length === 0 ? (
            <p className="text-gray-400 italic">No ideas added yet</p>
          ) : (
            <div className="space-y-2">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start justify-between gap-3 group"
                >
                  <div className="flex-1">
                    <span className="font-medium text-yellow-900 text-sm">Idea {index + 1}:</span>
                    <p className="text-gray-700 mt-1">{idea}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => speakText(idea)}
                      className="text-purple-600 hover:text-purple-800 p-1 rounded transition-colors"
                      title="Read this idea"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveIdea(index)}
                      className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      title="Remove idea"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Locations Section */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Locations ({locations.length})</h3>
          {locations.length === 0 ? (
            <p className="text-gray-400 italic">No locations selected yet</p>
          ) : (
            <div className="space-y-2">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <span className="font-medium text-green-900 text-sm">{location.label}</span>
                    <p className="text-gray-700 text-sm mt-1">
                      Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => speakText(`Location ${index + 1}: Latitude ${location.lat.toFixed(2)}, Longitude ${location.lng.toFixed(2)}`)}
                      className="text-purple-600 hover:text-purple-800 p-1 rounded transition-colors"
                      title="Read this location"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveLocation(index)}
                      className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      title="Remove location"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
