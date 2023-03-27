const puppeteer = require("puppeteer-extra");
const db = require("./db");

class Scraper {
    static async start(sites, start, end) {
        await puppeteer.launch({ headless: false, })
            .then(async(browser) => {
                const page = await browser.newPage();
                const list = sites.slice(start, end);

                for (let i = 0; i < list.length; i++) {
                    let site = list[i];
                    console.log("--------------------------");
                    console.log(i + ": " + site);
                    console.log("--------------------------");
                    db.site.insert(site);
                    await page.goto(`http://${site}`, { waitUntil: "load", timeout: 0 });
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

                }
            }).catch(err => console.error("Error: ", err));
    }
}

module.exports = {
    start: Scraper.start
}