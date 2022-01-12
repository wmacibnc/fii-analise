const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Abrindo o navegador......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Erro ao criar a instância do navegador => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};