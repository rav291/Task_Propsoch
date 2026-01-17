"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils/helpers";

interface ViewToggleProps {
  currentView: "map" | "list";
  currentPage?: number;
}

export default function ViewToggle({
  currentView,
  currentPage = 1,
}: ViewToggleProps) {
  const searchParams = useSearchParams();

  const getViewUrl = (view: "map" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    if (view === "list") {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
      <Link
        href={getViewUrl("map")}
        className={cn(
          "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          currentView === "map"
            ? "bg-[#FF6D33] text-white"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1C5.2 1 3 3.2 3 6C3 9.5 8 15 8 15C8 15 13 9.5 13 6C13 3.2 10.8 1 8 1ZM8 8C7.1 8 6.3 7.6 5.8 7.1C5.3 6.6 5 5.8 5 5C5 4.1 5.3 3.3 5.8 2.8C6.3 2.3 7.1 2 8 2C8.9 2 9.7 2.3 10.2 2.8C10.7 3.3 11 4.1 11 5C11 5.8 10.7 6.6 10.2 7.1C9.7 7.6 8.9 8 8 8Z"
            fill={currentView === "map" ? "white" : "currentColor"}
          />
        </svg>
        <span>Map</span>
      </Link>
      <Link
        href={getViewUrl("list")}
        className={cn(
          "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
          currentView === "list"
            ? "bg-[#FF6D33] text-white"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2H6V6H2V2ZM7 2H14V4H7V2ZM7 5H14V7H7V5ZM2 7H6V11H2V7ZM7 9H14V11H7V9ZM7 12H14V14H7V12Z"
            fill={currentView === "list" ? "white" : "currentColor"}
          />
        </svg>
        <span>List</span>
      </Link>
    </div>
  );
}
