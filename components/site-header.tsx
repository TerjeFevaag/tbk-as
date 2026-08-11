"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

const navLinks = [
  { href: "/", label: "Hjem" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/artikler", label: "Artikler" },
  { href: "/kontakt-oss", label: "Kontakt oss" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  function closeMobileMenu() {
    setOpen(false);
    setMobileServicesOpen(false);
  }

  function toggleMobileMenu() {
    setOpen((value) => {
      if (value) setMobileServicesOpen(false);
      return !value;
    });
  }

  // Lock body scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/*
        The mobile overlay below is a sibling of <header>, not nested inside it.
        <header> uses backdrop-blur (backdrop-filter), which establishes a new
        containing block for position:fixed descendants — nesting the overlay
        there would trap it inside the header's own (short) box instead of the
        viewport.
      */}
      <header className="sticky top-0 z-50 border-b border-brand-gray/15 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="shrink-0"
            aria-label={siteConfig.name}
            onClick={closeMobileMenu}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={441}
              height={76}
              priority
              className="h-[54px] w-auto"
            />
          </Link>

          <nav aria-label="Hovednavigasjon" className="hidden md:block">
            <ul className="flex items-center gap-8 font-serif text-[0.95rem] tracking-wide text-brand-slate">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/"));
                const isServices = link.href === "/tjenester";

                return (
                  <li key={link.href} className={isServices ? "group/services relative" : undefined}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-1.5 py-2 transition-colors duration-200 hover:text-brand-orange ${
                        active ? "text-brand-orange" : ""
                      }`}
                    >
                      {link.label}
                      {isServices && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover/services:rotate-180"
                        >
                          <path
                            d="M5 7.5 10 12.5 15 7.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100 ${
                          active ? "scale-x-100" : ""
                        }`}
                      />
                    </Link>

                    {isServices && (
                      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-200 group-hover/services:visible group-hover/services:opacity-100 group-focus-within/services:visible group-focus-within/services:opacity-100">
                        <ul className="w-64 rounded-sm bg-white p-2 shadow-lg ring-1 ring-brand-slate/10">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/tjenester/${service.slug}`}
                                className="block rounded-sm px-4 py-2.5 text-sm text-brand-slate transition-colors hover:bg-brand-bg hover:text-brand-orange"
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-px w-6 bg-brand-slate transition-transform duration-300 ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-brand-slate transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-6 bg-brand-slate transition-transform duration-300 ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-20 bottom-0 z-40 bg-brand-bg transition-opacity duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobilnavigasjon" className="flex h-full flex-col justify-center px-8">
          <ul className="flex flex-col">
            {navLinks.map((link, index) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              const isServices = link.href === "/tjenester";

              return (
                <li
                  key={link.href}
                  style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
                  className={`transform border-b border-brand-gray/15 transition-all duration-300 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      aria-current={active ? "page" : undefined}
                      className={`block flex-1 py-4 font-serif text-3xl ${
                        active ? "text-brand-orange" : "text-brand-slate"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {isServices && (
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((value) => !value)}
                        aria-expanded={mobileServicesOpen}
                        aria-controls="mobile-services-submenu"
                        aria-label={
                          mobileServicesOpen ? "Lukk tjenester-undermeny" : "Åpne tjenester-undermeny"
                        }
                        className="flex h-11 w-11 shrink-0 items-center justify-center text-brand-slate"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M5 7.5 10 12.5 15 7.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {isServices && (
                    <ul
                      id="mobile-services-submenu"
                      className={`grid overflow-hidden transition-all duration-300 ${
                        mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <li className="min-h-0">
                        <ul className="flex flex-col pb-4">
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/tjenester/${service.slug}`}
                                onClick={closeMobileMenu}
                                className="block py-2 pl-4 font-serif text-xl text-brand-slate/80 transition-colors hover:text-brand-orange"
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
