const fs = require('fs');
const path = require('path');
const browserObject = require('./browser');

const urlBase = 'https://www.fundsexplorer.com.br/funds/';

async function job() {
    while (true) {

        const fundos = [
            {
                "fundo": "ALZR11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "BCRI11",
                "tipo": "Papel",
            },
            {
                "fundo": "BRCO11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "BRCR11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "BTLG11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "CORM11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "CPTS11",
                "tipo": "Papel",
            },
            {
                "fundo": "CVBI11",
                "tipo": "Papel",
            },
            {
                "fundo": "DEVA11",
                "tipo": "Papel",
            },
            {
                "fundo": "GGRC11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "HCTR11",
                "tipo": "Papel",
            },
            {
                "fundo": "HGBS11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "HGLG11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "HGRE11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "HGRU11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "HSML11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "IRDM11",
                "tipo": "Papel",
            },
            {
                "fundo": "KISU11",
                "tipo": "Fundo de Fundos",
            },
            {
                "fundo": "KNRI11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "KNSC11",
                "tipo": "Papel",
            },
            {
                "fundo": "LGCP11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "MALL11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "MCCI11",
                "tipo": "Papel",
            },
            {
                "fundo": "MXRF11",
                "tipo": "Papel",
            },
            {
                "fundo": "RBRF11",
                "tipo": "Fundo de Fundos",
            },
            {
                "fundo": "RBRP11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "RBRR11",
                "tipo": "Papel",
            },
            {
                "fundo": "RECR11",
                "tipo": "Papel",
            },
            {
                "fundo": "RRCI11",
                "tipo": "Papel",
            },
            {
                "fundo": "TORD11",
                "tipo": "Híbrido",
            },
            {
                "fundo": "TRXF11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "VGIP11",
                "tipo": "Papel",
            },
            {
                "fundo": "VILG11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "VISC11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "VSLH11",
                "tipo": "Híbrido",
            },
            {
                "fundo": "XPLG11",
                "tipo": "Tijolo",
            },
            {
                "fundo": "XPML11",
                "tipo": "Tijolo",
            }
        ];
        let dados = [];
        for (let dado in fundos) {
            let inicio = new Date();
            let retorno = await scraper(urlBase + fundos[dado].fundo, fundos[dado].tipo);
            console.log('Sincronizado em : ' + (new Date().getTime() - inicio.getTime()) + ' ms - ' + retorno.fundo);
            dados.push(retorno);
        }

        console.log("DADOS:" + JSON.stringify(dados));

        let folderPath = "arquivos";
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
        }

        const data = new Date();
        let dataFormatada = (data.getFullYear() + "-" + (adicionaZero(data.getMonth() + 1)) + "-" + (adicionaZero(data.getDate())));

        fs.writeFileSync(path.join(__dirname, folderPath, "relatorio-" + dataFormatada + ".json"), JSON.stringify(dados), "UTF8");
        await sleep(12 * 36 * 100000);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}




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

module.exports = {
    job
};