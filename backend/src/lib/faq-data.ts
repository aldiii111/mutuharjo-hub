export interface FAQItem {
  keywords: string[]
  answer: string
}

export const FAQ_LIST: FAQItem[] = [
  {
    keywords: ["syarat", "persyaratan", "berkas", "dokumen"],
    answer: "Syarat pendaftaran PPDB SMK Muhammadiyah 1 Sukoharjo: 1) Fotokopi Ijazah/SKL SMP/MTs, 2) Fotokopi Kartu Keluarga, 3) Fotokopi Akta Kelahiran, 4) Pas foto 3x4 (3 lembar), 5) Mengisi formulir pendaftaran di website PPDB.",
  },
  {
    keywords: ["biaya", "spp", "bayar", "pembayaran", "konfirmasi"],
    answer: "Biaya pendaftaran dan konfirmasi pembayaran PPDB dapat dilakukan melalui menu Pembayaran PPDB di website ini atau dengan mengunggah bukti transfer ke rekening resmi sekolah.",
  },
  {
    keywords: ["jurusan", "prodi", "program keahlian"],
    answer: "SMK Muhammadiyah 1 Sukoharjo memiliki 6 Program Keahlian unggulan: 1) TBSM (Teknik Bisnis Sepeda Motor), 2) TKJ (Teknik Komputer & Jaringan), 3) TP (Teknik Pemesinan), 4) TKRO (Teknik Kendaraan Ringan Otomotif), 5) RPL (Rekayasa Perangkat Lunak), 6) TEI (Teknik Elektronika Industri).",
  },
  {
    keywords: ["blud", "produk", "jasa", "bengkel"],
    answer: "Layanan BLUD SMK Mutuharjo menyediakan jasa service sepeda motor Yamaha resmi, instalasi jaringan komputer, pemesinan CNC presisi, service kendaraan ringan, pembuatan aplikasi web/mobile, dan perbaikan elektronika industri.",
  },
  {
    keywords: ["alamat", "lokasi", "dimana", "peta"],
    answer: "SMK Muhammadiyah 1 Sukoharjo beralamat di Jl. Dr. Muwardi No. 22, Sukoharjo, Jawa Tengah.",
  },
  {
    keywords: ["kontak", "telepon", "wa", "whatsapp", "hubungi"],
    answer: "Anda dapat menghubungi panitia sekolah via WhatsApp di +62 812-3456-7890 atau email resmi info@smkmuh1-skh.sch.id.",
  },
]

export function matchFAQ(query: string): string | null {
  const lowerQuery: string = query.toLowerCase()
  for (const item of FAQ_LIST) {
    const isMatch: boolean = item.keywords.some((kw: string) => lowerQuery.includes(kw))
    if (isMatch) {
      return item.answer
    }
  }
  return null
}
