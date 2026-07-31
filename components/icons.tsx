import type { Category } from "@/lib/listings";

type IconProps = {
  className?: string;
};

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9.75h4V21H3V9.75Zm7 0h3.83v1.54h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V21h-4v-4.94c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z" />
    </svg>
  );
}

export function ShipIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 17h18l-1.6 4H4.6L3 17Z" />
      <path d="M5 17V9h14v8" />
      <path d="M9 9V5h6v4" />
      <path d="M12 2v3" />
    </svg>
  );
}

export function PlaneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 13l7-1 4-8 2 1-2 7 6 1v2l-6 1 2 7-2 1-4-8-7-1v-2Z" />
    </svg>
  );
}

export function WarehouseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M4.5 9.5V20h15V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 6h11v10H2z" />
      <path d="M13 10h4l4 3v3h-8z" />
      <circle cx="6" cy="18" r="1.75" />
      <circle cx="17" cy="18" r="1.75" />
    </svg>
  );
}

export function ClipboardCheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  );
}

export function TrainIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="13" rx="3" />
      <path d="M5 11h14" />
      <circle cx="9" cy="16" r="0" />
      <path d="m7 20-2 2M17 20l2 2" />
      <circle cx="8.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 4 5.9 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.9-4-9s1.5-6.4 4-9Z" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<Category, (props: IconProps) => React.ReactElement> = {
  "Sea freight": ShipIcon,
  "Air freight": PlaneIcon,
  Warehousing: WarehouseIcon,
  Trucking: TruckIcon,
  "Customs brokerage": ClipboardCheckIcon,
  "Rail freight": TrainIcon,
};

export function getCategoryIcon(category: Category) {
  return CATEGORY_ICONS[category] ?? GlobeIcon;
}
