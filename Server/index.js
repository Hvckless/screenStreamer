const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // 다른 클라이언트에게 메시지 전달

        console.log("클라어언트로부터의 메세지 " + message);
        console.log("현재 연결된 클라이언트 수 " + wss.clients.size);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });
});