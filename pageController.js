const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance) {
    
    try { 
        const fundosObjeto = [
            {
                "browserInstance": browserInstance, 
                "fundo": "ALZR11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "BCRI11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "BRCO11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "BRCR11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "BTLG11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "CORM11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "CPTS11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "CVBI11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "DEVA11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "GGRC11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "HCTR11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "HGBS11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "HGLG11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "HGRE11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "HGRU11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "HSML11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance,
                "fundo": "IRDM11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "KISU11",
                "tipo": "Fundo de Fundos",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "KNRI11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "KNSC11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "LGCP11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "MALL11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "MCCI11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "MXRF11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "RBRF11",
                "tipo": "Fundo de Fundos",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "RBRP11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "RBRR11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "RECR11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "RRCI11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "TORD11",
                "tipo": "Híbrido",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "TRXF11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "VGIP11",
                "tipo": "Papel",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "VILG11",
                "tipo": "Tijolo",
            },
            {
                "browserInstance": browserInstance, 
                "fundo": "VISC11",
                "tipo": "Tijolo",
            },
            { 
                "browserInstance": browserInstance, 
                "fundo": "VSLH11",
                "tipo": "Híbrido",
            },
            { 
                "browserInstance": browserInstance, 
                "fundo": "XPLG11",
                "tipo": "Tijolo",
            },
            { 
                "browserInstance": browserInstance, 
                "fundo": "XPML11",
                "tipo": "Tijolo",
            }
            ];

        return Promise.all(
            fundosObjeto.map(async(objeto) => {
                const urlBase = 'https://www.fundsexplorer.com.br/funds/';
                let dado = await pageScraper.scraper(objeto.browserInstance, urlBase + objeto.fundo, objeto.tipo);
                return dado;
            })  
        ).then((values) => {
            console.log("promisses: " + JSON.stringify(values));

            // Fechando o navegador
            //browser.close();

            return values;
        });

        // let fii = await pageScraper.scraper(page, url);
        // let fii2 = await pageScraper.scraper(page2, url2);

        // console.log(JSON.stringify(fii));
        // console.log(JSON.stringify(fii2));



    }
    catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)