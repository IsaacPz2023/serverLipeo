const WebSocket = require('ws');
const http = require('http');
const server =  http.createServer();
const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws) => {
    // Manejar la conexión WebSocket aquí
    ws.on('message', (message) => {
      console.log(`Mensaje recibido: ${message}`);
    });
  });


wss.on('connection', handleConnection);

function handleConnection(ws) {

    try {
        const id = Math.random();
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        const metadata = { id, color };
        clients.set(ws, metadata);
    
        ws.on('error', handleError);
        ws.on('message', handleMessage);
        ws.send('Conectado A Web Socket Server CHAT LIPEO');//Este_ Mensaje Retorna Cuando Se Entra Al Chat De Usuario ,Significa Que inicia El socket Cuando Lo abres
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
   
    
}

function handleError(error) {
    console.error('Error en la conexión:', error);
    // Puedes añadir acciones específicas en caso de error.
}

function handleMessage(data) {
    try {
        console.log('Datos Recibidos: %s', data);// Aqui Se Imprime LA data lo que significa que esta funcion es quien recibe los mensajes del cliente

        wss.clients.forEach(client => {
            const senderMetadata = clients.get(this);
            if (client !== this && client.readyState === WebSocket.OPEN) {//verifica que este abierto el socket 
                client.send(data + ' from ' + senderMetadata.id);//y aqui se lo envia al cliente existen con el cual tiene el chat 
            }
        });
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
   
}


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket iniciado en el puerto ${PORT}`);
});
