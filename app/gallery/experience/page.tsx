'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'
import ThemeBackground from '@/components/layout/ThemeBackground'

function TornPaperDivider({ color = "#F5F1E5", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] select-none pointer-events-none ${flip ? 'rotate-180' : ''}`} style={{ background: '#030404' }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px]" style={{ display: 'block', width: '100%', fill: color }}>
        <path d="M0,0 L30,40 L60,10 L95,50 L130,20 L165,60 L200,30 L240,70 L280,30 L320,80 L360,40 L400,90 L440,50 L480,95 L520,60 L560,100 L600,45 L640,110 L680,50 L720,95 L760,40 L800,90 L840,30 L880,80 L920,40 L960,105 L1000,55 L1040,90 L1080,35 L1120,70 L1160,20 L1200,80 L1200,120 L0,120 Z" />
      </svg>
    </div>
  )
}


// ── Photos ──────────────────────────────
interface Photo {
  id:    number
  src:   string
  label: string
}

// Generate an array of working placeholder photos so there are no broken images
const PHOTOS: Photo[] = [
  {
    "id": 1,
    "src": "/photos/web/MCS00113.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 2,
    "src": "/photos/web/MCS00486.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 3,
    "src": "/photos/web/MCS00734.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 4,
    "src": "/photos/web/MCS01361.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 5,
    "src": "/photos/web/MCS01446.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 6,
    "src": "/photos/web/MCS01565.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 7,
    "src": "/photos/web/MCS01588.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 8,
    "src": "/photos/web/MCS02341.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 9,
    "src": "/photos/web/MCS02351.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 10,
    "src": "/photos/web/MCS02401.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 11,
    "src": "/photos/web/MCS02551.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 12,
    "src": "/photos/web/MCS02708.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 13,
    "src": "/photos/web/MCS02747.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 14,
    "src": "/photos/web/MCS03220.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 15,
    "src": "/photos/web/MCS03237.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 16,
    "src": "/photos/web/MCS03264.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 17,
    "src": "/photos/web/MCS03277.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 18,
    "src": "/photos/web/MCS03308.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 19,
    "src": "/photos/web/MCS03352.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 20,
    "src": "/photos/web/MCS03543.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 21,
    "src": "/photos/web/MCS03615.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 22,
    "src": "/photos/web/MCS03804.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 23,
    "src": "/photos/web/MCS03882.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 24,
    "src": "/photos/web/MCS04202.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 25,
    "src": "/photos/web/MCS04213.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 26,
    "src": "/photos/web/MCS04257.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 27,
    "src": "/photos/web/MCS04925.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 28,
    "src": "/photos/web/MCS05021.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 29,
    "src": "/photos/web/MCS05036.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 30,
    "src": "/photos/web/MCS05143.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 31,
    "src": "/photos/web/MCS05159.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 32,
    "src": "/photos/web/MCS05177.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 33,
    "src": "/photos/web/MCS05226.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 34,
    "src": "/photos/web/MCS05230.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 35,
    "src": "/photos/web/MCS05344.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 36,
    "src": "/photos/web/MCS05389.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 37,
    "src": "/photos/web/MCS05430.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 38,
    "src": "/photos/web/MCS05432.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 39,
    "src": "/photos/web/MCS05434.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 40,
    "src": "/photos/web/MCS05448.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 41,
    "src": "/photos/web/MCS05466.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 42,
    "src": "/photos/web/MCS05527.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 43,
    "src": "/photos/web/MCS05585.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 44,
    "src": "/photos/web/MCS05620.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 45,
    "src": "/photos/web/MCS05702.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 46,
    "src": "/photos/web/MCS05747.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 47,
    "src": "/photos/web/MCS05754.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 48,
    "src": "/photos/web/MCS05788.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 49,
    "src": "/photos/web/MCS05795.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 50,
    "src": "/photos/web/MCS05807.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 51,
    "src": "/photos/web/1.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 52,
    "src": "/photos/web/2.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 53,
    "src": "/photos/web/3.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 54,
    "src": "/photos/web/4.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 55,
    "src": "/photos/web/5.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 56,
    "src": "/photos/web/6.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 57,
    "src": "/photos/web/7.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 58,
    "src": "/photos/web/8.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 59,
    "src": "/photos/web/9.webp",
    "label": "Aarambh 26 Moment"
  }
];

// Duplicate photos for smooth marquee scrolling
const MARQUEE_1 = [...PHOTOS.slice(0, 15), ...PHOTOS.slice(0, 15)]
const MARQUEE_2 = [...PHOTOS.slice(15, 30), ...PHOTOS.slice(15, 30)]



// A wider 12-point perimeter. We push the positions out past 0/100% 
// so that when perspective shrinks them towards the center, they actually fill the screen!
const WALL_POSITIONS = [
  // TOP
  { left: '10%',  top: '-10%' },
  { left: '36%',  top: '-10%' },
  { left: '62%',  top: '-10%' },
  { left: '90%',  top: '-10%' },
  // RIGHT
  { left: '110%', top: '15%'  },
  { left: '110%', top: '40%'  },
  { left: '110%', top: '65%'  },
  { left: '110%', top: '90%'  },
  // BOTTOM
  { left: '90%',  top: '110%' },
  { left: '62%',  top: '110%' },
  { left: '36%',  top: '110%' },
  { left: '10%',  top: '110%' },
  // LEFT
  { left: '-10%', top: '90%'  },
  { left: '-10%', top: '65%'  },
  { left: '-10%', top: '40%'  },
  { left: '-10%', top: '15%'  },
]

const SPEED_MAP = { slow: 2.5, normal: 4.5, fast: 8.0 }
const CARD_COUNT = 32
const BASE_Z_FAR = -5120
const BASE_Z_STEP = 160



// ── Main component ───────────────────────
export default function GalleryPage() {
  // ── State ──────────────────────────────
  const [lightboxId, setLightboxId] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const [tunnelOpen, setTunnelOpen] = useState(true)
  const [tunnelActive, setTunnelActive] = useState(true)

  const tunnelRef = useRef<HTMLDivElement>(null)
  const animRef  = useRef<number | null>(null)
  const zOffsetRef = useRef(0)
  const targetZOffsetRef = useRef(0)
  // Build tunnel cards ONCE when tunnel opens
  useEffect(() => {
    if (!tunnelOpen || !tunnelRef.current) {
      return
    }

    const scene = tunnelRef.current
    scene.innerHTML = ''
    zOffsetRef.current = 0

    // Create cards
    for (let i = 0; i < CARD_COUNT; i++) {
      // Reverted to sequential indexing for the smooth circular tunnel effect
      const wallIdx = i % WALL_POSITIONS.length
      const baseZ = BASE_Z_FAR + (i * BASE_Z_STEP)
      const photoIdx = i % PHOTOS.length
      const photo = PHOTOS[photoIdx]

      const card = document.createElement('div')
      card.className = 'tunnel-card'

      // Store hover targets in dataset for the tick loop to read
      card.dataset.hoverScale = "1"
      card.onmouseenter = () => {
        card.dataset.hoverScale = "1.08"
        card.style.boxShadow = '0 16px 48px rgba(26,155,142,0.40), 0 0 0 2px rgba(26,155,142,0.50), 0 0 20px rgba(244,162,61,0.20)'
      }
      card.onmouseleave = () => {
        card.dataset.hoverScale = "1"
        card.style.boxShadow = '' // Revert to CSS default
      }

      // Store data for animation loop
      card.dataset.baseZ = String(baseZ)
      card.dataset.wallIdx = String(wallIdx)
      card.dataset.photoIdx = String(photoIdx)
      
      card.style.left = '50%'
      card.style.top = '50%'
      
      // Create image
      const img = document.createElement('img')
      
      // Fix Lag: Force Next.js to dynamically compress the massive 20MB raw photos to ~50KB webp!
      img.src = photo.src
      img.alt = photo.label
      img.loading = 'lazy'
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;'
      img.onerror = () => {
        card.style.background = '#1a1a1a'
      }

      card.appendChild(img)
      // Click to open lightbox
      card.addEventListener('click', () => {
        setLightboxId(PHOTOS[photoIdx].id)
      })

      scene.appendChild(card)
    }

    return () => {
      if (tunnelRef.current) {
        tunnelRef.current.innerHTML = ''
      }
    }
  }, [tunnelOpen])

  // THE ANIMATION LOOP — 100% RELIABLE 2D PROJECTION RADIAL SPIRAL TUNNEL
  useEffect(() => {
    if (!tunnelOpen) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
      return
    }

    const tick = () => {
      try {
        // Smooth lerp towards target scroll offset (allows scroll wheel to add/subtract smoothly)
        const diff = targetZOffsetRef.current - zOffsetRef.current
        zOffsetRef.current += diff * 0.08

        const cards = tunnelRef.current?.querySelectorAll<HTMLElement>('.tunnel-card')
        
        // Update diagnostics panel
        const debugDiv = document.getElementById('tunnel-debug')
        if (debugDiv) {
          debugDiv.innerText = `Target Z: ${targetZOffsetRef.current.toFixed(1)} | Offset Z: ${zOffsetRef.current.toFixed(1)} | Cards: ${cards ? cards.length : 0}`
        }

        if (!cards || cards.length === 0) {
          animRef.current = requestAnimationFrame(tick)
          return
        }

        cards.forEach((card) => {
          const rawBaseZ = card.dataset.baseZ
          const baseZ = rawBaseZ ? parseFloat(rawBaseZ) : 0
          if (isNaN(baseZ)) return
          
          let z = baseZ + zOffsetRef.current

          // When card passes viewer, wrap around to far end
          if (z > 300) {
            const newBaseZ = baseZ - (CARD_COUNT * BASE_Z_STEP)
            card.dataset.baseZ = String(newBaseZ)
            z = newBaseZ + zOffsetRef.current
            
            // Cycle wall position
            const oldWallPos = parseInt(card.dataset.wallIdx || '0')
            const newWallPos = (oldWallPos + 3) % WALL_POSITIONS.length
            card.dataset.wallIdx = String(newWallPos)

            // Randomly select next photo to prevent recognizable repeating patterns!
            if (PHOTOS.length > 0) {
              const currentlyUsed = new Set(
                Array.from(tunnelRef.current?.querySelectorAll('[data-photo-idx]') || [])
                  .map(c => parseInt((c as HTMLElement).dataset.photoIdx || '-1'))
              )
              let available = Array.from({length: PHOTOS.length}, (_, i) => i).filter(i => !currentlyUsed.has(i))
              if (available.length === 0) available = Array.from({length: PHOTOS.length}, (_, i) => i)
              const newPhotoIdx = available[Math.floor(Math.random() * available.length)]
              card.dataset.photoIdx = String(newPhotoIdx)
              const img = card.querySelector('img') as HTMLImageElement | null
              if (img && PHOTOS[newPhotoIdx]) {
                img.src = PHOTOS[newPhotoIdx].src
                img.alt = PHOTOS[newPhotoIdx].label
              }
            }
          } else if (z < BASE_Z_FAR - 100) {
            // When scrolling backwards, wrap cards from far back to front
            const newBaseZ = baseZ + (CARD_COUNT * BASE_Z_STEP)
            card.dataset.baseZ = String(newBaseZ)
            z = newBaseZ + zOffsetRef.current
            
            const oldWallPos = parseInt(card.dataset.wallIdx || '0')
            const newWallPos = (oldWallPos - 3 + WALL_POSITIONS.length) % WALL_POSITIONS.length
            card.dataset.wallIdx = String(newWallPos)

            if (PHOTOS.length > 0) {
              const currentlyUsed = new Set(
                Array.from(tunnelRef.current?.querySelectorAll('[data-photo-idx]') || [])
                  .map(c => parseInt((c as HTMLElement).dataset.photoIdx || '-1'))
              )
              let available = Array.from({length: PHOTOS.length}, (_, i) => i).filter(i => !currentlyUsed.has(i))
              if (available.length === 0) available = Array.from({length: PHOTOS.length}, (_, i) => i)
              const newPhotoIdx = available[Math.floor(Math.random() * available.length)]
              card.dataset.photoIdx = String(newPhotoIdx)
              const img = card.querySelector('img') as HTMLImageElement | null
              if (img && PHOTOS[newPhotoIdx]) {
                img.src = PHOTOS[newPhotoIdx].src
                img.alt = PHOTOS[newPhotoIdx].label
              }
            }
          }

          // --- PERFECT FUNNEL EFFECT (2D PROJECTION) ---
          const wallPos = WALL_POSITIONS[parseInt(card.dataset.wallIdx || '0')]
          
          // depthFactor: 0 at far end (z=-3600), 1 at near end (z=0)
          const depthFactor = Math.max(0, Math.min(1, (z + 3600) / 3600))
          
          // Use an exponential curve (power of 3) so they stay on the outer edges longer,
          // and only dive into the center at the very last second. This prevents clumping!
          const easeInCubic = Math.pow(depthFactor, 3)
          
          const startLeft = parseFloat(wallPos.left)
          const startTop = parseFloat(wallPos.top)
          
          // Interpolate from edge towards center (Left 50%, Top 55% to accommodate Navbar)
          const currentLeft = startLeft + (50 - startLeft) * easeInCubic
          const currentTop = startTop + (55 - startTop) * easeInCubic
          
          card.style.left = `${currentLeft}%`
          card.style.top = `${currentTop}%`

          // Scale size based on Z depth
          const scale = 800 / (800 - z)

          // Read hover offsets
          const hS = parseFloat(card.dataset.hoverScale || "1")

          // Apply 2D scale (NO translateZ) to prevent CSS perspective from overriding our exact coordinates
          card.style.transform = `translate(-50%, -50%) scale(${scale * hS})`
          card.style.zIndex = String(Math.round(z + 3000))

          // Calculate opacity based on depth
          let opacity = 0.02
          if (z < -3600) {
            opacity = 0.12
          } else if (z < -1600) {
            opacity = 0.12 + ((z + 3600) / 2000) * 0.65
          } else if (z < -400) {
            opacity = 0.77 + ((z + 1600) / 1200) * 0.23
          } else if (z < 200) {
            // Keep at 100% visibility in the center (Fixes "blurred" fade out)
            opacity = 1
          } else {
            opacity = 0
          }

          card.style.opacity = String(Math.max(0, Math.min(1, opacity)))
        })

        // Continue loop
        animRef.current = requestAnimationFrame(tick)

      } catch (err: any) {
        const debugDiv = document.getElementById('tunnel-debug')
        if (debugDiv) {
          debugDiv.style.border = '2px solid red'
          debugDiv.style.color = 'red'
          debugDiv.innerText = `ERR: ${err.message || err}`
        }
      }
    }

    // Start the loop
    animRef.current = requestAnimationFrame(tick)

    // Cleanup
    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current)
        animRef.current = null
      }
    }
  }, [tunnelOpen])

  // Handle Escape key (closes lightbox first, then scrolls back up)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxId !== null) {
          setLightboxId(null)
        } else if (window.scrollY > 50) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxId])

  // Lock page scroll & drive animation via wheel & touch
  useEffect(() => {
    // Prevent body from scrolling so the page never shifts
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      targetZOffsetRef.current += e.deltaY * 2.0
    }

    // Mobile Swipe Support
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      targetZOffsetRef.current += deltaY * 3.5 // Boost sensitivity for mobile
      touchStartY = touchY
    }

    // Must be non-passive so preventDefault works
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  // ── 3D TILT via event delegation — ONE useEffect, no hooks per tile ──
  // Removed JS 3D Tilt for smoother CSS transitions

  // ── Keyboard handler for lightbox ──
  const currentIdx = lightboxId !== null
    ? PHOTOS.findIndex(p => p.id === lightboxId) : -1
  const currentPhoto = currentIdx >= 0 ? PHOTOS[currentIdx] : null



  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `


/* PAGE BASE */
.gp-root {
  background: #030404;
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  overflow-x: hidden;
  z-index: 10;
}

/* SECTION 1: HERO GRID CONTAINER */
.hero-grid-container {
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 10;
  background: #030404;
  overflow: hidden;
}

/* SECTION 2: MEMORIES CONTAINER (CIRCULAR TUNNEL) */
.gp-memories-section {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background: radial-gradient(circle at 50% 44%, #2F0416 0%, #030404 80%);
  overflow: hidden;
}

.gp-memories-heading {
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  text-align: center;
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  font-family: var(--font-display, sans-serif);
  text-shadow: 0 0 20px rgba(255, 24, 140, 0.4);
}

/* GHOST TEXT BEHIND GRID */
.ghost-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  user-select: none;
  opacity: 0.2;
}
.ghost-row {
  white-space: nowrap;
  font-size: clamp(5rem, 15vw, 16rem);
  font-weight: 900;
  line-height: 0.9;
  color: rgba(255, 24, 140, 0.08);
  letter-spacing: -0.02em;
}
.ghost-row-1 { animation: ghostLeft 40s linear infinite; }
.ghost-row-2 { animation: ghostRight 40s linear infinite; }

@keyframes ghostLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes ghostRight {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

@keyframes tunnelGlowPulse {
  0%, 100% {
    opacity: 0.65;
    transform: translate(-50%, -50%) scale(1.0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.25);
  }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) translateX(var(--px, 0));
    opacity: 0;
  }
  10% {
    opacity: 0.15;
  }
  90% {
    opacity: 0.15;
  }
  100% {
    transform: translateY(-100vh) translateX(var(--px, 0));
    opacity: 0;
  }
}

.dust-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #FF188C;
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  animation: particleFloat linear infinite;
}

/* THE GRID */
.gp-grid {
  position: absolute;
  top: -10vh; bottom: -10vh;
  left: -10vw; right: -10vw;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 16px;
  padding: 0;
  transform-style: preserve-3d;
  transition: transform 0.4s ease-out;
  transform: perspective(1200px) scale(1.02);
  z-index: 1;
}

/* TILE STYLE - Grid cell wrapper */
.gp-tile {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform, opacity;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out;
}

/* INNER CARD - Handles hover and shutters */
.gp-tile-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background: #030404;
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.05), 
    inset 0 -6px 10px rgba(0,0,0,0.8),
    0 8px 16px rgba(0,0,0,0.6);
  cursor: pointer;
  will-change: transform, box-shadow;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  overflow: hidden;
}

.gp-tile-card:hover {
  transform: perspective(600px) scale(1.05) translateZ(8px);
  z-index: 10;
  box-shadow: 
    inset 0 2px 5px rgba(255,255,255,0.3),
    inset 0 -5px 15px rgba(0,0,0,0.8),
    0 15px 30px rgba(0,0,0,0.7),
    0 0 0 2px rgba(255, 24, 140, 0.4);
}

.gp-tile-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.8;
  transform: scale(1.10);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  z-index: 1;
  border-radius: 18px;
}

.gp-tile-card:hover .gp-tile-img {
  opacity: 1;
  transform: scale(1.0);
}

.gp-tile-tint {
  position: absolute;
  inset: 0;
  background: rgba(255, 24, 140, 0.12);
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 18px;
}
.gp-tile-card:hover .gp-tile-tint {
  opacity: 1;
}

/* Shutter doors styling */
.gp-tile-shutter {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: #09090b;
  background-image: radial-gradient(rgba(255, 24, 140, 0.15) 1.5px, transparent 1.5px);
  background-size: 14px 14px;
  z-index: 5;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  border: 1px solid rgba(255, 24, 140, 0.1);
  box-sizing: border-box;
}
.gp-tile-shutter-left {
  left: 0;
  border-right: 1.5px solid rgba(255, 24, 140, 0.4);
}
.gp-tile-shutter-right {
  right: 0;
  border-left: 1.5px solid rgba(255, 24, 140, 0.4);
}

.shutter-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #030404;
  border: 1px solid rgba(255, 154, 0, 0.5);
  box-shadow: 0 0 8px rgba(255, 154, 0, 0.3);
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.gp-tile-card:hover .gp-tile-shutter-left {
  transform: translateX(-100%);
}
.gp-tile-card:hover .gp-tile-shutter-right {
  transform: translateX(100%);
}
.gp-tile-card:hover .shutter-badge {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
}

/* CENTER LOGO OVERLAY */
.gp-center-overlay {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 20;
  pointer-events: none;
}

.cc-logo {
  display: flex;
  align-items: baseline;
  gap: 8px;
  position: relative;
  text-shadow: 0 10px 30px rgba(0,0,0,0.9);
}
.cc-logo::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 200px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}
.cc-hindi {
  font-size: clamp(4rem, 8vw, 7rem);
  color: #FF188C;
  line-height: 1;
  font-family: var(--font-devanagari, serif);
  font-weight: 700;
}
.cc-year {
  font-size: clamp(4rem, 8vw, 7rem);
  color: #FF9A00;
  font-weight: 800;
  line-height: 1;
  font-family: var(--font-display, sans-serif);
}

.cc-btn {
  pointer-events: auto;
  font-size: 13px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.95);
  background: #FF188C;
  border: none;
  border-radius: 999px;
  padding: 16px 40px;
  cursor: pointer;
  font-family: var(--font-sans, sans-serif);
  font-weight: 800;
  transition: all 0.2s ease;
  box-shadow: 0 10px 30px rgba(255,24,140,0.4);
  margin-top: 20px;
}
.cc-btn:hover {
  background: #E0107A;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(224, 16, 122, 0.6);
}

/* ACCORDION GALLERY SECTION */
.gp-accordion-section {
  background: #030404;
  padding: 120px 20px;
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.gp-accordion-heading {
  text-align: center;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1;
  font-family: var(--font-display, sans-serif);
  margin: 0 0 60px 0;
  text-shadow: 0 0 20px rgba(255, 24, 140, 0.4);
}

.accordion-container {
  display: flex;
  gap: 16px;
  height: 60vh;
  min-height: 400px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .accordion-container {
    flex-direction: column;
    height: 80vh;
  }
}

.accordion-card {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: flex 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border: 2px solid transparent;
}
.accordion-card:hover {
  flex: 5;
  box-shadow: 0 20px 50px rgba(255, 24, 140, 0.3);
  border-color: #FF188C;
}

.accordion-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.accordion-card:hover img {
  transform: scale(1.05);
}

.accordion-card-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 60px 20px 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: var(--font-sans, sans-serif);
  font-weight: 800;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  white-space: nowrap;
}
.accordion-card:hover .accordion-card-label {
  opacity: 1;
  transform: translateY(0);
}

/* LIGHTBOX */
.gp-lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0,0,0,0.95);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.gp-lb-img {
  max-width: 86vw;
  max-height: 82vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.8);
}
.gp-lb-close {
  position: fixed;
  top: 24px; right: 30px;
  font-size: 2.5rem;
  line-height: 1;
  color: rgba(255,255,255,0.6);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 100000;
}
.gp-lb-close:hover { color: #C0580A; }
.gp-lb-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 56px; height: 56px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.15);
  background: rgba(0,0,0,0.4);
  color: rgba(255,255,255,0.7);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
  z-index: 100000;
}
.gp-lb-arrow:hover { 
  border-color: #C0580A; 
  color: #ffffff; 
  background: #C0580A;
}
.gp-lb-prev { left: 24px; }
.gp-lb-next { right: 24px; }

/* ── TUNNEL AARAMBH INLINE SECTION CSS ── */
.tunnel-right {
  width: 100vw;
  height: 100vh;
  position: relative;
  perspective: 800px;
  perspective-origin: 50% 50%;
  overflow: hidden;
  background: transparent;
}

.tunnel-card {
  position: absolute;
  width: clamp(160px, 20vw, 300px);
  aspect-ratio: 3 / 2;
  border-radius: 8px;
  overflow: hidden;
  will-change: transform, opacity;
  transform-style: preserve-3d;
  cursor: pointer;
  opacity: 0.15;
  box-shadow: 0 8px 32px rgba(0,0,0,0.85), 0 0 0 1px rgba(255, 24, 140, 0.25);
  transition: box-shadow 0.25s ease, opacity 0.25s ease;
}

.tunnel-card:hover {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(255, 24, 140, 0.60), 0 0 20px rgba(255, 154, 0, 0.30);
}

.tunnel-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 4;
}

/* Intro Card Styling */
.tunnel-intro-card {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 90%;
  max-width: 320px;
  background: rgba(3, 4, 4, 0.90);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 24, 140, 0.45);
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255, 24, 140, 0.15);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.intro-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #FF9A00;
  margin: 0 0 12px 0;
}

.intro-heading {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 900;
  line-height: 1.2;
  color: #FFFFFF;
  margin: 0 0 16px 0;
  text-transform: uppercase;
}

.intro-heading-glow {
  color: #FF188C;
  text-shadow: 0 0 10px rgba(255, 24, 140, 0.5);
}

.intro-divider {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #FF188C 0%, #FF9A00 100%);
  border-radius: 99px;
  margin-bottom: 20px;
}

.intro-description {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 24px 0;
  font-weight: 400;
}

.intro-btn {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #FF188C;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 30px;
  padding: 12px 28px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(255, 24, 140, 0.4);
  transition: all 0.2s ease-out;
}

.intro-btn:hover {
  background: #E0107A;
  color: #FFFFFF;
  box-shadow: 0 8px 25px rgba(224, 16, 122, 0.6);
  transform: translateY(-2px);
}

.intro-btn:active {
  transform: translateY(1px);
}

/* Floating Controls Pill Styling */
.tunnel-controls-pill {
  position: absolute;
  top: 110px;
  right: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(3, 4, 4, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 24, 140, 0.35);
}

.tunnel-exit-btn {
  position: absolute;
  top: 110px;
  left: 24px;
  z-index: 20;
}
  border-radius: 999px;
  padding: 6px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255, 24, 140, 0.1);
  transition: all 0.3s ease;
}

.controls-speeds {
  display: flex;
  gap: 4px;
}

.speed-btn {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 999px;
  transition: all 0.2s ease;
  font-family: var(--font-display);
}

.speed-btn:hover {
  color: #FFFFFF;
}

.speed-btn--active {
  color: #030404 !important;
  background: #FF188C;
}

.controls-divider {
  width: 1px;
  height: 16px;
  background: rgba(255, 255, 255, 0.25);
}

.controls-exit-btn {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #FF9A00;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 999px;
  transition: all 0.2s ease;
  font-family: var(--font-display);
}

.controls-exit-btn:hover {
  background: rgba(255, 154, 0, 0.15);
  color: #F5F1E5;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .marquee-card {
    width: 320px;
    height: 220px;
  }
}
@media (max-width: 768px) {
  .gp-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(12, 1fr);
    gap: 12px;
  }
  .gp-tile {
    border-radius: 12px;
  }
  .cc-hindi, .cc-year { font-size: 3.5rem; }
  .marquee-card {
    width: 260px;
    height: 180px;
  }
  .tunnel-right {
    height: 100vh !important;
  }
  .tunnel-card {
    width: clamp(100px, 20vw, 220px) !important;
  }
  .tunnel-intro-card {
    padding: 30px 24px;
    width: 85%;
  }
  .tunnel-controls-pill {
    display: none !important; /* Hide on mobile to save space */
  }
  .tunnel-exit-btn {
    top: 90px;
    left: 50%;
    transform: translateX(-50%);
  }
}
` }} />

      <div className="gp-root">

        {/* SECTION 2: MEMORIES CONTAINER — FIXED FULLSCREEN TUNNEL */}
        <motion.div 
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            background: '#F5F1E5', // Cream theme background
            overflow: 'hidden',
          }}
          id="gp-memories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >

          <div className="tunnel-right" style={{ position: 'absolute', inset: 0 }}>
            {/* Background Theme */}
            <ThemeBackground />

            {/* Debug Panel - Hidden by default to make room for Exit button */}
            <div id="tunnel-debug" style={{
              display: 'none',
              position: 'absolute',
              top: '110px',
              left: '40px',
              background: 'rgba(245, 241, 229, 0.6)',
              color: 'rgba(3, 4, 4, 0.7)',
              fontFamily: 'monospace',
              fontSize: '10px',
              padding: '6px 12px',
              borderRadius: '4px',
              zIndex: 20,
              pointerEvents: 'none',
            }}>Initializing debug...</div>

            {/* Scene where cards render */}
            <div ref={tunnelRef} style={{
              position: 'absolute',
              inset: 0,
              transformStyle: 'preserve-3d',
              zIndex: 10,
            }} />

            {/* Left Side: EXIT THE MAGIC button */}
            <button 
              onClick={() => { window.location.href = '/gallery' }}
              className="tunnel-exit-btn"
              style={{ 
                background: '#030404', 
                border: '1px solid rgba(255,154,0,0.5)', 
                padding: '12px 24px',
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255,154,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,154,0,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,154,0,0.1)'
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: '10px', color: '#FF9A00', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                Exit the magic
              </span>
            </button>

            {/* Right Side: Floating Control Pill (Scroll indicator only now) */}
            <div className="tunnel-controls-pill" style={{ background: '#030404', border: '1px solid rgba(255,154,0,0.3)', zIndex: 20 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: '9px', color: '#F5F1E5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                Scroll to explore
              </span>
            </div>

            {/* Vignette behind photos */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(245, 241, 229, 0.70) 70%, rgba(245, 241, 229, 1) 100%)',
              pointerEvents: 'none',
              zIndex: 5,
            }} />

            {/* Top fade */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to bottom, rgba(245, 241, 229, 1), transparent)',
              pointerEvents: 'none',
              zIndex: 5,
            }} />

            {/* Bottom fade */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(to top, rgba(245, 241, 229, 1), transparent)',
              pointerEvents: 'none',
              zIndex: 5,
            }} />

            {/* Escape hint */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              zIndex: 5,
              pointerEvents: 'none',
              fontFamily: "var(--font-display)",
              fontSize: '10px',
              color: 'rgba(3, 4, 4, 0.5)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 800
            }}>
              Scroll up or ESC to return
            </div>

          </div>
        </motion.div>


        {/* ════════════════════════════════
            LIGHTBOX
        ════════════════════════════════ */}
        <AnimatePresence>
          {lightboxId !== null && currentPhoto && (
            <motion.div
              className="gp-lb-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setLightboxId(null)}
            >
              <motion.img
                key={currentPhoto.id}
                className="gp-lb-img"
                src={currentPhoto.src}
                alt={currentPhoto.label}
                initial={{ scale: 0.86, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.86, opacity: 0 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                onClick={e => e.stopPropagation()}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />

              <button className="gp-lb-close" onClick={() => setLightboxId(null)}>×</button>

              {currentIdx > 0 && (
                <button className="gp-lb-arrow gp-lb-prev"
                  onClick={e => {
                    e.stopPropagation()
                    setLightboxId(PHOTOS[currentIdx - 1].id)
                  }}>‹</button>
              )}
              {currentIdx < PHOTOS.length - 1 && (
                <button className="gp-lb-arrow gp-lb-next"
                  onClick={e => {
                    e.stopPropagation()
                    setLightboxId(PHOTOS[currentIdx + 1].id)
                  }}>›</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  )
}
