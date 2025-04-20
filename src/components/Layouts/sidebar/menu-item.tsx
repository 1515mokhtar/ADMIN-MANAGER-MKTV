import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useSidebarContext } from "./sidebar-context";

const menuItemBaseStyles = cva(
  "rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6",
  {
    variants: {
      isActive: {
        true: "bg-[rgba(87,80,241,0.07)] text-primary hover:bg-[rgba(87,80,241,0.07)] dark:bg-[#FFFFFF1A] dark:text-white",
        false:
          "hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export function MenuItem({
  href,
  title,
  icon: Icon,
  isActive,
  className,
}: {
  href: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  className?: string;
}) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  return (
    <Link
      href={href}
      onClick={() => isMobile && toggleSidebar()}
      className={cn(
        menuItemBaseStyles({
          isActive,
          className: "flex items-center gap-3 py-2",
        }),
        className
      )}
    >
      <Icon className="size-5" />
      <span>{title}</span>
    </Link>
  );
}
