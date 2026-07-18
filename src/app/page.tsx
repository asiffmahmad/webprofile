import { StickyHeader } from "@/components/sections/StickyHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen md:h-[100dvh] md:overflow-hidden bg-background">
      <div className="flex-none z-50">
        <StickyHeader />
      </div>
      <main className="flex-1 md:overflow-y-scroll overflow-x-hidden md:snap-y md:snap-mandatory selection:bg-accent/20 text-foreground scroll-smooth relative">
        <HeroSection />
        <ExperienceSection />
        <ProductsSection />
        <BlogSection />
        <FooterSection />
      </main>
    </div>
  );
}
