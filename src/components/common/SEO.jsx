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
  image = '/assets/raghavi-logo.png',
  schema
}) => {
  const siteTitle = `${title} | ${businessInfo.name} - Raghavi Safety Nets`;
  const siteUrl = 'https://www.raghavisafetynets.com';
  const fullUrl = `${siteUrl}${canonicalUrl || ''}`;
  const metaDescription =
    description ||
    `${businessInfo.name} (raghavisafetynets.com) - #1 Safety Nets & Invisible Grills in Hosapete (Hospet), Hampi, Kamalapura, Munirabad, Toranagallu, Sandur, Gangavathi, Koppal, Ballari, Hubballi, Dharwad, Bengaluru & Karnataka. Call ${businessInfo.phone}.`;

  const locationNames = priorityTargetLocations.map((l) => l.name);
  const defaultKeywords = [
    ...coreServiceKeywords,
    'Safety Nets in Hosapete',
    'Safety Nets in Hospet',
    'Balcony Safety Nets Hosapete',
    'Pigeon Safety Nets Hosapete',
    'Monkey Safety Nets Hampi Hosapete',
    'Invisible Grills Hosapete Ballari',
    'Safety Nets in Toranagallu JSW',
    'Safety Nets in Ballari Bellary',
    'Safety Nets in Koppal Gangavathi',
    'Safety Nets in Hubballi Dharwad',
    'Safety Nets in Bengaluru Bangalore',
    ...locationNames.map((loc) => `Safety Nets in ${loc}`),
    ...locationNames.slice(0, 16).map((loc) => `Pigeon Nets in ${loc}`),
    ...locationNames.slice(0, 16).map((loc) => `Balcony Safety Nets in ${loc}`),
    ...locationNames.slice(0, 16).map((loc) => `Invisible Grills in ${loc}`)
  ].join(', ');

  const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${businessInfo.name} - Raghavi Safety Nets`,
    alternateName: ['Raghavi Safety Nets', 'Raghavi Enterprises Hosapete', 'Raghavi Safety Nets Karnataka'],
    image: `${siteUrl}/assets/raghavi-logo.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    description: metaDescription,
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
    priceRange: '₹₹',
    areaServed: priorityTargetLocations.map((loc) => ({
      '@type': 'City',
      name: loc.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Karnataka'
      }
    }))
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
      <meta name="geo.placename" content="Hosapete, Vijayanagara, Ballari, Koppal, Hubballi, Bengaluru, Karnataka" />
      <meta name="geo.position" content={`${businessInfo.address.latitude};${businessInfo.address.longitude}`} />
      <meta name="ICBM" content={`${businessInfo.address.latitude}, ${businessInfo.address.longitude}`} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schema || defaultSchema)}</script>
    </Helmet>
  );
};

export default SEO;
