import { useState, useEffect } from "react";

export function useTMDBSearch(query: string, page: number) {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    )
      .then(res => res.json())
      .then(data => {
        setMovies(page === 1 ? data.results : prev => [...prev, ...data.results]);
        setHasMore(data.page < data.total_pages);
        setLoading(false);
        console.log("TMDB API response:", data);
      });
  }, [query, page]);

  return { movies, loading, hasMore };
} 