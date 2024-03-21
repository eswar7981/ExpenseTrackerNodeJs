const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const mongoose = require("mongoose");
//const Product = require('./models/product');
//const User = require('./models/user');
//const Cart = require('./models/cart');
//const CartItem = require('./models/cart-item');
//const Order = require('./models/order');
//const OrderItem = require('./models/order-item');
const dotenv = require("dotenv");
dotenv.config();

const mongoDb = require("./util/database");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());


app.use((req, res, next) => {
  User.findById("65fc17dd6ff134d456989bb7")
    .then((user) => {
      req.user =user
    next();
    })
    .catch((err) => {
      console.log(err);
    });

    
});



/*const user=new User('eswar','eswarsatyavarapu7981@gmail.com')

  user.save().then(()=>{
    console.log('success created user')
  }).catch((err)=>{
    console.log('failed')
  })
  
})

*/

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const mongoConnect = require("./util/database").mongoConnect;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/admin", adminRoutes);
app.use(shopRoutes);

mongoose
  .connect( 
  )
  .then((res) => {
    User.findOne().then((user)=>{
      if(!user){
        const user= new User({
          name:'Eswar',
          email:'eswar@gmail.com',
          cart:{
            items:[]
          }
        })

        user.save()
      }
    })
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

/*


app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});



app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findById(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    
  })
  .catch(err => {
    console.log(err);
  });

  */
