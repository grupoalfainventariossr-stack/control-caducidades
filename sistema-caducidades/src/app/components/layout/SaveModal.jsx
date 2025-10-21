// src/app/components/layout/SaveModal.jsx
'use client';

// NOTA: La lógica de guardado real se conectará más adelante.
// Por ahora, solo cerramos el modal.
const closeSaveModal = () => {
    const modal = document.getElementById('saveModal');
    if (modal) {
        modal.style.display = 'none';
    }
};

export default function SaveModal() {
  return (
    <div className="modal" id="saveModal">
      <div className="modal-content">
        <h3>Guardar en Excel</h3>
        <p>¿Cómo desea guardar el archivo?</p>
        <div className="modal-buttons">
          <button className="btn" onClick={() => console.log('Guardar como nuevo')}>
            Guardar como nuevo
          </button>
          <button className="btn btn-success" onClick={() => console.log('Sobrescribir')}>
            Sobrescribir existente
          </button>
          <button className="btn btn-danger" onClick={closeSaveModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}