// src/app/sourcing/page.jsx
'use client';

export default function SourcingPage() {
    return (
        <section id="surtido">
            <h2 className="section-title">Surtido de Mercancía</h2>
            
            <div className="surtido-container">
                <h3>Agregar productos al surtido</h3>
                
                <div className="surtido-form">
                    {/* ... (Pega aquí el div con className="surtido-form") ... */}
                </div>
                
                <div id="surtidoProductInfo" className="codes-display">
                    Seleccione un producto para ver su información
                </div>
                
                <div className="surtido-nota">
                    {/* ... (Pega aquí el div con className="surtido-nota") ... */}
                </div>
                
                <div className="surtido-list" id="surtidoList"></div>
                
                <div className="surtido-actions">
                    <button className="btn btn-success">Procesar Surtido</button>
                    <button className="btn">Exportar Lista de Surtido</button>
                    <button className="btn btn-danger">Limpiar Lista</button>
                </div>
                
                <div id="surtidoResult"></div>
            </div>
            
            <div className="card">
                <h3>Instrucciones</h3>
                {/* ... (Pega aquí las instrucciones) ... */}
            </div>
        </section>
    );
}