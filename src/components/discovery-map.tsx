"use client";

import "leaflet/dist/leaflet.css";

// Fixed the issue of markers cluttering when zooming out by importing the 
// the marker cluster group and the css files associated with it
import "react-leaflet-cluster/dist/assets/MarkerCluster.css";
import "react-leaflet-cluster/dist/assets/MarkerCluster.Default.css";

import { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

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
import L, { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { LocationType, projectListing } from "@/types/types";
import { Badge } from "./badge";
import { renderToString } from "react-dom/server";
import dynamic from "next/dynamic";

interface Location {
  lat: number;
  lon: number;
  name: string;
}

export const renderIcon = (
  icon: JSX.Element,
  ariaLabel: string,
  transform = "translate(-8px, -4px)"
) =>
  `<div style="transform: ${transform}" aria-label="${ariaLabel}" role="button">${renderToString(
    icon
  )}</div>`;

function getOtherLocationIcon(
  label: string,
  isSelected: boolean,
  icon = true
): L.DivIcon {
  return L.divIcon({
    html: renderIcon(
      <Badge variant={"white"} className="w-max whitespace-nowrap">
        {label}
      </Badge>,
      label,
      isSelected ? "translate(-10px, -20px)" : "translate(-15px, -20px)"
    ),
  });
}

function MapClickHandler({ onClick }: { onClick: () => void }) {
  useMapEvents({
    click: () => onClick(),
  });
  return null;
}

function MapController({
  selectedLocation,
}: Readonly<{
  selectedLocation: Location | null;
}>) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.panTo([selectedLocation.lat, selectedLocation.lon], {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export default function DiscoveryMap({
  allFilteredData,
}: Readonly<{ allFilteredData: any }>) {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null
  );
  const sectionRef = useRef(null);
  const [selectedProperty, setSelectedProperty] =
    useState<projectListing | null>(null);

  // Import leaflet-defaulticon-compatibility only on client side
  // to prevent hydration error
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error
      import("leaflet-defaulticon-compatibility");
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const found = allFilteredData.projects.find(
        (prop: projectListing) => prop.name == selectedLocation.name
      );
      setSelectedProperty(found);
      const el = document.querySelector(
        `[data-marker-id="${selectedLocation.name}"]`
      ) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedLocation]);

  return (
    <section
      ref={sectionRef}
      style={{ fontFamily: "Arial, sans-serif" }}
      className="flex aspect-auto h-full flex-col gap-4 overflow-hidden"
      aria-label={`Project discovery via map`}
    >
      {/* Map Container */}
      <div className="relative size-full overflow-hidden">
        <MapContainer
          center={[12.97, 77.59]}
          zoom={12}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          className="border-lightborder z-10 size-full rounded-lg border object-cover"
          aria-label="Map view"
        >
          <LayersControl position="bottomleft">
            {/* Street View */}
            <LayersControl.BaseLayer checked name="Street View">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* Satellite View (Esri) */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <MapClickHandler onClick={() => setSelectedLocation(null)} />
          <MapController selectedLocation={selectedLocation} />

          {/* Project Location Marker */}
          {/* Marker Cluster Group to prevent markers from cluttering when zooming out */}
          <MarkerClusterGroup
            chunkedLoading
            removeOutsideVisibleBounds
            maxClusterRadius={80}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
          >
            {allFilteredData && allFilteredData.projects.length > 0
              ? allFilteredData.projects.map((project: projectListing) => (
                  <Marker
                    position={[project.latitude, project.longitude]}
                    key={project.id}
                    icon={getOtherLocationIcon(
                      project.name,
                      selectedProperty?.id == project.id
                    )}
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation({
                          lat: project.latitude,
                          lon: project.longitude,
                          name: project.name,
                          distance: 0,
                          duration: 0,
                        });
                      },
                    }}
                    data-marker-id={project.name}
                  >
                    <Popup
                      autoClose={false}
                      closeOnClick={false}
                      offset={[0, -20]}
                      closeOnEscapeKey
                      minWidth={400}
                      closeButton
                    >
                      <Link
                        href={`/property-for-sale-in/${project.city.toLowerCase()}/${project.slug.toLowerCase()}/${
                          project.id
                        }`}
                        target="_blank"
                      >
                        {/* Added updated card to display the project details */}
                        <div className="flex w-full flex-col gap-3">
                          <Image
                            src={project.image}
                            alt={project.alt}
                            width={500}
                            height={500}
                            loading="lazy"
                            className={cn(
                              "aspect-video size-full rounded-lg object-cover transition-all duration-400 ease-in-out",
                              project.projectStatus === "soldOut" && "grayscale"
                            )}
                          />
                          <h3
                            className={cn(
                              para({ size: "lg", color: "dark" }),
                              "font-semibold"
                            )}
                          >
                            {project.name}
                          </h3>

                          <div className="flex flex-col gap-3 whitespace-nowrap">
                            <div className="flex w-full items-center justify-between">
                              <span
                                className={cn(
                                  para({ color: "dark", size: "sm" }),
                                  "flex w-full items-center gap-2"
                                )}
                              >
                                <LocationIcon width={20} height={20} />
                                <span>{project.micromarket}</span>
                              </span>
                              <span
                                className={cn(
                                  para({ color: "dark", size: "sm" }),
                                  "flex w-full items-center justify-end gap-2"
                                )}
                              >
                                <PropscoreRating
                                  rating={project.propscore}
                                  width={110}
                                  height={24}
                                  className={"ml-auto w-max max-w-40"}
                                />
                              </span>
                            </div>
                            <div className="flex w-full items-center justify-between gap-3">
                              <span
                                className={cn(
                                  para({ color: "dark", size: "sm" }),
                                  "flex w-full max-w-40 items-center gap-2 truncate"
                                )}
                              >
                                <BudgetIcon width={20} height={20} />
                                {formatPrice(project.minPrice, false)} -{" "}
                                {formatPrice(project.maxPrice, false)}
                              </span>
                              <span
                                className={cn(
                                  para({ color: "dark", size: "sm" }),
                                  "flex w-full items-center justify-end gap-2"
                                )}
                              >
                                <CalendarIcon height={20} width={20} />
                                {formatDate(project.possessionDate)}
                              </span>
                            </div>
                            <div className="flex w-full items-center justify-between gap-3">
                              <span
                                className={cn(
                                  para({ color: "dark", size: "sm" }),
                                  "flex w-full max-w-40 items-center gap-2 truncate"
                                )}
                              >
                                <HouseIcon width={20} height={20} />
                                <span className="w-32 max-w-32 truncate">
                                  {concatenateTypologies(project.typologies)}
                                </span>
                              </span>
                              <span
                                className={cn(
                                  para({ color: "dark", size: "sm" }),
                                  "flex w-full items-center justify-end gap-2"
                                )}
                              >
                                {project.minSaleableArea} -{" "}
                                {project.maxSaleableArea} sqft
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Popup>
                  </Marker>
                ))
              : null}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </section>
  );
}
