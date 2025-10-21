import './global.css';
import Header from './components/layout/Header';
import SaveModal from './components/layout/SaveModal';

// Metadatos para el navegador
export const metadata = {
  title: 'Control de Caducidades',
  description: 'Sistema de gestión para Super Rivera',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* El Header se mostrará en todas las páginas */}
        <Header />
        
        {/* El contenido de cada página se renderizará aquí */}
        <main className="container">
          {children}
        </main>

        {/* Componentes globales como modales o notificaciones */}
        <SaveModal />
        <div className="save-notification" id="saveNotification">
            Datos guardados exitosamente.
        </div>
      </body>
    </html>
  );
}