const scraper = require("./scraper");
const db = require("./db");
const sites = require("./data/sites.json");

(async function() {
    console.log(" Web tracking detector 1.0 ");
    console.log("_________________________");
    await db.setting.init();
    await scraper.start(sites, 0, 1000);
}());