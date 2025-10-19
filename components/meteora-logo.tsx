export function MeteoraLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect width="40" height="40" rx="8" fill="url(#gradient)" />
      <path d="M20 10L12 18L20 26L28 18L20 10Z" fill="white" fillOpacity="0.9" />
      <path d="M20 18L16 22L20 26L24 22L20 18Z" fill="white" fillOpacity="0.6" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B35" />
          <stop offset="1" stopColor="#F72585" />
        </linearGradient>
      </defs>
    </svg>
  )
}
