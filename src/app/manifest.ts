import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Syntaximos",
    short_name: "Syntaximos",
    description: `Welcome to Syntaximos. We develop best powerful Chrome Extensions for improving your productivity. Discover the collection of web browser extensions in ${new Date().getFullYear()} for task management, research, automation, and more. Optimize your web experience today!`,
    start_url: process.env.NEXT_PUBLIC_WEB_URL,
    display: "standalone",
    background_color: "#101010",
    theme_color: "#101010",
    icons: [
      {
        src: `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon16.png`,
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon48.png`,
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: `${process.env.NEXT_PUBLIC_WEB_URL}/webicons/icon128.png`,
        sizes: "128x128",
        type: "image/png",
      },
    ],
  };
}
