import { StickyHeader } from "@/components/sections/StickyHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main className="h-[100dvh] overflow-y-scroll overflow-x-hidden snap-y snap-mandatory selection:bg-accent/20 bg-background text-foreground scroll-smooth">
        <HeroSection />
        <ExperienceSection />
        <ProductsSection />
        <FooterSection />
      </main>
    </>
  );
}
