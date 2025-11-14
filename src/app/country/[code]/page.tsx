"use client";

import Link from "next/link";
import { use as usePromise, useMemo } from "react";
import data from "../../data.json";
import { useTheme } from "@/app/MyContext";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { BsMoon } from "react-icons/bs";
import { MdKeyboardBackspace } from "react-icons/md";

import { BsFillMoonFill } from "react-icons/bs";
type Country = {
  name?: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  callingCodes?: string[];
  capital?: string;
  altSpellings?: string[];
  subregion?: string;
  region?: string;
  population?: number;
  latlng?: number[];
  demonym?: string;
  area?: number;
  gini?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  numericCode?: string;
  flags?: {
    svg?: string;
    png?: string;
  };
  currencies?: {
    code?: string;
    name?: string;
    symbol?: string;
  }[];
  languages?: {
    iso639_1?: string;
    iso639_2?: string;
    name?: string;
    nativeName?: string;
  }[];
  translations?: {
    [key: string]: string;
  };
  flag?: string;
  regionalBlocs?: {
    acronym?: string;
    name?: string;
    otherNames?: string[];
  }[];
  cioc?: string;
  independent?: boolean;
};

type PageProps = {
  params: Promise<{ code: string }>;
};

const formatPopulation = (num: number) =>
  new Intl.NumberFormat("en-US").format(num);

export default function CountryDetailPage({ params }: PageProps) {
  const { theme, toggleTheme } = useTheme();
  const { code } = usePromise(params);

  const isDark = theme === "dark";

  const allCountries = data as Country[];

  const country = useMemo(
    () =>
      allCountries.find(
        (c) => c.alpha3Code?.toLowerCase() === code.toLowerCase()
      ),
    [allCountries, code]
  );

  const borderCountries = useMemo(() => {
    if (!country?.borders?.length) return [];
    return country.borders
      .map((bCode) => allCountries.find((c) => c.alpha3Code === bCode))
      .filter(Boolean) as Country[];
  }, [allCountries, country]);

  if (!country) {
    return (
      <div
        className={
          isDark
            ? "min-h-screen bg-[#202c37] text-white"
            : "min-h-screen bg-[#fafafa] text-[#656565]"
        }
      >
        <header className={`shadow-sm ${isDark ? "bg-[#2b3945]" : "bg-white"}`}>
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1
              className={`text-sm sm:text-xl font-extrabold  ${
                isDark ? `text-white` : `text-[#656565]`
              }`}
            >
              Where in the world?
            </h1>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer"
            >
              <span className="text-md">
                {isDark ? <BsFillMoonFill /> : <BsMoon />}
              </span>
              <span>Dark Mode</span>
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-6 py-2 rounded shadow-md text-sm ${
              isDark ? "bg-[#2b3945] text-white" : "bg-white text-[#656565]"
            }`}
          >
            <MdOutlineKeyboardBackspace /> Back
          </Link>
          <p className="mt-8 text-lg font-semibold">Country not found.</p>
        </main>
      </div>
    );
  }

  const currencies =
    country.currencies && country.currencies.length
      ? country.currencies
          .map((c) => c.name ?? "")
          .filter(Boolean)
          .join(", ")
      : "N/A";

  const languages =
    country.languages && country.languages.length
      ? country.languages
          .map((l) => l.name ?? "")
          .filter(Boolean)
          .join(", ")
      : "N/A";

  const tlds =
    country.topLevelDomain && country.topLevelDomain.length
      ? country.topLevelDomain.join(", ")
      : "N/A";

  const subRegion = country.subregion || country.region || "N/A";
  const flagSrc =
    country.flags?.svg || country.flags?.png || country.flag || "";
  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-[#202c37] text-white"
          : "min-h-screen bg-[#fafafa] text-[#656565]"
      }
    >
      {/* HEADER */}
      <header className={`shadow-sm ${isDark ? "bg-[#2b3945]" : "bg-white"}`}>
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1
            className={`text-sm sm:text-xl font-extrabold  ${
              isDark ? `text-white` : `text-[#656565]`
            }`}
          >
            Where in the world?
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <span className="text-md">
              {isDark ? <BsFillMoonFill /> : <BsMoon />}
            </span>
            <span>Dark Mode</span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Back button */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded shadow-md text-md font-bold ${
            isDark ? "bg-[#2b3945] text-white" : "bg-white text-[#656565]"
          }`}
        >
          <MdKeyboardBackspace /> Back
        </Link>

        {/* Content */}
        <section className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          {/* Flag */}
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagSrc}
              alt={`${country.name ?? "Country"} flag`}
              className="w-full max-h-[400px] object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-extrabold">
              {country.name}
            </h2>

            <div className="grid gap-8 md:grid-cols-2 text-sm md:text-base">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Native Name: </span>
                  {country.nativeName}
                </p>
                <p>
                  <span className="font-semibold">Population: </span>
                  {formatPopulation(country.population ?? 0)}
                </p>
                <p>
                  <span className="font-semibold">Region: </span>
                  {country.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region: </span>
                  {subRegion}
                </p>
                <p>
                  <span className="font-semibold">Capital: </span>
                  {country.capital}
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Top Level Domain: </span>
                  {tlds}
                </p>
                <p>
                  <span className="font-semibold">Currencies: </span>
                  {currencies}
                </p>
                <p>
                  <span className="font-semibold">Languages: </span>
                  {languages}
                </p>
              </div>
            </div>

            {/* Border countries */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap text-sm">
              <span className="font-semibold whitespace-nowrap">
                Border Countries:
              </span>
              {borderCountries.length === 0 ? (
                <span>None</span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {borderCountries.map((b) => (
                    <Link
                      key={b.alpha3Code}
                      href={`/country/${b.alpha3Code}`}
                      className={`px-4 py-2 shadow-sm text-sm rounded font-bold ${
                        isDark
                          ? "bg-[#2b3945] text-white"
                          : "bg-white text-[#656565]"
                      }`}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
