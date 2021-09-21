var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//Conexão com BD MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cadastrados'
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stak);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM cadastrados.cadastrados', function(err, rows, fields) {
    if (!true) {
        console.log('Resultado :', rows);
    } else {
        console.log('Erro ao realizar a consulta');
    }
});

var servidor = app.listen(4000, function() {
    var porta = servidor.address().port;
    console.log("Servidor executando na porta %s", porta);
});

app.get('/', function(req, res) {
    fs.readFile('cadastro_form.html', function(erro, dado) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});