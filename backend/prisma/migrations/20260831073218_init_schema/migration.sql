-- CreateTable
CREATE TABLE "PendaftarPPDB" (
    "id" TEXT NOT NULL,
    "nomorPendaftaran" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "asalSekolah" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "namaOrtuWali" TEXT NOT NULL,
    "noHpOrtuWali" TEXT NOT NULL,
    "pekerjaanOrtu" TEXT,
    "pilihanJurusan1" TEXT NOT NULL,
    "pilihanJurusan2" TEXT,
    "status" TEXT NOT NULL DEFAULT 'baru',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendaftarPPDB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KonfirmasiBayar" (
    "id" TEXT NOT NULL,
    "pendaftarId" TEXT NOT NULL,
    "namaPengirim" TEXT NOT NULL,
    "nominal" INTEGER NOT NULL,
    "buktiUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'menunggu',
    "catatanAdmin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KonfirmasiBayar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdukBLUD" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "jurusan" TEXT NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "estimasiHarga" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProdukBLUD_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ringkasan" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambarUrl" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLog" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "entityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendaftarPPDB_nomorPendaftaran_key" ON "PendaftarPPDB"("nomorPendaftaran");

-- CreateIndex
CREATE UNIQUE INDEX "KonfirmasiBayar_pendaftarId_key" ON "KonfirmasiBayar"("pendaftarId");

-- CreateIndex
CREATE UNIQUE INDEX "Berita_slug_key" ON "Berita"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "KonfirmasiBayar" ADD CONSTRAINT "KonfirmasiBayar_pendaftarId_fkey" FOREIGN KEY ("pendaftarId") REFERENCES "PendaftarPPDB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
