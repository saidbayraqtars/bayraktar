import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const alt = 'Said Bayraktar'

// The layered S mark from components/logo.tsx, drawn with boxes for the image renderer.
export default function AppleIcon() {
  const box = (top: number, left: number, width: number, height: number, color = '#eef0f5') =>
    <div style={{ position: 'absolute', top, left, width, height, background: color, borderRadius: 7 }} />
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#0d0f14' }}>
      {box(54, 40, 27, 27)}
      {box(99, 113, 27, 27)}
      {box(76, 40, 100, 27)}
      {box(121, 40, 100, 27)}
      {box(31, 40, 100, 27, '#8291ff')}
    </div>,
    size,
  )
}
