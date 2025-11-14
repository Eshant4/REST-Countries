"use client";

import { useMemo, useState } from "react";
import countriesData from "./data.json";
import Link from "next/link";
import { MdOutlineSearch } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { useTheme } from "./MyContext";
import { BsMoon } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

type Country = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini?: number;
  timezones: string[];
  borders?: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  translations: {
    [key: string]: string;
  };
  flag: string;
  regionalBlocs?: {
    acronym: string;
    name: string;
    otherNames: string[];
  }[];
  cioc?: string;
  independent: boolean;
};
type CountryCardProps = {
  code: string;
  name: string;
  population: number;
  region: string;
  capital: string;
  flagUrl: string;
};

const formatPopulation = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

const mapRawToCard = (country: Country): CountryCardProps => ({
  code: country.alpha3Code,
  name: country.name,
  population: country.population,
  region: country.region,
  capital: country.capital || "—",
  flagUrl: country.flags.png || country.flags.svg || country.flag,
});

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const isDark = theme === "dark";

  // map JSON only once
  const allCountries = useMemo(
    () => (countriesData as Country[]).map(mapRawToCard),
    []
  );

  const filteredCountries = useMemo(() => {
    return allCountries.filter((c) => {
      const matchesRegion = !regionFilter || c.region === regionFilter;

      const matchesSearch =
        !search.trim() ||
        c.name.toLowerCase().includes(search.trim().toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [allCountries, regionFilter, search]);

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-[#202c37] text-white"
          : "min-h-screen bg-[#fafafa] text-[#656565]"
      }
    >
      {/* TOP BAR */}
      <header className={`shadow-sm ${isDark ? "bg-[#2b3945]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className={`text-sm sm:text-xl font-extrabold  ${ isDark ? `text-white` :`text-[#656565]`}`}>
            Where in the world?
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <span className="text-md">{isDark ? <BsFillMoonFill/> : <BsMoon/>}</span>
            <span>Dark Mode</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* FILTER BAR */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          {/* Search */}
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-md shadow-sm max-w-md w-full ${
              isDark ? "bg-[#2b3945] text-white" : "bg-white text-[#656565]"
            }`}
          >
            <span className={`text-2xl  font-bold ${ isDark ? ` text-white` : `text-[#656565]`}`}>
              <MdOutlineSearch />
            </span>
            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`flex-1 bg-transparent text-[#656565] font-bold text-md outline-none placeholder:text-sm ${
                isDark
                  ? "placeholder:text-gray-300"
                  : "placeholder:text-gray-500"
              }`}
            />
          </div>

          {/* Region filter */}
          <div
            className={`relative w-52 rounded-md shadow-sm text-sm ${
              isDark ? "bg-[#2b3945] text-white" : "bg-white text-[#656565] font-bold"
            }`}
          >
            <Menu as="div" className="relative w-52">
              <Menu.Button
                className={`flex items-center justify-between w-full px-4 py-4 rounded-md shadow-sm ${
                  isDark ? "bg-[#2b3945] text-white" : "bg-white text-[#656565]"
                }`}
              >
                {regionFilter ? regionFilter : 'Filter by Region'}
                <FaChevronDown />
              </Menu.Button>

              <Menu.Items
                className={`absolute mt-2 w-full rounded-md shadow-lg z-50 ${
                  isDark ? "bg-[#2b3945] text-white" : "bg-white text-[#656565]"
                }`}
              >
                {regions.map((region) => (
                  <Menu.Item key={region}>
                    {({ active }) => (
                      <button
                        onClick={() => setRegionFilter(region)}
                        className={`w-full text-left px-4 py-3 ${
                          active
                            ? isDark
                              ? "bg-[#3a4d5c]"
                              : "bg-gray-200"
                            : ""
                        }`}
                      >
                        {region}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </section>

        {/* COUNTRY GRID */}
        <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {filteredCountries.map((country) => (
            <Link
              key={country.code}
              href={`/country/${country.code}`}
              className={`overflow-hidden rounded-md shadow-md cursor-pointer transition-transform hover:-translate-y-1 ${
                isDark ? "bg-[#2b3945]" : "bg-white"
              }`}
            >
              <div className="h-40 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-6 py-6 space-y-3">
                <h2 className="font-extrabold text-lg">{country.name}</h2>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="font-semibold">Population: </span>
                    {formatPopulation(country.population)}
                  </li>
                  <li>
                    <span className="font-semibold">Region: </span>
                    {country.region}
                  </li>
                  <li>
                    <span className="font-semibold">Capital: </span>
                    {country.capital}
                  </li>
                </ul>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
