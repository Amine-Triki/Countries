import type { Country } from "../types/country";

interface CountryDetailsProps {
  country: Country;
  isOpen: boolean;
  onClose: () => void;
}

export default function CountryDetails({
  country,
  isOpen,
  onClose,
}: CountryDetailsProps) {
  if (!isOpen) return null;

  const nativeNames = country.name.nativeName
    ? Object.values(country.name.nativeName)
        .map((n) => n.common)
        .join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const timezones = country.timezones ? country.timezones.join(", ") : "N/A";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">{country.name.common}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Flag */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={country.flags.svg}
                  alt={`Flag of ${country.name.common}`}
                  className="rounded-lg shadow-md max-h-48 w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Official Name</h3>
                  <p className="text-gray-900">{country.name.official}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Native Name</h3>
                  <p className="text-gray-900">{nativeNames}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Region</h3>
                  <p className="text-gray-900">{country.region}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Population</h3>
                  <p className="text-gray-900">
                    {country.population.toLocaleString()}
                  </p>
                </div>

                {country.capital && (
                  <div>
                    <h3 className="font-semibold text-gray-700">Capital</h3>
                    <p className="text-gray-900">{country.capital.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-4 border-t pt-6">
              <div>
                <h3 className="font-semibold text-gray-700">Currencies</h3>
                <p className="text-gray-900">{currencies}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Languages</h3>
                <p className="text-gray-900">{languages}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Timezones</h3>
                <p className="text-gray-900 text-sm">{timezones}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-6 border-t">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
