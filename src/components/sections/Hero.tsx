import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const brands = ["Michelin", "Bridgestone", "Goodyear", "Kumho", "Universal"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero bg-tread-pattern overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column — text */}
          <div>
            <AnimatedSection>
              <p className="text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Grossista de pneus &mdash; Portugal e Espanha
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider leading-tight mb-6">
                Distribuidora de Pneus por Grosso em Portugal
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg sm:text-xl text-text-muted max-w-xl mb-10 leading-relaxed">
                Fornecedor de pneus profissionais para oficinas, revendedores e
                frotas. Marcas premium com stock permanente e entrega na Península
                Ibérica.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Button href="#contact">Solicitar Orçamento</Button>
            </AnimatedSection>
          </div>

          {/* Right column — brand trust bar */}
          <AnimatedSection delay={0.3} animation="slideInLeft">
            <div className="hidden md:flex flex-col items-end gap-4">
              <p className="text-text-muted text-xs uppercase tracking-widest mb-2">
                Marcas em stock
              </p>
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="border border-border/50 bg-bg-card/50 backdrop-blur-sm px-6 py-3 text-text-muted font-heading text-sm uppercase tracking-wider hover:border-secondary/50 hover:text-secondary transition-colors duration-300"
                >
                  {brand}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
