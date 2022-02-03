const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const porta = process.env.PORT || 3000;
const http = require('http')
const path = require('path');

const home = require('./home');
const relatorio = require('./relatorio');
const atualizar = require('./atualizar');
const schedule = require('./schedule');

const db = require("./db");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


schedule.job();

app.get('/', async function (req, res, next) {
  let dados = [];

  const dadoRef = db.collection('dado');
  const retorno = await dadoRef.get();

  retorno.forEach(doc => {
    let data = doc.id;
    let objeto = {
      'data':data,
      'dataFormatada': formatarData(data)
    }
    dados.push(objeto);
  });

  dados.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0))


  res.render('index', {
    title: "FIIs",
    version: "0.0.2-beta",
    dados: dados
  });
});


app.post('/excluir', async function(req, res){
  const id = req.body.id;
  console.log();
  const mensagem = await db.collection('fundo').doc(id).delete();

  let fundos = await getFundos();
  res.render('fundos', {
    title: "FIIs ",
    fundos: fundos,
    mensagem: mensagem
  });
});

app.post('/fundos', async function(req, res){
 
  let obj = {
    "fundo": req.body.fundo,
    "tipo": req.body.tipo
  }

  await db.collection('fundo').doc().set(obj, { merge: true });

  let fundos = await getFundos();
  res.render('fundos', {
    title: "Fundos ",
    fundos: fundos
  });
});

app.get('/fundos', async function (req, res, next) {
  let fundos = await getFundos();

  res.render('fundos', {
    title: "Fundos ",
    fundos: fundos
  });
  
  
});

function formatarData(data) {
  return data.substring(8, 12) + "/" + data.substring(5, 7) + "/" + data.substring(0, 4);
}

async function getFundos() {
  const fundoRef = db.collection('fundo');
  const retorno = await fundoRef.get();
  let fundos = [];

  retorno.forEach(doc => {
    let dado = doc.data();
    dado.id = doc.id;
    fundos.push(dado);
  });
  fundos.sort((a,b) => (a.fundo > b.fundo) ? 1 : ((b.fundo > a.fundo) ? -1 : 0))
  return fundos;
}

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
      relatorio.sort((a,b) => (a.fundo > b.fundo) ? 1 : ((b.fundo > a.fundo) ? -1 : 0))

      res.render('dados', {
        title: "Dados do dia: " + formatarData(data),
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