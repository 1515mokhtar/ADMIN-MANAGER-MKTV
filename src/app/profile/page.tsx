"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { doc, getDoc, updateDoc, DocumentData } from "firebase/firestore";
import { db } from "@/lib/firebase";
import InputGroup from "@/components/FormElements/InputGroup";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface ProfileData {
  displayName: string;
  email: string;
  phoneNumber: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    displayName: "",
    email: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        try {
          const firestoreDb = db();
          if (!firestoreDb) return;
          
          const userDoc = await getDoc(doc(firestoreDb, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as DocumentData;
            setProfileData({
              displayName: data.displayName || "",
              email: data.email || "",
              phoneNumber: data.phoneNumber || "",
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load profile data");
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    setIsLoading(true);
    try {
      const firestoreDb = db();
      if (!firestoreDb) throw new Error("Firestore not initialized");
      
      // Convert ProfileData to a plain object for Firestore
      const dataToUpdate = {
        displayName: profileData.displayName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
      };
      
      await updateDoc(doc(firestoreDb, "users", user.uid), dataToUpdate);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto rounded-[10px] border border-stroke bg-white shadow-1 dark:border-[#ce392b] dark:bg-[#0d0c0c] dark:shadow-card">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-[#d7d7d6]">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputGroup
          label="Display Name"
          type="text"
          placeholder="Enter your display name"
          value={profileData.displayName}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileData({ ...profileData, displayName: e.target.value })
          }
          inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
        />
        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={profileData.email}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileData({ ...profileData, email: e.target.value })
          }
          inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
        />
        <InputGroup
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={profileData.phoneNumber}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileData({ ...profileData, phoneNumber: e.target.value })
          }
          inputClassName="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-black placeholder-gray-400 focus:border-[#ce392b] focus:ring-1 focus:ring-[#ce392b] dark:border-[#ce392b] dark:bg-black dark:text-[#d7d7d6] dark:placeholder-[#ce392b] dark:focus:border-[#ce392b] dark:focus:ring-[#ce392b] py-2.5"
        />
        <Button type="submit" disabled={isLoading} className="w-full rounded-lg bg-[#ce392b] py-2.5 font-semibold text-white hover:bg-[#770203] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
