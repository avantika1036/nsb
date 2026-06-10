export default function CalloutBox({
  title,
  children,
}) {
  return (
    <div className="nsb-callout">
      {title && (
        <h3 className="nsb-callout-title">
          {title}
        </h3>
      )}

      <div className="nsb-callout-content">
        {children}
      </div>
    </div>
  );
}