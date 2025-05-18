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

      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 sm:p-7.5 dark:border-[#ce392b] dark:bg-[#ce392b] dark:shadow-card">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black dark:text-[#d7d7d6]">
            Ajouter un Nouveau Film
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-[#d7d7d6]">
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
              inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
            />
            <InputGroup
              label="ID du Film"
              name="movieId"
              type="text"
              placeholder="ID unique du film"
              defaultValue="1045938"
              required
              inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
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
            selectClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
          />

          <TextAreaGroup
            label="Description"
            name="description"
            placeholder="Description du film"
            defaultValue="Description du film G20 -2025"
            required
            textareaClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
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
              inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
            />
            <InputGroup
              label="Année"
              name="year"
              type="number"
              placeholder="Année de sortie"
              defaultValue="2025"
              required
              inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
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
              inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
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
              inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
            />
          </div>

          <InputGroup
            label="Lien du Film"
            name="urlmovie"
            type="url"
            placeholder="URL du film"
            defaultValue="https://uqload.net/embed-py021hcj5ull.ht"
            required
            inputClassName="bg-white text-gray-900 border-gray-300 px-4 py-2.5 dark:bg-black dark:text-white dark:placeholder-[#ce392b] dark:border-[#770203] transition-colors"
          />

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.push("/movies")}
              className="rounded border border-stroke px-6 py-2.5 text-dark hover:bg-gray-2 dark:border-[#770203] dark:text-[#d7d7d6] dark:hover:bg-[#770203] dark:hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded px-6 py-2.5 font-semibold text-white bg-[#ce392b] hover:bg-[#770203] transition-colors"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 