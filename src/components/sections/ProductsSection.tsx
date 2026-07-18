"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, GitBranch, ExternalLink, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import productsData from "@/data/products.json";
import { fadeUp, staggerContainer } from "@/lib/animations";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'live': return 'text-green-500 bg-green-500/10 border-green-500/30';
    case 'building': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    case 'planning': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    case 'research': return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    case 'open source': return 'text-green-500 bg-green-500/10 border-green-500/30';
    default: return 'text-foreground bg-background border-border';
  }
};
export interface Product {
  id: string;
  name: string;
  status: string;
  description: string;
  techStack: string[];
  tags?: string[];
  platform: string;
  category: string;
  version: string;
  url?: string | null;
  github?: string | null;
  docsUrl?: string | null;
  updatedAt?: string;
  previewImage?: string | null;
  color: string;
}

export function ProductCard({ product, isLarge, className }: { product: Product, isLarge: boolean, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      onMouseMove={handleMouseMove}
      className={`bg-card border border-border/60 rounded-[2rem] p-6 md:p-10 hover:border-accent/40 transition-all flex flex-col justify-between group relative overflow-hidden ${className || ''}`}
    >
      {/* Cursor-aware Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              var(--${product.color}-500, rgba(245, 106, 28, 0.1)),
              transparent 40%
            )
          `,
          opacity: 0.15
        }}
      />

      {product.previewImage && (
        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-cover bg-center" style={{ backgroundImage: `url(${product.previewImage})` }} />
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h3 className={`${isLarge ? 'text-4xl' : 'text-2xl'} font-serif group-hover:text-accent transition-colors`}>{product.name}</h3>
            {product.updatedAt && <p className="text-[10px] text-muted-foreground mt-2 font-medium">Updated {product.updatedAt}</p>}
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${getStatusColor(product.status)}`}>
            {product.status.toLowerCase() === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></span>}
            {product.status}
          </div>
        </div>
        
        <p className="text-muted font-light leading-relaxed mb-8">{product.description}</p>
      </div>

      <div className="relative z-10 pt-6 border-t border-border/40 mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {product.tags && product.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 rounded-md bg-foreground/5 border border-border text-[10px] font-medium text-foreground hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm hover:bg-foreground/10 transition-all duration-200 cursor-default">
              {tag}
            </span>
          ))}
          {product.techStack.map((tech: string) => (
            <span key={tech} className="px-2 py-1 rounded-md bg-accent/5 border border-accent/10 text-[10px] font-medium text-muted-foreground hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm hover:bg-accent/10 hover:text-accent transition-all duration-200 cursor-default">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs font-medium text-muted">
            <span>{product.category}</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>{product.platform}</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>{product.version}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none rounded-full h-8 px-4 text-xs font-medium hover:bg-foreground hover:text-background hover:scale-110 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200" asChild>
              <a href={`/products/${product.id}`}>View Details</a>
            </Button>
            
            {product.github && (
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-foreground/5 hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200" asChild>
                <a href={product.github} target="_blank" rel="noopener noreferrer"><GitBranch className="w-4 h-4"/></a>
              </Button>
            )}
            {product.docsUrl && (
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-foreground/5 hover:scale-110 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200" asChild>
                <a href={product.docsUrl} target="_blank" rel="noopener noreferrer"><BookOpen className="w-4 h-4"/></a>
              </Button>
            )}
            {product.url && (
              <Button className="flex-1 sm:flex-none rounded-full bg-foreground text-background hover:bg-foreground/80 hover:scale-110 hover:-translate-y-0.5 hover:shadow-md text-xs h-8 px-4 transition-all duration-200" asChild>
                <a href={product.url} target="_blank" rel="noopener noreferrer">Launch <ExternalLink className="ml-2 w-3 h-3"/></a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsSection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  return (
    <section id="products" className="bg-background border-y border-border/50 relative min-h-[85svh] md:min-h-[100dvh] md:snap-start pt-16 md:pt-32 pb-12 md:pb-20 flex flex-col">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 md:mb-6 text-balance">Product Ecosystem</h2>
            <p className="text-lg md:text-xl text-muted font-light max-w-2xl text-balance">An interconnected suite of tools designed for clarity, focus, and productivity.</p>
          </div>
          <Button variant="outline" className="w-full md:w-auto rounded-full hover:bg-foreground hover:text-background transition-colors" asChild>
            <a href="/products">View All Initiatives <ArrowUpRight className="ml-2 w-4 h-4" /></a>
          </Button>
        </motion.div>

        <div className="flex items-center justify-between mb-4 md:hidden px-4 -mx-4">
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
          className="flex overflow-x-auto snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product as Product} isLarge={false} className="w-[85vw] sm:w-[400px] md:w-auto flex-shrink-0 snap-start h-full" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
