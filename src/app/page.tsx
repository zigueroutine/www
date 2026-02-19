"use client";

import { Fragment, useState } from "react";

type Tire = {
  id: number;
  brand: string;
  name: string;
  price: number;
};

type CartItem = Tire & { qty: number };

type TireList = { label: string; tires: Tire[] };

const tireLists: TireList[] = [
  {
    label: "Ligeiros",
    tires: [
      { id: 1, brand: "Michelin", name: "205/55 R16 91V", price: 62 },
      { id: 2, brand: "Michelin", name: "195/65 R15 91H", price: 55 },
      { id: 3, brand: "Michelin", name: "225/45 R17 94W", price: 78 },
      { id: 4, brand: "Continental", name: "185/60 R15 84T", price: 48 },
      { id: 5, brand: "Continental", name: "215/55 R17 98W", price: 85 },
      { id: 6, brand: "Bridgestone", name: "225/40 R18 92Y", price: 95 },
      { id: 7, brand: "Bridgestone", name: "195/55 R16 87H", price: 58 },
      { id: 8, brand: "Bridgestone", name: "235/55 R19 105V", price: 110 },
    ],
  },
  {
    label: "SUV",
    tires: [
      { id: 9, brand: "Michelin", name: "235/65 R17 108V", price: 98 },
      { id: 10, brand: "Michelin", name: "255/55 R18 109V", price: 115 },
      { id: 11, brand: "Continental", name: "215/65 R16 98H", price: 82 },
      { id: 12, brand: "Continental", name: "235/60 R18 107V", price: 105 },
      { id: 13, brand: "Bridgestone", name: "225/65 R17 102H", price: 90 },
      { id: 14, brand: "Bridgestone", name: "255/50 R19 107Y", price: 130 },
    ],
  },
  {
    label: "Comerciais",
    tires: [
      { id: 15, brand: "Michelin", name: "215/75 R16C 116R", price: 88 },
      { id: 16, brand: "Michelin", name: "225/70 R15C 112S", price: 75 },
      { id: 17, brand: "Continental", name: "195/75 R16C 107R", price: 72 },
      { id: 18, brand: "Continental", name: "235/65 R16C 115R", price: 95 },
      { id: 19, brand: "Bridgestone", name: "205/75 R16C 110R", price: 80 },
      { id: 20, brand: "Bridgestone", name: "215/65 R16C 109T", price: 85 },
    ],
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [phone, setPhone] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [activeList, setActiveList] = useState(0);

  function addToCart(tire: Tire) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === tire.id);
      if (existing) {
        return prev.map((item) =>
          item.id === tire.id ? { ...item, qty: item.qty + 1 } : item
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
          item.id === id ? { ...item, qty: item.qty - 1 } : item
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
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleOrder() {
    if (!phone.trim()) return;
    setOrdered(true);
    setCart([]);
    setPhone("");
    setTimeout(() => {
      setOrdered(false);
      setShowOrder(false);
      setCartOpen(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* nav */}
      <nav className="border-b border-gray-200 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 sm:px-6">
          <span className="text-sm font-bold tracking-tight">zigueroutine</span>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative text-sm hover:underline"
          >
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
                        <th className="pb-2 font-normal text-right">Subtotal</th>
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
          <h1 className="mb-4 text-lg font-bold">Zigueroutine</h1>
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
            <span className="text-gray-500">Morada</span>
            <span>Rua Exemplo 123, 1000-001 Lisboa</span>
            <span className="text-gray-500">NIF</span>
            <span>123 456 789</span>
            <span className="text-gray-500">Telefone</span>
            <span>+351 912 345 678</span>
            <span className="text-gray-500">Email</span>
            <span>geral@zigueroutine.pt</span>
          </div>
        </section>

        <hr className="mb-10 border-gray-200" />

        {/* tire list */}
        <section>
          <h2 className="mb-4 text-base font-bold">Pneus</h2>
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
                  <th className="pb-2 font-normal text-right whitespace-nowrap">Preço</th>
                  <th className="pb-2 font-normal text-right"></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  tireLists[activeList].tires.reduce<Record<string, Tire[]>>((acc, tire) => {
                    (acc[tire.brand] ??= []).push(tire);
                    return acc;
                  }, {})
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
                          <td className="py-2.5 whitespace-nowrap">{tire.name}</td>
                          <td className="py-2.5 text-right whitespace-nowrap">{tire.price.toFixed(2)}&euro;</td>
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
                <p className="text-sm font-semibold">Encomenda registada!</p>
                <p className="mt-1 text-sm text-gray-500">
                  Entraremos em contacto em breve.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-4 text-sm font-bold">Finalizar encomenda</h3>
                <label className="mb-1 block text-xs text-gray-500">
                  Número de telefone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+351 9XX XXX XXX"
                  className="mb-4 w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowOrder(false)}
                    className="flex-1 border border-gray-300 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleOrder}
                    className="flex-1 border border-gray-900 bg-gray-900 py-1.5 text-sm text-white hover:bg-gray-700"
                  >
                    Confirmar
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
