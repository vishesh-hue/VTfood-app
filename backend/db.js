const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://tvishesh593:2dVqCuPP5CsaOAn1@guptafood.lksnm8x.mongodb.net/GuptaFood?retryWrites=true&w=majority';

mongodb().catch(err => console.log(err));

async function mongodb() {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connection successful");
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const fetched_data2 = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    global.food_items = fetched_data;
    global.foodCategory = fetched_data2;
    //console.log(global.foodCategory);
  } catch (err) {
    console.log(err);
  } 
  //good practice
  
}

module.exports = mongodb;

