"use client";

import { SearchIcon } from "@/assets/icons";
import Link from "next/link";
import Image from "next/image";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-[#770203] dark:bg-[#0d0c0c] md:px-6">
      <div className="flex items-center gap-4">
      <button
        onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-[#d7d7d6] dark:hover:bg-[#770203]/10 lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
          <Link href={"/"} className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="MKTV Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
          />
            <span className="text-lg font-semibold text-gray-900 dark:text-[#d7d7d6]">ADMIN</span>
        </Link>
      )}

        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-[#d7d7d6]">
          Dashboard
        </h1>
          <p className="text-sm text-gray-500 dark:text-[#d7d7d6]/70">Welcome back</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#770203] focus:ring-1 focus:ring-[#770203] dark:border-[#770203] dark:bg-[#0d0c0c] dark:text-[#d7d7d6] dark:placeholder-[#d7d7d6]/50"
          />
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-[#d7d7d6]" />
        </div>

        <ThemeToggleSwitch />

        <Notification />

          <UserInfo />
      </div>
    </header>
  );
}
