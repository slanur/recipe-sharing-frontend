interface LogoProps {
  tone?: 'dark' | 'light'
}

export function Logo({ tone = 'dark' }: LogoProps) {
  const isLight = tone === 'light'

  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-8 w-8 shrink-0">
        <rect
          width="32"
          height="32"
          rx="9"
          fill={isLight ? '#faf6ef' : '#b2431a'}
        />
        <path
          d="M6 15.5h20a10 10 0 0 1-20 0Z"
          fill={isLight ? '#b2431a' : '#faf6ef'}
        />
        <path
          d="M16 15.5c0-3.2 2-3.6 2-6.2M11.5 15.5c0-2.2 1.4-2.6 1.4-4.5M20.5 15.5c0-2.2 1.4-2.6 1.4-4.5"
          fill="none"
          stroke={isLight ? '#b2431a' : '#faf6ef'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-display text-2xl leading-none font-semibold tracking-tight ${isLight ? 'text-paper' : 'text-ink'}`}
      >
        Sofra
      </span>
    </span>
  )
}
