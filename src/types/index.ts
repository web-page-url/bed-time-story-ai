export interface FormData {
  age: string;
  gender: string;
  interests: string[];
  style: string;
  lesson: string;
}

export interface StoryStyle {
  value: string;
  label: string;
  emoji: string;
  desc: string;
  gradient: string;
}

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [locale: string]: Translation;
}

export interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
}