export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface text-surface-foreground">
      <div className="container flex h-16 items-center justify-between">
        <div className="font-bold text-xl text-primary">Mutuharjo Hub</div>
        <nav className="flex gap-6">
          <a href="/" className="text-sm font-medium hover:text-primary">Beranda</a>
          <a href="/profil/sejarah" className="text-sm font-medium hover:text-primary">Profil</a>
          <a href="/jurusan" className="text-sm font-medium hover:text-primary">Jurusan</a>
          <a href="/berita" className="text-sm font-medium hover:text-primary">Berita</a>
          <a href="/kontak" className="text-sm font-medium hover:text-primary">Kontak</a>
        </nav>
      </div>
    </header>
  );
}
