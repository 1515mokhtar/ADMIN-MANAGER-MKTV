import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PropsType = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ShowcaseSection({ title, children, className }: PropsType) {
  return (
    <div className="rounded-[10px] bg-white shadow-1 border border-stroke dark:bg-[#0d0c0c] dark:shadow-card dark:border-[#ce392b]">
      <h2 className="border-b border-stroke px-4 py-4 font-medium text-dark dark:border-[#ce392b] dark:text-[#d7d7d6] sm:px-6 xl:px-7.5">
        {title}
      </h2>

      <div className={cn("p-4 sm:p-6 xl:p-10", className)}>{children}</div>
    </div>
  );
}
