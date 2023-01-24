const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");

const FoodModel = require('./models/Food')

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
/* app.use(cors({
    origin:["http://localhost:3000", "https://mern-food-crud-app.onrender.com"]
})); */
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

  app.post("/insert", async (req,res)=>{
      const foodName = req.body.foodName;
      const days = req.body.days;
      const food = new FoodModel({
          foodName,
          daysSinceIAte:days
      })
    
      try{
         await food.save();
        
      }
      catch(err){
          console.log(err)
      }
  })

  app.get("/read", async (req,res)=>{
       
    try{
        const result = await FoodModel.find({})
        res.json(result)
    
    }catch(err){
        console.log(err)
    }
    
 })

 app.put("/update", async (req,res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
       const updatedFood = await FoodModel.findById(id);
       updatedFood.foodName = newFoodName;
       updatedFood.save();
       
    }
    catch(err){
        console.log(err);
    }
})

app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id)
    
})

app.listen(PORT,()=>{
      console.log(`server is listening to ${PORT}`)
  })