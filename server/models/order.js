const Db = require("mongodb/lib/db");
const { get } = require("../routes/admin");
const { mongoConnect } = require("../util/database");
const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Order {
  constructor(products) {
    this.products = products;
  }

  createOrder(id) {
    const db = getDb();
    return db
      .collection("order")
      .insertOne({ userId: new mongodb.ObjectId(id), products: this.products });
  }

  static fetchAllOrders(id) {
    const db = getDb();
    return db
      .collection("order")
      .find({ userId: new mongodb.ObjectId(id) }).toArray()
      .then((orders) => {
        return orders
      });
  }
}

module.exports = Order;
