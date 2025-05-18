"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TrashIcon, PencilSquareIcon } from "@/assets/icons";
import { Alert } from "@/components/ui-elements/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMovies } from "./hooks/useMovies";

export default function MoviesPage() {
  const router = useRouter();
  const { movies, deleteMovie } = useMovies();
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setMovieToDelete(id);
  };

  const confirmDelete = async () => {
    if (movieToDelete) {
      await deleteMovie(movieToDelete);
      setMovieToDelete(null);
    }
  };

  const cancelDelete = () => {
    setMovieToDelete(null);
  };

  return (
    <>
      <Breadcrumb pageName="Movies" />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 sm:p-7.5 dark:border-[#ce392b] dark:bg-[#ce392b] dark:shadow-card">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold text-black dark:text-[#d7d7d6]">
            Liste des Films
          </h2>
          <button
            onClick={() => router.push("/movies/add")}
            className="rounded px-4 py-2 font-semibold text-white bg-[#ce392b] hover:bg-[#770203] transition-colors"
          >
            Ajouter un Film
          </button>
        </div>

        {movieToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-[#1e272e]">
              <Alert
                variant="warning"
                title="Confirmation de suppression"
                description="Êtes-vous sûr de vouloir supprimer ce film ? Cette action est irréversible."
                className="mb-6 border-[#ce392b] bg-[#ce392b]/10 dark:bg-[#ce392b]/20"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelDelete}
                  className="rounded border border-[#ce392b] px-6 py-2.5 text-[#ce392b] hover:bg-[#ce392b]/10 dark:border-[#ce392b] dark:text-[#d7d7d6] dark:hover:bg-[#ce392b]/20 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded px-6 py-2.5 font-semibold text-white bg-[#ce392b] hover:bg-[#770203] transition-colors"
                >
                  Confirmer la suppression
                </button>
              </div>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-[#ce392b] [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-[#d7d7d6] hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white transition-colors">
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Année</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Popularité</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie) => (
              <TableRow
                key={movie.id}
                className="border-[#eee] dark:border-[#d7d7d6] hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white transition-colors"
              >
                <TableCell>
                  <h5 className="text-gray-800 dark:text-[#d7d7d6] dark:group-hover:text-white transition-colors">{movie.title}</h5>
                </TableCell>
                <TableCell className="text-gray-800">{movie.category}</TableCell>
                <TableCell className="text-gray-800">{movie.year}</TableCell>
                <TableCell className="text-gray-800">{movie.rating}</TableCell>
                <TableCell className="text-gray-800">{movie.popularity}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      onClick={() => router.push(`/movies/edit/${movie.id}`)}
                      className="text-gray-800 dark:text-[#d7d7d6] dark:group-hover:text-white hover:text-primary transition-colors"
                    >
                      <span className="sr-only">Modifier</span>
                      <PencilSquareIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="text-gray-800 dark:text-[#d7d7d6] dark:group-hover:text-white hover:text-primary transition-colors"
                    >
                      <span className="sr-only">Supprimer</span>
                      <TrashIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
} 