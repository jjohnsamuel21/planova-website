import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/chapters/Hero";
import { Plans } from "@/components/chapters/Plans";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Plans />
      </main>
      <Footer />
    </>
  );
}
