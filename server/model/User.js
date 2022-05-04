"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const UserStorage = require("../model/UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    const userID = client.userID;
    const userPW = client.userPW;
    let token = jwt.sign(userID.toString(), "secretToken");
    const userInfo = [token, userID];
    try {
      const user = await UserStorage.getUserInfo(userInfo);
      if (user) {
        const isMatch = await bcrypt
          .compare(userPW, user.user_PW)
          .catch((err) => {
            return { success: false, err };
          });
        if (user.user_ID === userID && isMatch) {
          return { success: true, chkID: true, token };
        } else {
          return {
            success: false,
            chkID: true,
            msg: "비밀번호가 틀렸습니다.",
          };
        }
      } else {
        return {
          success: false,
          chkID: false,
          msg: "존재하지 않는 아이디입니다.",
        };
      }
    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;
    const userID = client.userID;
    const userPW = client.userPW;
    const userInfo = [userID, userPW];
    await bcrypt
      .hash(userPW, saltRounds)
      .then(async (hash) => {
        userInfo[1] = hash;
      })
      .catch((err) => {
        return { success: false, err };
      });

    try {
      const response = await UserStorage.register(userInfo);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async logout() {
    const client = this.body;
    const userID = client.user_ID;
    const token = null;
    const userInfo = [token, userID];
    try {
      const response = await UserStorage.logout(userInfo);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  static async findByToken(token, cb) {
    jwt.verify(token, "secretToken", async (err, decoded) => {
      try {
        const user = await UserStorage.findByToken(token);
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    });
  }
}

module.exports = User;
