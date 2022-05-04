"use strict";
const User = require("../model/User");

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200,
    };
    return res
      .status(url.status)
      .cookie("x_auth", response.token)
      .json(response);
  },

  create: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 500 : 200,
    };
    return res.status(url.status).json(response);
  },

  auth: async (req, res) => {
    const url = {
      method: "POST",
      path: "/login",
      status: res.err ? 400 : 200,
    };
    return res.status(url.status).json({
      user_ID: req.user.user_ID,
      isAuth: true,
    });
  },

  logout: async (req, res) => {
    const user = new User(req.user);
    const response = await user.logout();
    const url = {
      method: "POST",
      path: "/login",
      status: res.err ? 400 : 200,
    };
    return res
      .status(url.status)
      .cookie("x_auth", "", { maxAge: 0 })
      .json(response);
  },
};

module.exports = {
  process,
};
