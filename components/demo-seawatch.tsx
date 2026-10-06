'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, type MotionValue } from 'motion/react'
import type { Lang } from '@/lib/content'
import { ease, span, stepAt, useProgress } from '@/components/demo-kit'

/*
  SeaWatch: AIS positions stream onto a live map of the Black Sea, a region is drawn
  and PostGIS keeps only the vessels inside it, then the same feed lands on the phone.
  Scroll moves the story from step to step; the ships keep sailing on their own clock.
*/

/** Stylised Black Sea in a 160 × 100 box; land is everything around it. */
const sea = 'M18 30C22 22 32 18 42 20C52 14 60 18 66 24L72 22C76 16 84 14 90 20C88 24 84 28 86 30C96 30 104 26 112 30C122 32 132 36 140 42C146 46 148 54 144 60C140 66 132 68 124 68C116 70 108 72 100 70C94 68 90 64 84 60C80 58 76 60 72 64C64 68 54 70 46 70C38 72 28 72 22 68C16 62 14 54 16 46C16 40 16 34 18 30Z'
/** The subscriber's region off Samsun, the one PostGIS filters by. */
const region: [number, number][] = [[80, 44], [126, 42], [134, 60], [104, 66], [88, 58]]
const regionPath = 'M' + region.map(([x, y]) => `${x} ${y}`).join('L') + 'Z'

type Lane = { from: [number, number]; to: [number, number]; speed: number }
const lanes: Lane[] = [
  { from: [22, 64], to: [58, 28], speed: 0.018 },
  { from: [26, 60], to: [132, 48], speed: 0.012 },
  { from: [40, 38], to: [124, 38], speed: 0.014 },
  { from: [90, 32], to: [140, 56], speed: 0.02 },
  { from: [118, 62], to: [62, 46], speed: 0.016 },
  { from: [96, 62], to: [108, 34], speed: 0.022 },
]
const names = ['AEGEAN BREEZE', 'KARADENİZ 7', 'SAMSUN STAR', 'ODESSA LINE', 'PONTUS', 'SİNOP EXPRESS', 'BATUMI SUN', 'ANADOLU', 'MARMARA', 'BLUE HORIZON', 'NORTH WIND', 'TRABZON 1', 'KERCH', 'EUXINE', 'BAFRA']
const moving = lanes.flatMap((lane, laneIndex) => [0, 0.38, 0.71].slice(0, laneIndex % 2 ? 2 : 3).map((phase, k) => ({ lane, phase: (phase + laneIndex * 0.13) % 1, id: laneIndex * 3 + k })))
const anchored: [number, number][] = [[24, 63], [99, 64], [116, 33], [139, 57], [46, 24], [70, 61]]

const inside = ([x, y]: [number, number]) => {
  let hit = false
  for (let i = 0, j = region.length - 1; i < region.length; j = i++) {
    const [xi, yi] = region[i], [xj, yj] = region[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/** A clock that only runs while the map is on screen. */
function useClock(ref: React.RefObject<HTMLElement | null>, reduced: boolean) {
  const inView = useInView(ref, { amount: 0.2 })
  const [time, setTime] = useState(12)
  useEffect(() => {
    if (reduced || !inView) return
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      setTime((value) => value + Math.min(0.05, (now - last) / 1000))
      last = now
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced])
  return time
}

export function SeaWatchDemo({ progress, lang, reduced }: { progress: MotionValue<number>; lang: Lang; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const p = useProgress(progress, reduced, 1)
  const time = useClock(ref, reduced)
  const tr = lang === 'tr'

  // Step 1: ships pop in as the stream connects. Step 2: the region is drawn and filters. Step 3: the phone joins.
  const arrive = span(p, 0.1, stepAt(0) + 0.14)
  const draw = ease(span(p, stepAt(1), stepAt(1) + 0.1))
  const filter = ease(span(p, stepAt(1) + 0.08, stepAt(1) + 0.16))
  const phone = ease(span(p, stepAt(2), stepAt(2) + 0.08))

  const ships = moving.map(({ lane, phase, id }, index) => {
    const k = (phase + time * lane.speed) % 1
    const x = Math.round((lane.from[0] + (lane.to[0] - lane.from[0]) * k) * 100) / 100
    const y = Math.round((lane.from[1] + (lane.to[1] - lane.from[1]) * k) * 100) / 100
    // Rounded so the server and the browser print the same numbers.
    const heading = Math.round(Math.atan2(lane.to[1] - lane.from[1], lane.to[0] - lane.from[0]) * 1800 / Math.PI) / 10
    const knots = 9 + ((id * 37) % 70) / 10
    return { id, x, y, heading, knots, shown: arrive * (moving.length + anchored.length) > index, inRegion: inside([x, y]) }
  })
  const docked = anchored.map((point, index) => ({ point, shown: arrive * (moving.length + anchored.length) > moving.length + index, inRegion: inside(point) }))
  const visible = ships.filter((ship) => ship.shown).length + docked.filter((ship) => ship.shown).length
  const underway = ships.filter((ship) => ship.shown).length
  const inRegion = ships.filter((ship) => ship.shown && ship.inRegion).length + docked.filter((ship) => ship.shown && ship.inRegion).length
  const listed = (filter > 0.5 ? ships.filter((ship) => ship.inRegion) : ships).slice(0, 5)

  // The event log shows the newest positions; one line per tenth of a second.
  const tick = Math.floor(time * 2.4)
  const log = [0, 1, 2, 3].map((offset) => {
    const ship = ships[(tick - offset + ships.length * 100) % ships.length]
    return { key: tick - offset, mmsi: 271040000 + ship.id * 1301, lat: (40.9 + (70 - ship.y) * 0.08).toFixed(2), lon: (28 + ship.x * 0.083).toFixed(2), knots: ship.knots.toFixed(1) }
  })
  const pinged = tick % ships.length
  const clock = new Date(Date.UTC(2026, 9, 6, 11, 20, Math.floor(time) % 60)).toISOString().slice(11, 19)

  return (
    <div ref={ref} className="demo demo-sea" aria-hidden="true"><div className="demo-in">
      <header className="sw-top">
        <b className="sw-brand">SEAWATCH</b>
        <span className="sw-clock">{clock} UTC</span>
        <span className="sw-live"><i />{tr ? 'CANLI' : 'LIVE'}</span>
        <span className="sw-counts"><b>{visible}</b> {tr ? 'gemi' : 'ships'} <b className="sw-go">{underway}</b> {tr ? 'seyirde' : 'underway'} <b className="sw-stop">{visible - underway}</b> {tr ? 'demirli' : 'anchored'}</span>
      </header>

      <div className="sw-map">
        <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="sw-grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="rgb(255 255 255 / .04)" strokeWidth=".3" /></pattern>
          </defs>
          <rect width="160" height="100" className="sw-land" />
          <path d={sea} className="sw-sea" />
          <rect width="160" height="100" fill="url(#sw-grid)" />
          <text x="80" y="86" className="sw-label">{tr ? 'T Ü R K İ Y E' : 'T Ü R K I Y E'}</text>
          <text x="74" y="46" className="sw-label sw-label-sea">{tr ? 'Karadeniz' : 'Black Sea'}</text>
          <path d={regionPath} className="sw-region" pathLength={1} style={{ strokeDashoffset: 1 - draw, fillOpacity: filter * 0.16 }} />
          {draw > 0.9 && <text x="106" y="40" className="sw-region-name">{tr ? 'Samsun bölgesi' : 'Samsun region'}</text>}
          {docked.map(({ point: [x, y], shown, inRegion: hit }) => shown && (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={1.6} className="sw-anchor" style={{ opacity: filter > 0 && !hit ? 1 - 0.75 * filter : 1 }} />
          ))}
          {ships.map((ship) => ship.shown && (
            <g key={ship.id} transform={`translate(${ship.x} ${ship.y})`} style={{ opacity: filter > 0 && !ship.inRegion ? 1 - 0.78 * filter : 1 }}>
              {ship.id === ships[pinged].id && <circle r={1} className="sw-ping" key={tick} />}
              <path d="M3 0 -1.9 1.8 -1.1 0 -1.9 -1.8Z" transform={`rotate(${ship.heading})`} className={filter > 0.5 && ship.inRegion ? 'sw-ship sw-ship-hit' : 'sw-ship'} />
            </g>
          ))}
        </svg>
        <div className="sw-sql" data-on={filter > 0.2 || undefined}>
          <code>ST_Within(geom, {tr ? 'bolge' : 'region'})</code>
          <b>{inRegion} {tr ? 'gemi bölgede' : 'ships inside'}</b>
        </div>
        <ol className="sw-log">
          <li className="sw-log-head">event: position · SSE</li>
          {log.map((line, index) => (
            <li key={line.key} style={{ opacity: arrive > 0.2 ? 1 - index * 0.22 : 0 }}>
              <span>{line.mmsi}</span> {line.lat}N {line.lon}E <b>{line.knots} kn</b>
            </li>
          ))}
        </ol>
      </div>

      <aside className="sw-list">
        <p className="sw-list-head">{filter > 0.5 ? (tr ? 'BÖLGEDEKİ GEMİLER' : 'SHIPS IN REGION') : (tr ? 'CANLI LİSTE' : 'LIVE LIST')}</p>
        <ul>
          {listed.map((ship) => (
            <li key={ship.id} style={{ opacity: ship.shown ? 1 : 0.15 }}>
              <b>{names[ship.id % names.length]}</b>
              <span>MMSI {271040000 + ship.id * 1301}</span>
              <em>{ship.knots.toFixed(1)} kn</em>
            </li>
          ))}
        </ul>
      </aside>

      <div className="sw-phone" style={{ opacity: phone, transform: `translateY(${(1 - phone) * 40}%) rotate(${(1 - phone) * 6}deg)` }}>
        <div className="sw-phone-screen">
          <p className="sw-phone-head"><b>SeaWatch</b><span><i />{inRegion}</span></p>
          <svg viewBox="76 36 64 34" preserveAspectRatio="xMidYMid slice" className="sw-phone-map">
            <rect x="76" y="36" width="64" height="34" className="sw-land" />
            <path d={sea} className="sw-sea" />
            <path d={regionPath} className="sw-region sw-region-done" />
            {ships.filter((ship) => ship.inRegion).map((ship) => (
              <path key={ship.id} d="M2.2 0 -1.4 1.3 -.8 0 -1.4 -1.3Z" transform={`translate(${ship.x} ${ship.y}) rotate(${ship.heading})`} className="sw-ship sw-ship-hit" />
            ))}
          </svg>
          <ul>
            {ships.filter((ship) => ship.inRegion).slice(0, 3).map((ship) => (
              <li key={ship.id}><b>{names[ship.id % names.length]}</b><em>{ship.knots.toFixed(1)} kn</em></li>
            ))}
          </ul>
          <span className="sw-sync">{tr ? 'Web ile eş zamanlı ✓' : 'In sync with web ✓'}</span>
        </div>
      </div>
    </div></div>
  )
}

