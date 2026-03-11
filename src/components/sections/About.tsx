import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const values = [
  {
    icon: "S",
    title: "Stock Permanente",
    description:
      "Disponibilidade imediata das referências mais procuradas. Pneus ligeiros e pesados de marcas líderes sempre em armazém, prontos para expedição.",
  },
  {
    icon: "P",
    title: "Preços B2B",
    description:
      "Condições especiais para profissionais do setor. Venda por grosso com preços competitivos e margens que permitem ao revendedor crescer.",
  },
  {
    icon: "E",
    title: "Entrega Ibérica",
    description:
      "Distribuição em Portugal e Espanha com parceiros logísticos especializados. Entregas rápidas e fiáveis para toda a Península Ibérica.",
  },
] as const;

export function About() {
  return (
    <section id="about" className="py-16 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Sobre Nós"
          subtitle="Distribuidora de pneus por grosso sediada em Matosinhos, ao serviço de profissionais em Portugal e Espanha."
        />

        <div className="flex flex-col gap-6">
          {values.map(({ icon, title, description }, i) => (
            <AnimatedSection
              key={title}
              animation="scaleIn"
              delay={i * 0.15}
            >
              <div className="bg-bg-card border border-border p-5 md:p-8 flex items-start gap-6 group hover:border-accent transition-colors duration-300">
                <div className="w-14 h-14 shrink-0 bg-accent/10 text-accent font-heading font-bold text-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-2">
                    {title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
