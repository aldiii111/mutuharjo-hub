import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border mt-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          <div className="md:col-span-12 lg:col-span-4 flex flex-col">
            <div className="mb-3">
              <img
                alt="Logo SMK Mutuharjo"
                className="h-10 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD-U48dvc8LVbw-Sn4y_LxKBD51K5v-2_eelhaufu2S50RyauTsxVS9LHVvWwgaJ0r7jN2fqDaDYGLsreg3bEknxm8azP-VwYBKD20fLW3M08isptcpohpwLBABUWiOuzbCOpOZSOwwsCevCZtxvH3nkVcNf7huNQTsoR63Xnl0G7vOTlR6bl0w7wNfHOjS7bugY5IBG1Cy0lgmHPiW7ToWvq49yoqli1_vj4U1uRtKtPFH58eS8ve6vnU9GCW80pS-A"
              />
            </div>
            <div className="mb-3">
              <h3 className="font-semibold text-base text-foreground leading-snug">
                SMK Muhammadiyah 1 Sukoharjo
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                Lembaga pendidikan kejuruan unggulan berbasis teknologi industri dan kewirausahaan yang berkomitmen mencetak lulusan berdaya saing global.
              </p>
            </div>
            <div className="space-y-2.5 text-xs text-muted-foreground mb-4">
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
            <div className="flex items-center mb-5.5">
              <h4 className="font-semibold text-md text-foreground tracking-tight">
                Jelajahi
              </h4>
            </div>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/profil', label: 'Profil Sekolah' },
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
            <div className="flex items-center mb-5.5">
              <h4 className="font-semibold text-md text-foreground tracking-tight">
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
            <h4 className="font-semibold text-md text-foreground mb-3 tracking-tight">
              Lokasi Kami
            </h4>
            <div className="group relative w-full rounded-lg overflow-hidden border border-border shadow-xs mb-5">
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
                  <img alt="Logo JHIC 2026" className="max-h-7 w-auto object-contain hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnqzTy1KvjG3otVJjmwY_rQ6b4-grMPDLamtTsEIk1_STALWQSUdXIMrMHnlloteXctGhcCeSCJP48Uk8Q5PX2ykJ9Yf9dKtDLLk0ybG4ZZPz4XFUKvbQobfuyQpMS0CSMzNWlZPGfwOQU4T2eKOWwP3EAbcRUhNsc9eqJJMH30lswJNfD29tD87oFHe4ehEjT-TRzZpSjsax86iaWXh_FCFK9x2FK_fe-WHmFBksEu4Q7UuFtGILPSFEoKM68EOkK-w" />
                </div>
                <div className="flex items-center justify-start h-8" title="Jagoan Hosting">
                  <img alt="Logo Jagoan Hosting" className="max-h-6 w-auto object-contain hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-aeZCL--Fg9dWsxfNWEeE6lBFwG5l1CE8Z_87pTt1Eb5SKBdULKVGDcp6Dh-MIAjbvlgyJzBDbqjbM8czWGWK3icBWmJj9eDWYh0-2pmZ9xdamfgqS5qMF-iMS1DWTGkI3vCvh-9hAJ6HOZZ4UrH34UaPlgSNnWTIowQ9JPRf83cvEo2dmSVC33yK4zabxN6gqrYiWg1zz0bptvVE4yghejhLi30EkzmMnq0e_0tikT0DTpD_CTVuG94tZrCyDk_g1g" />
                </div>
                <div className="flex items-center justify-start h-8" title="Garuda Spark by Komdigi">
                  <img alt="Logo Garuda Spark" className="max-h-7 w-auto object-contain hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUi0HFsBl0GyO01JgJVjjv7YzJS5HmLJD_t65Vsaa4sL3ij5hIjDon1faMdG6wOHdcZUkvj6uTy-gsk69Ma6szZ4bD31_nEv84LGP46x5u7QAFRq-xPM2i-bZpojZFMs9CLIwFXB4r5tbZbP5t8d9_UE4QP9pyJuu1H6cbMX_JhkHlq6PDDs2Oan1Oj9fKfGKEpQQJi9NvwPJb3KSXAbJ3oWcE1i66ejPcfjRzBSGNBhjmltBV7ocMVb44EXrGBXlbkw" />
                </div>
                <div className="flex items-center justify-start h-8" title="Kementerian Komunikasi dan Digital RI">
                  <img alt="Logo KOMDIGI" className="max-h-7 w-auto object-contain hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcDHMRVqk4QLLipb86L4PSiyqObCwHkH4dAho9LUEmYBVq_JqkXlhA-wU5y5hij_pJyyA9WTA7Pm-B4qPHgDs9Pv2_1l4OTGsD89n8l-Kw3Yy9EusRz1kI0NR_26_lQlxjnTn-PpVh2yWfqXmnQjBYA7FVeBbTBOIY7bwf-rmLQEf4POih65cw8mtvJKq39xJmyTLd2FLs81fFeJFyY8_iZ_VCa3oTzo3Z9UwARLi9lPnyjOKljYS7p9Im17pt1goavw" />
                </div>
                <div className="flex items-center justify-start h-8" title="Ngalup.co">
                  <img alt="Logo Ngalup.co" className="max-h-5 w-auto object-contain hover:opacity-80 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANM1onEdQjgkwbmQUN5_97Ib66ca_omZW4Wdt8AiFo9dqGDwia32jhf-CN2nQF8zoF5DKyb6feI9O-U9KLOtHTqMUgjUuxznZ3q_B-ep2sugrZjj66-6BVutarUCmmA3MZ8sdolFHsHi76TAc1dJQF2WUj0_zE73UWuq6Poyt80W9PeklUuuAvv3t_D8xAZPIZ4VVgGd-CXjN9XBOlukyRNYSdvtwUpaKqCFRwR8oAB-ycMwSCkLoKy0uXRXQeBnFSrA" />
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
