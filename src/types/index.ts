export interface GoldSkulltula {
  id: number;
  number: number;
  location: string;
  description: string;
}

export interface HeartPiece {
  id: number;
  location: string;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  description: string;
}

export interface Item {
  id: number;
  name: string;
  category: string;
  description: string;
}

export interface WalkthroughChapter {
  id: number;
  title: string;
  summary: string;
  steps: string[];
}
