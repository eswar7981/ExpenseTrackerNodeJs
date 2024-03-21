const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;


const mongoConnect = (callback) => {
  console.log(process.env.MONGODB_NAME,'hello')
  MongoClient.connect(
    `mongodb+srv://eswar:%40Eswar158@cluster0.n0gpdpr.mongodb.net/MONGODBpractise?retryWrites=true`
  )
    .then((client) => {
      console.log("mongo db connected");
      db=client.db()
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb=()=>{
  if(db){
    return db;
  }
  throw 'no database found'
};

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;
