const puppeteer = require("puppeteer-extra");
const db = require("./db");


async function StartScraping(site) {
    await puppeteer.launch({ headless: false, })
        .then(async(browser) => {
            const page = await browser.newPage();
            page.on("response", async(response) => {
                headers = response.headers();
                db.header.insert(site, response._url, response._request._resourceType, response._request._method, response._request._postData);
                let url = new URL(response._url);
                let searchParams = new URLSearchParams(url.search);
                searchParams.forEach((value, key) => {
                    db.param.insert(site, response._url, key, value);
                });

            });

            await page.goto(site, { waitUntil: "load", timeout: 0, });

            let cookies = await page.cookies();
            cookies.forEach(cookie => {
                db.cookie.insert(site, cookie.name, cookie.value, cookie.domain, cookie.path, cookie.expires, cookie.size);
            });
            await page.close();
        });
}



sites = ["http://fpt.usmba.ac.ma/new/", "http://youtube.com", "http://www.google.com"];
sites = ["http://google.com"];

(function() {
    sites.forEach(async(site) => {
        await StartScraping(site);
        db.site.insert(site);
    });
}());