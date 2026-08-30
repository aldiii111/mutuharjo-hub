import { ApiResponse } from '@mutuharjo/shared';

export default function Home() {
  const statusResponse: ApiResponse<string> = {
    success: true,
    data: 'System Ready',
    message: 'Mutuharjo Hub Frontend Inisialisasi Berhasil',
  };

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b border-border pb-6 space-y-2">
        <h1 className="text-4xl font-bold font-heading text-primary">
          Mutuharjo Hub
        </h1>
        <p className="text-muted-foreground text-base font-body">
          SMK Muhammadiyah 1 Sukoharjo - Sekolah Pusat Keunggulan (CoE)
        </p>
      </header>

      <section className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold font-heading text-surface-foreground">
          Verifikasi Token Desain OKLCH v1.1
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium text-sm">
            Primary Badge
          </span>

          <span className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground font-medium text-sm">
            Secondary Surface
          </span>

          <span className="px-3 py-1.5 rounded-md bg-accent text-primary-foreground font-medium text-sm">
            Accent Badge
          </span>

          <span className="px-3 py-1.5 rounded-md bg-danger text-danger-foreground font-medium text-sm">
            Danger (Status Ditolak)
          </span>

          <span className="px-3 py-1.5 rounded-md bg-success text-success-foreground font-medium text-sm">
            Success (Terverifikasi)
          </span>
        </div>

        <div className="pt-4 border-t border-border text-sm text-muted-foreground">
          <p>
            Status System:{' '}
            <strong className="text-foreground font-mono">
              {statusResponse.data}
            </strong>
          </p>
          <p>{statusResponse.message}</p>
        </div>
      </section>
    </main>
  );
}
