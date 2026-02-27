import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://zigueroutine.com";

export const metadata: Metadata = {
  title: "Zigueroutine — Pneus em Matosinhos, Porto",
  description:
    "Venda de pneus para ligeiros e pesados em Matosinhos, Porto. Michelin, Bridgestone, Goodyear, Kumho. Preços com IVA incluído. Encomende online.",
  keywords: [
    "pneus",
    "pneus Matosinhos",
    "pneus Porto",
    "pneus ligeiros",
    "pneus pesados",
    "Michelin",
    "Bridgestone",
    "Goodyear",
    "Kumho",
    "comprar pneus online",
    "Zigueroutine",
  ],
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Zigueroutine — Pneus em Matosinhos, Porto",
    description:
      "Pneus para ligeiros e pesados. Michelin, Bridgestone, Goodyear, Kumho. Encomende online com entrega em Matosinhos e Porto.",
    url: BASE_URL,
    siteName: "Zigueroutine",
    locale: "pt_PT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TireShop",
  name: "Zigueroutine",
  legalName: "Zigueroutine - Unipessoal Lda",
  url: BASE_URL,
  telephone: "+351915883983",
  email: "zigueroutine@gmail.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
