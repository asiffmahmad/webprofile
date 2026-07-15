import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, GitBranch, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import productsData from '@/data/products.json';
import seoConfig from '@config/seo.json';

interface Product {
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

// 1. Generate Static Params to pre-render all products at build time
export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

// 2. Generate dynamic metadata for SEO
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = productsData.find((p) => p.id === params.id) as Product | undefined;

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | ${seoConfig.global.applicationName}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${seoConfig.global.applicationName}`,
      description: product.description,
      url: `${seoConfig.global.metadataBase}/products/${product.id}`,
      type: 'website',
      ...(product.previewImage && {
        images: [
          {
            url: product.previewImage,
            width: 1200,
            height: 630,
            alt: product.name,
          }
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${seoConfig.global.applicationName}`,
      description: product.description,
      ...(product.previewImage && { images: [product.previewImage] }),
    }
  };
}

// 3. The Page Component
export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productsData.find((p) => p.id === params.id) as Product | undefined;

  if (!product) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "operatingSystem": product.platform,
    "applicationCategory": product.category,
    "description": product.description,
    "softwareVersion": product.version,
    "url": product.url || `${seoConfig.global.metadataBase}/products/${product.id}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background pt-24 pb-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <Button variant="ghost" asChild className="mb-12 group -ml-4">
            <Link href="/#products" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Ecosystem
            </Link>
          </Button>

          <article>
            <header className="mb-16">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <h1 className="text-4xl md:text-6xl font-serif text-foreground">
                  {product.name}
                </h1>
                <div className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${getStatusColor(product.status)}`}>
                  {product.status.toLowerCase() === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse"></span>}
                  {product.status}
                </div>
              </div>

              <p className="text-xl md:text-2xl text-muted font-light leading-relaxed mb-10 max-w-2xl">
                {product.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {product.url && (
                  <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium" asChild>
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      Launch Application <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                )}
                {product.github && (
                  <Button variant="outline" size="lg" className="rounded-full hover:bg-foreground hover:text-background transition-colors" asChild>
                    <a href={product.github} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="mr-2 w-4 h-4" /> Repository
                    </a>
                  </Button>
                )}
                {product.docsUrl && (
                  <Button variant="ghost" size="lg" className="rounded-full bg-accent/5 hover:bg-accent/10" asChild>
                    <a href={product.docsUrl} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 w-4 h-4" /> Documentation
                    </a>
                  </Button>
                )}
              </div>
            </header>

            {product.previewImage && (
              <figure className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-border/50 shadow-2xl shadow-black/10">
                <Image 
                  src={product.previewImage} 
                  alt={`${product.name} preview`} 
                  fill 
                  className="object-cover"
                  priority
                />
              </figure>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border/40">
              <section>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-muted mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 rounded-md bg-accent/5 border border-accent/10 text-sm font-medium text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-muted mb-4">Meta Data</h3>
                <dl className="space-y-4">
                  {product.tags && (
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <dt className="text-sm text-muted-foreground">Tags</dt>
                      <dd className="text-sm font-medium">{product.tags.join(', ')}</dd>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-border/40">
                    <dt className="text-sm text-muted-foreground">Category</dt>
                    <dd className="text-sm font-medium">{product.category}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/40">
                    <dt className="text-sm text-muted-foreground">Platform</dt>
                    <dd className="text-sm font-medium">{product.platform}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/40">
                    <dt className="text-sm text-muted-foreground">Version</dt>
                    <dd className="text-sm font-medium">{product.version}</dd>
                  </div>
                  {product.updatedAt && (
                    <div className="flex justify-between items-center py-2">
                      <dt className="text-sm text-muted-foreground">Last Updated</dt>
                      <dd className="text-sm font-medium">{product.updatedAt}</dd>
                    </div>
                  )}
                </dl>
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
