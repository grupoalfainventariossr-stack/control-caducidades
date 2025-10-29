// src/components/Header.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const tabs = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/products", label: "Productos" },
  { href: "/surtido", label: "Surtido" },
  { href: "/reports", label: "Reportes" },
  { href: "/historial-surtido", label: "Historial Surtido" },
  { href: "/importar", label: "Importar" },
  { href: "/settings", label: "Configuración" },
];

export default function Header() {
  const pathname = usePathname() || "/dashboard";
  const [open, setOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="hdr-wrap">
        <h1 className="hdr-title">Control de Caducidades</h1>

        <button
          aria-label="Menu"
          className="btn btn-sm hdr-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`hdr-nav ${open ? "open" : ""}`}>
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`btn ${active ? "btn-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {t.label}
              </Link>
            );
          })}
          {/* El botón de guardar abrirá un modal o triggerá una acción en las páginas */}
          <Link href="/reports" className="btn btn-success">
            Guardar en Excel
          </Link>
        </nav>
      </div>
    </header>
  );
}
