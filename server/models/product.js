const Db = require("mongodb/lib/db");
const { get } = require("../routes/admin");
const { mongoConnect } = require("../util/database");
const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl,id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id=id;
  }

  save() {
    if(this._id){
      
      const db = getDb();
      return db
        .collection("products")
        .insertOne({_id:new mongodb.ObjectId(this._id)},{$set:{
          title: this.title,
          price: this.price,
          description: this.description,
          imageUrl: this.imageUrl,
        }})
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });



    }else{


      const db = getDb();
      return db
        .collection("products")
        .insertOne({
          title: this.title,
          price: this.price,
          description: this.description,
          imageUrl: this.imageUrl,
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
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchById = (id) => {
   
    const db = getDb();
    return db
      .collection("products")
      .findById(id)
      .next()
      .then((product) => {
        console.log(product)
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  };


  static deleteById=(id)=>{

    const db=getDb()
    return db.collection("products").deleteOne({
      _id:new mongodb.ObjectId(id)
    }).then(()=>{
      console.log('item is deleted')
      return 'done'
    }).catch((err)=>{
      console.log(err)
    })

  }
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

module.exports = Product;
