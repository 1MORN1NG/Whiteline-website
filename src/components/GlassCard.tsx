interface GlassCardProps {
  children: React.ReactNode;
}

export default function GlassCard({ children }: GlassCardProps) {
  return (
    <div className="bg-glass backdrop-blur-xl border border-white/20 p-6 rounded-none">
      {children}
    </div>
  );
}
