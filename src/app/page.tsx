"use client";

import { Fragment, useState } from "react";

type Tire = {
  id: number;
  brand: string;
  name: string;
  price: number;
};

type CartItem = Tire & { qty: number };

type TireList = { label: string; ecoValor: number; tires: Tire[] };

const tireLists: TireList[] = [
  {
    label: "Ligeiros",
    ecoValor: 1.65,
    tires: [
      { id: 1, brand: "Michelin", name: "195/65 R15 91V PRIMACY 4", price: 63 },
      { id: 2, brand: "Michelin", name: "205/55 R16 91V PRIMACY 5", price: 65 },
      { id: 3, brand: "Michelin", name: "225/45 R17 PILOT SPORT 5", price: 70 },
      { id: 4, brand: "Michelin", name: "225/40 R18 PILOT SPORT 5", price: 79 },
      { id: 5, brand: "Kumho", name: "195/65 R15 91H HS52", price: 37 },
      { id: 6, brand: "Kumho", name: "205/55 R16 91V HS52", price: 39 },
      { id: 7, brand: "Bridgestone", name: "205/55 R16 91V TURANZA 6", price: 54 },
      { id: 8, brand: "Bridgestone", name: "225/40 R18 92Y POTENZA SPORT", price: 64 },
      { id: 9, brand: "Goodyear", name: "205/55 R16 91V EF.GRIP PERF.2", price: 54 },
      { id: 10, brand: "Goodyear", name: "225/45 R17 91V F1 ASYMMETRIC 6", price: 64 },
    ],
  },
  {
    label: "Pesados",
    ecoValor: 13,
    tires: [
      {
        id: 11,
        brand: "Michelin",
        name: "385/65R22.5 160J XTE 3 TL",
        price: 415,
      },
      {
        id: 12,
        brand: "Universal",
        name: "385/65 R22.5 UNKS01 (REMOLQUE-REGIONAL) M+S/3PMSF 164K",
        price: 174,
      },
    ],
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+351");
  const [ordered, setOrdered] = useState(false);
  const [sending, setSending] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [activeList, setActiveList] = useState(0);

  function addToCart(tire: Tire) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === tire.id);
      if (existing) {
        return prev.map((item) =>
          item.id === tire.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...tire, qty: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing && existing.qty > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item,
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  }

  function setQty(id: number, qty: number) {
    if (qty < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item)),
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const ecoTotal = cart.reduce((sum, item) => {
    const list = tireLists.find((l) => l.tires.some((t) => t.id === item.id));
    return sum + (list?.ecoValor ?? 0) * item.qty;
  }, 0);
  const totalPrice = (subtotal + ecoTotal) * 1.23;

  async function handleOrder() {
    if (!customerName.trim() || !phone.trim()) return;
    setSending(true);
    setOrderError(false);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: `${countryCode} ${phone.trim()}`,
          items: cart.map(({ brand, name, price, qty }) => ({
            brand,
            name,
            price,
            qty,
          })),
          total: totalPrice,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrderCode(data.code);
      setOrdered(true);
      setCart([]);
      setCustomerName("");
      setPhone("");
      setTimeout(() => {
        setOrdered(false);
        setShowOrder(false);
        setCartOpen(false);
        setOrderCode(null);
      }, 3000);
    } catch {
      setOrderError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* nav */}
      <nav className="border-b border-gray-200 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 sm:px-6">
          <span className="text-sm font-bold tracking-tight">zigueroutine</span>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative flex items-center gap-1.5 text-sm hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            carrinho{totalItems > 0 && ` (${totalItems})`}
          </button>
        </div>
      </nav>

      {/* cart dropdown */}
      {cartOpen && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4">
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500">Carrinho vazio.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                        <th className="pb-2 font-normal">Pneu</th>
                        <th className="pb-2 font-normal text-center">Qtd</th>
                        <th className="pb-2 font-normal text-right">
                          Subtotal
                        </th>
                        <th className="pb-2 font-normal text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2 text-center">{item.qty}</td>
                          <td className="py-2 text-right whitespace-nowrap">
                            {(item.price * item.qty).toFixed(2)}&euro;
                          </td>
                          <td className="py-2 text-right">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              &minus;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-semibold">
                    Total: {totalPrice.toFixed(2)}&euro;
                    <span className="block text-xs font-normal text-gray-500">
                      + Eco Valor + IVA
                    </span>
                  </span>
                  <button
                    onClick={() => setShowOrder(true)}
                    className="w-full border border-gray-900 bg-gray-900 px-4 py-1.5 text-sm text-white hover:bg-gray-700 sm:w-auto"
                  >
                    Finalizar encomenda
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* main */}
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        {/* company info */}
        <section className="mb-10">
          <h1 className="mb-4 text-lg font-bold">
            Zigueroutine — Pneus em Matosinhos
          </h1>
          <p className="mb-3 text-sm text-gray-500">
            Zigueroutine - Unipessoal Lda
          </p>
          <address className="not-italic grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
            <span className="text-gray-500">Morada</span>
            <span>
              Rua Alfredo Cunha, N 115 Loja 54, Matosinhos, Porto, 4450-023
            </span>
            <span className="text-gray-500">NIF</span>
            <span>519136683</span>
            <span className="text-gray-500">Telefone</span>
            <a href="tel:+351915883983" className="hover:underline">
              +351 915 883 983
            </a>
            <span className="text-gray-500">Email</span>
            <a href="mailto:zigueroutine@gmail.com" className="hover:underline">
              zigueroutine@gmail.com
            </a>
          </address>
        </section>

        <hr className="mb-10 border-gray-200" />

        {/* tire list */}
        <section>
          <h2 className="mb-4 text-base font-bold">Pneus disponíveis</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {tireLists.map((list, i) => (
              <button
                key={list.label}
                onClick={() => setActiveList(i)}
                className={`text-sm px-2 py-1 ${
                  i === activeList
                    ? "font-bold underline underline-offset-4"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {list.label}
              </button>
            ))}
          </div>
          <div
            key={activeList}
            className="overflow-x-auto"
            style={{ animation: "fadeIn 200ms ease-in" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs text-gray-500">
                  <th className="pb-2 font-normal">Pneu</th>
                  <th className="pb-2 font-normal text-right whitespace-nowrap">
                    Preço
                  </th>
                  <th className="pb-2 font-normal text-right"></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  tireLists[activeList].tires.reduce<Record<string, Tire[]>>(
                    (acc, tire) => {
                      (acc[tire.brand] ??= []).push(tire);
                      return acc;
                    },
                    {},
                  ),
                ).map(([brand, brandTires]) => (
                  <Fragment key={brand}>
                    <tr>
                      <td
                        colSpan={3}
                        className="pt-5 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400"
                      >
                        {brand}
                      </td>
                    </tr>
                    {brandTires.map((tire) => {
                      const inCart = cart.find((item) => item.id === tire.id);
                      return (
                        <tr key={tire.id} className="border-b border-gray-100">
                          <td className="py-2.5 whitespace-nowrap">
                            {tire.name}
                          </td>
                          <td className="py-2.5 text-right whitespace-nowrap">
                            {tire.price.toFixed(2)}&euro;
                          </td>
                          <td className="py-2.5 text-right whitespace-nowrap">
                            {inCart ? (
                              <span className="inline-flex items-center gap-1 sm:gap-2">
                                <button
                                  onClick={() => removeFromCart(tire.id)}
                                  className="text-gray-400 hover:text-gray-900"
                                >
                                  &minus;
                                </button>
                                <input
                                  type="number"
                                  min={0}
                                  value={inCart.qty}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    if (isNaN(val)) return;
                                    setQty(tire.id, val);
                                  }}
                                  className="w-10 border border-gray-200 text-center text-sm outline-none focus:border-gray-900"
                                />
                                <button
                                  onClick={() => addToCart(tire)}
                                  className="text-gray-400 hover:text-gray-900"
                                >
                                  +
                                </button>
                              </span>
                            ) : (
                              <button
                                onClick={() => addToCart(tire)}
                                className="text-gray-400 hover:text-gray-900 hover:underline"
                              >
                                + adicionar
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* order modal */}
      {showOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm bg-white p-4 sm:p-6 shadow-lg">
            {ordered ? (
              <div className="text-center">
                <p className="text-sm font-semibold">
                  Encomenda <span className="font-bold">{orderCode}</span>{" "}
                  registada!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Entraremos em contacto em breve.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-4 text-sm font-bold">Finalizar encomenda</h3>
                <label className="mb-1 block text-xs text-gray-500">
                  Cliente / Empresa
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setOrderError(false);
                  }}
                  disabled={sending}
                  className="mb-4 w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 disabled:opacity-50"
                />
                <label className="mb-1 block text-xs text-gray-500">
                  Número de telefone
                </label>
                <div className="mb-4 flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={sending}
                    className="border border-gray-300 px-2 py-2 text-sm outline-none focus:border-gray-900 disabled:opacity-50"
                  >
                    <option value="+351">PT +351</option>
                    <option value="+34">ES +34</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setOrderError(false);
                    }}
                    disabled={sending}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 disabled:opacity-50"
                  />
                </div>
                {orderError && (
                  <p className="mb-3 text-sm text-red-600">
                    Erro ao enviar encomenda. Tente novamente.
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowOrder(false)}
                    disabled={sending}
                    className="flex-1 border border-gray-300 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleOrder}
                    disabled={sending}
                    className="flex-1 border border-gray-900 bg-gray-900 py-1.5 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
                  >
                    {sending ? "A enviar..." : "Confirmar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
