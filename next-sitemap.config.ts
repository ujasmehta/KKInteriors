import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl:  process.env.NEXT_PUBLIC_BASE_URL || "https://kk-interiors.vercel.app",
  generateRobotsTxt: true, 
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};

export default config;
