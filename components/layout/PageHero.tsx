import Image from 'next/image';
import Link from 'next/link';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image: string;
  alt: string;
  /** Current page name for the breadcrumb. */
  crumb: string;
  compact?: boolean;
  children?: React.ReactNode;
};

/** Inner-page banner using the same cinematic treatment as the homepage hero. */
export function PageHero({ eyebrow, title, lead, image, alt, crumb, compact, children }: Props) {
  return (
    <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`} aria-labelledby="page-title">
      <div className="page-hero__media hero__drift">
        <Image src={image} alt={alt} fill preload sizes="100vw" className="hero__img" />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__light" aria-hidden="true" />
      <div className="container page-hero__content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <p className="eyebrow eyebrow--light hero__eyebrow">{eyebrow}</p>
        <h1 id="page-title" className="page-hero__title">
          {title}
        </h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children && <div className="hero__actions">{children}</div>}
      </div>
    </section>
  );
}
