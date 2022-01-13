const scraperObject = {

    async scraper(browserInstance, url, tipo) {
        // Criando instância do navegador
        const browser = await browserInstance;

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

        return {
            'fundo': fundo.toUpperCase(),
            'tipo': tipo,
            'ultimoRendimento': ultimoRendimento,
            'dividendoYield': dividendoYield,
            'pvp': pvp,
            'valorCota': valorCota
        }

    }
}

async function obterDado(page, xPath) {
    const [getxPath] = await page.$x(xPath);
    const valor = await page.evaluate(name => name.innerText, getxPath);
    return valor;
}
module.exports = scraperObject;