export function InstagramLink({ handle, inheritTypography = false }: { handle: string; inheritTypography?: boolean }) {
  return (
          <a
            href={`https://www.instagram.com/${handle}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-60"
            style={{ color: inheritTypography ? 'inherit' : 'var(--muted)' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            <span className={inheritTypography ? undefined : 'text-sm md:text-base tracking-widest'}>{handle}</span>
          </a>
  )
}
