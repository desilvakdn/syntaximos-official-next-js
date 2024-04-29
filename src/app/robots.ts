import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  let web_url = process.env.NEXT_PUBLIC_WEB_URL || "";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/member/dashboard/", "/admin/", "/legal/"],
    },
    sitemap: `${web_url}/sitemap.xml`,
  };
}
