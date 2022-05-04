"use strict";

const Bulletin = require("../model/Bulletin");

const process = {
  read: async (req, res) => {
    const bulletin = new Bulletin(req.body);
    const response = await bulletin.read();
    console.log(response);
    const url = {
      method: "GET",
      status: response.err ? 400 : 200,
    };
    return res.status(url.status).json(response);
  },
  create: async (req, res) => {
    const bulletin = new Bulletin(req.body);
    const response = await bulletin.create();
    const url = {
      method: "POST",
      status: response.err ? 500 : 200,
    };
    return res.status(url.status).json(response);
  },
  update: async (req, res) => {
    const bulletin = new Bulletin(req.body);
    console.log(req);

    const response = await bulletin.update();
    const url = {
      method: "POST",
      status: response.err ? 500 : 200,
    };
    return res.status(url.status).json(response);
  },
  delete: async (req, res) => {
    const bulletin = new Bulletin(req.params);
    const response = await bulletin.delete();
    const url = {
      method: "POST",
      status: response.err ? 500 : 200,
    };
    return res.status(url.status).json(response);
  },
};

module.exports = {
  process,
};
