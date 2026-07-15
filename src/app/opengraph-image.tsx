import { ImageResponse } from 'next/og';
import seoConfig from '@config/seo.json';
import siteData from '@config/site.json';

export const runtime = 'edge';
export const alt = seoConfig.global.title.default;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          color: '#fafafa',
          padding: '60px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, #f56a1c1a 0%, transparent 60%)',
          }}
        />
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '20px',
            color: '#fafafa',
            textShadow: '0px 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {siteData.personal.name}
        </h1>
        <p
          style={{
            fontSize: '40px',
            color: '#a1a1aa', // text-muted equivalent
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          {siteData.personal.title} & {siteData.personal.subtitle}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: '#f56a1c',
              borderRadius: '50%',
            }}
          />
          <span style={{ fontSize: '30px', fontWeight: '500' }}>asiff.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
