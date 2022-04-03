export interface TranslationResult {
  errorCode: string;
  translation: string[];
  basic?: {
    phonetic: string;
    'uk-phonetic': string;
    'us-phonetic': string;
    explains: string[];
  };
  web?: TranslationWebResult[];
  speakUrl?: string;
  tSpeakUrl?: string;
}

interface TranslationWebResult {
  value: Array<string>;
  key: string;
}
