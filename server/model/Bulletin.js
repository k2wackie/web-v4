"use strict";
const BulletinStorage = require("./BulletinStorage");

class Bulletin {
  constructor(body) {
    this.body = body;
  }

  async read() {
    try {
      const response = await BulletinStorage.getBulettinInfo();
      return { success: true, data: response };
    } catch (err) {
      return { success: false, err };
    }
  }

  async create() {
    const client = this.body;
    const author = client.author;
    const content = client.content;
    const params = [author, content];
    try {
      const response = await BulletinStorage.create(params);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async update() {
    const client = this.body;
    const author = client.author;
    const content = client.content;
    const id = client.id;
    const params = [author, content, id];
    try {
      const response = await BulletinStorage.update(params);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async delete() {
    const client = this.body;
    const id = client.id;
    const params = [id];
    console.log(this);
    try {
      const response = await BulletinStorage.delete(params);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = Bulletin;
