"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-3 z-50 w-full px-4 flex justify-center pointer-events-none">
      <header className="pointer-events-auto flex h-16 w-full max-w-5xl items-center justify-between gap-8 rounded-full border border-border bg-background/90 px-6 shadow-md backdrop-blur-md">
        <Link href="/" className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80">
          <Image
            src="/images/logo/Logo-smkmutuharjo-web-272.png"
            alt="Logo SMK Mutuharjo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <div className="hidden lg:flex lg:items-center">
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
            >
              Beranda
            </Link>

            <DropdownMenu trigger="Profil">
              <DropdownItem href="/profil/sejarah" title="Sejarah Singkat" />
              <DropdownItem href="/profil/visi-misi" title="Visi & Misi" />
              <DropdownItem href="/profil/prestasi" title="Prestasi" />
              <DropdownItem href="/profil/galeri" title="Galeri" />
            </DropdownMenu>

            <DropdownMenu trigger="Program">
              <DropdownItem href="/jurusan" title="Program Keahlian" />
              <DropdownItem href="/mitra-industri" title="Mitra Industri" />
              <DropdownItem href="/blud" title="Produk BLUD" />
            </DropdownMenu>

            <DropdownMenu trigger="Informasi">
              <DropdownItem href="/berita" title="Berita & Agenda" />
              <DropdownItem href="/kontak" title="Kontak" />
            </DropdownMenu>

            <Link
              href="/ppdb"
              className="px-4 py-2 text-sm font-medium text-foreground/80 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
            >
              Info PPDB
            </Link>
          </nav>
        </div>

        <div className="hidden lg:block w-[120px]"></div>
      </header>
    </div>
  );
}

function DropdownMenu({ trigger, children }: { trigger: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 outline-none transition-colors duration-200 hover:text-primary group-hover:text-primary focus-visible:ring-2 focus-visible:ring-ring rounded-full">
        {trigger}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full mt-2 w-[200px] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <ul className="flex flex-col overflow-hidden rounded-lg border border-border bg-popover p-2 shadow-md">
          {children}
        </ul>
      </div>
    </div>
  );
}

function DropdownItem({ href, title }: { href: string; title: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block select-none rounded-md px-4 py-2.5 text-sm font-medium leading-none text-muted-foreground outline-none transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        {title}
      </Link>
    </li>
  );
}
