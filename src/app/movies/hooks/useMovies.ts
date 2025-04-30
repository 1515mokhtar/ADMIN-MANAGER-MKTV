"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Movie, MovieFormData } from "../types";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const firestoreDb = db();
    if (!firestoreDb) return;
    
    const q = query(collection(firestoreDb, "movies"), orderBy("title"));
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
      const firestoreDb = db();
      if (!firestoreDb) throw new Error("Firestore not initialized");
      
      const movieId = movieData.movieId;
      const movieRef = doc(firestoreDb, "movies", movieId);
      
      const { movieId: _, ...dataToStore } = movieData;
      
      await setDoc(movieRef, dataToStore);
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  };

  const updateMovie = async (id: string, movieData: MovieFormData) => {
    try {
      const firestoreDb = db();
      if (!firestoreDb) throw new Error("Firestore not initialized");
      
      console.log("Updating movie with data:", movieData);
      const movieRef = doc(firestoreDb, "movies", id);
      
      // Remove movieId from the data to be updated
      const { movieId, ...dataToUpdate } = movieData;
      
      await updateDoc(movieRef, dataToUpdate);
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      const firestoreDb = db();
      if (!firestoreDb) throw new Error("Firestore not initialized");
      
      const movieRef = doc(firestoreDb, "movies", id);
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