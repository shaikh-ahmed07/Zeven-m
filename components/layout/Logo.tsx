import Image from 'next/image';

/**
 * The official Zeven-M logo, used unaltered.
 *  - "plate": the supplied artwork (gold on brand green), cropped to the mark.
 *  - "gold":  the same gold artwork with the green field removed, for dark imagery.
 */
export function Logo({ variant, className = '', preload }: { variant: 'plate' | 'gold'; className?: string; preload?: boolean }) {
  const src = variant === 'plate' ? '/logo/zeven-m-logo-plate.png' : '/logo/zeven-m-logo-gold.png';
  const size = variant === 'plate' ? { width: 744, height: 591 } : { width: 594, height: 474 };
  return (
    <Image
      src={src}
      {...size}
      alt="Zeven-M Projects & Realty"
      className={`logo logo--${variant} ${className}`}
      preload={preload}
      sizes="160px"
    />
  );
}
