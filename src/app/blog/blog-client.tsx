"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Clock, Calendar, User, ArrowLeft, Share2, Bookmark, Eye, Heart } from "lucide-react";

type Blog = {
  title: string;
  slug: string;
  date: string;
  readTime?: string;
  author?: string;
  authorRole?: string;
  authorAvatar?: string;
  coverImage?: string;
  likes?: number;
  views?: string;
  tags?: string[];
  excerpt: string;
  content: string;
};

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-accent origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export default function BlogClient({ blogs }: { blogs: Blog[] }) {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(searchParams.get("post"));

  // Sync selected state with URL and scroll to top when opening a post
  useEffect(() => {
    if (selected) {
      window.history.replaceState(null, '', `/blog?post=${selected}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.history.replaceState(null, '', `/blog`);
    }
  }, [selected]);

  const handleShare = async (title: string, slug: string) => {
    const url = `${window.location.origin}/blog`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (selected) {
    const post = blogs.find((p) => p.slug === selected);
    if (!post) return null;
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="post"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-h-screen pb-24 relative"
        >
          <ReadingProgress />
          
          {/* Floating Back Button */}
          <button
            onClick={() => setSelected(null)}
            className="fixed top-8 left-6 md:left-12 z-40 bg-background/80 backdrop-blur-md border border-border/50 text-foreground p-3 rounded-full hover:bg-accent hover:text-white transition-all shadow-sm hover:shadow-lg group"
            aria-label="Back to blogs"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Premium Image Hero Header */}
          <header className="relative pt-40 pb-24 px-6 border-b border-border/30 overflow-hidden mb-16 rounded-b-[3rem]">
            {post.coverImage ? (
              <div className="absolute inset-0 -z-20">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background -z-10" />
            )}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-accent/20 blur-[120px] rounded-full -z-10" />
            
            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-8"
              >
                {post.tags?.map(tag => (
                  <span key={tag} className="text-xs font-bold tracking-widest uppercase text-accent bg-accent/10 backdrop-blur-sm border border-accent/20 px-4 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold mb-10 text-foreground leading-[1.1] tracking-tight"
              >
                {post.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-muted-foreground"
              >
                {post.author && (
                  <div className="flex items-center gap-4 bg-background/50 backdrop-blur-md border border-border/50 px-5 py-2.5 rounded-full text-left">
                    {post.authorAvatar ? (
                      <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-accent/20 bg-accent/5" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent"><User size={20} /></div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground leading-tight text-base">{post.author}</span>
                      {post.authorRole && <span className="text-xs font-normal text-muted-foreground/80">{post.authorRole}</span>}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-background/40 backdrop-blur-sm px-4 py-2.5 rounded-full border border-border/30">
                  <Calendar size={16} className="text-accent/80" />
                  <time dateTime={post.date} className="text-foreground/90 font-semibold">
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2 bg-background/40 backdrop-blur-sm px-4 py-2.5 rounded-full border border-border/30">
                    <Clock size={16} className="text-accent/80" />
                    <span className="text-foreground/90 font-semibold">{post.readTime}</span>
                  </div>
                )}
              </motion.div>
            </div>
          </header>

          {/* Article Body */}
          <div className="container mx-auto px-6 max-w-4xl flex gap-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit text-muted-foreground"
            >
              <div className="flex flex-col items-center gap-2 mb-6 border-b border-border/20 pb-6">
                <button className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors group">
                  <div className="p-3 rounded-full bg-secondary/50 group-hover:bg-accent/10 transition-colors border border-transparent group-hover:border-accent/20"><Heart size={22} className="group-hover:fill-accent/20" /></div>
                  <span className="text-xs font-bold">{post.likes || 0}</span>
                </button>
                <div className="flex flex-col items-center gap-1.5 text-muted-foreground mt-4">
                  <div className="p-3 rounded-full bg-secondary/30"><Eye size={22} /></div>
                  <span className="text-xs font-bold">{post.views || 0}</span>
                </div>
              </div>
              
              <button onClick={() => handleShare(post.title, post.slug)} className="p-3 rounded-full hover:bg-accent/10 hover:text-accent transition-colors border border-transparent hover:border-accent/20" aria-label="Share"><Share2 size={20} /></button>
              <button className="p-3 rounded-full hover:bg-accent/10 hover:text-accent transition-colors border border-transparent hover:border-accent/20" aria-label="Bookmark"><Bookmark size={20} /></button>
            </motion.div>

            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="prose prose-lg md:prose-xl max-w-none w-full
                         prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight
                         prose-p:text-muted-foreground prose-p:leading-relaxed 
                         prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                         prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:italic
                         prose-pre:bg-[#1a1b26] prose-pre:border prose-pre:border-border/20 prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:overflow-x-auto
                         prose-img:rounded-3xl prose-img:shadow-2xl
                         prose-li:text-muted-foreground prose-strong:text-foreground"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.article>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section 
        key="list"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-6 py-12 md:py-24"
      >
        <Link
          href="/#blog"
          className="mb-12 inline-flex text-accent hover:underline font-medium items-center gap-2 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <div className="mb-16 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground tracking-tight"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Thoughts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted text-xl max-w-2xl font-light leading-relaxed"
          >
            Deep dives, tutorials, and thoughts on building modern software, AI architectures, and elegant engineering.
          </motion.p>
        </div>
        
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={post.slug}
              onClick={() => setSelected(post.slug)}
              className="group cursor-pointer bg-card/40 backdrop-blur-xl border border-border/30 rounded-[2.5rem] hover:border-accent/50 hover:bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/15 relative overflow-hidden flex flex-col"
            >
              {/* Card Image Area */}
              <div className="h-48 w-full relative overflow-hidden bg-secondary/30">
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/15 transition-colors duration-700"></div>
                
                <div className="flex flex-wrap gap-2 mb-6 relative z-10 -mt-12">
                  {post.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-accent bg-background border border-accent/20 shadow-sm px-4 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300 leading-snug relative z-10">
                  {post.title}
                </h2>
                
                <p className="text-muted text-base mb-8 line-clamp-3 leading-relaxed flex-1 relative z-10">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm font-medium text-muted-foreground pt-6 border-t border-border/40 mt-auto relative z-10">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-accent/80" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-accent/80" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
