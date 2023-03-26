const scraper = require("./scraper");
const db = require("./db");
const sites = require("./data/sites.json");

(async function() {

    await db.settings.init();
    await scraper.start(sites);
}());