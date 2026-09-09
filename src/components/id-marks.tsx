export function GoldFlame({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#f4f1ea" />
      <circle cx="32" cy="32" r="27" fill="#1a1408" />
      <circle cx="32" cy="32" r="24" fill="#c9a227" />
      <path
        d="M32 14c4 7 2 11-1 14 8 1 13 7 13 14 0 8-6 14-14 14s-14-6-14-14c0-5 2-9 6-12-1 4 1 7 4 8-2-9 2-16 6-24z"
        fill="#f8e7a0"
      />
      <path
        d="M32 26c2 4 1 7-1 9 5 1 8 4 8 9 0 5-4 9-9 9s-9-4-9-9c0-3 1-6 4-8 0 3 1 5 3 6-1-6 1-11 4-16z"
        fill="#8a5a12"
      />
    </svg>
  );
}

export function SilverFlame({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="30" fill="#eef0f3" />
      <circle cx="32" cy="32" r="27" fill="#2a2d33" />
      <circle cx="32" cy="32" r="24" fill="#c5c9d1" />
      <path
        d="M32 14c4 7 2 11-1 14 8 1 13 7 13 14 0 8-6 14-14 14s-14-6-14-14c0-5 2-9 6-12-1 4 1 7 4 8-2-9 2-16 6-24z"
        fill="#f7f8fa"
      />
      <path
        d="M32 26c2 4 1 7-1 9 5 1 8 4 8 9 0 5-4 9-9 9s-9-4-9-9c0-3 1-6 4-8 0 3 1 5 3 6-1-6 1-11 4-16z"
        fill="#6d7380"
      />
    </svg>
  );
}

export function SuperChaseBar({ className = "h-7 w-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 36" className={className} aria-hidden>
      <rect width="280" height="36" fill="#0a0a0a" rx="4" />
      <path d="M8 10h196l8 8-8 8H8z" fill="#f5d000" />
      <text
        x="18"
        y="23"
        fill="#111"
        fontSize="11"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="0.8"
      >
        MATCHBOX SUPER CHASE
      </text>
      <circle cx="248" cy="18" r="14" fill="#f5d000" />
      <circle cx="248" cy="18" r="11" fill="#111" />
      <text
        x="248"
        y="23"
        textAnchor="middle"
        fill="#f5d000"
        fontSize="16"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
      >
        m
      </text>
    </svg>
  );
}
