export const inputClass =
  "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-chocolate placeholder:text-chocolate/35 transition-colors focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20";

export const labelClass =
  "mb-1 block text-sm font-medium";

export const hintClass = "mt-1.5 text-xs text-chocolate/55";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export const buttonPrimary = `${buttonBase} bg-chocolate px-4 py-2 text-pearl hover:bg-wine`;

export const buttonGhost = `${buttonBase} px-4 py-2 text-chocolate hover:bg-mistysky`;

export const buttonOutline = `${buttonBase} border border-line bg-white px-3 py-2 text-chocolate hover:bg-pearl`;
