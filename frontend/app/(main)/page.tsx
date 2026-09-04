import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-6">
        Preview Layout Utama
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Halaman ini sengaja dibuat simpel sementara untuk memperlihatkan struktur <strong>Navbar</strong> dan <strong>Footer</strong> yang sudah diperbarui dengan identitas <em>SMK Mutuharjo</em>.
      </p>
    </Container>
  );
}
