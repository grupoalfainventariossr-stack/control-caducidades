// src/services/excelService.js
import * as XLSX from 'xlsx';

/**
 * Exporta un array de objetos a un archivo Excel.
 * @param {Array<Object>} data - Los datos a exportar.
 * @param {string} fileName - El nombre del archivo (sin .xlsx).
 */
export const exportDataToExcel = (data, fileName) => {
  if (!data || data.length === 0) {
    console.error("No hay datos para exportar.");
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
  
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};


/**
 * Importa datos desde un archivo Excel.
 * @param {File} file - El archivo seleccionado por el usuario.
 * @param {Array<string>} headers - Un array con los nombres de las columnas.
 * @returns {Promise<Array<Object>>} - Una promesa que resuelve a un array de objetos.
 */
export const importDataFromExcel = (file, headers) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No se proporcionó ningún archivo."));
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: headers });

        // Eliminar la primera fila si son los encabezados literales
        if (jsonData.length > 0) {
            const firstRowValues = Object.values(jsonData[0]);
            if (headers.every(h => firstRowValues.includes(h))) {
                jsonData.shift();
            }
        }
        
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};