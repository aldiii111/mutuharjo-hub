import Navbar from "@/components/features/layout/Navbar";
import Footer from "@/components/features/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
