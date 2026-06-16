import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
  iconOnly?: boolean;
}

export default function Logo({ className = '', height = 40, iconOnly = false }: LogoProps) {
  return (
    <img
      src="/kurama.png"
      alt="KORAMA"
      className={`object-contain select-none pointer-events-none ${className}`}
      style={{ height }}
      referrerPolicy="no-referrer"
    />
  );
}

