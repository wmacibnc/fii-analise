const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs')
const http = require('http')


const home = require('./home');
const relatorio = require('./relatorio');
const atualizar = require('./atualizar');


// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let dados = [];

fs.readdir('./arquivos', (err, paths) => {
    console.log(paths);
    dados = paths;
});
  
app.get('/', function(req, res, next) {
    res.render('index', {
        title: "FIIs",
        version: "0.0.1-beta",
        dados: dados       
    });
});


app.get('/dados', async function(req, res, next) {
    let data = req.query.data;
    let tipo = req.query.tipo;

    const options = {
        hostname: 'localhost',
        port: porta,
        path: '/relatorio?data=' + data,
        secure:false,
        method: 'GET',
        requireTLC: false,
    }
      
      const requisicao = await http.request(options, resposta => {
        console.log(`statusCode: ${resposta.statusCode}`)
      
        resposta.on('data', async d => {
          let relatorio = JSON.parse(d);

          if(tipo){
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