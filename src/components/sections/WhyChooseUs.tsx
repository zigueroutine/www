import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const stats = [
  { value: "Matosinhos", label: "Localização" },
  { value: "5+", label: "Marcas disponíveis" },
  { value: "2", label: "Segmentos" },
] as const;

const differentiators = [
  {
    title: "Marcas Premium",
    description:
      "Michelin, Bridgestone, Goodyear, Kumho e Universal. Stock permanente das referências mais procuradas do mercado ibérico.",
  },
  {
    title: "Cobertura Ibérica",
    description:
      "Distribuição em Portugal e Espanha com parceiros logísticos especializados. Entregas fiáveis para toda a Península Ibérica.",
  },
  {
    title: "Orçamento em 24h",
    description:
      "Resposta rápida a todos os pedidos de orçamento. Condições personalizadas para oficinas, revendedores e frotas.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 md:py-32 bg-tread-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Porquê a Zigueroutine"
          subtitle="Grossista de pneus ao serviço de profissionais em Portugal e Espanha"
        />

        {/* Stats — horizontal bar with dividers */}
        <AnimatedSection animation="scaleIn">
          <div className="flex flex-col sm:flex-row justify-around items-center mb-12 md:mb-20 py-6 border-y border-border">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className={`text-center py-4 sm:py-0 ${i > 0 ? "sm:border-l sm:border-border sm:pl-8" : ""}`}
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-secondary mb-1">
                  {value}
                </div>
                <div className="text-text-muted text-sm uppercase tracking-widest">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Differentiators — card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map(({ title, description }, i) => (
            <AnimatedSection key={title} animation="scaleIn" delay={i * 0.15}>
              <div className="bg-bg-card border border-border p-5 md:p-8 text-center hover:border-accent transition-colors duration-300">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-3">
                  {title}
                </h3>
                <p className="text-text-muted leading-relaxed">{description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
