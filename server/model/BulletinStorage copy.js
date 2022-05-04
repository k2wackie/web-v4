"use strict";
const db = require("../config/db");

class BulletinStorage {
  static getBulettinInfo() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM web_v3.bulletin WHERE is_deleted=0;";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  }

  static create(params) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO web_v3.bulletin (author, content, in_date) VALUES (?, ?, now());";
      db.query(query, params, (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }

  static update(params) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE web_v3.bulletin SET author=?, content=? WHERE id=?;";
      db.query(query, params, (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }

  static delete(params) {
    return new Promise((resolve, reject) => {
      console.log(params);
      const query = "UPDATE web_v3.bulletin SET is_deleted = 1 WHERE id = ?;";
      db.query(query, params, (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}

module.exports = BulletinStorage;
