const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Abrindo o navegador......");
        browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            args: ["--disable-setuid-sandbox"],
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