"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  title: string;
};

type DropdownConfig = {
  trigger: string;
  items: NavItem[];
};

const dropdownMenus: DropdownConfig[] = [
  {
    trigger: "Profil",
    items: [
      { href: "/profil/sejarah", title: "Sejarah Singkat" },
      { href: "/profil/visi-misi", title: "Visi & Misi" },
      { href: "/profil/prestasi", title: "Prestasi" },
      { href: "/galeri", title: "Galeri" },
    ],
  },
  {
    trigger: "Program",
    items: [
      { href: "/jurusan", title: "Program Keahlian" },
      { href: "/mitra-industri", title: "Mitra Industri" },
      { href: "/blud", title: "Produk BLUD" },
    ],
  },
  {
    trigger: "Informasi",
    items: [
      { href: "/berita", title: "Berita & Agenda" },
      { href: "/kontak", title: "Kontak" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (items: NavItem[]) =>
    items.some((item) => pathname.startsWith(item.href));

  const closeMobile = () => setMobileOpen(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  React.useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-3 z-50 w-full px-3 sm:px-4 flex justify-center pointer-events-none">
      <header
        className="pointer-events-auto flex h-14 sm:h-16 w-full max-w-5xl items-center justify-between gap-3 md:gap-6 rounded-full border border-border bg-background/90 px-4 sm:px-5 md:px-6 backdrop-blur-md"
        style={{
          boxShadow: isScrolled
            ? "0 8px 32px -4px color-mix(in oklch, var(--primary) 18%, transparent), 0 4px 16px -2px oklch(0 0 0 / 0.10)"
            : "0 4px 6px -1px oklch(0 0 0 / 0.10), 0 2px 4px -2px oklch(0 0 0 / 0.08)",
          transition: "box-shadow 500ms ease-out",
        }}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
          onClick={closeMobile}
        >
          <Image
            src="/images/logo/Logo-smkmutuharjo-web-272.png"
            alt="Logo SMK Mutuharjo"
            width={160}
            height={40}
            className="h-8 sm:h-9 lg:h-11 w-auto object-contain"
            priority
          />
        </Link>

        <nav
          className="hidden md:flex items-center gap-0.5 lg:gap-1"
          aria-label="Navigasi utama"
        >
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={cn(
              "px-3 py-2 lg:px-4 text-sm lg:text-md font-medium rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive("/")
                ? "bg-primary/10 text-primary font-semibold"
                : "text-foreground/70 hover:bg-secondary hover:text-foreground"
            )}
          >
            Beranda
          </Link>

          {dropdownMenus.map((menu) => (
            <DesktopDropdown
              key={menu.trigger}
              trigger={menu.trigger}
              items={menu.items}
              groupActive={isGroupActive(menu.items)}
              currentPath={pathname}
            />
          ))}

          <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

          <Link
            href="/ppdb"
            aria-current={isActive("/ppdb") ? "page" : undefined}
            className="px-4 py-2 text-sm lg:text-md font-semibold rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Info PPDB
          </Link>
        </nav>

        <button
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 hover:bg-secondary hover:text-foreground hover:border-primary/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </header>

      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menu navigasi"
          aria-modal="true"
          className="absolute top-[3.75rem] sm:top-[4.5rem] left-3 right-3 sm:left-4 sm:right-4 pointer-events-auto rounded-2xl border border-border bg-popover shadow-lg overflow-hidden"
        >
          <nav
            className="flex flex-col px-2 pt-2 pb-1 gap-px"
            aria-label="Navigasi mobile"
          >
            <MobileNavLink href="/" active={isActive("/")} onClick={closeMobile}>
              Beranda
            </MobileNavLink>

            {dropdownMenus.map((menu) => (
              <MobileDropdownGroup
                key={menu.trigger}
                trigger={menu.trigger}
                items={menu.items}
                groupActive={isGroupActive(menu.items)}
                currentPath={pathname}
                onNavigate={closeMobile}
              />
            ))}
          </nav>

          <div className="px-2 pb-2 pt-2 border-t border-border mt-1">
            <Link
              href="/ppdb"
              onClick={closeMobile}
              className="flex items-center justify-center w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Info PPDB
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

type DesktopDropdownProps = {
  trigger: string;
  items: NavItem[];
  groupActive: boolean;
  currentPath: string;
};

function DesktopDropdown({
  trigger,
  items,
  groupActive,
  currentPath,
}: DesktopDropdownProps) {
  return (
    <div className="group relative">
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 lg:px-4 text-sm lg:text-md font-medium rounded-full outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring",
          groupActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-foreground/70 hover:bg-secondary hover:text-foreground group-hover:bg-secondary group-hover:text-foreground"
        )}
        aria-haspopup="true"
        aria-expanded="false"
      >
        {trigger}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
          aria-hidden="true"
        />
      </button>

      <div className="invisible absolute left-0 top-full mt-2 w-[210px] opacity-0 -translate-y-1 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
        <ul
          className="flex flex-col overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-lg"
          role="menu"
        >
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                aria-current={currentPath === item.href ? "page" : undefined}
                className={cn(
                  "block select-none rounded-lg px-3 py-2.5 text-sm leading-none outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring",
                  currentPath === item.href
                    ? "text-primary font-semibold"
                    : "text-foreground/55 font-medium hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type MobileNavLinkProps = {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function MobileNavLink({ href, active, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-lg px-4 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "text-primary font-semibold"
          : "text-foreground/55 font-medium hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

type MobileDropdownGroupProps = {
  trigger: string;
  items: NavItem[];
  groupActive: boolean;
  currentPath: string;
  onNavigate: () => void;
};

function MobileDropdownGroup({
  trigger,
  items,
  groupActive,
  currentPath,
  onNavigate,
}: MobileDropdownGroupProps) {
  const [open, setOpen] = React.useState(groupActive);

  return (
    <div>
      <button
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          groupActive
            ? "text-primary font-semibold"
            : "text-foreground/55 font-medium hover:text-foreground"
        )}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className="mt-0.5 mb-1 flex flex-col gap-px pl-3 border-l border-border ml-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={currentPath === item.href ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  currentPath === item.href
                    ? "text-primary font-semibold"
                    : "text-foreground/50 hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
