"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Movie, MovieFormData } from "../types";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const q = query(collection(db, "movies"), orderBy("title"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moviesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Movie[];
      setMovies(moviesData);
    });

    return () => unsubscribe();
  }, []);

  const addMovie = async (movieData: MovieFormData) => {
    try {
      const movieId = movieData.movieId;
      const movieRef = doc(db, "movies", movieId);
      
      const { movieId: _, ...dataToStore } = movieData;
      
      await setDoc(movieRef, dataToStore);
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  };

  const updateMovie = async (id: string, movieData: MovieFormData) => {
    try {
      console.log("Updating movie with data:", movieData);
      const movieRef = doc(db, "movies", id);
      await updateDoc(movieRef, movieData);
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      const movieRef = doc(db, "movies", id);
      await deleteDoc(movieRef);
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  };

  return {
    movies,
    addMovie,
    updateMovie,
    deleteMovie,
  };
} 