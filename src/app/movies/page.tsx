"use client";

import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TrashIcon, PencilSquareIcon } from "@/assets/icons";
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

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
      await deleteMovie(id);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Movies" />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Liste des Films
          </h2>
          <button
            onClick={() => router.push("/movies/add")}
            className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
          >
            Ajouter un Film
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
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
              <TableRow key={movie.id} className="border-[#eee] dark:border-dark-3">
                <TableCell>
                  <h5 className="text-gray-800 dark:text-white">{movie.title}</h5>
                </TableCell>
                <TableCell className="text-gray-800 dark:text-white">{movie.category}</TableCell>
                <TableCell className="text-gray-800 dark:text-white">{movie.year}</TableCell>
                <TableCell className="text-gray-800 dark:text-white">{movie.rating}</TableCell>
                <TableCell className="text-gray-800 dark:text-white">{movie.popularity}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      onClick={() => router.push(`/movies/edit/${movie.id}`)}
                      className="text-gray-800 hover:text-primary dark:text-white"
                    >
                      <span className="sr-only">Modifier</span>
                      <PencilSquareIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="text-gray-800 hover:text-primary dark:text-white"
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