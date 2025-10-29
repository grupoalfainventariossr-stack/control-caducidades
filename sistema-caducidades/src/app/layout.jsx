// src/app/layout.jsx
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Control de Caducidades",
  description: "Sistema de control de caducidades, inventario y surtido",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <div className="container">{children}</div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
