const { response } = require('../app');
const Expense=require('../model/expense.model')

const categoryList=["Housing","Food","Personal","Clothing","Utilities","Transportation","Medical","Entertainment","Education"];

const addBudget=async (req,res)=>{
    const expense=new Expense({
        item:req.body.item,
        date:req.body.date,
        amount:req.body.amount,
        category:req.body.category
    })
    
    expense.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Budget."
        });
    });
}

const getExpenseOn= async (req,res)=>{

    let sum=0,response={};;
    const result=await Expense.find({date:new Date(req.params.date)})
    for(const doc of result){
        sum+=doc.amount
        response[doc.item]=doc.amount;
    }
    console.log(sum)
    res.send(`Expenses: \n ${JSON.stringify(response)} \n  the expense on ${req.params.date} is ${sum}`)
    
}

const getExpenseRange=async (req,res)=>{
    let sum=0,response={};
    const startDate=req.params.startDate;
    const endDate=req.params.endDate;
    const result=await Expense.find({date: {$gte:new Date(startDate), $lte:new Date(endDate)}})
    for(const doc of result){
        sum+=doc.amount
        response[doc.item]=doc.amount;
    }
    console.log(sum)
    res.send(`Expenses: \n ${JSON.stringify(response)} \n the expense between ${startDate} and ${endDate} is ${sum}`)
}

const monthlyAnalysis=async (req,res)=>{
    const response={}
    for(const category of categoryList){
        let sum=0;
        try {
            let result=await Expense.find({category: category})
            for(const doc of result)
                sum+=doc.amount
            response[category]=sum
        } catch (error) {
            response.send(`The error is ${error}`)
        }
        console.log(category)
    }
    //console.log(response.jsonify())
    res.send(JSON.stringify(response))
}

const deleteExpense=async (req,res)=>{
    const response=await Expense.deleteOne({_id:req.params.id})
    res.send(response)
}

module.exports={
    addBudget,
    getExpenseOn,
    getExpenseRange,
    deleteExpense,
    monthlyAnalysis
}