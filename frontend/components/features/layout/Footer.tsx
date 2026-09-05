import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          <div className="md:col-span-12 lg:col-span-4 flex flex-col">
            <div className="mb-3">
              <Image
                alt="Logo SMK Mutuharjo"
                width={160}
                height={40}
                className="h-14 w-auto object-contain"
                src="/images/logo/Logo-smkmutuharjo-web-272.png"
              />
            </div>
            <div className="mb-3">
              <h3 className="font-heading font-semibold text-base text-foreground leading-snug">
                SMK Muhammadiyah 1 Sukoharjo
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3.5">
                Lembaga pendidikan kejuruan unggulan berbasis teknologi industri dan kewirausahaan yang berkomitmen mencetak lulusan berdaya saing global.
              </p>
            </div>
            <div className="space-y-2.5 text-xs text-muted-foreground mb-4 mt-3.5">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base leading-none mt-0.5 shrink-0">location_on</span>
                <p className="leading-relaxed">
                  Jl. Anggrek No.2, Denokan, Jetis, Kec. Sukoharjo, Kabupaten Sukoharjo, Jawa Tengah 57511
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base leading-none mt-0.5 shrink-0">call</span>
                <div className="leading-relaxed space-y-0.5">
                  <div><span className="font-medium text-foreground">Telp :</span> (0271) 593187</div>
                  <div><span className="font-medium text-foreground">Direktur PPDB :</span> 0856-4750-2098</div>
                  <div><span className="font-medium text-foreground">Admin Humas :</span> 0851-7156-4293</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base leading-none mt-0.5 shrink-0">mail</span>
                <div className="leading-relaxed">
                  <a
                    className="hover:text-primary transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href="mailto:smkmuh_skh@yahoo.co.id"
                  >
                    smkmuh_skh@yahoo.co.id
                  </a>
                  <a
                    className="hover:text-primary transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href="mailto:skh.smkmuh1@gmail.com"
                  >
                    skh.smkmuh1@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-2 flex flex-col">
            <div className="flex items-center mb-3.5">
              <h4 className="font-heading font-semibold text-md text-foreground tracking-tight">
                Jelajahi
              </h4>
            </div>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/profil/sejarah', label: 'Profil Sekolah' },
                { href: '/galeri', label: 'Galeri' },
                { href: '/berita', label: 'Berita & Agenda' },
                { href: '/kontak', label: 'Kontak' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 lg:col-span-2 flex flex-col">
            <div className="flex items-center mb-3.5">
              <h4 className="font-heading font-semibold text-md text-foreground tracking-tight">
                Layanan &amp; Program
              </h4>
            </div>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { href: '/jurusan', label: 'Program Keahlian' },
                { href: '/mitra-industri', label: 'Mitra Industri' },
                { href: '/blud', label: 'Produk BLUD' },
                { href: '/ppdb', label: 'Info PPDB' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-12 lg:col-span-4 flex flex-col">
            <h4 className="font-heading font-semibold text-md text-foreground mb-3.5 tracking-tight">
              Lokasi Kami
            </h4>
            <div className="group relative sm:w-2/3 lg:w-full rounded-lg overflow-hidden border border-border shadow-xs mb-5">
              <iframe
                title="Lokasi SMK Muhammadiyah 1 Sukoharjo"
                src="https://maps.google.com/maps?q=SMK+Muhammadiyah+1+Sukoharjo+Jl.+Anggrek+No.2+Sukoharjo&output=embed"
                width="100%"
                height="180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
            <div className="flex items-center gap-4 text-xs mb-5">
              <Link
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href="/kebijakan-privasi"
              >
                Kebijakan Privasi
              </Link>
              <span className="text-border">•</span>
              <Link
                className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href="/syarat-ketentuan"
              >
                Syarat &amp; Ketentuan
              </Link>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
                <div className="flex items-center justify-start h-8" title="JHIC 2.0">
                  <img alt="Logo JHIC 2026" className="max-h-7 w-auto object-contain hover:opacity-80 transition-opacity" src="/images/logo/kompetisi/1. LOGO JHIC 2.0.png" />
                </div>
                <div className="flex items-center justify-start h-8" title="Jagoan Hosting">
                  <img alt="Logo Jagoan Hosting" className="max-h-6 w-auto object-contain hover:opacity-80 transition-opacity" src="/images/logo/kompetisi/2. Logo Jagoan Hosting.png" />
                </div>
                <div className="flex items-center justify-start h-8" title="Garuda Spark by Komdigi">
                  <img alt="Logo Garuda Spark" className="max-h-7 w-auto object-contain hover:opacity-80 transition-opacity" src="/images/logo/kompetisi/3. Garuda Spark Full Color.png" />
                </div>
                <div className="flex items-center justify-start h-8" title="Kementerian Komunikasi dan Digital RI">
                  <img alt="Logo KOMDIGI" className="max-h-7 w-auto object-contain hover:opacity-80 transition-opacity" src="/images/logo/kompetisi/4. KOMDIGI.png" />
                </div>
                <div className="flex items-center justify-start h-8" title="Ngalup.co">
                  <img alt="Logo Ngalup.co" className="max-h-5 w-auto object-contain hover:opacity-80 transition-opacity" src="/images/logo/kompetisi/5. LOGO NGALUP.png" />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="border-t border-border pt-6 mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <p className="text-center text-xs text-muted-foreground">
            © 2026 SMK Mutuharjo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
