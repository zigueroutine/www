import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const contactItems = [
  {
    icon: "A",
    label: "Morada",
    content: (
      <address className="not-italic">
        Rua Alfredo Cunha, N 115
        <br />
        Loja 54, 4450-023 Matosinhos
      </address>
    ),
  },
  {
    icon: "P",
    label: "Telefone",
    content: (
      <a
        href="tel:+351915883983"
        className="hover:text-accent transition-colors"
      >
        +351 915 883 983
      </a>
    ),
  },
  {
    icon: "E",
    label: "Email",
    content: (
      <a
        href="mailto:info@zigueroutine.com"
        className="hover:text-accent transition-colors"
      >
        info@zigueroutine.com
      </a>
    ),
  },
  {
    icon: "N",
    label: "NIF",
    content: <span>519136683</span>,
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contacto"
          subtitle="Fornecedor de pneus profissionais ao seu serviço. Contacte-nos para condições de venda por grosso."
        />

        <AnimatedSection animation="fadeInUp">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactItems.map(({ icon, label, content }) => (
              <div
                key={icon}
                className="flex items-start gap-4 bg-bg-card border border-border p-5"
              >
                <div className="w-10 h-10 bg-accent/10 text-accent flex items-center justify-center shrink-0 font-bold">
                  {icon}
                </div>
                <div>
                  <div className="font-heading font-bold uppercase tracking-wider text-sm mb-1">
                    {label}
                  </div>
                  <div className="text-text-muted text-sm">{content}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
