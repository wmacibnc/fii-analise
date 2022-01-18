const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const http = require('http')
const path = require('path');

const home = require('./home');
const relatorio = require('./relatorio');
const atualizar = require('./atualizar');
const schedule = require('./schedule');

const db = require("./db");


// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


schedule.job();

app.get('/', async function (req, res, next) {
  let dados = [];

  const dadoRef = db.collection('dado');
  const retorno = await dadoRef.get();

  retorno.forEach(doc => {
    dados.push(doc.id);
  });

  res.render('index', {
    title: "FIIs",
    version: "0.0.1-beta",
    dados: dados
  });
});

app.post('/fundos', function(req, res){
  console.log("teste: " + JSON.stringify(req.body));
  console.log(req.body.email);
  console.log(req.body.tipo);
});

app.get('/fundos', async function (req, res, next) {

  const fundoRef = db.collection('fundo');
  const retorno = await fundoRef.get();
  let fundos = [];

  retorno.forEach(doc => {
    fundos.push(doc.data());
  });

  res.render('fundos', {
    title: "Fundos ",
    fundos: fundos
  });

});

app.get('/dados', async function (req, res, next) {
  let data = req.query.data;
  let tipo = req.query.tipo;

  const options = {
    hostname: 'localhost',
    port: porta,
    path: '/relatorio?data=' + data,
    secure: false,
    method: 'GET',
    requireTLC: false,
  }

  const requisicao = await http.request(options, resposta => {
    resposta.on('data', async d => {
      let relatorio = JSON.parse(d);

      if (tipo) {
        const isTipo = fii => fii.tipo === tipo;
        relatorio = await relatorio.filter(isTipo);
      }

      res.render('dados', {
        title: "Dados do dia: " + data,
        relatorio: relatorio,
        data: data
      });
    })
  })

  requisicao.on('error', error => {
    console.error(error)
  })

  requisicao.end();
});

app.listen(porta, function () {
  console.log(`app executando na porta ${porta}`)
});

//Rotas
app.use('/home', home);
app.use('/relatorio', relatorio);
app.use('/atualizar', atualizar);