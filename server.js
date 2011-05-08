var http = require('http'),
    io = require('socket.io'),
 
server = http.createServer();
server.listen(8124);
 
var socket = io.listen(server);
socket.on('connection', function(client) {
    
	client.send(JSON.stringify({ connections: client.listener.server.connections }));

    client.on('message', function(message) {
        client.send(message); // 自分のブラウザへ
        client.broadcast(message); // 他のブラウザへ
    });
    
    client.on('disconnect', function() {
        client.broadcast();
    });

});