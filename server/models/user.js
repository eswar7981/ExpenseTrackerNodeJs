const Db = require("mongodb/lib/db");
const { get } = require("../routes/admin");
const { mongoConnect } = require("../util/database");
const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("user")
      .insertOne({
        name: this.name,
        email: this.email
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  static fetchById(id){
    const db=getDb()
    return db.collection("user").findById(id).next().then((user)=>{
      return user
    })

  }
}

module.exports = User;
