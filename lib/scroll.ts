'use client';

import { useEffect } from 'react';

/* ==========================================================================
   Scroll utilities shared across the site
   - one rAF-throttled scroll loop for every scroll-driven effect
   - offset-aware smooth scrolling to sections
   - a reference-counted scroll lock that also works on iOS Safari
   ========================================================================== */

type Listener = () => void;
const listeners = new Set<Listener>();
let queued = false;
let bound = false;

function flush() {
  queued = false;
  listeners.forEach((fn) => fn());
}
// Background tabs pause requestAnimationFrame; fall back to a timer so state stays correct.
const nextFrame = (cb: () => void) =>
  document.hidden ? window.setTimeout(cb, 16) : window.requestAnimationFrame(cb);

export function requestScrollFrame() {
  if (queued) return;
  queued = true;
  nextFrame(flush);
}

/** Runs `fn` at most once per animation frame while the page scrolls or resizes. */
export function onScrollFrame(fn: Listener) {
  listeners.add(fn);
  if (!bound) {
    bound = true;
    window.addEventListener('scroll', requestScrollFrame, { passive: true });
    window.addEventListener('resize', requestScrollFrame);
  }
  fn();
  return () => {
    listeners.delete(fn);
  };
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Scroll lock ------------------------------------------------------- */
let locks = 0;
let savedY = 0;

export const isScrollLocked = () => locks > 0;

function lock() {
  if (locks++ > 0) return;
  savedY = window.scrollY;
  const s = document.body.style;
  s.position = 'fixed';
  s.top = `-${savedY}px`;
  s.left = '0';
  s.right = '0';
  s.width = '100%';
  document.documentElement.classList.add('is-locked');
}
function unlock() {
  if (locks === 0 || --locks > 0) return;
  const s = document.body.style;
  s.position = s.top = s.left = s.right = s.width = '';
  document.documentElement.classList.remove('is-locked');
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, savedY);
  html.style.scrollBehavior = prev;
  requestScrollFrame();
}

/** Locks page scrolling while `active` is true. Safe to use from several components at once. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return unlock;
  }, [active]);
}

/** Calls `cb` once every scroll lock has been released (e.g. after a menu closes). */
export function whenUnlocked(cb: () => void, tries = 40) {
  window.setTimeout(() => {
    if (!isScrollLocked() || tries <= 0) cb();
    else whenUnlocked(cb, tries - 1);
  }, 16);
}

/* ---- Section scrolling ------------------------------------------------- */
function stickyOffset() {
  const root = getComputedStyle(document.documentElement);
  const nav = parseFloat(root.getPropertyValue('--nav-h-solid')) || 72;
  const subnav = document.querySelector<HTMLElement>('.subnav');
  return nav + (subnav ? subnav.offsetHeight : 0);
}

/**
 * Smoothly scrolls so the section's content (not its top padding) lands just
 * below the sticky navbar. Returns false if the element does not exist.
 */
export function scrollToId(id: string, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return false;
  let top = 0;
  if (id !== 'home') {
    const rectTop = el.getBoundingClientRect().top + window.scrollY;
    const offset = stickyOffset();
    const pad = parseFloat(getComputedStyle(el).paddingTop) || 0;
    const breathing = window.innerWidth < 761 ? 20 : 36;
    // Skip most of the section's top padding, but never cut into the section above.
    top = Math.max(rectTop - offset, rectTop + pad - offset - breathing);
  }
  window.scrollTo({ top: Math.max(0, top), behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'instant' });
  requestScrollFrame();
  el.classList.add('is-target');
  window.setTimeout(() => el.classList.remove('is-target'), 1800);
  return true;
}
