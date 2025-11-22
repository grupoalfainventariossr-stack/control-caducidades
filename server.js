import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Middleware con límites aumentados
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentar límite a 50MB
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));

// Rutas de datos
const dataDir = join(__dirname, 'data');

// Asegurar que existe el directorio data
async function ensureDataDir() {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        
        // Crear archivos por defecto si no existen
        const defaultFiles = {
            'products.json': [
                {
                    "codes": ["7509546686776"],
                    "descripcion": "CAPRICE 200ML SH CONT/CASPA",
                    "familia": "A1 SHAMPOO",
                    "lotes": []
                },
                {
                    "codes": ["7509546073033"],
                    "descripcion": "CAPRICE 200ML SH ESP ACTI-CERAM",
                    "familia": "A1 SHAMPOO",
                    "lotes": []
                },
                {
                    "codes": ["7509546073040"],
                    "descripcion": "CAPRICE 200ML SH ESP BIOTINA",
                    "familia": "A1 SHAMPOO",
                    "lotes": []
                }
            ],
            'users.json': [
                {
                    id: 1, 
                    username: 'admin', 
                    password: '1234', 
                    active: true, 
                    isAdmin: true, 
                    permisos: {
                        inicio: true, 
                        productos: true, 
                        surtido: true, 
                        reportes: true, 
                        historial: true, 
                        importar: true, 
                        configuracion: true
                    }
                }
            ],
            'historial.json': [],
            'destinos.json': ['Tienda 1', 'Tienda 2', 'Bodega Central', 'Sucursal Norte', 'Sucursal Sur']
        };
        
        for (const [file, defaultData] of Object.entries(defaultFiles)) {
            try {
                await fs.access(join(dataDir, file));
            } catch {
                await fs.writeFile(join(dataDir, file), JSON.stringify(defaultData, null, 2));
                console.log(`Archivo ${file} creado con datos por defecto`);
            }
        }
    } catch (error) {
        console.error('Error creando directorio data:', error);
    }
}

// Función para leer archivos JSON
async function readJSON(file) {
    try {
        const data = await fs.readFile(join(dataDir, file), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error leyendo ${file}:`, error);
        return [];
    }
}

// Función para escribir archivos JSON
async function writeJSON(file, data) {
    try {
        await fs.writeFile(join(dataDir, file), JSON.stringify(data, null, 2));
        console.log(`Archivo ${file} guardado correctamente (${data.length} elementos)`);
        return true;
    } catch (error) {
        console.error(`Error escribiendo ${file}:`, error);
        return false;
    }
}

// Middleware para log de peticiones grandes
app.use((req, res, next) => {
    const contentLength = req.get('Content-Length');
    if (contentLength > 10 * 1024 * 1024) { // 10MB
        console.log(`Petición grande recibida: ${(contentLength / 1024 / 1024).toFixed(2)}MB`);
    }
    next();
});

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await readJSON('products.json');
        console.log(`Enviando ${products.length} productos al cliente`);
        res.json(products);
    } catch (error) {
        console.error('Error cargando productos:', error);
        res.status(500).json({ error: 'Error al cargar productos' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        console.log(`Recibiendo ${req.body.length} productos para guardar`);
        const success = await writeJSON('products.json', req.body);
        if (success) {
            res.json({ success: true, message: `Guardados ${req.body.length} productos` });
        } else {
            res.status(500).json({ error: 'Error al guardar productos' });
        }
    } catch (error) {
        console.error('Error guardando productos:', error);
        res.status(500).json({ error: 'Error al guardar productos' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await readJSON('users.json');
        res.json(users);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
        res.status(500).json({ error: 'Error al cargar usuarios' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const success = await writeJSON('users.json', req.body);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ error: 'Error al guardar usuarios' });
        }
    } catch (error) {
        console.error('Error guardando usuarios:', error);
        res.status(500).json({ error: 'Error al guardar usuarios' });
    }
});

app.get('/api/historial', async (req, res) => {
    try {
        const historial = await readJSON('historial.json');
        res.json(historial);
    } catch (error) {
        console.error('Error cargando historial:', error);
        res.status(500).json({ error: 'Error al cargar historial' });
    }
});

app.post('/api/historial', async (req, res) => {
    try {
        const success = await writeJSON('historial.json', req.body);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ error: 'Error al guardar historial' });
        }
    } catch (error) {
        console.error('Error guardando historial:', error);
        res.status(500).json({ error: 'Error al guardar historial' });
    }
});

app.get('/api/destinos', async (req, res) => {
    try {
        const destinos = await readJSON('destinos.json');
        res.json(destinos);
    } catch (error) {
        console.error('Error cargando destinos:', error);
        res.status(500).json({ error: 'Error al cargar destinos' });
    }
});

app.post('/api/destinos', async (req, res) => {
    try {
        const success = await writeJSON('destinos.json', req.body);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ error: 'Error al guardar destinos' });
        }
    } catch (error) {
        console.error('Error guardando destinos:', error);
        res.status(500).json({ error: 'Error al guardar destinos' });
    }
});

// Ruta de salud para verificar que el servidor funciona
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Servir la aplicación
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Manejo de errores global
app.use((error, req, res, next) => {
    if (error.type === 'entity.too.large') {
        console.error('Payload demasiado grande:', error);
        return res.status(413).json({ 
            error: 'Payload demasiado grande', 
            message: 'El tamaño de los datos excede el límite permitido',
            limit: '50MB'
        });
    }
    next(error);
});

// Inicializar y arrancar servidor
async function startServer() {
    await ensureDataDir();
    
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`🌐 Accesible desde otras computadoras en la red local`);
        console.log(`📁 Datos guardados en: ${dataDir}`);
        console.log(`⚙️  Límite de payload: 50MB`);
        console.log(`🔧 Para acceder desde otras PCs usa: http://[IP_DEL_SERVIDOR]:${PORT}`);
    });
}

startServer().catch(console.error);