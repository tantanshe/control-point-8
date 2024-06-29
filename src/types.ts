export interface Quote {
  id?: string;
  category: string;
  author: string;
  text: string;
}

export interface ApiQuote {
  category: string;
  author: string;
  text: string;
}

export interface Category {
  title: string;
  id: string;
}

export const categories: Category[] = [
  { title: 'Movies', id: 'movies' },
  { title: 'Philosophy', id: 'philosophy' },
  { title: 'Music', id: 'music' },
  { title: 'Humour', id: 'humour' },
  { title: 'Motivational', id: 'motivational' },
];