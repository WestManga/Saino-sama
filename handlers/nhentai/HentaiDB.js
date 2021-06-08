const fs = require('fs');
const path = require('path');
const sqlite3 = require("sqlite3");

let dir = path.join(__dirname, "../../data");

if (!fs.existsSync(dir)) {
  console.log("No database directory found! Created one...");
  fs.mkdir(dir, (err) => {
    if (!err) console.log("Database directory created successfully.");
  });
}

class HentaiDB {
  constructor(client) {
    const dbPath = path.resolve(__dirname, '../../data/database.sqlite3')
    this.client = client;
    this.db = new sqlite3.Database(dbPath, err => {
      if (err) {
        console.log("Could not connect to HentaiDB", err);
      } else {
        console.log("[Hentai DB] Connected");
      }
    });
  }
}

module.exports = HentaiDB;