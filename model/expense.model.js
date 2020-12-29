const mongoose=require('mongoose');
const expenseSchema=new mongoose.Schema({
    item:String,
    date:{
        type:Date,
        default:Date.now
    },
    amount:Number,
    category:String

});

module.exports=mongoose.model('Expense',expenseSchema);
