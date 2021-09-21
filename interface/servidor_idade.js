var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var servidor = app.listen(3000, function() {
    var porta = servidor.address().port;
    console.log("Servidor executando na porta %s", porta);
});

app.get('/', function(req, res) {
    fs.readFile('idade_form.html', function(erro, dado) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});

app.post('/idade', urlencodedParser, function(req, res) {
    fs.readFile('idade_res.html', function(erro, dado) {
        var hoje = new Date();
        var idade = hoje.getFullYear() - parseInt(req.body.anonasc);
        situacao = 'Maior de idade';
        if (idade < 18)
            situacao = 'Menor de idade';
        var valores = {
            'nome': req.body.nome,
            'anonasc': req.body.anonasc,
            'idade': idade,
            'situacao': situacao
        };
        for (var chave in valores) {
            dado = dado.toString().replace("{{" + chave + "}}", valores[chave]);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();

    });
});