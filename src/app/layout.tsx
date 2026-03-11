import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const BASE_URL = "https://zigueroutine.com";

export const metadata: Metadata = {
  title:
    "Zigueroutine — Distribuidora de Pneus por Grosso | Portugal e Espanha",
  description:
    "Distribuidora de pneus por grosso em Portugal. Marcas premium como Michelin, Bridgestone e Goodyear para ligeiros e pesados. Entregas em Portugal e Espanha. Solicite orçamento.",
  keywords: [
    "distribuidora de pneus",
    "pneus por grosso",
    "fornecedor de pneus Portugal",
    "pneus grossista Portugal",
    "distribuidora pneus Espanha Portugal",
    "pneus pesados por grosso",
    "pneus camião grosso",
    "venda pneus por grosso",
    "fornecedor pneus Michelin Portugal",
    "importar pneus Espanha",
    "grossista de pneus",
    "pneus Matosinhos",
    "pneus Porto",
    "Zigueroutine",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Zigueroutine — Distribuidora de Pneus por Grosso | Portugal e Espanha",
    description:
      "Distribuidora de pneus por grosso em Portugal. Marcas premium para ligeiros e pesados. Entregas na Península Ibérica.",
    url: BASE_URL,
    siteName: "Zigueroutine",
    locale: "pt_PT",
    type: "website",
  },
  robots: { index: true, follow: true },
};

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
];

const tireShopJsonLd = {
  "@context": "https://schema.org",
  "@type": "TireShop",
  name: "Zigueroutine",
  legalName: "Zigueroutine - Unipessoal Lda",
  url: BASE_URL,
  telephone: "+351915883983",
  email: "info@zigueroutine.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Alfredo Cunha, N 115 Loja 54",
    addressLocality: "Matosinhos",
    addressRegion: "Porto",
    postalCode: "4450-023",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.1853,
    longitude: -8.6903,
  },
  taxID: "519136683",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Distribuição de Pneus por Grosso",
  description:
    "Distribuidora de pneus por grosso em Portugal e Espanha. Fornecedor de pneus Michelin, Bridgestone, Goodyear para ligeiros e pesados.",
  provider: {
    "@type": "TireShop",
    name: "Zigueroutine",
    legalName: "Zigueroutine - Unipessoal Lda",
    url: BASE_URL,
    telephone: "+351915883983",
    email: "info@zigueroutine.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Alfredo Cunha, N 115 Loja 54",
      addressLocality: "Matosinhos",
      addressRegion: "Porto",
      postalCode: "4450-023",
      addressCountry: "PT",
    },
    taxID: "519136683",
  },
  areaServed: [
    { "@type": "Country", name: "Portugal" },
    { "@type": "Country", name: "Spain" },
  ],
  serviceType: "Wholesale Tire Distribution",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${oswald.variable} ${barlow.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tireShopJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
