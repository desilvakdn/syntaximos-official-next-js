import fetchGet from "@/modules/fetchGet";
import { MetadataRoute } from "next";

interface ExtensionResponse {
  status: boolean;
  data: [
    {
      identifier: string;
      lastupdated: Date;
    }
  ]; // You can replace 'any' with a more specific type if you know the structure of the data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetchGet("web/extensions", true);
  const { status, data }: ExtensionResponse = response;

  let web_url = process.env.NEXT_PUBLIC_WEB_URL || "";

  const arranged_extensions: MetadataRoute.Sitemap = data.map((itm) => ({
    url: `${web_url}/extensions/${itm.identifier}`,
    lastModified: new Date(itm.lastupdated),
    priority: 1,
  }));
  const arranged_extensions_pricing: MetadataRoute.Sitemap = data.map(
    (itm) => ({
      url: `${web_url}/extensions/pricing/${itm.identifier}`,
      lastModified: new Date(itm.lastupdated),
      priority: 0.8,
    })
  );

  return [
    {
      url: web_url,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${web_url}/extensions`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${web_url}/extensions/pricing`,
      lastModified: new Date(),
      priority: 0.8,
    },
    ...arranged_extensions,
    ...arranged_extensions_pricing,
  ];
}
