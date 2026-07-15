import React from 'react';
import personData from '@config/person.json';
import organizationData from '@config/organization.json';
import seoConfig from '@config/seo.json';

export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seoConfig.global.applicationName,
    "url": seoConfig.global.metadataBase,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${seoConfig.global.metadataBase}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const schemas = [personData, organizationData, websiteSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
