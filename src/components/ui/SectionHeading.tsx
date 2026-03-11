import { AnimatedSection } from "./AnimatedSection";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <AnimatedSection className="text-center mb-10 md:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
        {title}
      </h2>
      <p className="text-text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
      <div className="w-20 h-1 bg-accent mx-auto mt-6" />
    </AnimatedSection>
  );
}
