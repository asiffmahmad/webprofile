"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import blogs from "@/data/blogs.json";
import { Clock, Calendar } from "lucide-react";

export function BlogSection() {
  const router = useRouter();
  
  // Show only top 4 blogs on the home page
  const displayBlogs = blogs.slice(0, 4);

  return (
    <section id="blog" className="py-24 md:py-32 bg-background relative min-h-[100dvh] snap-start flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Latest from the Blog
            </h2>
            <p className="text-muted text-lg max-w-2xl font-light leading-relaxed">
              Thoughts, tutorials, and insights on Java, AI, and software engineering.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3.5 font-semibold hover:scale-105 hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
          >
            Find more →
          </Link>
        </motion.div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {displayBlogs.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/blog?post=${post.slug}`)}
              className="group cursor-pointer bg-card/40 backdrop-blur-md border border-border/40 rounded-[2rem] hover:border-accent/40 hover:bg-card transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 relative overflow-hidden flex flex-col"
            >
              {/* Card Image Area */}
              <div className="h-48 w-full relative overflow-hidden bg-secondary/30">
                {(post as any).coverImage && (
                  <img src={(post as any).coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors duration-500"></div>
                
                <div className="flex flex-wrap gap-2 mb-6 relative z-10 -mt-12">
                  {post.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-accent bg-background border border-accent/20 shadow-sm px-4 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300 leading-snug relative z-10">
                  {post.title}
                </h3>
                
                <p className="text-muted text-base md:text-lg mb-8 line-clamp-2 leading-relaxed flex-1 relative z-10">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm font-medium text-muted-foreground pt-6 border-t border-border/50 mt-auto relative z-10">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-accent/70" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-accent/70" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
