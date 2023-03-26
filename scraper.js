const puppeteer = require("puppeteer-extra");
const db = require("./db");

class Scraper {
    static async start(sites) {
        await puppeteer.launch({ headless: false, })
            .then(async(browser) => {

                sites.forEach(async site => {
                    site = site.domain;
                    const page = await browser.newPage();
                    await page.goto("http://" + site, { waitUntil: "load", timeout: 0, });
                    page.on("response", async(response) => {
                        db.request.insert(site, response._url, response._request._resourceType, response._request._method, response._request._postData);
                        let url = new URL(response._url);
                        let searchParams = new URLSearchParams(url.search);
                        searchParams.forEach((value, key) => {
                            db.param.insert(site, response._url, key, value);
                        });
                    });

                    let cookies = await page.cookies();
                    cookies.forEach(cookie => {
                        db.cookie.insert(site, cookie.name, cookie.value, cookie.domain, cookie.path, cookie.expires, cookie.size);
                    });
                    db.site.insert(site);
                });
            });
    }
}

module.exports = {
    start: Scraper.start
}