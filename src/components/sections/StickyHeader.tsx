"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import siteData from "@config/site.json";
import { motion } from "framer-motion";

export function StickyHeader() {
  const [activeSection, setActiveSection] = React.useState("");
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = siteData.navigation.map(nav => nav.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background border-b border-border/40 py-2 shadow-sm' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="font-serif text-3xl font-bold tracking-tight hover:scale-105 transition-transform cursor-pointer">
          <a href="#">asiff.dev</a>
        </div>
        
        <nav className="hidden md:flex items-center gap-1 relative">
          {siteData.navigation.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a 
                key={item.href} 
                href={item.href} 
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent/10 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
