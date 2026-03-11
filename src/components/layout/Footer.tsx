export function Footer() {
  return (
    <footer className="bg-bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Brand + Contact */}
          <div>
            <div className="font-heading text-2xl font-bold tracking-wider mb-4">
              <span className="text-text">zigue</span>
              <span className="text-secondary">.</span>
              <span className="text-text">routine</span>
            </div>
            <p className="text-text-muted leading-relaxed mb-6">
              Distribuidora de pneus por grosso em Portugal e Espanha. Fornecedor
              de marcas premium para ligeiros e pesados.
            </p>
            <ul className="space-y-2 text-text-muted text-sm">
              <li>Rua Alfredo Cunha, N 115 Loja 54, Matosinhos</li>
              <li>
                <a href="tel:+351915883983" className="hover:text-secondary transition-colors">
                  +351 915 883 983
                </a>
              </li>
              <li>
                <a href="mailto:info@zigueroutine.com" className="hover:text-secondary transition-colors">
                  info@zigueroutine.com
                </a>
              </li>
              <li>NIF 519136683</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Sobre", href: "#about" },
                { label: "Catálogo", href: "#products" },
                { label: "Porquê Nós", href: "#why-us" },
                { label: "FAQ", href: "#faq" },
                { label: "Contacto", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-text-muted hover:text-secondary transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Zigueroutine - Unipessoal Lda. Todos
          os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
