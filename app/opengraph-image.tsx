import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Said Bayraktar, ekrandan sunucuya'

// Same identity as the site: the layered S mark, orange top layer, heavy grotesque on deep navy.
export default function OpengraphImage() {
  const slab = (top: number, left: number, width: number, height: number, color: string) =>
    <div style={{ position: 'absolute', top, left, width, height, background: color, borderRadius: 6 }} />
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#092634', color: '#f9f9f9', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ position: 'relative', width: 72, height: 72, display: 'flex' }}>
          {slab(18, 11, 50, 14, '#f9f9f9')}
          {slab(40, 47, 14, 14, '#f9f9f9')}
          {slab(4, 11, 14, 14, '#f9f9f9')}
          {slab(7, 11, 50, 14, '#ff6e42')}
          {slab(29, 11, 50, 14, '#f9f9f9')}
          {slab(50, 11, 50, 14, '#f9f9f9')}
        </div>
        <span style={{ fontSize: 30, fontWeight: 700 }}>Said Bayraktar</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 132, fontWeight: 800, letterSpacing: '-5px', lineHeight: 0.92 }}>
        <span>Ekrandan</span>
        <span style={{ color: '#ff6e42' }}>sunucuya.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#9cb4c1' }}>
        <span>Full stack yazılım geliştirici · Samsun</span>
        <span>Web, mobil, masaüstü</span>
      </div>
    </div>,
    size,
  )
}
