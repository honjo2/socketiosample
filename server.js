var http = require('http'),
    io = require('socket.io'),
 
server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html>');
    res.write('<html lang="ja">');
    res.write('<meta charset="utf-8">');
    res.write('<head>');
    res.write('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>');
    res.write('<script type="text/javascript" src="http://cdn.socket.io/stable/socket.io.js"></script>');
    res.write('<script>');
    res.write('$(function() {');
    res.write('var socket = new io.Socket("socketiosample.duostack.net", { port: 80 });');
    res.write('socket.connect();');
    res.write('socket.on("message", function(message) {');
    res.write('var json = JSON.parse(message);');
    res.write('if (json.connections) {');
    res.write('$("#connections").html(json.connections);');
    res.write('}');
    res.write('if (json.message) {');
    res.write('$("#message").append(json.message + "<br>");');
    res.write('}');
    res.write('});');
    res.write('socket.on("disconnect", function(message) {');
    res.write('$("#div1").append("切断されました");');
    res.write('});');
    res.write('$("#form1").submit(function(e) {');
    res.write('socket.send(JSON.stringify({ message: $("#text1").val() }));');
    res.write('return false;');
    res.write('});');
    res.write('});');
    res.write('</script>');
    res.write('</head>');
    res.write('<body>');
    res.write('接続クライアント数&nbsp;<span id="connections"></span>');
    res.write('<br/><br/>');
    res.write('<div id="message"></div>');
    res.write('<br/>');
    res.write('何か入力してください');
    res.write('<form id="form1">');
    res.write('<input id="text1" type="text"/><input type="submit"/>');
    res.write('</form>');
    res.write('</body>');
    res.end('</html>');
    
});
server.listen(8124);
 
var socket = io.listen(server);
socket.on('connection', function(client) {
    
	client.send(JSON.stringify({ connections: client.listener.server.connections }));
    client.broadcast(JSON.stringify({ connections: client.listener.server.connections }));

    client.on('message', function(message) {
        client.send(message);
        client.broadcast(message);
    });
    
    client.on('disconnect', function() {
        client.broadcast(JSON.stringify({ connections: client.listener.server.connections }));
    });

});