const browserObject = require('./browser');
const scraperController = require('./pageController');

const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.get('/', async function (req, res, next) {
    const data = new Date();
    let dataFormatada = (data.getFullYear() + "-" + (adicionaZero(data.getMonth() + 1)) + "-" + (adicionaZero(data.getDate())));

    res.status(200).send({
        mensagem: "Dados serão atualizados!",
        Data: dataFormatada
    });


    //Inicia o navegador e cria uma nova instância
    let browserInstance = await browserObject.startBrowser();

    // Passa a instância do navegador para o controller do scraper
    let dados = await scraperController(browserInstance);

    let folderPath = "arquivos";
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
    }
    fs.writeFileSync(path.join(__dirname, folderPath, "relatorio-" + dataFormatada + ".json"), JSON.stringify(dados), "UTF8");
});

function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return numero;
}
module.exports = router;