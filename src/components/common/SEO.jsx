import React from 'react';
import { Helmet } from 'react-helmet-async';
import { businessInfo } from '../../data/businessInfo';
import { priorityTargetLocations, coreServiceKeywords } from '../../data/locationsData';

const SEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  type = 'website',
  image = '/assets/seo/balcony-safety-net-hospet.webp',
  schema
}) => {
  const siteTitle = title && title.includes('Raghavi Enterprises')
    ? title
    : `${title} | ${businessInfo.name}`;
  const siteUrl = 'https://www.raghavisafetynets.com';
  const fullUrl = `${siteUrl}${canonicalUrl || ''}`;
  const metaDescription =
    description ||
    'Professional Balcony Safety Net Installation in Hospet. Child Safety Nets, Bird Nets, Invisible Grills, Fast Installation & Affordable Prices.';

  const locationNames = priorityTargetLocations.map((l) => l.name);
  const defaultKeywords = [
    ...coreServiceKeywords,
    'Balcony Safety Nets in Hospet',
    'Pigeon Safety Nets in Hospet',
    'Invisible Grills in Hospet',
    'Bird Spikes in Hospet',
    'Monkey Safety Nets in Hampi Hospet',
    'Children Safety Nets in Hospet',
    'Safety Nets Near Me Hospet',
    ...locationNames.slice(0, 14).map((loc) => `Balcony Safety Nets in ${loc}`),
    ...locationNames.slice(0, 14).map((loc) => `Pigeon Nets in ${loc}`)
  ].join(', ');

  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: businessInfo.name,
        alternateName: 'Raghavi Safety Nets',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/assets/raghavi-logo.png`
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: businessInfo.phone,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Kannada', 'Hindi', 'Telugu']
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: `${businessInfo.name} - Safety Nets & Invisible Grills`,
        publisher: {
          '@id': `${siteUrl}/#organization`
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#localbusiness`,
        name: `${businessInfo.name} - Raghavi Safety Nets`,
        image: `${siteUrl}${image}`,
        url: fullUrl,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        description: metaDescription,
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: businessInfo.address.street,
          addressLocality: 'Hosapete (Hospet)',
          addressRegion: 'Karnataka',
          postalCode: businessInfo.address.pincode,
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: businessInfo.address.latitude,
          longitude: businessInfo.address.longitude
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '07:00',
          closes: '21:00'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1250',
          bestRating: '5'
        },
        areaServed: priorityTargetLocations.map((loc) => ({
          '@type': 'City',
          name: loc.name,
          containedInPlace: {
            '@type': 'State',
            name: 'Karnataka'
          }
        }))
      }
    ]
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      {canonicalUrl && <link rel="canonical" href={fullUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Geo */}
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Hosapete (Hospet), Hampi, Ballari, Koppal, Gangavathi, Karnataka" />
      <meta name="geo.position" content={`${businessInfo.address.latitude};${businessInfo.address.longitude}`} />
      <meta name="ICBM" content={`${businessInfo.address.latitude}, ${businessInfo.address.longitude}`} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schema || defaultSchema)}</script>
    </Helmet>
  );
};

export default SEO;
