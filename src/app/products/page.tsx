"use client";

import { motion } from "framer-motion";
import { StickyHeader } from "@/components/sections/StickyHeader";
import { FooterSection } from "@/components/sections/FooterSection";
import productsData from "@/data/products.json";
import { ProductCard, Product } from "@/components/sections/ProductsSection";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-none z-50">
        <StickyHeader />
      </div>
      
      <main className="flex-1 w-full pt-24 md:pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          <motion.div 
            className="mb-16 md:mb-24"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-8">
              <Button variant="ghost" asChild className="group -ml-4 text-muted-foreground hover:text-foreground">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-balance mb-6"
              variants={fadeUp}
            >
              All Initiatives
            </motion.h1>
            <motion.p 
              className="text-lg md:text-2xl text-muted-foreground font-light max-w-3xl text-balance"
              variants={fadeUp}
            >
              A complete archive of everything I&apos;ve built, from open-source tools to enterprise platforms and conceptual prototypes.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {productsData.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product as Product} 
                isLarge={false} 
                className="h-full w-full"
              />
            ))}
          </motion.div>
          
        </div>
      </main>
      
      <FooterSection />
    </div>
  );
}
