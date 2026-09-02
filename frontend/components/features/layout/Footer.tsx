export default function Footer() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-xs">
          <h3 className="font-bold text-xl mb-4 text-primary">Mutuharjo Hub</h3>
          <p className="text-muted-foreground text-sm">
            SMK Muhammadiyah 1 Sukoharjo. Berkemajuan, Disiplin, Cerdas, Sukses.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Navigasi</h4>
            <a href="/" className="text-sm text-muted-foreground hover:text-primary">Beranda</a>
            <a href="/profil/sejarah" className="text-sm text-muted-foreground hover:text-primary">Profil</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
