import { Suspense } from "react";
import type { Metadata } from "next";
import blogs from "@/data/blogs.json";
import BlogClient from "./blog-client";

export const metadata: Metadata = {
  title: "Blog – asiff.dev",
  description: "Read articles about Java AI, software engineering, and more.",
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BlogClient blogs={blogs} />
    </Suspense>
  );
}
