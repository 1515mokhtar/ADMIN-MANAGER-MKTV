"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { default as InputGroup } from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { useMovies } from "../hooks/useMovies";

export default function AddMoviePage() {
  const router = useRouter();
  const { addMovie } = useMovies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const movieData = {
      title: formData.get("title") as string,
      movieId: formData.get("movieId") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      rating: parseFloat(formData.get("rating") as string),
      year: parseInt(formData.get("year") as string),
      timeline: formData.get("timeline") as string,
      popularity: parseFloat(formData.get("popularity") as string),
      urlmovie: formData.get("urlmovie") as string,
    };

    try {
      await addMovie(movieData);
      router.push("/movies");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Ajouter un Film" />

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Ajouter un Nouveau Film
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Remplissez les informations ci-dessous pour ajouter un nouveau film
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="Titre"
              name="title"
              type="text"
              placeholder="Titre du film"
              defaultValue="G20 -2025"
              required
            />
            <InputGroup
              label="ID du Film"
              name="movieId"
              type="text"
              placeholder="ID unique du film"
              defaultValue="1045938"
              required
            />
          </div>

          <Select
            label="Catégorie"
            name="category"
            items={[
              { label: "Action", value: "action" },
              { label: "Comédie", value: "comedy" },
              { label: "Drame", value: "drama" },
              { label: "Science-Fiction", value: "sci-fi" },
            ]}
            placeholder="Sélectionnez une catégorie"
            required
          />

          <TextAreaGroup
            label="Description"
            name="description"
            placeholder="Description du film"
            defaultValue="Description du film G20 -2025"
            required
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="Note"
              name="rating"
              type="number"
              placeholder="Note sur 10"
              defaultValue="7.5"
              min="0"
              max="10"
              step="0.1"
              required
            />
            <InputGroup
              label="Année"
              name="year"
              type="number"
              placeholder="Année de sortie"
              defaultValue="2025"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputGroup
              label="Durée"
              name="timeline"
              type="text"
              placeholder="Durée du film (ex: 2h30)"
              defaultValue="2h15"
              required
            />
            <InputGroup
              label="Popularité"
              name="popularity"
              type="number"
              placeholder="Score de popularité"
              defaultValue="85"
              min="0"
              max="100"
              required
            />
          </div>

          <InputGroup
            label="Lien du Film"
            name="urlmovie"
            type="url"
            placeholder="URL du film"
            defaultValue="https://uqload.net/embed-py021hcj5ull.ht"
            required
          />

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/movies")}
              className="rounded border border-stroke px-6 py-2.5 text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded bg-primary px-6 py-2.5 text-white hover:bg-opacity-90"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 