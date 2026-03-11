import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = [
  {
    title: "Pneus Ligeiros",
    description:
      "Venda por grosso de pneus Michelin, Bridgestone, Goodyear e Kumho para veículos ligeiros. Medidas populares como 195/65 R15, 205/55 R16, 225/45 R17 e 225/40 R18 sempre em stock.",
    brands: [
      "Michelin Primacy",
      "Michelin Pilot Sport",
      "Bridgestone Turanza",
      "Bridgestone Potenza",
      "Goodyear EfficientGrip",
      "Kumho HS52",
    ],
  },
  {
    title: "Pneus Pesados",
    description:
      "Pneus para camiões e reboques por grosso. Medidas 385/65R22.5 de marcas premium como Michelin e alternativas económicas. Ideais para frotas e transportadoras.",
    brands: ["Michelin XTE 3", "Universal UNKS01", "385/65R22.5"],
  },
] as const;

export function Products() {
  return (
    <section
      id="products"
      className="py-16 md:py-32 gradient-section clip-diagonal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeading
          title="Catálogo"
          subtitle="Stock permanente de pneus ligeiros e pesados das melhores marcas"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map(({ title, description, brands }, i) => (
            <AnimatedSection key={title} animation="fadeInUp" delay={i * 0.1}>
              <div className="bg-bg-card border border-border border-l-4 border-l-secondary p-5 md:p-8 group hover:border-secondary transition-all duration-300 h-full">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-3">
                  {title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {brands.map((brand) => (
                    <span
                      key={brand}
                      className="text-xs border border-border text-text-muted px-2 py-1"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
