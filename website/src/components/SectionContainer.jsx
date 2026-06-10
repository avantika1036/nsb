export default function SectionContainer({ children }) {
  return (
    <section className="nsb-section">
      <div className="nsb-content">
        {children}
      </div>
    </section>
  );
}