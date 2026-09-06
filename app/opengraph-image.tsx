import { ImageResponse } from 'next/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Said Bayraktar — İyi fikirlerden gerçek ürünlere'
export default function OpengraphImage() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '65px 80px', background: '#f7f9fb', color: '#192735', fontFamily: 'sans-serif' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 25 }}><span style={{ color: '#284cdb', fontSize: 52, fontWeight: 700 }}>sb.</span><span>Said Bayraktar · Full Stack Developer</span></div>
    <div style={{ display: 'flex', flexDirection: 'column', fontSize: 80, fontWeight: 700, letterSpacing: '-4px', lineHeight: 1.12 }}><span>İyi fikirlerden</span><span style={{ color: '#284cdb' }}>gerçek ürünlere.</span></div>
    <div style={{ display: 'flex', borderTop: '1px solid #d9e0e7', paddingTop: 25, justifyContent: 'space-between', fontSize: 22, color: '#566674' }}><span>Web · SaaS · ERP · Masaüstü</span><span>Samsun, Türkiye</span></div>
  </div>, size)
}

