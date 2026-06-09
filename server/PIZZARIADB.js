const mongoose=require('mongoose');

const pizzasSchema= new mongoose.Schema({
    id:{type:Number,unique:true},
    type:{type:String,required:true},
    price:{type:Number,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    ingredients:[{type:String}],
    toppings:[{type:String}]
});

const ingredientsSchema=new mongoose.Schema({
    id:{type:Number,unique:true},
    tname:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}
});


const shoppingcartSchema=new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    id:{type:Number},
    name:{type:String,required:true},
    basePrice:{type:Number,required:true},
    image:{type:String,required:true},
    quantity:{type:Number,required:true},
    ingredients:{type:Array,required:true},
    extraIngredients:{type:Array},
    totalPrice:{type:Number,required:true}
})

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

const Pizza=mongoose.model("Pizza",pizzasSchema);
const Ingredients=mongoose.model("Ingredients",ingredientsSchema);
const Shoppingcart=mongoose.model("Shoppingcart",shoppingcartSchema);
const User=mongoose.model("User",userSchema);

module.exports={Pizza,Ingredients,Shoppingcart,User};