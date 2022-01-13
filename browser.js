const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
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