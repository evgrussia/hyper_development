export function InvestorBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl hero-blob-2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl hero-blob-1" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-chart-3/3 rounded-full blur-3xl opacity-40" />
    </div>
  );
}
