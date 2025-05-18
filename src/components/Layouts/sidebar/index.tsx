"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);

  const toggleExpanded = useCallback((title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));

    // Uncomment the following line to enable multiple expanded items
    // setExpandedItems((prev) =>
    //   prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    // );
  }, []);

  useEffect(() => {
    // Keep collapsible open, when it's subpage is active
    NAV_DATA.some((section) => {
      return section.items.some((item) => {
        return item.items.some((subItem) => {
          if (subItem.url === pathname) {
            if (!expandedItems.includes(item.title)) {
              toggleExpanded(item.title);
            }

            // Break the loop
            return true;
          }
          return false;
        });
      });
    });
  }, [pathname, expandedItems, toggleExpanded]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "w-[280px] overflow-hidden border-r border-gray-200 bg-white shadow-sm transition-all duration-200 ease-linear dark:border-[#770203] dark:bg-[#0d0c0c]",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
          !isOpen && !isMobile && "hidden"
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-6 px-4">
          <div className="relative mb-6">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="block py-2"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-[#d7d7d6] dark:hover:text-white"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar flex-1 overflow-y-auto">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-[#d7d7d6]">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        {item.items.length ? (
                          <div>
                            <button
                              onClick={() => toggleExpanded(item.title)}
                              className={cn(
                                "flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                expandedItems.includes(item.title)
                                  ? "bg-[#770203]/10 text-[#770203] dark:bg-[#770203]/20 dark:text-[#d7d7d6]"
                                  : "text-gray-700 hover:bg-gray-100 dark:text-[#d7d7d6] dark:hover:bg-[#770203]/10"
                              )}
                            >
                              <span>{item.title}</span>
                              <ChevronUp
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  expandedItems.includes(item.title) ? "rotate-180" : ""
                                )}
                              />
                            </button>
                            {expandedItems.includes(item.title) && (
                              <ul className="mt-1 space-y-1 pl-4">
                                {item.items.map((subItem) => (
                                  <li key={subItem.title}>
                                    <MenuItem
                                      href={subItem.url}
                                      title={subItem.title}
                                      icon={subItem.icon}
                                      isActive={pathname === subItem.url}
                                      className="text-gray-700 dark:text-[#d7d7d6]"
                                    />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <MenuItem
                            href={item.url}
                            title={item.title}
                            icon={item.icon}
                            isActive={pathname === item.url}
                            className="text-gray-700 dark:text-[#d7d7d6]"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
