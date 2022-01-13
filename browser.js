const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
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