"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-6">
      {/* Results Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <p className={cn(para({ color: "dark", size: "sm" }))}>
          Showing <span className="font-semibold">{startItem}</span> -{" "}
          <span className="font-semibold">{endItem}</span> of{" "}
          <span className="font-semibold">{totalItems}</span> properties
        </p>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 gap-6 px-4 pb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/property-for-sale-in/${property.city.toLowerCase()}/${property.slug.toLowerCase()}/${
              property.id
            }`}
            target="_blank"
            className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
              <Image
                src={property.image}
                alt={property.alt}
                fill
                className={cn(
                  "object-cover transition-transform duration-300 group-hover:scale-105",
                  property.projectStatus === "soldOut" && "grayscale"
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Status Badge */}
              {property.projectStatus === "soldOut" && (
                <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                  Sold Out
                </div>
              )}
              {property.projectStatus === "available" && (
                <div className="absolute left-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  Available
                </div>
              )}
              {/* Type Badge */}
              <div className="absolute right-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
                {property.type}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-3 p-4">
              {/* Title and Location */}
              <div className="flex flex-col gap-1">
                <h3
                  className={cn(
                    para({ size: "lg", color: "dark" }),
                    "line-clamp-2 font-semibold group-hover:text-[#FF6D33] transition-colors"
                  )}
                >
                  {property.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <LocationIcon width={16} height={16} />
                  <span className={cn(para({ color: "normal", size: "xs" }))}>
                    {property.micromarket}, {property.city}
                  </span>
                </div>
              </div>

              {/* Propscore */}
              <div className="flex items-center">
                <PropscoreRating
                  rating={property.propscore}
                  width={100}
                  height={20}
                />
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <BudgetIcon width={18} height={18} />
                <span
                  className={cn(
                    para({ color: "dark", size: "sm" }),
                    "font-semibold"
                  )}
                >
                  {formatPrice(property.minPrice, false)} -{" "}
                  {formatPrice(property.maxPrice, false)}
                </span>
              </div>

              {/* Details Grid */}
              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2">
                  <HouseIcon width={16} height={16} className="text-gray-400" />
                  <span
                    className={cn(
                      para({ color: "normal", size: "xs" }),
                      "truncate"
                    )}
                    title={String(concatenateTypologies(property.typologies))}
                  >
                    {concatenateTypologies(property.typologies)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(para({ color: "normal", size: "xs" }))}>
                    {property.minSaleableArea} - {property.maxSaleableArea} sqft
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <CalendarIcon
                    height={16}
                    width={16}
                    className="text-gray-400"
                  />
                  <span className={cn(para({ color: "normal", size: "xs" }))}>
                    {formatDate(property.possessionDate)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-4 pb-4">
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

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("view", params.get("view") || "list");
    return `?${params.toString()}`;
  };

  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium transition-colors",
          currentPage === 1
            ? "cursor-not-allowed bg-gray-50 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-[#FF6D33]"
        )}
        aria-label="Previous page"
        onClick={(e) => currentPage === 1 && e.preventDefault()}
      >
        <span>‹</span>
      </Link>

      {/* First page and ellipsis */}
      {startPage > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#FF6D33]"
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-400">
              ...
            </span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
            page === currentPage
              ? "border-[#FF6D33] bg-[#FF6D33] text-white"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-[#FF6D33]"
          )}
        >
          {page}
        </Link>
      ))}

      {/* Last page and ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-400">
              ...
            </span>
          )}
          <Link
            href={getPageUrl(totalPages)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#FF6D33]"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium transition-colors",
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-50 text-gray-400"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-[#FF6D33]"
        )}
        aria-label="Next page"
        onClick={(e) => currentPage === totalPages && e.preventDefault()}
      >
        <span>›</span>
      </Link>
    </nav>
  );
}
