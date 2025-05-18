import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useFirestoreMovies(queryStr: string, page: number) {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!queryStr) return;
    setLoading(true);
    // Adapt this query to your Firestore structure
    const moviesRef = collection(db(), "movies");
    let q = query(moviesRef, where("id", "==", queryStr), orderBy("id"), limit(10));
    getDocs(q).then(snapshot => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(page === 1 ? docs : prev => [...prev, ...docs]);
      setHasMore(docs.length === 10);
      setLoading(false);
    });
  }, [queryStr, page]);

  return { movies, loading, hasMore };
} 