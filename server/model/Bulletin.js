"use strict";
const { BulletinStorage } = require("../model/BulletinStorage");

class Bulletin {
  constructor(body) {
    this.body = body;
  }

  async read() {
    try {
      const response = await BulletinStorage.find();
      return { success: true, data: response };
    } catch (err) {
      return { success: false, err };
    }
  }

  async create() {
    const client = this.body;
    const author = client.author;
    const content = client.content;
    const bulletin = BulletinStorage({ author: author, content: content });
    try {
      bulletin.save((err) => {
        if (err) return { success: false, err };
      });
      return { success: true };
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
