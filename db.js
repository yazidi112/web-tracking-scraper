const mysql = require('mysql');

const dbs = {
    host: "localhost",
    user: "root",
    password: "",
    database: "wt"
};

var con = mysql.createConnection(dbs);
con.connect(function(err) {
    if (err) throw err;
    console.log(" Databases server is connected.");
});

class Site {
    static async insert(site) {
        var sql = "INSERT INTO sites  VALUES (null,?)";
        let values = [site];
        con.query(sql, values, function(err, result) {
            if (err) throw err;
            console.log(" Site: " + site + " is inserted.");
        });
    }
}
class Request {
    static async insert(site, url, type, method, postdata) {
        let sql = 'INSERT INTO requests  VALUES (null,?,?,?,?,?)';
        let values = [site, url, type, method, postdata];
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log(" Request: " + url + " is inserted.");
        });
    }
}

class Cookie {
    static async insert(site, name, value, domain, path, expires, size) {
        var sql = `INSERT INTO cookies  VALUES (null,?,?,?,?,?,?,?)`;
        let values = [site, name, value, domain, path, expires, size]
        con.query(sql, values, function(err, result) {
            if (err) throw err;
            console.log(" Cookie: " + name + " = " + value + " is inserted.");
        });
    }
}

class Param {
    static async insert(site, url, param, value) {
        var sql = `INSERT INTO params  VALUES (null,?,?,?,?)`;
        let values = [site, url, param, value];
        con.query(sql, values, function(err, result) {
            if (err) throw err;
            console.log(" Param: " + param + " = " + value + " is inserted.");
        });
    }
}

class Setting {
    static async init() {
        var tables = ["sites", "cookies", "requests"];
        tables.forEach(table => {
            con.query("TRUNCATE " + table, function(err, result) {
                if (err) throw err;
                console.log(" Table " + table + " is emptied.");
            });
        });
    }
}

module.exports = {
    site: Site,
    request: Request,
    cookie: Cookie,
    param: Param,
    setting: Setting
};