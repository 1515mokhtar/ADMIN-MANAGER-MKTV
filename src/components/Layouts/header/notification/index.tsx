"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BellIcon } from "./icons";

const notificationList = [
  {
    image: "/images/user/user-15.png",
    title: "Piter Joined the Team!",
    subTitle: "Congratulate him",
  },
  {
    image: "/images/user/user-03.png",
    title: "New message",
    subTitle: "Devid sent a new message",
  },
  {
    image: "/images/user/user-26.png",
    title: "New Payment received",
    subTitle: "Check your earnings",
  },
  {
    image: "/images/user/user-28.png",
    title: "Jolly completed tasks",
    subTitle: "Assign new task",
  },
  {
    image: "/images/user/user-27.png",
    title: "Roman Joined the Team!",
    subTitle: "Congratulate him",
  },
];

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDotVisible, setIsDotVisible] = useState(true);
  const isMobile = useIsMobile();

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);

        if (setIsDotVisible) setIsDotVisible(false);
      }}
    >
      <DropdownTrigger
        className="grid size-12 place-items-center rounded-full border bg-gray-2 text-dark outline-none hover:text-primary focus-visible:border-primary focus-visible:text-primary dark:border-[#ce392b] dark:bg-[#0d0c0c] dark:text-[#d7d7d6] dark:hover:text-[#ce392b] dark:focus-visible:border-[#ce392b]"
        aria-label="View Notifications"
      >
        <span className="relative">
          <BellIcon />

          {isDotVisible && (
            <span
              className={cn(
                "absolute right-0 top-0 z-1 size-2 rounded-full bg-red-light ring-2 ring-gray-2 dark:ring-dark-3",
              )}
            >
              <span className="absolute inset-0 -z-1 animate-ping rounded-full bg-red-light opacity-75" />
            </span>
          )}
        </span>
      </DropdownTrigger>

      <DropdownContent
        align={isMobile ? "end" : "center"}
        className="border border-stroke bg-white px-3.5 py-3 shadow-md dark:border-[#ce392b] dark:bg-[#0d0c0c] min-[350px]:min-w-[20rem]"
      >
        <div className="mb-1 flex items-center justify-between px-2 py-1.5">
          <span className="text-lg font-medium text-dark dark:text-[#d7d7d6]">
            Notifications
          </span>
          <span className="rounded-md bg-[#ce392b] px-[9px] py-0.5 text-xs font-medium text-white" role="status">
            5 new
          </span>
        </div>

        <div role="group" aria-label="Notification list">
          <ul className="mb-3 max-h-[23rem] space-y-1.5 overflow-y-auto">
            {notificationList.map((item, index) => (
              <li key={index}>
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 rounded-lg px-2 py-1.5 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-[#770203]/20 dark:focus-visible:bg-[#770203]/20"
                  role="menuitem"
                  aria-label={`${item.title}: ${item.subTitle}`}
                >
                  <div className="relative size-10 overflow-hidden rounded-full">
                    <Image
                      src={item.image}
                      alt={`${item.title} notification`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-dark dark:text-[#d7d7d6]">
                      {item.title}
                    </p>
                    <p className="text-xs text-dark-6 dark:text-[#d7d7d6]/70">
                      {item.subTitle}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="#"
          onClick={() => setIsOpen(false)}
          className="block rounded-lg bg-gray-2 px-2 py-1.5 text-center text-sm font-medium text-dark outline-none hover:bg-gray-3 focus-visible:bg-gray-3 dark:bg-[#770203]/20 dark:text-[#d7d7d6] dark:hover:bg-[#770203]/30 dark:focus-visible:bg-[#770203]/30"
          role="menuitem"
          aria-label="See all notifications"
        >
          See all notifications
        </Link>
      </DropdownContent>
    </Dropdown>
  );
}
