import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="h-[calc(100%-8rem)] p-4">{children}</main>
      <Footer />
    </>
  );
}
