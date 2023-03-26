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
    console.log("Connected!");
});

class Site {

    static async insert(site) {
        var sql = "INSERT INTO sites  VALUES (null,?)";
        let values = [site];
        con.query(sql, values, function(err, result) {
            if (err) throw err;
            console.log("Inserted");
        });
    }
}
class Request {
    static async insert(site, url, type, method, postdata) {


        let sql = 'INSERT INTO requests  VALUES (null,?,?,?,?,?)';
        let values = [site, url, type, method, postdata];
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("Inserted.");
        });
    }
}

class Cookie {
    static async insert(site, name, value, domain, path, expires, size) {

        var sql = `INSERT INTO cookies  VALUES (null,?,?,?,?,?,?,?)`;
        let values = [site, name, value, domain, path, expires, size]
        con.query(sql, values, function(err, result) {
            if (err) throw err;
            console.log("Inserted");
        });
    }
}

class Param {
    static async insert(site, url, param, value) {

        var sql = `INSERT INTO params  VALUES (null,?,?,?,?)`;
        let values = [site, url, param, value];
        con.query(sql, values, function(err, result) {
            if (err) throw err;
            console.log("Inserted");
        });
    }
}

class Settings {
    static async init() {
        var sql = `delete from sites;delete from cookies;delete from params; delete from requests`;
        sql.split(";").forEach(req => {
            con.query(req, function(err, result) {
                if (err) throw err;
                console.log("table deleted");
            });
        })
    }
}

module.exports = {
    site: Site,
    request: Request,
    cookie: Cookie,
    param: Param,
    settings: Settings
};