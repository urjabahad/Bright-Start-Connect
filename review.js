const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
     comments:String,
     rating:{
        type:Number,
        min:1,
        max:5
     }
    
})
module.exports=mongoose.model("Review",reviewSchema);