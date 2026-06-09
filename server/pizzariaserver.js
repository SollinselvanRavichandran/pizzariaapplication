require('dotenv').config();
const express=require('express');
const {Pizza,Ingredients,Shoppingcart,User}=require('./PIZZARIADB');
const mongoose=require('mongoose');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const auth=require('./middleware/Auth');



const app=express();
app.use(express.json());
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected Successfully");
}).catch((error)=>{
    console.log("Error connecting to database:",error);
});



//creating a new pizzas data and saving it to the database
app.post('/api/Postpizza',async (req,res)=>{
    try{
        const pizza= await Pizza.create(req.body);
        return res.status(200).json({
            success:true,
            data:pizza
        });
    }
    catch(error){
        console.log("Error creating pizza: ",error);
        return res.status(400).json({success:false,message:error.message});
    } 
});

//fetching all pizzas from the database
app.get('/api/Getpizzas/all',async(req,res)=>{
    try{
        const pizzas=await Pizza.find();
        return res.status(200).json(pizzas);
    }
    catch(error){
        console.log("Error fetching pizzas: ",error);
        return res.status(400).json({success:false,message:error.message});
    }
});


//creating a new ingredient data and saving it to the database
app.post('/api/Postingredient',async (req,res)=>{
    try{
        const ingredient=await Ingredients.create(req.body);
        return res.status(200).json({success:true,data:ingredient});
    }
    catch(error){
        console.log("Error creating ingredient: ",error);
        return res.status(400).json({success:false,message:error.message});
    }
})

//fetching all ingredients form the database
app.get('/api/Getingredients/all',async (req,res)=>{
    try{
        const ingredients=await Ingredients.find();
        return res.status(200).json(ingredients);
    }
    catch(error){
        console.log("Error fetching ingredients:",error);
        return res.status(400).json({success:false,message:error.message});
    }
});


//deleting the ingredients from the database
app.delete('/api/delete/',async (req,res)=>{
    try{
        const {id}=req.body;
        if(!id){
            return res.status(400).json({success:false,message:"Id does not exist"});
        }
        const ingredient=await Ingredients.deleteOne(id);
        if(ingredient.deletedCount===0){
            return res.status(400).json({success:false,message:"ingredient not found!"})
        }
        return res.status(200).json({success:true,message:"Deleted ingredient successfully"});
    }
    catch(error){
        console.log("Error deleting the ingredients",error);
    }
});


// adding  a new item to the shoppingcart 

app.post('/api/Postcart',async(req,res)=>{
    try{
        const cartItem=await Shoppingcart.create(req.body);
        return res.status(200).json(cartItem);
    }
    catch(error){
        console.log("CartItem not added!",error);
        return res.status(400).json({success:false,message:error.message});
    }
});


//fetching all the items from the shopping cart 
app.get("/api/Getcartitems/all/:userid",async (req,res)=>{
    try{
        const cartItems=await Shoppingcart.find({userid:req.params.userid});
        return res.status(200).json(cartItems);
    }
    catch(error){
        console.log("Error fetching cart items",error);
        return res.status(400).json({success:false,message:error.message});
    }
})


// updating quantity of items in shopping cart 
app.put("/api/cartitem/update/:id",async (req,res)=>{
    try {
        const cartItem=await Shoppingcart.findByIdAndUpdate(req.params.id,{
            quantity:req.body.quantity,
            totalPrice:req.body.totalPrice
        },{returnDocument:'after'});
        return res.status(200).json(cartItem);
    }
    catch(error){
        console.log("Error updating cart item",error);
        return res.status(400).json({success:false,message:error.message});
    }
});


// deleting the item in shopping cart 
app.delete("/api/cartitem/delete/:id",async (req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"item not available"});
        }
        const cartItem=await Shoppingcart.findByIdAndDelete(id);

        if(!cartItem){
            return res.status(404).json({message:"item not found!"});
        }
        return res.status(200).json({success:true,message:"deleted item successfully!"});
    }
    catch(error){
        console.log("Could not delete item ",error);
    }
});


// Adding user to the database 
app.post("/api/user/post",async (req,res)=>{
    try{
        const user=await User.create(req.body);
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge:7*24*60*60*1000});
        return res.status(200).json({success:true,data:user});
    }
    catch(error){
        console.log("Error Saving user to the database ",error);
        return res.status(400).json({success:false,message:"Error storing users check the log!"});
    }
});

// for validating login 
app.post("/api/login",async (req,res)=>{
    try{
        const{usernameoremail,password}=req.body;
        let user;
        if(usernameoremail.includes("@")){
                user=await User.findOne({email:usernameoremail});
        }
        else{
            user=await User.findOne({username:usernameoremail});
        }
        if(!user){
            return res.status(404).json({success:false,message:"User not found!"});
        }
        if(user.password!=password){
            return res.status(400).json({success:false,message:"Password not valid!"});
        }
        // jwt token for session management
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET,{expiresIn:"7d"});

        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax",maxAge: 7*24*60*60*1000});

        return res.status(200).json({success:true,message:"Login successful",user});
    }
    catch(error){
        console.log("Error validating login");
        return res.status(500).json({success:false,message:error.message});
    }
});





app.get("/api/me", auth, async(req,res)=>{

    try{

        const user =
        await User.findById(req.user.id)
        .select("-password");

        return res.status(200).json({

            success:true,

            user

        });

    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

});

// api for clearing the cookies after logout
app.post("/api/logout",(req,res)=>{

    res.clearCookie("token");

    return res.status(200).json({

        success:true,

        message:"Logout successful"

    });

});



app.listen(3000,()=>{
    console.log("Server listening at port 3000");
});


module.exports=app;