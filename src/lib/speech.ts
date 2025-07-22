import { VoiceSettings } from '@/types';

export class SpeechManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isReading = false;
  private isPaused = false;

  constructor(
    private onStart: () => void,
    private onEnd: () => void,
    private onError: () => void,
    private onPause: () => void,
    private onResume: () => void
  ) {}

  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  getVoices(): SpeechSynthesisVoice[] {
    return speechSynthesis.getVoices();
  }

  getBestVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    
    // Prefer female voices for bedtime stories
    const preferredVoice = voices.find(voice => 
      (voice.name.toLowerCase().includes('female') ||
       voice.name.toLowerCase().includes('woman') ||
       voice.name.toLowerCase().includes('samantha') ||
       voice.name.toLowerCase().includes('karen') ||
       voice.name.toLowerCase().includes('susan')) &&
      voice.lang.startsWith('en')
    );

    if (preferredVoice) return preferredVoice;

    // Fallback to any English voice
    return voices.find(voice => voice.lang.startsWith('en')) || null;
  }

  speak(text: string, settings: VoiceSettings = { rate: 0.8, pitch: 1.1, volume: 0.9 }): void {
    if (!this.isSupported()) {
      this.onError();
      return;
    }

    this.stop(); // Stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for bedtime stories
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    // Set the best available voice
    const bestVoice = this.getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    utterance.onstart = () => {
      this.isReading = true;
      this.isPaused = false;
      this.onStart();
    };
    
    utterance.onend = () => {
      this.isReading = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onEnd();
    };
    
    utterance.onerror = () => {
      this.isReading = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.onError();
    };
    
    this.currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  pause(): void {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      this.isPaused = true;
      this.onPause();
    }
  }

  resume(): void {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      this.isPaused = false;
      this.onResume();
    }
  }

  stop(): void {
    if (speechSynthesis.speaking || speechSynthesis.paused) {
      speechSynthesis.cancel();
    }
    this.isReading = false;
    this.isPaused = false;
    this.currentUtterance = null;
  }

  getIsReading(): boolean {
    return this.isReading;
  }

  getIsPaused(): boolean {
    return this.isPaused;
  }
}