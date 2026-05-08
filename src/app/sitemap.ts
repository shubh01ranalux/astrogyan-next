import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublishedBlogs();

  const staticRoutes = [
    "",
    "/services",
    "/book",
    "/panchang",
    "/free-tools",
    "/puja-services",
    "/gemstones",
    "/blog",
    "/contact",
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogPages = blogs.map((blog) => ({
    url: `${siteUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || blog.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}