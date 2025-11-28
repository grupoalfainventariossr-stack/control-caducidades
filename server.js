import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/database.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Historial from './models/Historial.js';
import Destino from './models/Destino.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));

// Conectar a MongoDB
let dbConnected = false;
try {
    dbConnected = await connectDB();
    if (!dbConnected) {
        console.log('❌ MongoDB no disponible. Por favor, instala MongoDB o ejecuta el servidor con archivos JSON.');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
}

// Inicializar datos por defecto
async function initializeDefaultData() {
    try {
        // Usuario admin - solo crear si no existe
        const adminExists = await User.findOne({ username: 'admin' });
        if (!adminExists) {
            await User.create({
                username: 'admin',
                password: '1234',
                active: true,
                isAdmin: true,
                permisos: {
                    inicio: true, productos: true, productosEditar: true,
                    surtido: true, reportes: true, historial: true,
                    importar: true, configuracion: true
                }
            });
            console.log('✅ Usuario admin creado');
        } else {
            console.log('✅ Usuario admin ya existe');
        }

        // Destinos por defecto
        const destinosPorDefecto = ['Tienda 1', 'Tienda 2', 'Bodega Central', 'Sucursal Norte', 'Sucursal Sur'];
        for (const destinoNombre of destinosPorDefecto) {
            const destinoExists = await Destino.findOne({ nombre: destinoNombre });
            if (!destinoExists) {
                await Destino.create({ nombre: destinoNombre });
            }
        }
        console.log('✅ Destinos inicializados');

        // Verificar si hay productos
        const productCount = await Product.countDocuments();
        console.log(`✅ Base de datos lista. Productos existentes: ${productCount}`);

    } catch (error) {
        console.error('Error inicializando datos:', error);
    }
}

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ descripcion: 1 });
        console.log(`📦 Enviando ${products.length} productos al cliente`);
        res.json(products);
    } catch (error) {
        console.error('Error cargando productos:', error);
        res.status(500).json({ error: 'Error al cargar productos' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        console.log(`💾 Recibiendo ${req.body.length} productos para guardar`);
        await Product.deleteMany({});
        const savedProducts = await Product.insertMany(req.body);
        console.log(`✅ Guardados ${savedProducts.length} productos en MongoDB`);
        res.json({ success: true, message: `Guardados ${savedProducts.length} productos` });
    } catch (error) {
        console.error('Error guardando productos:', error);
        res.status(500).json({ error: 'Error al guardar productos' });
    }
});

app.get('/api/historial', async (req, res) => {
    try {
        const historial = await Historial.find().sort({ fecha: -1 });
        console.log(`📊 Enviando ${historial.length} registros de historial`);
        res.json(historial);
    } catch (error) {
        console.error('Error cargando historial:', error);
        res.status(500).json({ error: 'Error al cargar historial' });
    }
});

app.post('/api/historial', async (req, res) => {
    try {
        const nuevoHistorial = await Historial.create(req.body);
        console.log(`✅ Guardado nuevo registro en historial`);
        res.json({ success: true, data: nuevoHistorial });
    } catch (error) {
        console.error('Error guardando historial:', error);
        res.status(500).json({ error: 'Error al guardar historial' });
    }
});

app.get('/api/destinos', async (req, res) => {
    try {
        const destinos = await Destino.find().sort({ nombre: 1 });
        console.log(`📍 Enviando ${destinos.length} destinos`);
        res.json(destinos.map(d => d.nombre));
    } catch (error) {
        console.error('Error cargando destinos:', error);
        res.status(500).json({ error: 'Error al cargar destinos' });
    }
});

app.post('/api/destinos', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            await Destino.deleteMany({});
            const destinosObjects = req.body.map(nombre => ({ nombre }));
            await Destino.insertMany(destinosObjects);
            console.log(`✅ Guardados ${req.body.length} destinos`);
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Datos inválidos' });
        }
    } catch (error) {
        console.error('Error guardando destinos:', error);
        res.status(500).json({ error: 'Error al guardar destinos' });
    }
});

// NUEVAS RUTAS PARA USUARIOS
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().sort({ username: 1 });
        console.log(`👥 Enviando ${users.length} usuarios`);
        res.json(users);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
        res.status(500).json({ error: 'Error al cargar usuarios' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        console.log('💾 Guardando usuarios en MongoDB');
        await User.deleteMany({});
        const savedUsers = await User.insertMany(req.body);
        console.log(`✅ Guardados ${savedUsers.length} usuarios en MongoDB`);
        res.json({ success: true, message: `Guardados ${savedUsers.length} usuarios` });
    } catch (error) {
        console.error('Error guardando usuarios:', error);
        res.status(500).json({ error: 'Error al guardar usuarios' });
    }
});

// Ruta individual para crear/actualizar usuario
app.post('/api/user', async (req, res) => {
    try {
        const { id, username, password, active, isAdmin, permisos } = req.body;
        
        if (id) {
            // Actualizar usuario existente
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { username, password, active, isAdmin, permisos },
                { new: true }
            );
            console.log(`✅ Usuario actualizado: ${username}`);
            res.json({ success: true, data: updatedUser });
        } else {
            // Crear nuevo usuario
            const newUser = await User.create({
                username,
                password,
                active,
                isAdmin,
                permisos
            });
            console.log(`✅ Nuevo usuario creado: ${username}`);
            res.json({ success: true, data: newUser });
        }
    } catch (error) {
        console.error('Error guardando usuario:', error);
        res.status(500).json({ error: 'Error al guardar usuario' });
    }
});

// Ruta para eliminar usuario
app.delete('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        console.log(`✅ Usuario eliminado: ${id}`);
        res.json({ success: true, message: 'Usuario eliminado' });
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

// Ruta de login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, active: true });
        
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado o inactivo' });
        }
        
        if (user.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        
        // Eliminar password del objeto de respuesta por seguridad
        const userResponse = { ...user.toObject() };
        delete userResponse.password;
        
        res.json({ success: true, user: userResponse });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Ruta de salud
app.get('/api/health', async (req, res) => {
    try {
        const productsCount = await Product.countDocuments();
        const usersCount = await User.countDocuments();
        const historialCount = await Historial.countDocuments();
        const destinosCount = await Destino.countDocuments();
        
        res.json({ 
            status: 'ok', 
            message: 'Servidor con MongoDB funcionando correctamente',
            database: 'MongoDB',
            timestamp: new Date().toISOString(),
            stats: {
                productos: productsCount,
                usuarios: usersCount,
                historial: historialCount,
                destinos: destinosCount
            }
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            message: 'Error en el servidor',
            error: error.message 
        });
    }
});

// Servir la aplicación
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Inicializar y arrancar servidor
async function startServer() {
    await initializeDefaultData();
    
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
        console.log(`🗄️  Base de datos: MongoDB`);
        console.log(`🌐 Accesible desde otras computadoras`);
        console.log(`❤️  Ruta de salud: http://localhost:${PORT}/api/health`);
    });
}

startServer().catch(console.error);