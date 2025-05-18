import { useState } from "react";
import clsx from "clsx";

export function SearchBar({ onSearch, mode, setMode }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2 items-center mb-6">
      <input
        className="flex-1 rounded-lg px-4 py-2 bg-white/20 dark:bg-black/40 text-white placeholder-gray-400 border border-[#ce392b] focus:ring-2 focus:ring-[#ce392b] transition"
        placeholder={mode === "tmdb" ? "Search by title..." : "Search by ID..."}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        className={clsx(
          "px-3 py-2 rounded transition font-semibold",
          mode === "tmdb" ? "bg-[#ce392b] text-white" : "bg-gray-700 text-white"
        )}
        onClick={() => setMode(mode === "tmdb" ? "firestore" : "tmdb")}
        type="button"
      >
        {mode === "tmdb" ? "TMDB" : "Firestore"}
      </button>
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        onClick={() => onSearch(value)}
        type="button"
      >
        Chercher
      </button>
    </div>
  );
} 