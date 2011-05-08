var http = require('http'),
    io = require('socket.io'),
 
server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
//    res.write('<h1>socket.ioサンプル</h1>');
//    res.end();

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
    res.write('var m = JSON.parse(message).message;');
    res.write('if (m) {');
    res.write('$("#div1").append(m + "<br>");');
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
    res.write('<div id="div1"></div>');
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

    client.on('message', function(message) {
        client.send(message); // 自分のブラウザへ
        client.broadcast(message); // 他のブラウザへ
    });
    
    client.on('disconnect', function() {
        client.broadcast();
    });

});