export interface Movie {
  id: string;
  title: string;
  movieId: string;
  category: string;
  description: string;
  rating: number;
  year: number;
  timeline: string;
  popularity: number;
  urlmovie: string;
}

export interface MovieFormData {
  title: string;
  movieId: string;
  category: string;
  description: string;
  rating: number;
  year: number;
  timeline: string;
  popularity: number;
  urlmovie: string;
} 