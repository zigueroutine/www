import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "node:fs/promises";
import path from "node:path";

const resend = new Resend(process.env.RESEND_API_KEY);

const ORDERS_DIR = path.join(process.cwd(), "data", "orders");

function generateCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l1 = letters[Math.floor(Math.random() * 26)];
  const l2 = letters[Math.floor(Math.random() * 26)];
  const digits = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `${l1}${l2}${digits}`;
}

async function uniqueCode(): Promise<string> {
  await fs.mkdir(ORDERS_DIR, { recursive: true });
  const existing = new Set(
    (await fs.readdir(ORDERS_DIR))
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""))
  );
  let code = generateCode();
  while (existing.has(code)) {
    code = generateCode();
  }
  return code;
}

export async function POST(request: Request) {
  try {
    const { customerName, phone, items, total } = await request.json();

    if (!customerName || typeof customerName !== "string" || !customerName.trim()) {
      return NextResponse.json(
        { error: "Nome do cliente é obrigatório." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { error: "Número de telefone é obrigatório." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "A encomenda deve ter pelo menos um item." },
        { status: 400 }
      );
    }

    const code = await uniqueCode();

    await fs.writeFile(
      path.join(ORDERS_DIR, `${code}.json`),
      JSON.stringify(
        { code, customerName: customerName.trim(), phone: phone.trim(), items, total, createdAt: new Date().toISOString() },
        null,
        2
      )
    );

    const rows = items
      .map(
        (item: { brand: string; name: string; price: number; qty: number }) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #eee">${item.brand} ${item.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">${item.qty}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${(item.price * item.qty).toFixed(2)}&euro;</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
        <h2 style="margin-bottom:4px">Encomenda ${code}</h2>
        <p style="color:#666;margin-top:0">Cliente: <strong>${customerName.trim()}</strong></p>
        <p style="color:#666;margin-top:0">Telefone: <strong>${phone.trim()}</strong></p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr style="background:#f9f9f9">
              <th style="padding:8px 12px;text-align:left">Pneu</th>
              <th style="padding:8px 12px;text-align:center">Qtd</th>
              <th style="padding:8px 12px;text-align:right">Subtotal</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p style="font-size:16px;font-weight:bold;text-align:right;margin-top:12px">
          Total: ${Number(total).toFixed(2)}&euro;
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Zigueroutine <onboarding@resend.dev>",
      to: process.env.ORDER_NOTIFICATION_EMAIL!,
      subject: `Nova encomenda ${code} — ${phone.trim()}`,
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: "Falha ao enviar email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, code });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
