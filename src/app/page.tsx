import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/chapters/Hero";
import { Plans } from "@/components/chapters/Plans";
import { ThreadDial } from "@/components/chapters/ThreadDial";
import { Dashboard } from "@/components/chapters/Dashboard";
import { Logs } from "@/components/chapters/Logs";
import { Reminders } from "@/components/chapters/Reminders";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Plans />
        <ThreadDial />
        <Dashboard />
        <Logs />
        <Reminders />
      </main>
      <Footer />
    </>
  );
}
