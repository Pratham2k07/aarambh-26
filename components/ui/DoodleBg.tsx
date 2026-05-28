"use client";

import React from "react";

/* ── Seeded PRNG (mulberry32) for consistent random layout across renders ── */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Shared SVG props ── */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ── 130 unique college-themed SVG icon components ── */
const icons: (() => React.ReactElement)[] = [
  // 1 – Stacked textbooks
  () => <svg viewBox="0 0 50 40" {...P}><rect x="5" y="22" width="40" height="6" rx="1"/><rect x="3" y="15" width="42" height="6" rx="1"/><rect x="6" y="8" width="38" height="6" rx="1"/><path d="M42,8 L46,3 M42,14 L46,3"/></svg>,
  // 2 – Graduation cap
  () => <svg viewBox="0 0 50 40" {...P}><path d="M5,16 L25,8 L45,16 L25,24Z"/><path d="M14,20v10c0,4 22,4 22,0v-10"/><path d="M42,16v12"/><circle cx="42" cy="29" r="1.2"/></svg>,
  // 3 – Erlenmeyer flask
  () => <svg viewBox="0 0 40 50" {...P}><path d="M15,8h10"/><line x1="17" y1="8" x2="17" y2="20"/><line x1="23" y1="8" x2="23" y2="20"/><path d="M17,20 L8,40c-2,4 4,7 12,7s14-3 12-7L23,20"/><circle cx="16" cy="36" r="1.5"/><circle cx="24" cy="38" r="1"/></svg>,
  // 4 – Test tube
  () => <svg viewBox="0 0 20 50" {...P}><path d="M6,5h8"/><path d="M7,5v30c0,6 6,6 6,0V5"/><path d="M7,28h6"/></svg>,
  // 5 – Microscope
  () => <svg viewBox="0 0 40 50" {...P}><path d="M20,8 L20,28"/><circle cx="20" cy="32" r="4"/><path d="M16,36 L10,44h20l-6-8"/><path d="M8,44h24"/><path d="M20,8c4-4 12,0 8,6"/><path d="M14,18h12"/></svg>,
  // 6 – Laptop
  () => <svg viewBox="0 0 50 38" {...P}><path d="M8,6h34v22H8z"/><path d="M4,28h42l-3,6H7z"/><path d="M12,12h10 M12,16h16 M12,20h8"/></svg>,
  // 7 – Desktop monitor
  () => <svg viewBox="0 0 50 45" {...P}><rect x="5" y="3" width="40" height="28" rx="2"/><line x1="25" y1="31" x2="25" y2="38"/><line x1="15" y1="38" x2="35" y2="38"/><circle cx="38" cy="8" r="1.5" fill="currentColor"/></svg>,
  // 8 – Backpack
  () => <svg viewBox="0 0 40 50" {...P}><path d="M8,15v27c0,3 4,5 12,5s12-2 12-5V15c0-5-24-5-24,0z"/><path d="M14,10v-4c0-3 12-3 12,0v4"/><rect x="12" y="26" width="16" height="10" rx="2"/></svg>,
  // 9 – Pencil
  () => <svg viewBox="0 0 12 50" {...P}><rect x="2" y="10" width="8" height="28" rx="1"/><path d="M2,38 L6,46 L10,38"/><path d="M2,10 L6,5 L10,10"/></svg>,
  // 10 – Fountain pen
  () => <svg viewBox="0 0 14 50" {...P}><path d="M4,8h6v28H4z"/><path d="M5,36 L7,46 L9,36"/><path d="M3,8 L7,3 L11,8"/><path d="M4,16h6 M4,22h6"/></svg>,
  // 11 – Eraser
  () => <svg viewBox="0 0 40 25" {...P}><path d="M8,20 L4,10h28l4,10z"/><path d="M12,10v10"/><path d="M4,10 L10,4h20l6,6"/></svg>,
  // 12 – Ruler
  () => <svg viewBox="0 0 12 50" {...P}><rect x="1" y="2" width="10" height="46" rx="1"/><line x1="1" y1="10" x2="5" y2="10"/><line x1="1" y1="18" x2="7" y2="18"/><line x1="1" y1="26" x2="5" y2="26"/><line x1="1" y1="34" x2="7" y2="34"/><line x1="1" y1="42" x2="5" y2="42"/></svg>,
  // 13 – Calculator
  () => <svg viewBox="0 0 30 42" {...P}><rect x="3" y="3" width="24" height="36" rx="3"/><rect x="7" y="7" width="16" height="8" rx="1"/><circle cx="10" cy="22" r="1.5"/><circle cx="20" cy="22" r="1.5"/><circle cx="10" cy="30" r="1.5"/><circle cx="20" cy="30" r="1.5"/><circle cx="15" cy="34" r="1.5"/></svg>,
  // 14 – Spiral notebook
  () => <svg viewBox="0 0 35 45" {...P}><rect x="6" y="3" width="26" height="38" rx="2"/><line x1="12" y1="3" x2="12" y2="41"/><line x1="3" y1="10" x2="6" y2="10"/><line x1="3" y1="16" x2="6" y2="16"/><line x1="3" y1="22" x2="6" y2="22"/><line x1="3" y1="28" x2="6" y2="28"/><line x1="3" y1="34" x2="6" y2="34"/><line x1="16" y1="12" x2="28" y2="12"/><line x1="16" y1="18" x2="26" y2="18"/></svg>,
  // 15 – Open book
  () => <svg viewBox="0 0 50 35" {...P}><path d="M25,30V6c0-2-7-3-20,0v24l20-4"/><path d="M25,30V6c0-2 7-3 20,0v24l-20-4"/><line x1="10" y1="12" x2="20" y2="10"/><line x1="10" y1="17" x2="20" y2="15"/><line x1="30" y1="10" x2="40" y2="12"/></svg>,
  // 16 – Diploma scroll
  () => <svg viewBox="0 0 45 35" {...P}><path d="M8,8h24v20H8z"/><path d="M8,8c-3,0-3,4 0,4"/><path d="M8,28c-3,0-3-4 0-4"/><path d="M32,8c3,0 6,2 6,4v12c0,2-3,4-6,4"/><path d="M15,14h12 M15,18h10 M15,22h8"/></svg>,
  // 17 – Certificate/ribbon
  () => <svg viewBox="0 0 40 45" {...P}><rect x="5" y="3" width="30" height="24" rx="2"/><path d="M14,18h12 M14,22h8"/><circle cx="20" cy="12" r="5"/><path d="M15,27v14l5-4 5,4V27"/></svg>,
  // 18 – Trophy
  () => <svg viewBox="0 0 40 45" {...P}><path d="M12,5h16l-2,17c0,6-12,6-12,0z"/><path d="M12,8c-6,0-8,8-2,10"/><path d="M28,8c6,0 8,8 2,10"/><line x1="20" y1="28" x2="20" y2="35"/><rect x="13" y="35" width="14" height="4" rx="1"/></svg>,
  // 19 – Medal
  () => <svg viewBox="0 0 35 45" {...P}><path d="M10,3l4,15 M25,3l-4,15"/><circle cx="18" cy="28" r="12"/><circle cx="18" cy="28" r="7"/><path d="M15,25l3,3 6-6"/></svg>,
  // 20 – Globe
  () => <svg viewBox="0 0 40 40" {...P}><circle cx="20" cy="20" r="16"/><ellipse cx="20" cy="20" rx="8" ry="16"/><line x1="4" y1="20" x2="36" y2="20"/><path d="M6,12q14,4 28,0"/><path d="M6,28q14-4 28,0"/></svg>,
  // 21 – Alarm clock
  () => <svg viewBox="0 0 40 42" {...P}><circle cx="20" cy="22" r="14"/><path d="M20,14v8l6,4"/><path d="M8,8 L4,4"/><path d="M32,8l4-4"/><line x1="18" y1="36" x2="22" y2="36"/><path d="M14,38h12"/></svg>,
  // 22 – Coffee cup
  () => <svg viewBox="0 0 40 45" {...P}><path d="M8,12v23c0,5 20,5 20,0V12z"/><path d="M28,16c6,0 8,6 6,12-2,4-6,4-6,0"/><line x1="8" y1="12" x2="28" y2="12"/><path d="M14,6q0-4 4,0"/><path d="M20,5q0-4 4,0"/></svg>,
  // 23 – Pizza slice
  () => <svg viewBox="0 0 40 45" {...P}><path d="M20,3 L5,40c0,3 30,3 30,0z"/><circle cx="18" cy="20" r="2"/><circle cx="24" cy="28" r="2"/><circle cx="15" cy="32" r="1.5"/></svg>,
  // 24 – Apple
  () => <svg viewBox="0 0 30 35" {...P}><path d="M15,8c-7,0-12,6-12,14s5,11 12,11 12-3 12-11S22,8 15,8z"/><path d="M15,8c0-4 3-6 5-5"/><path d="M16,6c4-2 6,0 4,2"/></svg>,
  // 25 – Math compass
  () => <svg viewBox="0 0 35 45" {...P}><path d="M18,4 L8,40"/><path d="M18,4 L28,40"/><circle cx="18" cy="4" r="2"/><path d="M12,28c4-2 8-2 12,0"/><path d="M26,34l6,4"/><circle cx="33" cy="39" r="1.5"/></svg>,
  // 26 – Protractor
  () => <svg viewBox="0 0 48 28" {...P}><path d="M4,24h40"/><path d="M4,24c0-16 40-16 40,0"/><path d="M24,24v-20"/><path d="M10,10l14,14"/><path d="M38,10L24,24"/></svg>,
  // 27 – Scissors
  () => <svg viewBox="0 0 35 40" {...P}><circle cx="10" cy="32" r="5"/><circle cx="25" cy="32" r="5"/><path d="M13,28 L20,10 L22,28"/></svg>,
  // 28 – Paper clip
  () => <svg viewBox="0 0 20 40" {...P}><path d="M6,30V10c0-5 8-5 8,0v22c0,4-8,4-8,0V14"/></svg>,
  // 29 – Pushpin
  () => <svg viewBox="0 0 25 40" {...P}><circle cx="12" cy="10" r="6"/><path d="M12,16v8"/><path d="M6,24h12"/><path d="M12,24v12"/></svg>,
  // 30 – Sticky note
  () => <svg viewBox="0 0 35 35" {...P}><path d="M3,3h29v20l-9,9H3z"/><path d="M23,23v9l9-9z"/><line x1="8" y1="10" x2="20" y2="10"/><line x1="8" y1="16" x2="18" y2="16"/></svg>,
  // 31 – Chalkboard
  () => <svg viewBox="0 0 50 40" {...P}><rect x="3" y="3" width="44" height="28" rx="1"/><line x1="20" y1="31" x2="20" y2="37"/><line x1="30" y1="31" x2="30" y2="37"/><line x1="12" y1="37" x2="38" y2="37"/><path d="M10,10l8,4-8,4"/><line x1="22" y1="14" x2="34" y2="14"/></svg>,
  // 32 – Desk lamp
  () => <svg viewBox="0 0 40 45" {...P}><path d="M10,40h20"/><path d="M20,40V28"/><path d="M20,28 L32,12"/><path d="M26,6h12l-6,12h-12z"/></svg>,
  // 33 – Lightbulb
  () => <svg viewBox="0 0 30 42" {...P}><path d="M15,4c-7,0-12,5-12,12 0,6 5,8 7,12h10c2-4 7-6 7-12 0-7-5-12-12-12z"/><line x1="10" y1="32" x2="20" y2="32"/><line x1="11" y1="36" x2="19" y2="36"/><circle cx="15" cy="40" r="1"/></svg>,
  // 34 – Brain
  () => <svg viewBox="0 0 40 38" {...P}><path d="M20,34V6"/><path d="M20,6c-4-4-12-2-14,4-3,6 0,12 4,14 0,4 4,8 10,10"/><path d="M20,6c4-4 12-2 14,4 3,6 0,12-4,14 0,4-4,8-10,10"/><path d="M8,18c4,0 6-2 8,0"/><path d="M24,18c4,0 6-2 8,0"/></svg>,
  // 35 – Atom
  () => <svg viewBox="0 0 40 40" {...P}><circle cx="20" cy="20" r="3" fill="currentColor"/><ellipse cx="20" cy="20" rx="16" ry="6"/><ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="16" ry="6" transform="rotate(-60 20 20)"/></svg>,
  // 36 – DNA helix
  () => <svg viewBox="0 0 25 50" {...P}><path d="M5,5c8,6 8,12 0,18s-1,12 8,18"/><path d="M20,5c-8,6-8,12 0,18s1,12-8,18"/><line x1="7" y1="14" x2="18" y2="14"/><line x1="7" y1="32" x2="18" y2="32"/></svg>,
  // 37 – Magnifying glass
  () => <svg viewBox="0 0 35 38" {...P}><circle cx="16" cy="16" r="12"/><line x1="24" y1="26" x2="32" y2="35" strokeWidth="2"/></svg>,
  // 38 – Telescope
  () => <svg viewBox="0 0 50 35" {...P}><path d="M38,6l8,4-16,20-6-4z"/><path d="M30,26 L20,32"/><path d="M14,28l-6,6"/><path d="M22,30l-2,6"/></svg>,
  // 39 – Paint palette
  () => <svg viewBox="0 0 45 35" {...P}><path d="M10,28c-6-8-2-20 15-23s22,8 17,18c-3,6-10,5-10,0 0-4-6-3-6,2-1,6-10,10-16,3z"/><circle cx="14" cy="14" r="2.5"/><circle cx="24" cy="10" r="2"/><circle cx="32" cy="14" r="2.5"/><circle cx="34" cy="22" r="2"/></svg>,
  // 40 – Paintbrush
  () => <svg viewBox="0 0 14 48" {...P}><path d="M4,28v12c0,4 6,4 6,0V28"/><rect x="3" y="22" width="8" height="6" rx="1"/><path d="M5,22 L2,4c0-2 10-2 10,0L9,22"/></svg>,
  // 41 – Music note (single)
  () => <svg viewBox="0 0 20 28" {...P}><circle cx="6" cy="22" r="4"/><line x1="10" y1="22" x2="10" y2="4"/><path d="M10,4c4-1 8,1 8,5"/></svg>,
  // 42 – Music notes (double)
  () => <svg viewBox="0 0 24 28" {...P}><circle cx="5" cy="22" r="3.5"/><line x1="8.5" y1="22" x2="8.5" y2="5"/><circle cx="16" cy="18" r="3.5"/><line x1="19.5" y1="18" x2="19.5" y2="3"/><path d="M8.5,5 L19.5,3"/></svg>,
  // 43 – Guitar
  () => <svg viewBox="0 0 25 50" {...P}><path d="M12,28c-6,2-9,6-9,12 0,5 5,8 10,8s10-3 10-8c0-6-3-10-9-12"/><line x1="13" y1="28" x2="13" y2="8"/><path d="M9,8h8l2-4H7z"/><circle cx="13" cy="38" r="3"/></svg>,
  // 44 – Headphones
  () => <svg viewBox="0 0 40 38" {...P}><path d="M6,22c0-10 6-18 14-18s14,8 14,18"/><rect x="3" y="22" width="6" height="12" rx="2"/><rect x="31" y="22" width="6" height="12" rx="2"/></svg>,
  // 45 – Camera
  () => <svg viewBox="0 0 45 32" {...P}><rect x="3" y="8" width="40" height="22" rx="4"/><path d="M15,8l3-5h10l3,5"/><circle cx="23" cy="19" r="7"/><circle cx="23" cy="19" r="4"/></svg>,
  // 46 – Theater masks
  () => <svg viewBox="0 0 45 35" {...P}><path d="M5,8c0-4 14-4 14,2v14c0,4-14,4-14-2z"/><path d="M9,14c1-1 3,0 2,1"/><circle cx="15" cy="14" r="1"/><path d="M8,20c2,2 6,2 8,0"/><path d="M26,6c0-4 14-4 14,2v14c0,4-14,4-14-2z"/><circle cx="31" cy="12" r="1"/><circle cx="37" cy="12" r="1"/><path d="M30,18c2,-2 6,-2 8,0"/></svg>,
  // 47 – Soccer ball
  () => <svg viewBox="0 0 35 35" {...P}><circle cx="17" cy="17" r="14"/><path d="M17,3v6l-5,4-8-2 M17,9l5,4 8-2 M12,13l-2,8 5,6 5-6-2-8 M10,21l-7,2 M25,21l7,2 M15,27v6 M20,27v6"/></svg>,
  // 48 – Basketball
  () => <svg viewBox="0 0 35 35" {...P}><circle cx="17" cy="17" r="14"/><path d="M3,17h28"/><path d="M17,3v28"/><path d="M5,7c8,6 8,14 0,20"/><path d="M29,7c-8,6-8,14 0,20"/></svg>,
  // 49 – Tennis racket
  () => <svg viewBox="0 0 30 48" {...P}><ellipse cx="15" cy="14" rx="11" ry="14"/><line x1="15" y1="28" x2="15" y2="44"/><path d="M11,28h8l2,6H9z"/><line x1="8" y1="8" x2="22" y2="8"/><line x1="6" y1="14" x2="24" y2="14"/><line x1="8" y1="20" x2="22" y2="20"/><line x1="12" y1="2" x2="12" y2="26"/><line x1="18" y1="2" x2="18" y2="26"/></svg>,
  // 50 – Dumbbell
  () => <svg viewBox="0 0 50 20" {...P}><rect x="4" y="4" width="8" height="12" rx="2"/><rect x="38" y="4" width="8" height="12" rx="2"/><line x1="12" y1="10" x2="38" y2="10" strokeWidth="2"/><line x1="2" y1="7" x2="2" y2="13"/><line x1="48" y1="7" x2="48" y2="13"/></svg>,
  // 51 – Stopwatch
  () => <svg viewBox="0 0 35 42" {...P}><circle cx="17" cy="24" r="14"/><line x1="17" y1="14" x2="17" y2="24"/><line x1="17" y1="24" x2="24" y2="20"/><line x1="14" y1="6" x2="20" y2="6"/><line x1="17" y1="6" x2="17" y2="10"/><path d="M27,12l3-3"/></svg>,
  // 52 – Megaphone
  () => <svg viewBox="0 0 45 35" {...P}><path d="M5,12h10l20-8v28L15,24H5z"/><path d="M5,12v12"/><path d="M15,24v6h5v-4"/><path d="M38,10l4-2 M38,18h5 M38,26l4,2"/></svg>,
  // 53 – Pennant flag
  () => <svg viewBox="0 0 35 42" {...P}><line x1="5" y1="3" x2="5" y2="40"/><path d="M5,5l25,8-25,8"/></svg>,
  // 54 – Badge/shield
  () => <svg viewBox="0 0 35 42" {...P}><path d="M17,4 L4,10v12c0,10 13,16 13,16s13-6 13-16V10z"/><path d="M13,20l4,4 8-8"/></svg>,
  // 55 – Star (5-point)
  () => <svg viewBox="0 0 35 34" {...P}><path d="M17,2l5,10h11l-8,7 3,11-11-6-11,6 3-11-8-7h11z"/></svg>,
  // 56 – 4-point star
  () => <svg viewBox="0 0 20 20" {...P}><path d="M10,1q0,9 9,9q-9,0-9,9q0-9-9-9q9,0 9-9z"/></svg>,
  // 57 – Heart
  () => <svg viewBox="0 0 30 28" {...P}><path d="M15,25c-10-7-13-15-7-19s7,3 7,3 1-7 7-3 3,12-7,19z"/></svg>,
  // 58 – Speech bubble
  () => <svg viewBox="0 0 40 32" {...P}><path d="M4,4h32v18H16l-6,8 2-8H4z"/><line x1="10" y1="10" x2="30" y2="10"/><line x1="10" y1="15" x2="24" y2="15"/></svg>,
  // 59 – Thought bubble
  () => <svg viewBox="0 0 42 35" {...P}><path d="M8,18c0-8 8-14 16-14s14,6 14,12c0,8-8,14-16,14-4,0-8-1-10-4l-6,2 4-5c-1-2-2-3-2-5z"/><circle cx="8" cy="30" r="2"/><circle cx="4" cy="34" r="1.2"/></svg>,
  // 60 – Wifi
  () => <svg viewBox="0 0 40 30" {...P}><path d="M4,10c10-8 22-8 32,0"/><path d="M10,16c6-6 14-6 20,0"/><path d="M16,22c2-4 6-4 8,0"/><circle cx="20" cy="26" r="2" fill="currentColor"/></svg>,
  // 61 – Tablet/phone
  () => <svg viewBox="0 0 28 42" {...P}><rect x="3" y="3" width="22" height="36" rx="3"/><line x1="3" y1="9" x2="25" y2="9"/><line x1="3" y1="33" x2="25" y2="33"/><circle cx="14" cy="36" r="1.5"/></svg>,
  // 62 – USB drive
  () => <svg viewBox="0 0 20 40" {...P}><rect x="4" y="14" width="12" height="22" rx="2"/><path d="M6,14V6h8v8"/><circle cx="10" cy="22" r="2"/><line x1="10" y1="28" x2="10" y2="32"/></svg>,
  // 63 – Printer
  () => <svg viewBox="0 0 42 38" {...P}><rect x="10" y="2" width="22" height="10"/><path d="M4,12h34v16H4z" rx="2"/><rect x="12" y="24" width="18" height="12"/><line x1="16" y1="30" x2="26" y2="30"/><circle cx="34" cy="18" r="1.5" fill="currentColor"/></svg>,
  // 64 – Folder
  () => <svg viewBox="0 0 42 32" {...P}><path d="M3,8h14l4-5h18v26H3z"/><line x1="3" y1="14" x2="39" y2="14"/></svg>,
  // 65 – Clipboard
  () => <svg viewBox="0 0 32 42" {...P}><rect x="3" y="6" width="26" height="33" rx="2"/><path d="M10,6V4c0-2 12-2 12,0v2"/><line x1="8" y1="16" x2="24" y2="16"/><line x1="8" y1="22" x2="20" y2="22"/><line x1="8" y1="28" x2="22" y2="28"/></svg>,
  // 66 – Calendar
  () => <svg viewBox="0 0 38 38" {...P}><rect x="3" y="6" width="32" height="29" rx="2"/><line x1="3" y1="14" x2="35" y2="14"/><line x1="10" y1="3" x2="10" y2="9"/><line x1="28" y1="3" x2="28" y2="9"/><line x1="10" y1="20" x2="14" y2="20"/><line x1="17" y1="20" x2="21" y2="20"/><line x1="24" y1="20" x2="28" y2="20"/><line x1="10" y1="27" x2="14" y2="27"/><line x1="17" y1="27" x2="21" y2="27"/></svg>,
  // 67 – Envelope
  () => <svg viewBox="0 0 42 28" {...P}><rect x="3" y="4" width="36" height="20" rx="2"/><path d="M3,4l18,12L39,4"/></svg>,
  // 68 – Paper airplane
  () => <svg viewBox="0 0 40 35" {...P}><path d="M3,18L38,4 28,32 20,20z"/><line x1="20" y1="20" x2="38" y2="4"/></svg>,
  // 69 – Rocket
  () => <svg viewBox="0 0 30 48" {...P}><path d="M15,3c-5,7-7,17-7,27h14c0-10-2-20-7-27z"/><circle cx="15" cy="18" r="3"/><path d="M8,26l-5,8 5-2"/><path d="M22,26l5,8-5-2"/><path d="M10,30v8c0,2 10,2 10,0v-8"/></svg>,
  // 70 – Bicycle
  () => <svg viewBox="0 0 55 35" {...P}><circle cx="12" cy="24" r="9"/><circle cx="42" cy="24" r="9"/><path d="M12,24l10-14h12l8,14-14,0L18,10"/><path d="M34,10l6-4"/></svg>,
  // 71 – School bus
  () => <svg viewBox="0 0 55 30" {...P}><rect x="4" y="6" width="46" height="18" rx="3"/><line x1="4" y1="14" x2="50" y2="14"/><rect x="8" y="7" width="6" height="7"/><rect x="18" y="7" width="6" height="7"/><rect x="28" y="7" width="6" height="7"/><circle cx="14" cy="24" r="4"/><circle cx="40" cy="24" r="4"/></svg>,
  // 72 – Location pin
  () => <svg viewBox="0 0 28 38" {...P}><path d="M14,36s-10-14-10-22c0-6 4-11 10-11s10,5 10,11c0,8-10,22-10,22z"/><circle cx="14" cy="14" r="4"/></svg>,
  // 73 – Compass (navigation)
  () => <svg viewBox="0 0 38 38" {...P}><circle cx="19" cy="19" r="16"/><circle cx="19" cy="19" r="12"/><path d="M19,7l3,12-3,6-3-6z"/><circle cx="19" cy="19" r="2"/></svg>,
  // 74 – Puzzle piece
  () => <svg viewBox="0 0 32 32" {...P}><path d="M7,7h6c0-3 4-3 4,0h6v6c3,0 3,4 0,4v6h-6c0,3-4,3-4,0H7v-6c-3,0-3-4 0-4z"/></svg>,
  // 75 – Gear
  () => <svg viewBox="0 0 32 32" {...P}><circle cx="16" cy="16" r="5"/><path d="M16,2v4 M16,26v4 M2,16h4 M26,16h4 M6,6l3,3 M23,23l3,3 M6,26l3-3 M23,9l3-3"/></svg>,
  // 76 – Wrench
  () => <svg viewBox="0 0 35 40" {...P}><path d="M24,6c-6-4-14,2-12,10l-8,12c-2,3 2,6 4,4l10-10c8,2 14-4 12-10l-5,4-4-4z"/></svg>,
  // 77 – Stethoscope
  () => <svg viewBox="0 0 35 42" {...P}><path d="M8,4v14c0,6 6,10 12,10"/><path d="M20,4v14c0,6-2,8-4,10"/><path d="M20,28c4,0 8,4 8,8v0"/><circle cx="28" cy="38" r="2"/><circle cx="28" cy="36" r="4"/></svg>,
  // 78 – Pi symbol
  () => <svg viewBox="0 0 35 30" {...P}><path d="M5,8h25"/><path d="M12,8v18c0,3-4,3-4,0"/><path d="M22,8v20"/></svg>,
  // 79 – Infinity
  () => <svg viewBox="0 0 45 22" {...P}><path d="M 8 11 c -4 0 -7 3 -7 7 s 3 7 7 7 c 4 0 7 -3 8 -6.5 l 3.5 -5 c 1 -3.5 4 -6.5 8 -6.5 c 4 0 7 3 7 7 s -3 7 -7 7 c -4 0 -7 -3 -8 -6.5 l -3.5 -5 c -1 -3.5 -4 -6.5 -8 -6.5 z"/></svg>,
  // 80 – Sigma/sum
  () => <svg viewBox="0 0 28 35" {...P}><path d="M24,5H6l10,12L6,30h18"/></svg>,
  // 81 – Hashtag
  () => <svg viewBox="0 0 28 28" {...P}><line x1="10" y1="4" x2="8" y2="24"/><line x1="20" y1="4" x2="18" y2="24"/><line x1="4" y1="10" x2="24" y2="10"/><line x1="4" y1="18" x2="24" y2="18"/></svg>,
  // 82 – Question mark
  () => <svg viewBox="0 0 24 35" {...P}><path d="M6,10c0-6 12-6 12,0 0,6-6,6-6,10v2"/><circle cx="12" cy="28" r="2" fill="currentColor"/></svg>,
  // 83 – Exclamation
  () => <svg viewBox="0 0 14 35" {...P}><line x1="7" y1="4" x2="7" y2="22" strokeWidth="2.5"/><circle cx="7" cy="30" r="2.5" fill="currentColor"/></svg>,
  // 84 – Graduation robe/gown
  () => <svg viewBox="0 0 40 48" {...P}><path d="M20,10v30"/><path d="M20,10c-8,2-14,8-16,14l8,4"/><path d="M20,10c8,2 14,8 16,14l-8,4"/><circle cx="20" cy="6" r="4"/><path d="M4,24v16 M36,24v16"/></svg>,
  // 85 – ID card
  () => <svg viewBox="0 0 42 28" {...P}><rect x="3" y="3" width="36" height="22" rx="2"/><circle cx="14" cy="12" r="4"/><path d="M8,22c0-4 4-6 6-6s6,2 6,6"/><line x1="26" y1="10" x2="36" y2="10"/><line x1="26" y1="15" x2="34" y2="15"/><line x1="26" y1="20" x2="32" y2="20"/></svg>,
  // 86 – Key
  () => <svg viewBox="0 0 45 22" {...P}><circle cx="12" cy="11" r="8"/><circle cx="12" cy="11" r="3"/><line x1="20" y1="11" x2="40" y2="11"/><path d="M30,11v5h3v-5 M36,11v4h3v-4"/></svg>,
  // 87 – Lock
  () => <svg viewBox="0 0 32 38" {...P}><rect x="4" y="16" width="24" height="18" rx="3"/><path d="M10,16v-6c0-6 12-6 12,0v6"/><circle cx="16" cy="26" r="2.5"/><line x1="16" y1="28" x2="16" y2="32"/></svg>,
  // 88 – Hourglass
  () => <svg viewBox="0 0 28 38" {...P}><path d="M6,4h16"/><path d="M6,34h16"/><path d="M7,4c0,8 7,12 7,15s-7,7-7,15"/><path d="M21,4c0,8-7,12-7,15s7,7 7,15"/></svg>,
  // 89 – Chess knight
  () => <svg viewBox="0 0 30 40" {...P}><path d="M8,36h14v-4c0-4-2-8-2-14 0-4 6-8 6-14 0-2-4-2-6,0l-4,6c-4-2-6,0-6,4 0,2 2,4 2,6l-6,14z"/><line x1="6" y1="36" x2="24" y2="36"/></svg>,
  // 90 – Dice
  () => <svg viewBox="0 0 32 32" {...P}><rect x="3" y="3" width="26" height="26" rx="4"/><circle cx="10" cy="10" r="2" fill="currentColor"/><circle cx="22" cy="10" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="10" cy="22" r="2" fill="currentColor"/><circle cx="22" cy="22" r="2" fill="currentColor"/></svg>,
  // 91 – Target/bullseye
  () => <svg viewBox="0 0 34 34" {...P}><circle cx="17" cy="17" r="14"/><circle cx="17" cy="17" r="9"/><circle cx="17" cy="17" r="4"/><circle cx="17" cy="17" r="1.5" fill="currentColor"/></svg>,
  // 92 – Crown
  () => <svg viewBox="0 0 40 28" {...P}><path d="M5,22 L5,8 L13,16 L20,6 L27,16 L35,8 L35,22z"/><line x1="5" y1="22" x2="35" y2="22"/></svg>,
  // 93 – Bookmark
  () => <svg viewBox="0 0 22 36" {...P}><path d="M3,3h16v30l-8-6-8,6z"/></svg>,
  // 94 – Crayon
  () => <svg viewBox="0 0 12 45" {...P}><rect x="2" y="12" width="8" height="24" rx="1"/><path d="M2,12c0-2 8-2 8,0"/><path d="M3,36 L6,44 L9,36"/></svg>,
  // 95 – Marker/highlighter
  () => <svg viewBox="0 0 14 48" {...P}><rect x="3" y="6" width="8" height="28" rx="1"/><path d="M3,34 L5,42h4l2-8"/><path d="M3,6 L7,2 L11,6"/></svg>,
  // 96 – Tape roll
  () => <svg viewBox="0 0 38 28" {...P}><circle cx="16" cy="14" r="12"/><circle cx="16" cy="14" r="5"/><path d="M28,14h8l-2,10h-8"/></svg>,
  // 97 – Stapler
  () => <svg viewBox="0 0 45 22" {...P}><path d="M5,14h30c4,0 6-4 4-8H10"/><path d="M5,14h30l4,4H5z"/><circle cx="8" cy="10" r="2"/></svg>,
  // 98 – Beaker
  () => <svg viewBox="0 0 35 42" {...P}><path d="M8,4h20v0l4,30c0,4-12,6-14,6s-14-2-14-6z"/><line x1="8" y1="4" x2="28" y2="4"/><path d="M6,28h24"/><circle cx="14" cy="34" r="2"/><circle cx="22" cy="32" r="1.5"/></svg>,
  // 99 – Graduation scroll (rolled)
  () => <svg viewBox="0 0 38 30" {...P}><path d="M6,6h22c3,0 3,4 0,4H6c-3,0-3-4 0-4z"/><path d="M6,10v14c0,2 22,2 22,0V10"/><path d="M12,16h12 M12,20h10"/><path d="M28,10c3,0 3,4 0,4"/></svg>,
  // 100 – Lab goggles
  () => <svg viewBox="0 0 42 22" {...P}><circle cx="13" cy="12" r="8"/><circle cx="29" cy="12" r="8"/><path d="M21,12h0"/><path d="M5,8 L2,6"/><path d="M37,8l3-2"/></svg>,
  // 101 – Student at desk
  () => <svg viewBox="0 0 50 45" {...P}><circle cx="25" cy="8" r="6"/><path d="M25,14v10"/><path d="M18,18l7,6 7-6"/><path d="M20,24l-4,14"/><path d="M30,24l4,14"/><rect x="5" y="28" width="40" height="3" rx="1"/><line x1="10" y1="31" x2="10" y2="42"/><line x1="40" y1="31" x2="40" y2="42"/></svg>,
  // 102 – Student reading book
  () => <svg viewBox="0 0 40 45" {...P}><circle cx="20" cy="8" r="6"/><path d="M20,14v8"/><path d="M14,16l6,6 6-6"/><path d="M14,22l-2,8h16l-2-8"/><rect x="10" y="22" width="20" height="14" rx="1"/><line x1="20" y1="22" x2="20" y2="36"/><line x1="14" y1="26" x2="18" y2="26"/><line x1="22" y1="26" x2="26" y2="26"/></svg>,
  // 103 – Student with laptop
  () => <svg viewBox="0 0 45 42" {...P}><circle cx="22" cy="6" r="5"/><path d="M22,11v6"/><path d="M16,14l6,3 6-3"/><path d="M16,17v10"/><path d="M28,17v10"/><rect x="8" y="27" width="28" height="3" rx="1"/><rect x="12" y="20" width="20" height="7" rx="1"/><path d="M6,30h32l-2,4H8z"/></svg>,
  // 104 – Raised hand
  () => <svg viewBox="0 0 30 42" {...P}><path d="M15,38v-16"/><path d="M9,22v-12c0-3 4-3 4,0v10"/><path d="M15,22v-16c0-3 4-3 4,0v14"/><path d="M21,22v-12c0-3 4-3 4,0v10"/><path d="M7,24c-4,0-4,6 0,8l4,6h14l4-8c0-4-4-6-6-4"/></svg>,
  // 105 – Fist bump
  () => <svg viewBox="0 0 45 30" {...P}><path d="M4,18c0-6 4-10 10-10 4,0 6,4 6,8v6H4z"/><path d="M41,18c0-6-4-10-10-10-4,0-6,4-6,8v6h16z"/><path d="M20,16h5"/><circle cx="22" cy="12" r="4"/></svg>,
  // 106 – Pointing finger
  () => <svg viewBox="0 0 42 25" {...P}><path d="M4,14c0-3 4-5 8-5h8v10H12c-4,0-8-2-8-5z"/><path d="M20,9h18c2,0 3,3 1,5H20z"/><line x1="24" y1="14" x2="36" y2="14"/></svg>,
  // 107 – Clapping hands
  () => <svg viewBox="0 0 40 35" {...P}><path d="M10,20c-4-6 0-14 6-12l6,10"/><path d="M30,20c4-6 0-14-6-12l-6,10"/><path d="M16,18l4,12"/><path d="M24,18l-4,12"/><path d="M14,6l-2-4"/><path d="M26,6l2-4"/><path d="M20,5v-4"/></svg>,
  // 108 – Waving hand
  () => <svg viewBox="0 0 32 40" {...P}><path d="M8,28l-2-14c-1-3 3-4 4-1l2,8"/><path d="M12,21l-1-10c-1-3 3-4 4-1l1,8"/><path d="M16,18l0-8c0-3 4-3 4,0v6"/><path d="M20,16v-6c0-3 4-3 4,0v8"/><path d="M24,18v4c0,8-6,14-12,14-4,0-8-4-8-8"/></svg>,
  // 109 – Dormitory building
  () => <svg viewBox="0 0 45 45" {...P}><rect x="5" y="12" width="35" height="30" rx="1"/><path d="M5,12l17-9 18,9"/><rect x="10" y="18" width="6" height="6"/><rect x="20" y="18" width="6" height="6"/><rect x="30" y="18" width="6" height="6"/><rect x="10" y="28" width="6" height="6"/><rect x="30" y="28" width="6" height="6"/><rect x="19" y="30" width="8" height="12"/></svg>,
  // 110 – Water bottle
  () => <svg viewBox="0 0 18 45" {...P}><rect x="4" y="12" width="10" height="28" rx="4"/><path d="M6,12V8c0-2 6-2 6,0v4"/><path d="M4,20h10"/><line x1="9" y1="6" x2="9" y2="3"/></svg>,
  // 111 – Burger
  () => <svg viewBox="0 0 42 32" {...P}><path d="M5,14h32c0-8-8-12-16-12S5,6 5,14z"/><rect x="5" y="14" width="32" height="4" rx="1"/><path d="M5,18h32v4c0,4-8,6-16,6S5,26 5,22z"/><path d="M8,16c4-2 8,2 12,0s8,2 12,0"/></svg>,
  // 112 – Donut
  () => <svg viewBox="0 0 35 35" {...P}><circle cx="17" cy="17" r="14"/><circle cx="17" cy="17" r="5"/><path d="M8,10c2-1 4,1 6,0s4,1 6,0 4,1 6,0 4,1 6,0"/></svg>,
  // 113 – Sunglasses
  () => <svg viewBox="0 0 42 18" {...P}><circle cx="12" cy="10" r="7"/><circle cx="30" cy="10" r="7"/><path d="M19,10h4"/><path d="M5,8L2,6"/><path d="M37,8l3-2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="26" y1="10" x2="34" y2="10"/></svg>,
  // 114 – Baseball cap
  () => <svg viewBox="0 0 40 28" {...P}><path d="M6,18c0-8 6-14 14-14s14,6 14,14"/><path d="M4,18h32c2,0 2,4 0,4H4c-2,0-2-4 0-4z"/><path d="M34,18c4,0 6,2 4,6"/></svg>,
  // 115 – T-shirt
  () => <svg viewBox="0 0 40 38" {...P}><path d="M12,4h16"/><path d="M12,4L4,10l6,6v18h20V16l6-6-8-6"/><path d="M16,4c0,4 8,4 8,0"/></svg>,
  // 116 – Sneaker shoe
  () => <svg viewBox="0 0 45 25" {...P}><path d="M8,20c0-6 2-12 8-14l8,4 4-4c4,0 8,2 10,6l2,4H8z"/><line x1="8" y1="20" x2="40" y2="20"/><path d="M16,16l4,4"/><circle cx="22" cy="14" r="1"/><circle cx="28" cy="12" r="1"/></svg>,
  // 117 – Skateboard
  () => <svg viewBox="0 0 50 18" {...P}><path d="M8,8h34c3,0 5,2 3,4H5c-2-2 0-4 3-4z"/><circle cx="14" cy="14" r="3"/><circle cx="36" cy="14" r="3"/></svg>,
  // 118 – Earbuds
  () => <svg viewBox="0 0 30 38" {...P}><circle cx="8" cy="30" r="5"/><circle cx="22" cy="30" r="5"/><path d="M8,25c0-10 4-18 7-20"/><path d="M22,25c0-10-4-18-7-20"/><circle cx="15" cy="4" r="2"/></svg>,
  // 119 – Microphone
  () => <svg viewBox="0 0 24 42" {...P}><rect x="6" y="4" width="12" height="18" rx="6"/><path d="M4,18c0,8 6,12 8,12s8-4 8-12"/><line x1="12" y1="30" x2="12" y2="36"/><line x1="6" y1="36" x2="18" y2="36"/></svg>,
  // 120 – Podium/lectern
  () => <svg viewBox="0 0 40 42" {...P}><path d="M10,14h20v20H10z"/><path d="M6,14h28"/><line x1="14" y1="34" x2="10" y2="40"/><line x1="26" y1="34" x2="30" y2="40"/><line x1="8" y1="40" x2="32" y2="40"/><path d="M16,6l4-4 4,4"/><line x1="20" y1="6" x2="20" y2="14"/></svg>,
  // 121 – Projector screen
  () => <svg viewBox="0 0 42 38" {...P}><line x1="3" y1="4" x2="39" y2="4"/><rect x="6" y="4" width="30" height="24" rx="1"/><line x1="21" y1="28" x2="21" y2="34"/><path d="M15,34h12"/><path d="M14,16l6,4-6,4z" fill="currentColor"/></svg>,
  // 122 – Whiteboard with marker
  () => <svg viewBox="0 0 45 35" {...P}><rect x="3" y="3" width="38" height="24" rx="1"/><line x1="15" y1="27" x2="15" y2="33"/><line x1="29" y1="27" x2="29" y2="33"/><line x1="10" y1="33" x2="34" y2="33"/><path d="M10,10l4,6h8l4-6"/><line x1="32" y1="8" x2="36" y2="18"/></svg>,
  // 123 – Desk and chair
  () => <svg viewBox="0 0 45 38" {...P}><rect x="4" y="14" width="28" height="3" rx="1"/><line x1="6" y1="17" x2="6" y2="34"/><line x1="30" y1="17" x2="30" y2="34"/><path d="M34,22h6v12h-6z"/><path d="M34,18c0-4 10-4 10,0"/></svg>,
  // 124 – Locker
  () => <svg viewBox="0 0 24 42" {...P}><rect x="3" y="3" width="18" height="36" rx="1"/><line x1="3" y1="21" x2="21" y2="21"/><circle cx="16" cy="12" r="1.5" fill="currentColor"/><circle cx="16" cy="30" r="1.5" fill="currentColor"/><rect x="7" y="6" width="10" height="4" rx="1"/></svg>,
  // 125 – Library shelves
  () => <svg viewBox="0 0 42 38" {...P}><rect x="3" y="3" width="36" height="32" rx="1"/><line x1="3" y1="13" x2="39" y2="13"/><line x1="3" y1="23" x2="39" y2="23"/><rect x="6" y="5" width="4" height="8"/><rect x="12" y="6" width="3" height="7"/><rect x="17" y="5" width="5" height="8"/><rect x="8" y="15" width="5" height="8"/><rect x="16" y="16" width="4" height="7"/><rect x="24" y="15" width="3" height="8"/><rect x="6" y="25" width="4" height="8"/><rect x="14" y="26" width="5" height="7"/></svg>,
  // 126 – Study group (3 people)
  () => <svg viewBox="0 0 50 35" {...P}><circle cx="12" cy="8" r="5"/><circle cx="25" cy="8" r="5"/><circle cx="38" cy="8" r="5"/><path d="M12,13v6"/><path d="M25,13v6"/><path d="M38,13v6"/><rect x="4" y="19" width="42" height="3" rx="1"/><line x1="8" y1="22" x2="8" y2="32"/><line x1="42" y1="22" x2="42" y2="32"/></svg>,
  // 127 – Campus tree
  () => <svg viewBox="0 0 35 42" {...P}><line x1="17" y1="25" x2="17" y2="40"/><path d="M17,6c-8,0-14,6-14,12s6,10 14,10 14-4 14-10S25,6 17,6z"/><path d="M12,40h10"/></svg>,
  // 128 – Pennant banner
  () => <svg viewBox="0 0 40 14" {...P}><path d="M2,2l6,10 6-10 6,10 6-10 6,10 6-10"/><line x1="2" y1="2" x2="38" y2="2"/></svg>,
  // 129 – Yearbook
  () => <svg viewBox="0 0 35 42" {...P}><rect x="4" y="3" width="26" height="36" rx="3"/><circle cx="17" cy="16" r="6"/><line x1="10" y1="28" x2="24" y2="28"/><line x1="12" y1="33" x2="22" y2="33"/><path d="M4,3c-3,0-3,36 0,36"/></svg>,
  // 130 – Wheelchair student
  () => <svg viewBox="0 0 42 42" {...P}><circle cx="20" cy="24" r="10"/><circle cx="20" cy="24" r="7"/><line x1="20" y1="14" x2="20" y2="34"/><line x1="10" y1="24" x2="30" y2="24"/><line x1="13" y1="17" x2="27" y2="31"/><line x1="13" y1="31" x2="27" y2="17"/><circle cx="10" cy="34" r="3"/><path d="M13,34l2-10"/><circle cx="20" cy="8" r="4"/><path d="M17,12v6"/><path d="M23,12l6-4"/></svg>,
];

/* ── Generate random placements ── */
function generatePlacements(count: number, seed: number) {
  const rand = mulberry32(seed);
  const placements: { iconIdx: number; x: number; y: number; rot: number; scale: number }[] = [];
  
  // Grid-based with jitter for even coverage
  const cols = Math.ceil(Math.sqrt(count * 1.6));
  const rows = Math.ceil(count / cols);
  const cellW = 100 / cols;
  const cellH = 100 / rows;
  
  let idx = 0;
  for (let r = 0; r < rows && idx < count; r++) {
    for (let c = 0; c < cols && idx < count; c++) {
      const x = c * cellW + (rand() * cellW * 0.7);
      const y = r * cellH + (rand() * cellH * 0.7);
      const rot = (rand() - 0.5) * 50; // -25 to +25 degrees
      const scale = 0.7 + rand() * 0.6; // 0.7x to 1.3x
      const iconIdx = Math.floor(rand() * icons.length);
      placements.push({ iconIdx, x: Math.min(x, 96), y: Math.min(y, 96), rot, scale });
      idx++;
    }
  }
  return placements;
}

const placements = generatePlacements(320, 42069);

export default function DoodleBg() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#F5F0E8] overflow-hidden select-none pointer-events-none z-0">
      {placements.map((p, i) => {
        const Icon = icons[p.iconIdx];
        return (
          <div
            key={i}
            className="absolute text-[#c8bfb0]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${28 * p.scale}px`,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
}
