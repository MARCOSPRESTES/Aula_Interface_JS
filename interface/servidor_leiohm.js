var express = require('express');
var fs = require('fs');
var http = require('http');

var app = express()
var bodyParser = require('body-Parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var servidor = app.listen(8080, function() {
    var porta = servidor.address().port;
    console.log('Servidor executando na porta %s', porta);
});

app.get('/', function(req, res) {
    fs.readFile('leiohm_form.html', function(erro, dado) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});

app.post('/ohm', urlencodedParser, function(req, res) {
    fs.readFile('leiohm_res.html', function(erro, dado) {
        var corrente = parseFloat(req.body.corrente);
        var tensao = parseFloat(req.body.tensao);
        var resist = tensao / corrente;

        var valores = {
            'corrente': corrente,
            'tensao': tensao,
            'resist': resist

        };
        for (var chave in valores) {
            dado = dado.toString().replace("{{" + chave + "}}", valores[chave]);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();

    });
});