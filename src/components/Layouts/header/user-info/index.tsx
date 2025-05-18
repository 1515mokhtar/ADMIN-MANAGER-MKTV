"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { useAuth } from "@/contexts/auth-context";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-[#ce392b] dark:ring-offset-[#0d0c0c]">
        <span className="sr-only">Mon compte</span>

        <figure className="flex items-center gap-3">
          <div className="relative size-12 overflow-hidden rounded-full bg-gray-200">
            {userData?.photoURL ? (
              <Image
                src={userData.photoURL}
                className="object-cover"
                alt="Photo de profil"
                fill
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#ce392b] text-2xl text-white">
                {userData?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-[#d7d7d6] max-[1024px]:sr-only">
            <span>{userData?.name || user?.email?.split('@')[0] || 'Utilisateur'}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md dark:border-[#ce392b] dark:bg-[#0d0c0c] min-[230px]:min-w-[17.5rem]"
        align="end"
      >
        <h2 className="sr-only">Informations utilisateur</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <div className="relative size-12 overflow-hidden rounded-full bg-gray-200">
            {userData?.photoURL ? (
              <Image
                src={userData.photoURL}
                className="object-cover"
                alt="Photo de profil"
                fill
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#ce392b] text-2xl text-white">
                {userData?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-[#d7d7d6]">
              {userData?.name || user?.email?.split('@')[0] || 'Utilisateur'}
            </div>

            <div className="leading-none text-gray-6 dark:text-[#d7d7d6]/70">{user?.email}</div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-[#ce392b]" />

        <div className="p-2 text-base text-[#4B5563] dark:text-[#d7d7d6] [&>*]:cursor-pointer">
          <Link
            href="/profile"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              window.location.href = '/profile';
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-[#770203]/20 dark:hover:text-[#d7d7d6]"
          >
            <UserIcon />

            <span className="mr-auto text-base font-medium">Voir le profil</span>
          </Link>

          <Link
            href={"/pages/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-[#770203]/20 dark:hover:text-[#d7d7d6]"
          >
            <SettingsIcon />

            <span className="mr-auto text-base font-medium">
              Paramètres du compte
            </span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-[#ce392b]" />

        <div className="p-2 text-base text-[#4B5563] dark:text-[#d7d7d6]">
          <button
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-[#770203]/20 dark:hover:text-[#d7d7d6]"
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
          >
            <LogOutIcon />

            <span className="text-base font-medium">Se déconnecter</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
