/*Desenvolver uma aplicação web em Node.js para uma determinada
 loja que precisa calcular o preço de venda de um produto. 
 O cálculo deverá ser efetuado através da multiplicação do preço
  unitário pela quantidade vendida e, posteriormente, subtrair 
  o valor do desconto. Considerar todas as variáveis do tipo de dado real, 
  que serão digitadas pelo usuário através de um formulário HTML.*/

var express = require('express');
var fs = require('fs');
var http = require('http');

var app = express();
var bodyParser = require('body-Parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var servidor = app.listen(8080, function(req, res) {
    var porta = servidor.address().port;
    console.log('Servidor Executando na porta %s', porta);
});

app.get('/', function(req, res) {
    fs.readFile('desc_form.html', function(erro, dado) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});

app.post('/desconto', urlencodedParser, function(req, res) {
    fs.readFile('desc_res.html', function(erro, dado) {
        var preco = parseFloat(req.body.preco);
        var quant = parseInt(req.body.quant);
        var desconto = parseFloat(req.body.desconto);
        var valor_venda = parseFloat((preco * quant) - desconto);

        var valores = {
            'preco': preco,
            'quant': quant,
            'desconto': desconto,
            'valor_venda': valor_venda
        };
        for (var chave in valores) {
            dado = dado.toString().replace("{{" + chave + "}}", valores[chave]);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});