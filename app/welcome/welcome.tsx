"use client";

import { useLoaderData } from "react-router";
import { useState, useMemo } from "react";
import type { Country } from "../types/country";
import CountryCard from "../components/CountryCard";
import CountryDetails from "../components/CountryDetails";

export async function loader() {
  const fields =
    "fields=name,flags,capital,region,population,currencies,languages,timezones,cca3";
  const res = await fetch(`https://restcountries.com/v3.1/all?${fields}`);
  return res.json();
}

const REGIONS = ["Africa", "Europe", "Asia", "Americas", "Oceania"];

export default function Welcome() {
  const countries = useLoaderData() as Country[];
  const [searchInput, setSearchInput] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter and sort
  const filteredCountries = useMemo(() => {
    let result = [...countries];

    // Search filter
    if (searchInput.trim()) {
      const search = searchInput.toLowerCase();
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(search)
      );
    }

    // Region filter
    if (selectedRegion) {
      result = result.filter((c) => c.region === selectedRegion);
    }

    // Sort
    if (sortBy === "name") {
      result.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortBy === "population") {
      result.sort((a, b) => b.population - a.population);
    }

    return result;
  }, [countries, searchInput, selectedRegion, sortBy]);

  const handleDetailsClick = (country: Country) => {
    setSelectedCountry(country);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setTimeout(() => setSelectedCountry(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            World Countries
          </h1>

          {/* Controls */}
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search by country name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter and Sort */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Region Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Regions</option>
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name (A → Z)</option>
                  <option value="population">Population (High → Low)</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-gray-600">
              Showing {filteredCountries.length} of {countries.length} countries
            </div>
          </div>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No countries found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Country Details Modal */}
      {selectedCountry && (
        <CountryDetails
          country={selectedCountry}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}
