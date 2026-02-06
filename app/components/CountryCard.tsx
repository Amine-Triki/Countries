import type { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
  onDetailsClick: (country: Country) => void;
}

export default function CountryCard({
  country,
  onDetailsClick,
}: CountryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-40 overflow-hidden bg-gray-100">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{country.name.common}</h3>
        {country.capital && (
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Capital:</span> {country.capital[0]}
          </p>
        )}
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
        <button
          onClick={() => onDetailsClick(country)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
}
