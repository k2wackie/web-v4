"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const { UserStorage } = require("../model/UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async isMatch(userPW, userPassword) {
    const isMatch = await bcrypt.compare(userPW, userPassword).catch((err) => {
      console.log(err);
      return { success: false, err };
    });
    return isMatch;
  }

  async login() {
    const client = this.body;
    const userEmail = client.userEmail;
    const userPW = client.userPW;
    try {
      const user = await UserStorage.findOne({ email: userEmail });
      if (user) {
        const isMatch = await this.isMatch(
          userPW.toString(),
          user.password.toString()
        ).then((isMatch) => {
          return (isMatch = isMatch);
        });
        if (user.email === userEmail && isMatch) {
          let token = jwt.sign(user._id.toString(), "secretToken");
          user.token = token;
          user.save(function (err, user) {
            if (err) return { success: false, err };
          });
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
          msg: "존재하지 않는 이메일입니다.",
        };
      }
    } catch (err) {
      return { success: false, err, msg: "로그인 에러" };
    }
  }

  async register() {
    const client = this.body;
    const userEmail = client.userEmail;
    const userPW = client.userPW;
    const userData = { email: userEmail, password: userPW };
    const user = new UserStorage(userData);
    try {
      user.save((err) => {
        if (err) return { success: false, err };
      });
      return { success: true };
    } catch (err) {
      return { success: false, err };
    }
  }

  async logout() {
    const client = this.body;
    const userID = client._id;
    try {
      await UserStorage.findOneAndUpdate(
        { _id: userID },
        { token: "" },
        (err) => {
          if (err) return { success: false, err };
        }
      ).clone();
      return { logoutSuccess: true };
    } catch (err) {
      return { logoutSuccess: false, err };
    }
  }

  static async findByToken(token, cb) {
    jwt.verify(token, "secretToken", async (err, decoded) => {
      try {
        const user = await UserStorage.findOne({ _id: decoded, token: token });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    });
  }
}

module.exports = User;
