// src/app/api/products/route.js
import { NextResponse } from 'next/server';

// Datos de ejemplo que antes estaban en tu <script>
const mockProducts = [
    {
        "id": "1", // Es buena práctica tener un ID único
        "codes": ["7509546686776"],
        "descripcion": "CAPRICE 200ML SH CONT/CASPA",
        "familia": "A1 SHAMPOO",
        "lotes": []
    },
    {
        "id": "2",
        "codes": ["7509546073033"],
        "descripcion": "CAPRICE 200ML SH ESP ACTI-CERAM",
        "familia": "A1 SHAMPOO",
        "lotes": []
    },
    {
        "id": "3",
        "codes": ["7509546073040"],
        "descripcion": "CAPRICE 200ML SH ESP BIOTINA",
        "familia": "A1 SHAMPOO",
        "lotes": []
    }
];

// Función para manejar peticiones GET
export async function GET(request) {
  // En un futuro, aquí harías:
  // const productsFromDb = await query('SELECT * FROM products');
  // return NextResponse.json(productsFromDb);

  // Por ahora, devolvemos los datos de ejemplo
  return NextResponse.json(mockProducts);
}

// Aquí también agregarías funciones POST, PUT, DELETE para crear, actualizar y borrar