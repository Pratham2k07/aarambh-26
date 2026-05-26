import React from 'react';

export default function ThemeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-brand-cloud">
      {/* Noise/Grain Overlay */}
      <div className="noise-overlay" />

      {/* Comic Pattern Halftone Backdrop */}
      <div className="absolute inset-0 bg-halftone-black opacity-30 pointer-events-none" />
      
      {/* Abstract comic background shapes */}
      <div className="absolute top-12 left-12 w-64 h-64 bg-brand-pink/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Huge Tilted आरम्भ 26 Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-15deg)',
          zIndex: 0,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          gap: '3vw',
          alignItems: 'baseline',
          opacity: 0.05 /* Increased transparency (lowered opacity) for a subtler watermark */
        }}>
          <span style={{ 
            fontFamily: "'Tiro Devanagari Hindi', serif", 
            fontSize: 'clamp(8rem, 24vw, 22rem)', 
            fontWeight: 700, 
            color: '#030404', 
            textShadow: '8px 8px 0px #FF9A00',
            lineHeight: 0.8
          }}>आरम्भ</span>
          <span style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: 'clamp(8rem, 24vw, 22rem)', 
            fontWeight: 900, 
            color: '#030404', 
            textShadow: '8px 8px 0px #FF9A00',
            lineHeight: 0.8
          }}>26</span>
        </div>
      </div>
    </div>
  );
}
