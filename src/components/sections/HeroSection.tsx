"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import heroData from "@/data/hero.json";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <section id="home" className="relative min-h-[100dvh] snap-start flex items-center pt-24 pb-12">
      
      {/* 
        GLOBAL HERO BACKGROUND LAYERS 
        These are completely decoupled from the portrait wrapper. 
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Soft Warm Watercolor */}
        <div className="absolute top-0 right-0 w-[120vw] h-[120vw] lg:w-[80vw] lg:h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4" 
          style={{ 
            background: "radial-gradient(circle at center, rgba(245,106,28,0.08) 0%, transparent 60%)" 
          }} 
        />
        <div className="hidden dark:block absolute top-0 right-0 w-[120vw] h-[120vw] lg:w-[80vw] lg:h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[120px] pointer-events-none -translate-y-1/4 translate-x-1/4" 
          style={{ 
            background: "radial-gradient(circle at center, rgba(245,106,28,0.12) 0%, transparent 60%)" 
          }} 
        />

        {/* Layer 2: Sketch Pencil Lines */}
        <svg className="absolute right-0 top-0 w-full lg:w-[60vw] h-full min-w-[600px] opacity-50 dark:opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,90 Q30,10 50,80 T90,20" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-black/5 dark:text-white/5" />
          <path d="M20,95 Q40,30 60,85 T80,10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-black/5 dark:text-white/5" />
          <path d="M5,50 Q20,20 80,80 T95,30" fill="none" stroke="currentColor" strokeWidth="0.15" className="text-black/5 dark:text-white/5" />
          <path d="M30,15 Q60,90 90,60" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-black/5 dark:text-white/5" />
        </svg>

        {/* Layer 3: Subtle Grain Texture */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.10] dark:opacity-5 mix-blend-overlay">
          <filter id="heroNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoiseFilter)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10 pt-4 md:pt-8">
        
        <motion.div 
          className="md:col-span-7 lg:col-span-7 space-y-6 md:space-y-8 z-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-accent text-xs md:text-sm font-semibold tracking-widest uppercase">
              {heroData.eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif mb-6 leading-[1.1] tracking-tight">
              {heroData.title} <br className="hidden md:block" />
              <span className="italic text-muted">{heroData.highlight}</span>
            </h1>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg md:text-xl lg:text-2xl text-muted font-light mb-8 max-w-2xl leading-relaxed">
            {heroData.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2">
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 md:h-14 px-8 text-sm md:text-base shadow-lg shadow-black/5 hover:scale-105 transition-transform">
              <a href="#products">{heroData.primaryButton}</a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full h-12 md:h-14 px-8 text-sm md:text-base font-medium group hover:bg-accent/5">
              <a href="#connect">{heroData.secondaryButton}</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* PORTRAIT */}
        <motion.div 
          style={{ y, opacity }}
          className="md:col-span-5 lg:col-span-5 relative h-[250px] sm:h-[300px] md:h-[450px] lg:h-[550px] pointer-events-none z-10"
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/Subject.png"
              alt="Asiff Mahmad"
              fill
              className="object-contain object-top md:object-right-top"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
