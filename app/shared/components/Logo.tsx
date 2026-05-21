interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" strokeWidth="2.5" stroke="currentColor" className="text-blue-600" />
      {/* Inner diamond */}
      <path
        d="M20 8l10 12-10 12-10-12L20 8z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="text-blue-600"
      />
      {/* Rising chart line */}
      <path
        d="M12 24l5-6 4 3 7-8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      />
      {/* Chart dot */}
      <circle cx="28" cy="13" r="2" fill="currentColor" className="text-blue-500" />
    </svg>
  );
}
