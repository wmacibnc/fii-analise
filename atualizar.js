const browserObject = require('./browser');

const db = require("./db");

const express = require('express');
const router = express.Router();

const urlBase = 'https://www.fundsexplorer.com.br/funds/';

router.get('/', async function (req, res, next) {
    const data = new Date();
    let dataFormatada = (data.getFullYear() + "-" + (adicionaZero(data.getMonth() + 1)) + "-" + (adicionaZero(data.getDate())));

    res.status(200).send({
        mensagem: "Dados serão atualizados!",
        Data: dataFormatada
    });

    const fundoRef = db.collection('fundo');
    const retorno = await fundoRef.get();
    let fundos = [];
    retorno.forEach(doc => {
        fundos.push(doc.data());
    });

    let dados = [];
    for (fundo of fundos) {
        let inicio = new Date();
        let retorno = await scraper(urlBase + fundo.fundo, fundo.tipo);
        console.log(new Date() + ' Sincronizado em : ' + (new Date().getTime() - inicio.getTime()) + ' ms - ' + retorno.fundo);
        dados.push(retorno);
    }

    const obj = {
        'dados': dados
    }
    try {
        await
            db
                .collection('dado')
                .doc(dataFormatada)
                .set(obj, { merge: true });
    } catch (error) {
        console.log(error);
    }
});

async function scraper(url, tipo) {
    // Criando instância do navegador
    const browser = await browserObject.startBrowser();

    // Criando uma nova página
    let page = await browser.newPage();

    // Definindo que a requisição não tem timeout
    await page.setDefaultNavigationTimeout(0);

    console.log(`Abrindo url ${url}...`);
    await page.goto(url);

    const xPathUltimoRendimento = '//*[@id="main-indicators-carousel"]/div/div/div[2]/span[2]';
    const xPathDividendoYield = '//*[@id="main-indicators-carousel"]/div/div/div[3]/span[2]';
    const xPathPvP = '//*[@id="main-indicators-carousel"]/div/div/div[7]/span[2]';
    const xPathValorCota = '//*[@id="stock-price"]/span[1]';

    const fundo = url.split("/")[4];
    const ultimoRendimento = await obterDado(page, xPathUltimoRendimento);
    const dividendoYield = await obterDado(page, xPathDividendoYield);
    const pvp = await obterDado(page, xPathPvP);
    const valorCota = await obterDado(page, xPathValorCota);

    // Fechando o navegador
    browser.close();

    return {
        'fundo': fundo.toUpperCase(),
        'tipo': tipo,
        'ultimoRendimento': ultimoRendimento,
        'dividendoYield': dividendoYield,
        'pvp': pvp,
        'valorCota': valorCota
    }

}

async function obterDado(page, xPath) {
    const [getxPath] = await page.$x(xPath);
    const valor = await page.evaluate(name => name.innerText, getxPath);
    return valor;
}

function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return numero;
}

module.exports = router;