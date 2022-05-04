"use strict";
const { BulletinStorage } = require("../model/BulletinStorage");

class Bulletin {
  constructor(body) {
    this.body = body;
  }

  async read() {
    try {
      const response = await BulletinStorage.find({ is_deleted: 0 });
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
    const _id = client._id;
    const newdata = { author, content };
    try {
      const response = await BulletinStorage.findOneAndUpdate(
        { _id: _id },
        newdata,
        (err, user) => {
          if (err) return res.json({ success: false, err });
        }
      );
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }

  async delete() {
    const client = this.body;
    const _id = client.id;
    try {
      const response = await BulletinStorage.findOneAndUpdate(
        { _id: _id },
        { is_deleted: 1 },
        (err, user) => {
          if (err) return res.json({ success: false, err });
        }
      ).clone();
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = Bulletin;
