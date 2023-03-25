const mysql = require('mysql');

const dbs = {
    host: "localhost",
    user: "root",
    password: "",
    database: "wt"
};

class Site {

    static async insert(site) {
        var con = mysql.createConnection(dbs);
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO sites  VALUES (null,'" + site + "')";
            con.query(sql, function(err, result) {
                if (err) throw err;
                console.log("Inserted");
            });
        });
    }
}
class Header {
    static async insert(site, url, type, method, postdata) {
        var con = mysql.createConnection(dbs);
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO headers  VALUES (null,'" + site + "','" + url + "','" + type + "','" + method + "','" + postdata + "')";
            con.query(sql, function(err, result) {
                if (err) throw err;
                console.log("Inserted");
            });
        });
    }
}

class Cookie {
    static async insert(site, name, value, domain, path, expires, size) {
        var con = mysql.createConnection(dbs);
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO cookies  VALUES (null,'${site}','${name}','${value}','${domain}','${path}','${expires}','${size}')`;
            con.query(sql, function(err, result) {
                if (err) throw err;
                console.log("Inserted");
            });
        });
    }
}

class Param {
    static async insert(site, url, param, value) {
        var con = mysql.createConnection(dbs);
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO params  VALUES (null,'${site}','${url}','${param}','${value}')`;
            con.query(sql, function(err, result) {
                if (err) throw err;
                console.log("Inserted");
            });
        });
    }
}

module.exports = {
    site: { insert: Site.insert },
    header: { insert: Header.insert },
    cookie: { insert: Cookie.insert },
    param: Param
};