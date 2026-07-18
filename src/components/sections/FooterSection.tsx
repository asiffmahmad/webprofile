"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import siteData from "@config/site.json";
import socialData from "@config/social.json";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { SocialIcon, SocialPlatform } from "@/components/ui/SocialIcons";

export function FooterSection() {
  return (
    <section id="connect" className="relative bg-background overflow-hidden min-h-[85svh] md:min-h-[100dvh] md:snap-start flex flex-col justify-center py-12 lg:py-16">
      
      {/* Background Soft Watercolor Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/15 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col justify-center relative z-10 max-w-7xl">
        
        <div className="flex flex-col w-full">
          {/* 1. Large Editorial Headline */}
          <motion.header 
            className="w-full mb-8 lg:mb-10"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeUp} 
              className="text-3xl md:text-5xl lg:text-7xl font-serif leading-[1.05] tracking-tight mb-4 max-w-5xl text-balance"
              dangerouslySetInnerHTML={{ __html: siteData.footer.heading }}
            />
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
              {siteData.footer.subheading}
            </motion.p>
          </motion.header>

          {/* 2. Large Subtle Divider */}
          <motion.hr 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="w-full border-t border-foreground opacity-5 mb-8 lg:mb-12 origin-left" 
          />

          {/* 3. Content Area - Asymmetrical Composition */}
          <motion.main 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-0"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* LEFT: Portrait & Brand */}
            <motion.article variants={fadeUp} className="lg:col-span-4 flex flex-col relative">
              <div className="relative w-[160px] h-[160px] lg:w-[220px] lg:h-[220px] -ml-4 mb-4 lg:mb-6">
                <Image 
                  src="/images/Subject.png" 
                  alt={siteData.personal.name} 
                  fill 
                  className="object-contain object-bottom opacity-90 drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal"
                  priority
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl lg:text-3xl font-serif text-foreground">{siteData.personal.name}</h3>
                <p className="text-base lg:text-lg text-muted-foreground font-light">{siteData.personal.title}</p>
                <p className="text-xs lg:text-sm font-medium text-foreground mt-2">{siteData.footer.brandText} <span className="font-serif italic text-muted-foreground text-sm lg:text-lg">{siteData.footer.brandName}</span></p>
              </div>
            </motion.article>

            {/* CENTER: Social Icons */}
            <motion.article variants={fadeUp} className="lg:col-span-4 flex flex-col">
              <h4 className="text-[10px] lg:text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4 lg:mb-8">Connect</h4>
              <div className="flex flex-wrap gap-3 max-w-[280px]">
                {Object.entries(socialData).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url as string} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group relative w-[44px] h-[44px] lg:w-[52px] lg:h-[52px] rounded-full bg-accent/5 flex items-center justify-center text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 hover:-translate-y-1 lg:hover:-translate-y-2 hover:shadow-[0_10px_20px_-10px_rgba(249,115,22,0.3)] transition-all duration-250 ease-out border border-transparent hover:border-orange-500/20"
                  >
                    <SocialIcon platform={platform as SocialPlatform} className="w-4 h-4 lg:w-5 lg:h-5 relative z-10" />
                    <span className="absolute -top-8 lg:-top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-foreground text-background text-[10px] lg:text-xs font-medium rounded-full px-3 py-1 lg:px-4 lg:py-1.5 pointer-events-none whitespace-nowrap z-20">
                      {platform}
                    </span>
                  </a>
                ))}
              </div>
            </motion.article>

            {/* RIGHT: Availability & CTA */}
            <motion.article variants={fadeUp} className="lg:col-span-4 flex flex-col justify-between h-full">
              <div className="grid grid-cols-2 gap-x-2 gap-y-4 lg:gap-x-4 lg:gap-y-6 mb-8 lg:mb-0">
                <div className="space-y-1 lg:space-y-2">
                   <h4 className="text-[10px] lg:text-xs uppercase tracking-widest font-bold text-muted-foreground">{siteData.footer.locationLabel}</h4>
                   <p className="text-xs lg:text-sm font-medium text-foreground">{siteData.personal.location}</p>
                </div>
                <div className="space-y-1 lg:space-y-2">
                   <h4 className="text-[10px] lg:text-xs uppercase tracking-widest font-bold text-muted-foreground">{siteData.footer.timezoneLabel}</h4>
                   <p className="text-xs lg:text-sm font-medium text-foreground">{siteData.footer.timezone}</p>
                </div>
                <div className="space-y-1 lg:space-y-2">
                   <h4 className="text-[10px] lg:text-xs uppercase tracking-widest font-bold text-muted-foreground">{siteData.footer.availabilityLabel}</h4>
                   <p className="text-xs lg:text-sm font-medium flex items-center gap-2 text-foreground">
                     <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                     {siteData.personal.availability}
                   </p>
                </div>
                <div className="space-y-1 lg:space-y-2">
                   <h4 className="text-[10px] lg:text-xs uppercase tracking-widest font-bold text-muted-foreground">{siteData.footer.statusLabel}</h4>
                   <p className="text-xs lg:text-sm font-medium text-foreground">{siteData.footer.status}</p>
                </div>
              </div>

              {/* Huge CTA */}
              <div className="mt-auto flex">
                <Button asChild className="group w-full sm:w-[220px] h-[52px] lg:h-[64px] rounded-full bg-foreground text-background hover:bg-orange-500 text-sm lg:text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]">
                  <a href={socialData.email}>
                    {siteData.footer.ctaText} 
                    <ArrowRight className="ml-2 lg:ml-3 w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </Button>
              </div>
            </motion.article>
          </motion.main>
        </div>

        {/* 4. Minimal Footer Meta */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between pt-6 lg:pt-8 border-t border-border/40 text-[10px] lg:text-xs font-medium text-muted-foreground uppercase tracking-widest mt-12 lg:mt-16"
        >
          <p>© {siteData.footer.copyrightYear} {siteData.personal.name}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-2">
            Built under <span className="font-serif italic text-xs lg:text-sm lowercase">{siteData.footer.brandName}</span>
          </p>
        </motion.footer>

      </div>
    </section>
  );
}
