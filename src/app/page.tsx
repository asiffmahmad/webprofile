import { StickyHeader } from "@/components/sections/StickyHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { BlogSection } from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden bg-background">
      <div className="flex-none">
        <StickyHeader />
      </div>
      <main className="flex-1 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory selection:bg-accent/20 text-foreground scroll-smooth relative">
      <HeroSection />
      <ExperienceSection />
      <ProductsSection />
      <BlogSection />
      <FooterSection />
    </main>
    </div>
  );
}
