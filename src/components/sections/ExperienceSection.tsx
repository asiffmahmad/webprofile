"use client";

import * as React from "react";
import { motion } from "framer-motion";
import experienceData from "@/data/experience.json";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/animations";
import { Box, Circle, Hexagon, Diamond, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const getIcon = (shape: string) => {
  switch (shape) {
    case 'square': return <Box className="w-5 h-5" />;
    case 'circle': return <Circle className="w-5 h-5" />;
    case 'diamond': return <Diamond className="w-5 h-5" />;
    case 'leaf': return <Hexagon className="w-5 h-5" />;
    default: return <Box className="w-5 h-5" />;
  }
};

export function ExperienceSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <section id="experience" className="container mx-auto px-4 md:px-6 min-h-[85svh] md:min-h-[100dvh] md:snap-start pt-16 md:pt-32 pb-12 md:pb-20 flex flex-col relative">
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-10 md:mb-20"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-balance">Professional Experience</h2>
        <p className="text-muted text-lg font-light leading-relaxed text-balance">
          5+ years building enterprise software across multiple industries including banking, logistics, financial platforms and modern SaaS applications.
        </p>
      </motion.div>

      <div className="flex items-center justify-between mb-4 md:hidden">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Swipe to explore</p>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scrollRef.current?.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' })} className="w-8 h-8 rounded-full border-border/50 text-foreground">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scrollRef.current?.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' })} className="w-8 h-8 rounded-full border-border/50 text-foreground">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <motion.div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {experienceData.map((exp) => (
          <motion.div 
            key={exp.id}
            variants={fadeUp}
            whileHover={hoverLift.whileHover}
            className="w-[85vw] sm:w-[350px] md:w-auto flex-shrink-0 snap-start bg-card border border-border/50 rounded-3xl p-6 md:p-8 hover:border-accent/50 transition-all duration-300 group hover:shadow-lg hover:shadow-accent/5 flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-accent/20 transition-all text-accent">
              {getIcon(exp.iconShape)}
            </div>
            
            <h3 className="text-2xl font-serif mb-4 text-foreground group-hover:text-accent transition-colors">{exp.industry}</h3>
            
            <p className="text-muted font-light text-sm leading-relaxed flex-1 mb-8">
              {exp.description}
            </p>

            <div className="pt-6 border-t border-border/40 mt-auto">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted mb-3">Core Focus</p>
              <div className="flex flex-wrap gap-2">
                {exp.focus.map(f => (
                  <span key={f} className="text-xs font-medium text-muted-foreground bg-background border border-border px-2 py-1 rounded-md hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm hover:bg-foreground/5 hover:text-foreground transition-all duration-200 cursor-default">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
