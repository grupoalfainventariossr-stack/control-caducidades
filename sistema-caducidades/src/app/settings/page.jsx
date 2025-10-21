// src/app/settings/page.jsx
'use client';

export default function SettingsPage() {
    return (
        <section id="configuracion">
            <h2 className="section-title">Configuración</h2>

            <div className="card">
                <h3>Uso de almacenamiento</h3>
                <p>Revise cuánta información está almacenada en el sistema.</p>
                <button className="btn btn-success">Ver uso de almacenamiento</button>
                <div id="storageUsageResult" style={{ marginTop: '15px', fontWeight: 'bold' }}></div>
            </div>

            <div className="card">
                <h3>Datos</h3>
                <p><strong>Creado por:</strong> Alexis Aldo Ilizaliturri Alarid</p>
                <p><strong>Departamento:</strong> ALFA INVENTARIOS</p>
                <p><strong>Empresa:</strong> SUPER RIVERA</p>
                {/* En Next.js, las imágenes en public se sirven desde la raíz */}
                <img src="/logo-super-rivera1.jpg" alt="Logo Super Rivera" style={{ maxWidth: '300px' }} />
            </div>
        </section>
    );
}