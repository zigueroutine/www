import { AnimatedSection } from "./AnimatedSection";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <AnimatedSection animation="scaleIn" delay={delay} className="text-center">
      <div className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-accent mb-2">
        {value}
      </div>
      <div className="text-text-muted text-sm uppercase tracking-widest">
        {label}
      </div>
    </AnimatedSection>
  );
}
