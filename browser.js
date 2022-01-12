const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log('CODIGO DA DEVELOP');
        console.log('CODIGO DA DEVELOP');
        console.log('CODIGO DA DEVELOP');
        console.log("Abrindo o navegador......");
        browser = await puppeteer.launch({
            headless: false,
            'args' : [
                '--no-sandbox',
                '--disable-setuid-sandbox'
              ],
            ignoreHTTPSErrors: true
        });
    } catch (err) {
        console.log("Erro ao criar a instância do navegador => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};