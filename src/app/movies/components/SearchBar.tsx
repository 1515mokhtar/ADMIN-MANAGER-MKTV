import { useState } from "react";
import clsx from "clsx";

interface SearchBarProps {
  onSearch: (value: string) => void;
  mode: "tmdb" | "firestore";
  setMode: (mode: "tmdb" | "firestore") => void;
}

export function SearchBar({ onSearch, mode, setMode }: SearchBarProps) {
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2 items-center mb-6">
      <input
        className="flex-1 rounded-lg px-4 py-2 bg-white text-black placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-[#ce392b] transition dark:bg-black/40 dark:text-white dark:placeholder-[#ce392b] dark:border-[#ce392b]"
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