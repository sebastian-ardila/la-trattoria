interface IconProps {
  size?: number;
  className?: string;
}

export function TripAdvisorIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.5 2 2 4.5 2 4.5l2.2 2.3C3.4 7.8 2.8 9.3 2.8 11c0 3.4 2.8 6.2 6.2 6.2 1.3 0 2.5-.4 3.5-1.1l-.5-.5.5.5c1 .7 2.2 1.1 3.5 1.1 3.4 0 6.2-2.8 6.2-6.2 0-1.7-.7-3.2-1.7-4.2L22 4.5S17.5 2 12 2zM9 15.5c-2.5 0-4.5-2-4.5-4.5S6.5 6.5 9 6.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5zm6 0c-2.5 0-4.5-2-4.5-4.5S12.5 6.5 15 6.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5zM9 8.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5S10.4 8.5 9 8.5zm6 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5S16.4 8.5 15 8.5zM12 19l-1.5-1.5c-.5.3-1 .5-1.5.5h6c-.5 0-1-.2-1.5-.5L12 19z"/>
    </svg>
  );
}

export function WazeIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.5 12.5c0-4.7-3.8-8.5-8.5-8.5S3.5 7.8 3.5 12.5c0 2.3.9 4.4 2.4 5.9-.3 1.2-1 2.1-1 2.1s2.1-.2 3.5-1.1c1.1.5 2.3.7 3.6.7 4.7 0 8.5-3.4 8.5-7.6zM8.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-7.5 3s1.5 2 4 2 4-2 4-2H8z"/>
    </svg>
  );
}

export function GoogleMapsIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  );
}
