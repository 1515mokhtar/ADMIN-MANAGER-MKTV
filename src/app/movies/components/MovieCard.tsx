import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  id: string | number;
  posterUrl: string;
  title: string;
  year: string | number;
  rating: string | number;
  overview?: string;
  popularity?: number | string;
  genre_ids?: number[];
  [key: string]: any;
}

export function MovieCard({
  id,
  posterUrl,
  title,
  year,
  rating,
  overview,
  popularity,
  genre_ids,
  ...rest
}: MovieCardProps) {
  const router = useRouter();
  const handleAdd = () => {
    const params = new URLSearchParams({
      title: title || "",
      year: year?.toString() || "",
      posterUrl: posterUrl || "",
      rating: rating?.toString() || "",
      tmdbId: id?.toString() || "",
      description: rest.description || "",
      duration: rest.duration || "",
      popularity: popularity?.toString() || "",
      movieId: id?.toString() || "",
      genreIds: (genre_ids && Array.isArray(genre_ids)) ? genre_ids.join(",") : "",
      overview: overview || "",
    });
    router.push(`/movies/add?${params.toString()}`);
  };

  return (
    <div className={clsx(
      "group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all",
      "bg-white/80 border border-gray-200 dark:bg-gray-900/40 dark:border-white/20"
    )}>
      <img src={posterUrl} className="w-full h-64 object-cover" alt={title} />
      <div className="absolute inset-0 hidden group-hover:flex bg-black/60 items-center justify-center transition-all gap-2">
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          Add
        </button>
        <a
          href={`/movies/add?id=${id}`}
          className="bg-[#ce392b]/90 hover:bg-[#770203] px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          Edit
        </a>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-black dark:text-white">{title}</h3>
        <div className="flex justify-between text-sm text-gray-300 mt-1">
          <span>{year}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
} 