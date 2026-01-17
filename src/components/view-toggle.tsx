// ============================================
// view-toggle.tsx - Modern 2026 Version
// ============================================
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [hoveredView, setHoveredView] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const views = [
    {
      id: "map" as const,
      label: "Map View",
      icon: (active: boolean) => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={active ? "0" : "1.5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "list" as const,
      label: "List View",
      icon: (active: boolean) => (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <path
            d="M3 4h18M3 12h18M3 20h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="6" cy="4" r="1.5" fill={active ? "currentColor" : "none"} />
          <circle cx="6" cy="12" r="1.5" fill={active ? "currentColor" : "none"} />
          <circle cx="6" cy="20" r="1.5" fill={active ? "currentColor" : "none"} />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative">
      {/* Floating background */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl shadow-lg border border-white/20"
        style={{
          transform: mounted ? "scale(1)" : "scale(0.95)",
          opacity: mounted ? 1 : 0,
          transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      <div className="relative flex items-center gap-1 p-1.5 rounded-2xl bg-gradient-to-br from-gray-50/50 to-white/50 backdrop-blur-sm border border-gray-200/60 shadow-sm">
        {/* Animated sliding background */}
        <div
          className="absolute h-[calc(100%-0.5rem)] rounded-xl bg-gradient-to-br from-[#FF6D33] to-[#FF8C5A] shadow-lg transition-all duration-500 ease-out"
          style={{
            width: "calc(50% - 0.375rem)",
            left: currentView === "map" ? "0.375rem" : "calc(50% + 0.125rem)",
            top: "0.25rem",
            boxShadow: "0 4px 20px -2px rgba(255, 109, 51, 0.4)",
          }}
        />

        {views.map((view) => {
          const isActive = currentView === view.id;
          const isHovered = hoveredView === view.id;

          return (
            <Link
              key={view.id}
              href={getViewUrl(view.id)}
              onMouseEnter={() => setHoveredView(view.id)}
              onMouseLeave={() => setHoveredView(null)}
              className="group relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 min-w-[120px] justify-center"
              style={{
                color: isActive ? "white" : "#374151",
                transform: isHovered && !isActive ? "scale(1.02)" : "scale(1)",
              }}
            >
              {/* Icon */}
              <div className={isActive ? "text-white" : "text-gray-600"}>
                {view.icon(isActive)}
              </div>

              {/* Label */}
              <span className="relative">
                {view.label}
                {isHovered && !isActive && (
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-transparent via-[#FF6D33] to-transparent opacity-60" />
                )}
              </span>

              {/* Active glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-white/10 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF6D33]/0 via-[#FF6D33]/5 to-[#FF6D33]/0 blur-xl opacity-50 -z-10" />
    </div>
  );
}