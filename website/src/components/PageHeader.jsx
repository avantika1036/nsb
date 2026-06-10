export default function PageHeader({
  title,
  description,
}) {
  return (
    <header className="nsb-page-header">
      <h1>{title}</h1>

      {description && (
        <p className="nsb-page-description">
          {description}
        </p>
      )}
    </header>
  );
}