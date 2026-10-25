// One icon set for the answer block and the service-page blocks.
// An unknown name throws at build time, so a typo can never fall back to a wrong icon silently.
export const ICONS: Record<string, string> = {
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.700l1-1" />',
  loop: '<path d="M20 12a8 8 0 0 1-13.7 5.6" /><path d="M4 12a8 8 0 0 1 13.7-5.6" /><path d="M18 3v4h-4" /><path d="M6 21v-4h4" />',
  gauge: '<path d="M4.5 17a8.5 8.5 0 1 1 15 0" /><path d="M12 13l4-4" /><circle cx="12" cy="13.5" r="1.3" />',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" />',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" />',
  window: '<rect x="3" y="4.5" width="18" height="15" rx="3" /><path d="M3 9.500h18" /><path d="M7 14.500h5" />',
  bag: '<path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.500a3 3 0 0 1 6 0V8" />',
  users: '<circle cx="9" cy="8.5" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.700a3.2 3.2 0 0 1 0 5.6" /><path d="M18 14.200A6 6 0 0 1 21 20" />',
  target: '<circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" />',
  chart: '<path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 15l4-4 3 3 5-6" />',
  coin: '<circle cx="12" cy="12" r="8.5" /><path d="M14.5 9.200c-.5-.8-1.4-1.2-2.5-1.2-1.4 0-2.5.7-2.5 1.800s1 1.6 2.5 2 2.5.9 2.5 2-1.1 1.8-2.5 1.800c-1.1 0-2-.4-2.5-1.2" /><path d="M12 6.500V8M12 16v1.5" />',
  check: '<path d="M5 12.500l4.500 4.500L19 7.500" />',
  cross: '<path d="M6.500 6.500l11 11M17.500 6.500l-11 11" />',
};
export function iconPaths(name: string): string {
  const p = ICONS[name];
  if (!p) throw new Error(`[icons] unknown icon "${name}". Known: ${Object.keys(ICONS).join(", ")}`);
  return p;
}
