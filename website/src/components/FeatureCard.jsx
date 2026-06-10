import Link from '@docusaurus/Link';

export default function FeatureCard({
  title,
  description,
  to,
}) {
  return (
    <Link to={to} className="nsb-card">
      <h3 className="nsb-card-title">
        {title}
      </h3>

      <p className="nsb-card-description">
        {description}
      </p>
    </Link>
  );
}