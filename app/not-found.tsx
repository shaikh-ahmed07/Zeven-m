import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="legal section">
      <div className="container legal__inner">
        <p className="eyebrow">404</p>
        <h1 className="display">This space is still being designed.</h1>
        <p className="lead">The page you are looking for doesn’t exist or has moved.</p>
        <ButtonLink href="/" variant="dark">Back to Home</ButtonLink>
      </div>
    </section>
  );
}
