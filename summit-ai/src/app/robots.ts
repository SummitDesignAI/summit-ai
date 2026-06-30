import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://summitaitool.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/dashboard/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
