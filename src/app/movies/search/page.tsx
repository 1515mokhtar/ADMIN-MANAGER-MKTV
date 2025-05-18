"use client";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";
import { useTMDBSearch } from "../hooks/useTMDBSearch";
import { useFirestoreMovies } from "../hooks/useFirestoreMovies";

export default function MoviesSearchPage() {
  const [mode, setMode] = useState<"tmdb" | "firestore">("tmdb");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const tmdb = useTMDBSearch(query, page);
  const firestore = useFirestoreMovies(query, page);
  const { movies, loading, hasMore } = mode === "tmdb" ? tmdb : firestore;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-[#d7d7d6]">Movie Search</h1>
        <SearchBar onSearch={setQuery} mode={mode} setMode={setMode} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(movies ?? []).map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterUrl={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/images/placeholder.png"
              }
              title={movie.title}
              year={movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
              rating={movie.vote_average ?? "N/A"}
              overview={movie.overview}
              popularity={movie.popularity}
              genre_ids={movie.genre_ids}
            />
          ))}
        </div>
        {hasMore && (
          <button
            className="mt-8 mx-auto block bg-[#ce392b] hover:bg-[#770203] text-white px-6 py-2 rounded-lg transition"
            onClick={() => setPage(p => p + 1)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
} 