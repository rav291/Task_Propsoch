import type { Metadata } from "next";
import DiscoveryMap from "@/components/discovery-map";
import PropertyList from "@/components/property-list";
import ViewToggle from "@/components/view-toggle";
import { PropertyListing } from "@/data/property-listing";
import { cn } from "@/utils/helpers";

export const metadata: Metadata = {
  title: "Property Discovery | Find Your Dream Home",
  description:
    "Discover premium properties in Bengaluru. Browse apartments, villas, and plots with detailed information, pricing, and location insights.",
  keywords: [
    "properties",
    "real estate",
    "Bengaluru",
    "apartments",
    "villas",
    "plots",
    "property for sale",
  ],
  openGraph: {
    title: "Property Discovery | Find Your Dream Home",
    description:
      "Discover premium properties in Bengaluru. Browse apartments, villas, and plots with detailed information.",
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{
    view?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 12;

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const view = params.view === "list" ? "list" : "map";
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);

  const totalProperties = PropertyListing.projects.length;
  const totalPages = Math.ceil(totalProperties / ITEMS_PER_PAGE);
  const validPage = Math.min(currentPage, totalPages);

  // Calculate pagination for list view
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProperties =
    view === "list" ? PropertyListing.projects.slice(startIndex, endIndex) : [];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-50">
      {/* Header with View Toggle */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <h1 className={cn("text-xl font-bold text-gray-900")}>
          Property Discovery
        </h1>
        <ViewToggle currentView={view} currentPage={validPage} />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {view === "map" ? (
          <DiscoveryMap allFilteredData={PropertyListing} />
        ) : (
          <div className="h-full overflow-y-auto">
            <PropertyList
              properties={paginatedProperties}
              currentPage={validPage}
              totalPages={totalPages}
              totalItems={totalProperties}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </main>
    </div>
  );
}
