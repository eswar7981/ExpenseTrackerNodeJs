const mongoose=require('mongoose');
const { STRING } = require('sequelize');
const Schema=mongoose.Schema

const productSchema= new Schema({
  title:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
})

/*

const Db = require("mongodb/lib/db");
const { get } = require("../routes/admin");
const { mongoConnect } = require("../util/database");
const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, user_id, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
    this.user_id = user_id;
  }

  save() {
    if (this._id) {
      const db = getDb();
      return db
        .collection("products")
        .insertOne(
          { _id: new mongodb.ObjectId(this._id) },
          {
            $set: {
              title: this.title,
              price: this.price,
              description: this.description,
              imageUrl: this.imageUrl,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const db = getDb();
      return db
        .collection("products")
        .insertOne({
          title: this.title,
          price: this.price,
          description: this.description,
          imageUrl: this.imageUrl,
          user_id: this.user_id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchById = (id) => {
    console.log(id);
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static updateById = (id, title, price, description, imageUrl) => {
    const db = getDb();
    return db
      .collection("products")
      .updateOne(
        {
          _id: new mongodb.ObjectId(id),
        },
        {
          $set: {
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
          },
        }
      )
      .then(() => {
        console.log("item is deleted");
        return "done";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static deleteById = (id) => {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({
        _id: new mongodb.ObjectId(id),
      })
      .then(() => {
        console.log("item is deleted");
        return "done";
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

/*

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


*/

module.exports = mongoose.model('Product',productSchema);
