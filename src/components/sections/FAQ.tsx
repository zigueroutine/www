"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const faqItems = [
  {
    question: "Qual é a quantidade mínima de encomenda?",
    answer:
      "Trabalhamos com encomendas a partir de 4 unidades por referência. Para volumes maiores, oferecemos condições especiais. Contacte-nos para um orçamento personalizado.",
  },
  {
    question: "Fazem entregas em Espanha?",
    answer:
      "Sim, distribuímos pneus para toda a Península Ibérica. As entregas em Espanha são realizadas com parceiros logísticos especializados, garantindo prazos competitivos.",
  },
  {
    question: "Que marcas de pneus têm disponíveis?",
    answer:
      "Trabalhamos com as principais marcas do mercado, incluindo Michelin, Bridgestone, Goodyear, Kumho e Universal. Temos stock permanente das referências mais procuradas.",
  },
  {
    question: "Como posso solicitar um orçamento?",
    answer:
      "Pode contactar-nos por telefone (+351 915 883 983), email (info@zigueroutine.com) ou através do formulário no nosso site. Respondemos a todos os pedidos de orçamento em menos de 24 horas.",
  },
  {
    question: "Vendem pneus para veículos pesados?",
    answer:
      "Sim, temos uma gama completa de pneus para pesados (camiões e reboques), incluindo medidas como 385/65R22.5. Disponibilizamos pneus de marcas premium e alternativas económicas.",
  },
] as const;

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-32 bg-bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Perguntas Frequentes"
          subtitle="Respostas às questões mais comuns sobre os nossos serviços"
        />
        <div className="mt-12 space-y-4">
          {faqItems.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <details className="group border border-border rounded-lg bg-bg">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-text font-medium text-lg select-none">
                  {item.question}
                  <span className="ml-4 shrink-0 text-secondary transition-transform group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-text-muted leading-relaxed">
                  {item.answer}
                </div>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
