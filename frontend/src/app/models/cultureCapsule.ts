export interface Perspective {
  role: string;
  summary: string;
}

export interface LifeTodayCard {
  category: string; // e.g. "Food", "Slang", "Student Life", "Misconception vs Reality"
  title: string;
  content: string;
  icon?: string;
}

export interface Story {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface VoiceNote {
  id: string;
  author: string;
  date: string;
  transcription: string;
  duration: string;
  audioUrl: string;
  imageUrl?: string;
}

export interface AskALocalQuestion {
  id: string;
  author: string;
  question: string;
  answer?: string;
  answeredBy?: string;
}

export interface CultureCapsule {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  timelinePeriod: string;
  capsuleColor: string;
  perspectives: Perspective[];
  lifeTodayCards: LifeTodayCard[];
  images: string[];
  stories: Story[];
  voiceNotes: VoiceNote[];
  questions: AskALocalQuestion[];
}
