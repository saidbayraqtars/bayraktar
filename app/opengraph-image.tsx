import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Said Bayraktar, ekrandan sunucuya'

// Same identity as the site: the layered S mark, cobalt top layer, heavy grotesque on near-black.
export default function OpengraphImage() {
  const slab = (top: number, left: number, width: number, height: number, color: string) =>
    <div style={{ position: 'absolute', top, left, width, height, background: color, borderRadius: 6 }} />
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#0d0f14', color: '#eef0f5', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ position: 'relative', width: 72, height: 72, display: 'flex' }}>
          {slab(18, 11, 50, 14, '#eef0f5')}
          {slab(40, 47, 14, 14, '#eef0f5')}
          {slab(4, 11, 14, 14, '#eef0f5')}
          {slab(7, 11, 50, 14, '#8291ff')}
          {slab(29, 11, 50, 14, '#eef0f5')}
          {slab(50, 11, 50, 14, '#eef0f5')}
        </div>
        <span style={{ fontSize: 30, fontWeight: 700 }}>Said Bayraktar</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 132, fontWeight: 800, letterSpacing: '-5px', lineHeight: 0.92 }}>
        <span>Ekrandan</span>
        <span style={{ color: '#8291ff' }}>sunucuya.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#9ba4b6' }}>
        <span>Full stack geliştirici</span>
        <span>Web, mobil, masaüstü</span>
      </div>
    </div>,
    size,
  )
}
