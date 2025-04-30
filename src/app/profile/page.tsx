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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <InputGroup
          label="Display Name"
          type="text"
          placeholder="Enter your display name"
          value={profileData.displayName}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileData({ ...profileData, displayName: e.target.value })
          }
        />
        <InputGroup
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={profileData.email}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileData({ ...profileData, email: e.target.value })
          }
        />
        <InputGroup
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={profileData.phoneNumber}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProfileData({ ...profileData, phoneNumber: e.target.value })
          }
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
