"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const pathname = usePathname();

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
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={441}
              height={76}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav aria-label="Hovednavigasjon" className="hidden md:block">
            <ul className="flex items-center gap-8 font-serif text-[0.95rem] tracking-wide text-brand-slate">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/"));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative py-2 transition-colors duration-200 hover:text-brand-orange ${
                        active ? "text-brand-orange" : ""
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100 ${
                          active ? "scale-x-100" : ""
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
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
              return (
                <li
                  key={link.href}
                  style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
                  className={`transform border-b border-brand-gray/15 transition-all duration-300 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block py-4 font-serif text-3xl ${
                      active ? "text-brand-orange" : "text-brand-slate"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
