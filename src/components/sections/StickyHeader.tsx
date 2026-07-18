"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import siteData from "@config/site.json";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyHeader() {
  const [activeSection, setActiveSection] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
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

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="w-full bg-background/80 backdrop-blur-md border-b border-border/40 py-4 shadow-sm z-40 sticky top-0">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="hover:scale-105 transition-transform cursor-pointer">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/Subject.png" alt="Logo" className="w-10 h-10 rounded-full border border-border/50 shadow-sm bg-accent/5 object-cover" />
              <span className="font-serif text-2xl font-bold tracking-tight hidden sm:block">asiff.dev</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 relative">
            {siteData.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              const isAnchor = item.href.startsWith('#');
              const targetHref = isAnchor ? `/${item.href}` : item.href;
              
              return (
                <Link 
                  key={item.href} 
                  href={targetHref} 
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
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex flex-col pt-4 px-4 pb-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/images/Subject.png" alt="Logo" className="w-10 h-10 rounded-full border border-border/50 shadow-sm bg-accent/5 object-cover" />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
            
            <nav className="flex flex-col gap-6 mt-4">
              {siteData.navigation.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                const isAnchor = item.href.startsWith('#');
                const targetHref = isAnchor ? `/${item.href}` : item.href;
                
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={targetHref} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-serif font-medium transition-colors block py-2 ${isActive ? 'text-accent' : 'text-foreground'}`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
