"use strict";
const db = require("../config/db");

class UserStorage {
  static getUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE web_v3.user_data SET token = ? WHERE user_ID = ?;",
        userInfo.slice(0, 2),
        (err, data) => {
          db.query(
            "SELECT * FROM web_v3.user_data WHERE user_ID = ?;",
            userInfo.slice(1, 2),
            (err, data) => {
              if (err) reject(`${err}`);
              else resolve(data[0]);
            }
          );
        }
      );
    });
  }

  static async register(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO web_v3.user_data (user_ID, user_PW, in_date) VALUES (?, ?, now());";
      db.query(query, userInfo, (err) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }

  static async findByToken(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM web_v3.user_data WHERE token = ?;";
      db.query(query, userInfo, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data[0]);
      });
    });
  }

  static async logout(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE web_v3.user_data SET token = ? WHERE user_ID = ?;";
      db.query(query, userInfo, (err, data) => {
        if (err) reject(`${err}`);
        else resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
