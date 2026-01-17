"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useCallback, memo, useRef, useEffect, useState } from "react";
import { PropscoreRating } from "@/assets/PropsochRating";
import {
  cn,
  concatenateTypologies,
  formatDate,
  formatPrice,
  para,
} from "@/utils/helpers";
import { BudgetIcon } from "@/assets/budget-icon";
import { HouseIcon } from "@/assets/house-icon";
import { LocationIcon } from "@/assets/location-icon";
import { CalendarIcon } from "@/assets/utility";
import { projectListing } from "@/types/types";
import { getPropertyImageUrl } from "@/utils/image-utils";

interface PropertyListProps {
  properties: projectListing[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function PropertyList({
  properties,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: PropertyListProps) {
  const startItem = useMemo(
    () => (currentPage - 1) * itemsPerPage + 1,
    [currentPage, itemsPerPage]
  );
  const endItem = useMemo(
    () => Math.min(currentPage * itemsPerPage, totalItems),
    [currentPage, itemsPerPage, totalItems]
  );

  // Calculate average propscore for display
  const avgPropscore = useMemo(() => {
    const sum = properties.reduce((acc, p) => acc + p.propscore, 0);
    return (sum / properties.length).toFixed(1);
  }, [properties]);

  // Calculate price range for display
  const priceRange = useMemo(() => {
    const prices = properties.flatMap((p) => [p.minPrice, p.maxPrice]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max };
  }, [properties]);

  return (
    <div className="flex flex-col gap-8">
      {/* Enhanced Stats Header */}
      <div className="sticky top-0 z-10 w-full bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-xl border-b border-gray-200/60 px-4 pt-6 pb-5 shadow-sm/60">
        <div className="flex flex-col gap-4 max-w-full">
          {/* Main Title Section */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Properties
                </h1>
                <span className="rounded-full bg-[#FF6D33]/10 px-3 py-1 text-xs font-semibold text-[#FF6D33]">
                  {properties.length} on this page
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-900">
                    {totalItems}
                  </span>
                  <span className="text-gray-600">properties found</span>
                </div>
                <span className="text-gray-400">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600">Showing</span>
                  <span className="font-bold text-[#FF6D33]">{startItem}</span>
                  <span className="text-gray-500">-</span>
                  <span className="font-bold text-[#FF6D33]">{endItem}</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <div className="rounded-xl bg-gradient-to-br from-[#FF6D33]/10 to-[#FF6D33]/5 border border-[#FF6D33]/20 px-4 py-2.5">
                <div className="text-xs font-medium text-gray-600 mb-0.5">
                  Avg. Rating
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-gray-900">
                    {avgPropscore}
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="text-[#FF6D33]"
                  >
                    <path
                      d="M7 1L8.89 4.78L13 5.58L10 8.62L10.76 12.72L7 10.78L3.24 12.72L4 8.62L1 5.58L5.11 4.78L7 1Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 px-4 py-2.5">
                <div className="text-xs font-medium text-gray-600 mb-0.5">
                  Price Range
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {formatPrice(priceRange.min, false)} -{" "}
                  {formatPrice(priceRange.max, false)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid with 3D Perspective */}
      <div className="grid grid-cols-1 gap-8 px-4 pb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [perspective:1000px] -mt-2 max-w-full overflow-x-hidden">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} index={index} />
        ))}
      </div>

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center px-4 pb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
}

interface PropertyCardProps {
  property: projectListing;
  index: number;
}

const PropertyCard = memo(function PropertyCard({
  property,
  index,
}: PropertyCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer with better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "100px" }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
      observer.disconnect();
    };
  }, []);

  // 3D Mouse Tracking
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Subtle 8 degrees max
    const rotateY = ((x - centerX) / centerX) * 8;
    setMousePosition({ x: rotateY, y: rotateX });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Calculate key metrics for decision-making
  const metrics = useMemo(() => {
    const avgPrice = (property.minPrice + property.maxPrice) / 2;
    const avgArea = (property.minSaleableArea + property.maxSaleableArea) / 2;
    const pricePerSqft = Math.round(avgPrice / avgArea);
    const possessionDate = new Date(property.possessionDate);
    const monthsUntilPossession = Math.max(
      0,
      Math.ceil(
        (possessionDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)
      )
    );

    return { pricePerSqft, monthsUntilPossession };
  }, [property]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const staggerDelay = index * 30;

  return (
    <Link
      ref={cardRef}
      href={`/property-for-sale-in/${property.city.toLowerCase()}/${property.slug.toLowerCase()}/${
        property.id
      }`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block h-full",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D33] focus-visible:ring-offset-2 focus-visible:rounded-2xl"
      )}
      aria-label={`View ${property.name} property details`}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "relative h-full rounded-2xl bg-white transition-all duration-700 ease-out",
          "border border-gray-200/60 shadow-sm",
          "hover:shadow-2xl hover:shadow-[#FF6D33]/5 hover:border-[#FF6D33]/30",
          isVisible ? "opacity-100" : "opacity-0 translate-y-8",
          "will-change-transform transform-3d"
        )}
        style={{
          transform: `perspective(1000px) rotateX(${
            mousePosition.y
          }deg) rotateY(${mousePosition.x}deg) translateZ(${
            isHovered ? "20px" : "0px"
          })`,
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease-out, border-color 0.5s ease-out",
          animationDelay: isVisible ? `${staggerDelay}ms` : "0ms",
        }}
      >
        {/* Image Container with Parallax Effect */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
          {/* Advanced Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0">
              <div className="h-full w-full animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-[length:200%_100%]" />
            </div>
          )}

          <div
            className={cn(
              "relative h-full w-full transition-transform duration-[800ms] ease-out",
              "group-hover:scale-[1.08]"
            )}
            style={{
              transform: isHovered
                ? `translateZ(30px) translateY(${mousePosition.y * 0.3}px)`
                : "translateZ(0px)",
            }}
          >
            <Image
              src={getPropertyImageUrl(property.id)}
              alt={property.alt}
              fill
              className={cn(
                "object-cover transition-all duration-700",
                imageLoaded ? "opacity-100" : "opacity-0",
                property.projectStatus === "soldOut"
                  ? "grayscale-[0.6] group-hover:grayscale-[0.4]"
                  : "group-hover:saturate-150 group-hover:brightness-110 group-hover:contrast-105"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onLoad={handleImageLoad}
              quality={90}
              priority={index < 4}
            />
            {/* Color Pop Overlay on Hover */}
            {property.projectStatus !== "soldOut" && (
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br from-[#FF6D33]/20 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500",
                  "group-hover:opacity-100"
                )}
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top Badges Container */}
          <div className="absolute left-0 right-0 top-0 flex items-start justify-between p-2.5">
            {/* Status Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-300",
                "group-hover:scale-110 group-hover:shadow-xl",
                property.projectStatus === "soldOut"
                  ? "bg-gradient-to-r from-red-500/95 to-red-600/95"
                  : "bg-gradient-to-r from-emerald-500/95 to-green-600/95"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  property.projectStatus === "soldOut"
                    ? "bg-white/90"
                    : "bg-white animate-pulse"
                )}
              />
              {property.projectStatus === "soldOut" ? "Sold" : "Available"}
            </div>

            {/* Type Badge */}
            <div className="rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white">
              {property.type}
            </div>
          </div>

          {/* Propscore Badge - Appears on Hover */}
          <div
            className={cn(
              "absolute bottom-4 left-4 transition-all duration-500",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            )}
          >
            <div className="rounded-xl bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md">
              <PropscoreRating
                rating={property.propscore}
                width={90}
                height={18}
              />
            </div>
          </div>

          {/* Quick Info Overlay on Hover */}
          <div
            className={cn(
              "absolute inset-x-4 bottom-4 transition-all duration-500",
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            )}
          >
            <div className="rounded-xl bg-white/95 p-3 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700">
                  {property.minSaleableArea.toLocaleString()} -{" "}
                  {property.maxSaleableArea.toLocaleString()} sqft
                </span>
                <span className="font-semibold text-[#FF6D33]">
                  ₹{metrics.pricePerSqft.toLocaleString()}/sqft
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative p-3">
          {/* Title with Rating on Right */}
          <div className="mb-2">
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3
                className={cn(
                  "line-clamp-2 flex-1 text-sm font-bold leading-snug text-gray-900 transition-colors duration-300",
                  "group-hover:text-[#FF6D33] group-focus:text-[#FF6D33]"
                )}
              >
                {property.name}
              </h3>
              <div className="shrink-0 pt-0.5 flex items-center justify-center">
                <div
                  className="flex items-center justify-center"
                  style={{
                    transform: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PropscoreRating
                    rating={property.propscore}
                    width={75}
                    height={16}
                    className="transition-transform duration-300 group-hover:scale-105 [&_svg]:block [&_svg]:align-middle"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <LocationIcon
                width={12}
                height={12}
                className="shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-[#FF6D33]"
              />
              <span className="line-clamp-1">
                {property.micromarket}, {property.city}
              </span>
            </div>
          </div>

          {/* Price Section - Decision Making Focus */}
          <div className="mb-2 rounded-lg bg-gradient-to-br from-[#FF6D33]/5 via-[#FF6D33]/3 to-transparent p-2.5 ring-1 ring-[#FF6D33]/10 transition-all duration-300 group-hover:from-[#FF6D33]/10 group-hover:ring-[#FF6D33]/20">
            <div className="flex items-baseline gap-1.5">
              <BudgetIcon
                width={18}
                height={18}
                className="shrink-0 text-[#FF6D33] transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-gray-900">
                    {formatPrice(property.minPrice, false)}
                  </span>
                  <span className="text-xs text-gray-500">-</span>
                  <span className="text-base font-bold text-gray-900">
                    {formatPrice(property.maxPrice, false)}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-600">
                  <span>₹{metrics.pricePerSqft.toLocaleString()}/sqft</span>
                  <span className="text-gray-400">·</span>
                  <span>
                    {metrics.monthsUntilPossession > 0
                      ? `Ready in ${metrics.monthsUntilPossession}mo`
                      : "Ready Now"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 rounded-md bg-gray-100 p-1 transition-colors duration-300 group-hover:bg-[#FF6D33]/10">
                <HouseIcon
                  width={14}
                  height={14}
                  className="text-gray-600 transition-colors duration-300 group-hover:text-[#FF6D33]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-gray-900">Type</p>
                <p
                  className="truncate text-[11px] text-gray-600"
                  title={String(concatenateTypologies(property.typologies))}
                >
                  {concatenateTypologies(property.typologies)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="mt-0.5 rounded-md bg-gray-100 p-1 transition-colors duration-300 group-hover:bg-[#FF6D33]/10">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-gray-600 transition-colors duration-300 group-hover:text-[#FF6D33]"
                >
                  <path
                    d="M8 1L3 6v9h10V6L8 1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-gray-900">Area</p>
                <p className="text-[11px] text-gray-600">
                  {property.minSaleableArea.toLocaleString()} -{" "}
                  {property.maxSaleableArea.toLocaleString()} sqft
                </p>
              </div>
            </div>

            <div className="col-span-2 flex items-start gap-2">
              <div className="mt-0.5 rounded-md bg-gray-100 p-1 transition-colors duration-300 group-hover:bg-[#FF6D33]/10">
                <CalendarIcon
                  height={14}
                  width={14}
                  className="text-gray-600 transition-colors duration-300 group-hover:text-[#FF6D33]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-gray-900">
                  Possession
                </p>
                <p className="text-[11px] text-gray-600">
                  {formatDate(property.possessionDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Developer Info */}
          {property.developerName && (
            <div className="mt-2 flex items-center gap-2 border-t border-gray-100 pt-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6D33] to-orange-600 text-[10px] font-bold text-white shadow-sm">
                {property.developerName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-gray-900">
                  Developer
                </p>
                <p className="truncate text-[11px] text-gray-600">
                  {property.developerName}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action Indicator */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#FF6D33] via-orange-500 to-[#FF6D33] transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </Link>
  );
});

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const getPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      params.set("view", params.get("view") || "list");
      return `?${params.toString()}`;
    },
    [searchParams]
  );

  const pages = useMemo(() => {
    const pageArray: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageArray.push(i);
    }

    return pageArray;
  }, [currentPage, totalPages]);

  const handlePrevClick = useCallback(
    (e: React.MouseEvent) => {
      if (currentPage === 1) {
        e.preventDefault();
      }
    },
    [currentPage]
  );

  const handleNextClick = useCallback(
    (e: React.MouseEvent) => {
      if (currentPage === totalPages) {
        e.preventDefault();
      }
    },
    [currentPage, totalPages]
  );

  return (
    <nav
      className="flex items-center gap-2"
      aria-label="Pagination"
      role="navigation"
    >
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D33] focus-visible:ring-offset-2",
          currentPage === 1
            ? "cursor-not-allowed bg-gray-50 text-gray-400"
            : "bg-white text-gray-700 hover:scale-110 hover:border-[#FF6D33]/50 hover:bg-gray-50 hover:text-[#FF6D33] active:scale-95"
        )}
        aria-label="Previous page"
        onClick={handlePrevClick}
        aria-disabled={currentPage === 1}
      >
        <span className="text-lg">‹</span>
      </Link>

      {pages[0] > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-110 hover:border-[#FF6D33]/50 hover:bg-gray-50 hover:text-[#FF6D33] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D33] focus-visible:ring-offset-2"
          >
            1
          </Link>
          {pages[0] > 2 && (
            <span className="flex h-11 w-11 items-center justify-center text-gray-400">
              ...
            </span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D33] focus-visible:ring-offset-2",
            page === currentPage
              ? "border-[#FF6D33] bg-[#FF6D33] text-white shadow-lg shadow-[#FF6D33]/30 scale-110"
              : "border-gray-200 bg-white text-gray-700 hover:scale-110 hover:border-[#FF6D33]/50 hover:bg-gray-50 hover:text-[#FF6D33] active:scale-95"
          )}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="flex h-11 w-11 items-center justify-center text-gray-400">
              ...
            </span>
          )}
          <Link
            href={getPageUrl(totalPages)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-all duration-200 hover:scale-110 hover:border-[#FF6D33]/50 hover:bg-gray-50 hover:text-[#FF6D33] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D33] focus-visible:ring-offset-2"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6D33] focus-visible:ring-offset-2",
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-50 text-gray-400"
            : "bg-white text-gray-700 hover:scale-110 hover:border-[#FF6D33]/50 hover:bg-gray-50 hover:text-[#FF6D33] active:scale-95"
        )}
        aria-label="Next page"
        onClick={handleNextClick}
        aria-disabled={currentPage === totalPages}
      >
        <span className="text-lg">›</span>
      </Link>
    </nav>
  );
}
