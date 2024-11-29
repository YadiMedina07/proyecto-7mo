import mongoose from 'mongoose';
import dns from 'dns';
import net from 'net';

// URI de MongoDB Atlas (Producción)
const atlasURI = 'mongodb+srv://Yadira:Yadi0730@bdyadi.y6ydwjr.mongodb.net/proyecto-corazon?retryWrites=true&w=majority';

// URI local para la base de datos 'Refaccionaria'
const localURI = 'mongodb://localhost:27017/proyecto-corazon';

// Función para conectar a MongoDB con reintento automático
const connectWithRetry = (uri) => {
  mongoose.connect(uri,)
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch((err) => {
      console.error('Error al conectar a la DB:', err);
      dns.resolve('www.google.com', (dnsErr) => {
        if (dnsErr) {
          console.error('Problema de conectividad a internet, reintentando...');
        } else if (!net.isIP('cluster0.dnsqacd.mongodb.net')) {
          console.error('No se puede resolver el DNS de la base de datos, reintentando...');
        } else {
          console.error('Error desconocido, reintentando...');
        }
        setTimeout(() => connectWithRetry(uri), 5000); // Reintenta cada 5 segundos
      });
    });
};

// Conecta usando la URI local o de producción según sea necesario
//connectWithRetry(localURI); // Descomentar para entorno de desarrollo local
connectWithRetry(atlasURI); // Comentar para usar entorno local

export default mongoose;
