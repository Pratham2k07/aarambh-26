import React from 'react';

export default function ComicBackground() {
  // Generate symmetrical rays radiating from the exact center (500, 500) inside viewBox="0 0 1000 1000"
  const rayPaths = [];
  const rayCount = 24;
  for (let i = 0; i < rayCount; i++) {
    const angleStart = (i * 360) / rayCount;
    const angleEnd = angleStart + 8; // 8-degree width for rays, leaving a gap
    const radStart = (angleStart * Math.PI) / 180;
    const radEnd = (angleEnd * Math.PI) / 180;
    
    const x1 = 500 + 1200 * Math.cos(radStart);
    const y1 = 500 + 1200 * Math.sin(radStart);
    const x2 = 500 + 1200 * Math.cos(radEnd);
    const y2 = 500 + 1200 * Math.sin(radEnd);
    
    rayPaths.push(
      <path
        key={i}
        d={`M 500 500 L ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} Z`}
        fill="#ffb000"
        opacity="0.08"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#fff8ef] select-none pointer-events-none w-full h-full">
      
      {/* 1. Base Decorative Pattern: Comic Halftone Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "radial-gradient(#030404 2px, transparent 2px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. Soft Vignette Comic Glows (Hot Pink and Royal Blue) */}
      <div className="absolute top-[-300px] left-[-300px] h-[700px] w-[700px] rounded-full bg-[#ff1493] opacity-[0.08] blur-[120px]" />
      <div className="absolute bottom-[-300px] right-[-300px] h-[700px] w-[700px] rounded-full bg-[#1d32ff] opacity-[0.08] blur-[120px]" />

      {/* 3. Sunburst Rays radiating behind the form */}
      <div className="absolute inset-0 w-full h-full opacity-100">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {rayPaths}
        </svg>
      </div>

      {/* 4. High-End SVG Paper Grain Texture Filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] mix-blend-overlay pointer-events-none">
        <defs>
          <filter id="comic-paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#comic-paper-grain)" />
      </svg>

      {/* ========================================================================= */}
      {/* LEFT SIDE SCENERY: Cityscape & "FEST MODE ON" Road Sign (Desktop Only)     */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 left-0 w-[240px] sm:w-[280px] md:w-[320px] xl:w-[380px] h-[340px] xl:h-[400px] hidden lg:block z-10 select-none">
        <svg className="w-full h-full" viewBox="0 0 380 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadows for Buildings */}
          <g fill="#030404">
            <rect x="36" y="106" width="60" height="260" rx="6" /> {/* Tall left building shadow */}
            <rect x="116" y="66" width="85" height="300" rx="6" />  {/* Tall center building shadow */}
            <rect x="226" y="136" width="70" height="230" rx="6" /> {/* Right building shadow */}
          </g>

          {/* Yellow/Orange Accent Building in back-right */}
          <rect x="220" y="130" width="70" height="230" rx="6" fill="#ffb000" stroke="#030404" strokeWidth="4" />
          {/* Custom Windows for Yellow Building */}
          <line x1="255" y1="130" x2="255" y2="360" stroke="#030404" strokeWidth="2.5" strokeDasharray="6 6" />
          <circle cx="238" cy="160" r="6" fill="#030404" />
          <circle cx="272" cy="160" r="6" fill="#030404" />
          <circle cx="238" cy="200" r="6" fill="#030404" />
          <circle cx="272" cy="200" r="6" fill="#030404" />
          <circle cx="238" cy="240" r="6" fill="#030404" />
          <circle cx="272" cy="240" r="6" fill="#030404" />
          <circle cx="238" cy="280" r="6" fill="#030404" />
          <circle cx="272" cy="280" r="6" fill="#030404" />

          {/* Tilted Pink Building on Left */}
          <g transform="rotate(-4, 60, 220)">
            <rect x="30" y="100" width="60" height="260" rx="6" fill="#ff1493" stroke="#030404" strokeWidth="4" />
            {/* Square Windows */}
            <rect x="42" y="125" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="66" y="125" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="42" y="165" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="66" y="165" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="42" y="205" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="66" y="205" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="42" y="245" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="66" y="245" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="42" y="285" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <rect x="66" y="285" width="12" height="18" rx="2" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
          </g>

          {/* Tall Royal Blue Building in Center */}
          <rect x="110" y="60" width="85" height="300" rx="6" fill="#1d32ff" stroke="#030404" strokeWidth="4" />
          {/* Large windows grid */}
          <rect x="125" y="85" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="158" y="85" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="125" y="130" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="158" y="130" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="125" y="175" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="158" y="175" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="125" y="220" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="158" y="220" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="125" y="265" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
          <rect x="158" y="265" width="22" height="28" rx="3" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />

          {/* Organic Comic Bushes/Foliage at the bottom of buildings */}
          <path
            d="M -20 395 C 20 350, 80 340, 110 365 C 130 340, 190 330, 220 365 C 240 345, 290 345, 330 395 Z"
            fill="#ff1493"
            stroke="#030404"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M 10 395 C 40 370, 90 365, 120 385 C 150 365, 210 365, 240 395 Z"
            fill="#1d32ff"
            stroke="#030404"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Road Sign: "FEST MODE ON" (Tilted and detailed) */}
          <g id="fest-mode-sign" transform="translate(190, 240)">
            {/* Pole Shadow */}
            <rect x="39" y="30" width="8" height="95" fill="#030404" />
            {/* Pole */}
            <rect x="36" y="25" width="8" height="95" fill="#030404" />
            <rect x="36" y="25" width="8" height="95" fill="#fff8ef" stroke="#030404" strokeWidth="3" />
            
            {/* Arrow Plate Shadow */}
            <path
              d="M 33 28 L -17 28 L -27 12 L -17 -4 L 93 -4 L 93 28 Z"
              fill="#030404"
              transform="rotate(-8, 30, 12)"
            />
            {/* Arrow Plate */}
            <path
              d="M 30 25 L -20 25 L -30 9 L -20 -7 L 90 -7 L 90 25 Z"
              fill="#1d32ff"
              stroke="#030404"
              strokeWidth="4"
              strokeLinejoin="round"
              transform="rotate(-8, 30, 12)"
            />
            {/* Arrow Inner Details */}
            <path
              d="M 28 20 L -18 20 L -25 9 L -18 -2 L 85 -2 L 85 20 Z"
              fill="none"
              stroke="#ffb000"
              strokeWidth="2.5"
              strokeLinejoin="round"
              transform="rotate(-8, 30, 12)"
            />
            {/* Text: FEST MODE ON */}
            <g transform="rotate(-8, 30, 12)">
              <text
                x="32"
                y="13"
                textAnchor="middle"
                fill="#fff8ef"
                stroke="#030404"
                strokeWidth="2"
                fontWeight="900"
                fontSize="12"
                fontFamily="Impact, Arial Black, sans-serif"
                letterSpacing="0.5"
              >
                FEST MODE ON
              </text>
              <text
                x="32"
                y="13"
                textAnchor="middle"
                fill="#fff8ef"
                fontWeight="900"
                fontSize="12"
                fontFamily="Impact, Arial Black, sans-serif"
                letterSpacing="0.5"
              >
                FEST MODE ON
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE SCENERY: Entrance Gate, Billboard & Road (Desktop Only)       */}
      {/* ========================================================================= */}
      <div className="absolute bottom-0 right-0 w-[260px] sm:w-[300px] md:w-[350px] xl:w-[420px] h-[340px] xl:h-[400px] hidden lg:block z-10 select-none">
        <svg className="w-full h-full" viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Silhouettes of buildings behind gate (shadow style) */}
          <rect x="40" y="120" width="60" height="230" fill="#030404" opacity="0.3" rx="4" />
          <rect x="40" y="120" width="60" height="230" rx="4" stroke="#030404" strokeWidth="4" fill="#ff1493" opacity="0.8" />
          <rect x="310" y="160" width="55" height="190" fill="#030404" opacity="0.3" rx="4" />
          <rect x="310" y="160" width="55" height="190" rx="4" stroke="#030404" strokeWidth="4" fill="#ffb000" opacity="0.8" />

          {/* Sweeping Asphalt Road leading to the gate */}
          <path
            d="M 100 370 Q 150 290 280 290 L 330 350 L 150 375 Z"
            fill="#030404"
          />
          <path
            d="M 90 360 C 140 280, 270 280, 280 280 L 300 280 C 290 280, 160 280, 100 360 Z"
            fill="#ffb000"
            stroke="#030404"
            strokeWidth="2"
          />

          {/* The Festival Gate "AARAMBH'26" */}
          <g id="festival-gate">
            {/* Pillars Shadows */}
            <rect x="115" y="145" width="26" height="210" fill="#030404" rx="4" />
            <rect x="255" y="145" width="26" height="210" fill="#030404" rx="4" />

            {/* Left Pillar */}
            <rect x="110" y="140" width="26" height="210" rx="4" fill="#ffb000" stroke="#030404" strokeWidth="4" />
            <line x1="110" y1="200" x2="136" y2="200" stroke="#030404" strokeWidth="3" />
            <line x1="110" y1="260" x2="136" y2="260" stroke="#030404" strokeWidth="3" />
            
            {/* Right Pillar */}
            <rect x="250" y="140" width="26" height="210" rx="4" fill="#ffb000" stroke="#030404" strokeWidth="4" />
            <line x1="250" y1="200" x2="276" y2="200" stroke="#030404" strokeWidth="3" />
            <line x1="250" y1="260" x2="276" y2="260" stroke="#030404" strokeWidth="3" />

            {/* Pillar Tops */}
            <rect x="103" y="126" width="40" height="14" rx="2" fill="#ff1493" stroke="#030404" strokeWidth="4" />
            <rect x="243" y="126" width="40" height="14" rx="2" fill="#ff1493" stroke="#030404" strokeWidth="4" />

            {/* Blue Crossbeam with bold text: "AARAMBH'26" */}
            {/* Shadow */}
            <rect x="74" y="66" width="238" height="52" fill="#030404" rx="6" />
            {/* Beam */}
            <rect x="70" y="60" width="238" height="52" fill="#1d32ff" stroke="#030404" strokeWidth="4" rx="6" />
            
            {/* Gate Sign Text */}
            <text
              x="189"
              y="94"
              textAnchor="middle"
              fill="#fff8ef"
              stroke="#030404"
              strokeWidth="4"
              fontWeight="900"
              fontSize="22"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="1.5"
            >
              AARAMBH&apos;26
            </text>
            <text
              x="189"
              y="94"
              textAnchor="middle"
              fill="#fff8ef"
              fontWeight="900"
              fontSize="22"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="1.5"
            >
              AARAMBH&apos;26
            </text>

            {/* Hanging Garland Triangles */}
            <path d="M 136 140 Q 193 160 250 140" fill="none" stroke="#030404" strokeWidth="3" />
            <polygon points="152,147 164,150 157,165" fill="#ff1493" stroke="#030404" strokeWidth="2.5" />
            <polygon points="178,153 190,154 183,169" fill="#ffb000" stroke="#030404" strokeWidth="2.5" />
            <polygon points="204,153 216,151 209,167" fill="#fff8ef" stroke="#030404" strokeWidth="2.5" />
            <polygon points="228,148 240,144 233,160" fill="#ff1493" stroke="#030404" strokeWidth="2.5" />
          </g>

          {/* "2026" Billboard (Tilted and extremely comic-styled) */}
          <g id="billboard-2026" transform="translate(290, 45)">
            {/* Steel Frame Stand Shadows */}
            <line x1="42" y1="70" x2="27" y2="160" stroke="#030404" strokeWidth="6" />
            <line x1="72" y1="70" x2="87" y2="160" stroke="#030404" strokeWidth="6" />
            {/* Stand Legs */}
            <line x1="40" y1="65" x2="25" y2="155" stroke="#030404" strokeWidth="4.5" />
            <line x1="70" y1="65" x2="85" y2="155" stroke="#030404" strokeWidth="4.5" />

            {/* Billboard shadow */}
            <rect x="14" y="14" width="90" height="56" fill="#030404" rx="8" />
            {/* Billboard Board */}
            <rect x="10" y="10" width="90" height="56" fill="#fff8ef" stroke="#030404" strokeWidth="4.5" rx="8" />
            
            {/* Pink Header Banner */}
            <path d="M 12 12 L 98 12 L 98 24 L 12 24 Z" fill="#ff1493" stroke="#030404" strokeWidth="2" />
            
            {/* Text: 2026 */}
            <text
              x="55"
              y="51"
              textAnchor="middle"
              fill="#ff1493"
              stroke="#030404"
              strokeWidth="3.5"
              fontWeight="900"
              fontSize="24"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="1"
            >
              2026
            </text>
            <text
              x="55"
              y="51"
              textAnchor="middle"
              fill="#ff1493"
              fontWeight="900"
              fontSize="24"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="1"
            >
              2026
            </text>
          </g>

          {/* Stylized Pink Bush overlaying gate bottom */}
          <path
            d="M 270 395 C 290 355, 330 350, 360 370 C 380 355, 410 365, 430 395 Z"
            fill="#ff1493"
            stroke="#030404"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* TOP AREA: Clouds, Stars, Lightning Bolts & Squiggles (All Viewports)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-x-0 top-0 h-[220px] pointer-events-none select-none z-0">
        
        {/* Left Cloud in Top Corner */}
        <div className="absolute top-4 left-4 sm:left-12 w-[160px] sm:w-[220px] h-[100px]">
          <svg className="w-full h-full" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 20 60 C 10 60, 5 50, 10 40 C 15 25, 40 20, 55 30 C 65 15, 95 10, 115 25 C 135 15, 165 20, 175 35 C 190 40, 190 55, 180 60 Z"
              fill="#fff8ef"
              stroke="#030404"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Shadow line detail */}
            <path
              d="M 25 60 C 40 45, 160 45, 175 60"
              stroke="#1d32ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Right Cloud in Top Corner */}
        <div className="absolute top-6 right-4 sm:right-12 w-[180px] sm:w-[240px] h-[110px]">
          <svg className="w-full h-full" viewBox="0 0 220 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 20 65 C 10 65, 5 55, 10 45 C 15 25, 45 20, 60 30 C 75 10, 110 5, 135 25 C 155 10, 185 15, 195 35 C 210 40, 210 60, 195 65 Z"
              fill="#fff8ef"
              stroke="#030404"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Shadow line detail */}
            <path
              d="M 25 65 C 45 50, 175 50, 190 65"
              stroke="#ff1493"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Scattered Pop-Art Doodles: Lightning Bolts, Spark Bursts, Stars & Squiggles */}
        <svg className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          {/* Lightning Bolt 1 - Top Left-Center */}
          <g transform="translate(280, 30) scale(0.95) rotate(-10)">
            <path d="M 25 5 L 5 45 L 20 45 L 8 75 L 38 35 L 22 35 Z" fill="#030404" />
            <path d="M 22 2 L 2 42 L 17 42 L 5 72 L 35 32 L 19 32 Z" fill="#ffb000" stroke="#030404" strokeWidth="3" strokeLinejoin="round" />
          </g>

          {/* Lightning Bolt 2 - Top Right-Center */}
          <g transform="translate(680, 45) scale(0.85) rotate(15)">
            <path d="M 25 5 L 5 45 L 20 45 L 8 75 L 38 35 L 22 35 Z" fill="#030404" />
            <path d="M 22 2 L 2 42 L 17 42 L 5 72 L 35 32 L 19 32 Z" fill="#ffb000" stroke="#030404" strokeWidth="3" strokeLinejoin="round" />
          </g>

          {/* Comic Spark Burst 1 (Pink) - Floating Near Left Cloud */}
          <g transform="translate(200, 75) rotate(5)">
            <path
              d="M 20 20 L 26 23 L 20 26 L 17 34 L 14 26 L 8 23 L 14 20 L 17 12 Z"
              fill="#ff1493"
              stroke="#030404"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Comic Spark Burst 2 (Blue) - Floating Center Top */}
          <g transform="translate(500, 25) rotate(-15)">
            <path
              d="M 25 25 L 32 29 L 25 33 L 21 43 L 17 33 L 10 29 L 17 25 L 21 15 Z"
              fill="#1d32ff"
              stroke="#030404"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Comic Spark Burst 3 (Yellow) - Floating Near Right Cloud */}
          <g transform="translate(630, 95) rotate(20)">
            <path
              d="M 18 18 L 24 21 L 18 24 L 15 32 L 12 24 L 6 21 L 12 18 L 15 10 Z"
              fill="#ffb000"
              stroke="#030404"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Dotted Halftone Trail Squiggle (Left) */}
          <path
            d="M 80 120 Q 110 110 120 135 T 150 125"
            stroke="#030404"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1 8"
          />

          {/* Playful Doodles: Curls and Squiggles */}
          <path
            d="M 330 90 Q 345 80 340 100 T 360 90"
            fill="none"
            stroke="#1d32ff"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 590 60 Q 600 75 615 65 T 625 80"
            fill="none"
            stroke="#ff1493"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Playful Stars */}
          {/* Star 1 - Left */}
          <path
            d="M 50 15 L 53 23 L 61 24 L 55 30 L 57 38 L 50 33 L 43 38 L 45 30 L 39 24 L 47 23 Z"
            fill="#ffb000"
            stroke="#030404"
            strokeWidth="2.5"
          />
          {/* Star 2 - Right */}
          <path
            d="M 800 20 L 803 27 L 811 28 L 805 34 L 807 42 L 800 37 L 793 42 L 795 34 L 789 28 L 797 27 Z"
            fill="#ff1493"
            stroke="#030404"
            strokeWidth="2.5"
            transform="rotate(12, 800, 30)"
          />
          {/* Star 3 - Center Right */}
          <path
            d="M 430 70 L 432 75 L 438 76 L 434 81 L 435 87 L 430 83 L 425 87 L 426 81 L 422 76 L 428 75 Z"
            fill="#fff8ef"
            stroke="#030404"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Decorative solid outline borders on extreme left/right of viewport (adds comic book border style) */}
      <div className="absolute inset-y-0 left-0 w-2.5 bg-[#030404] hidden xl:block" />
      <div className="absolute inset-y-0 right-0 w-2.5 bg-[#030404] hidden xl:block" />
      
    </div>
  );
}
