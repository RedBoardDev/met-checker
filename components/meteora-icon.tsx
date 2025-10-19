interface MeteoraIconProps {
  size?: "sm" | "md" | "lg"
}

export function MeteoraIcon({ size = "md" }: MeteoraIconProps) {
  const dimensions = {
    sm: 32,
    md: 48,
    lg: 64,
  }

  const dim = dimensions[size]

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="48" height="48" rx="10" fill="url(#iconGradient)" />
      <path d="M24 12L15 21L24 30L33 21L24 12Z" fill="white" fillOpacity="0.9" />
      <path d="M24 21L19 26L24 31L29 26L24 21Z" fill="white" fillOpacity="0.6" />
      <defs>
        <linearGradient id="iconGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B35" />
          <stop offset="1" stopColor="#F72585" />
        </linearGradient>
      </defs>
    </svg>
  )
}
