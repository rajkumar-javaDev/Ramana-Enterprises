import React from 'react';
import { Helmet } from 'react-helmet-async';
import { businessInfo } from '../../data/businessInfo';

const SEO = ({ title, description, canonicalUrl, type = 'website', image = '/assets/ramana-logo.png', schema }) => {
  const siteTitle = `${title} | ${businessInfo.name}`;
  const siteUrl = 'https://www.ramanasafetynets.com';
  const fullUrl = `${siteUrl}${canonicalUrl || ''}`;
  const metaDescription = description || `${businessInfo.name} - Premium safety net installation services in Bangalore. Garware certified, ${businessInfo.experienceYears}+ years experience.`;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    image: `${siteUrl}/assets/ramana-logo.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    description: metaDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
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
      reviewCount: '850',
      bestRating: '5'
    },
    priceRange: '₹₹',
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
      '@id': 'https://www.wikidata.org/wiki/Q1355'
    }
  };

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
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
      <meta name="geo.placename" content="Bangalore" />
      <meta name="geo.position" content={`${businessInfo.address.latitude};${businessInfo.address.longitude}`} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schema || defaultSchema)}</script>
    </Helmet>
  );
};

export default SEO;
