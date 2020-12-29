const express=require('express');
const expense=require('./routes/api/expense.js');
const app=express();
app.use(express.json());
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
})
.catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "Welcome to BudgetTracker application. Organize and keep track of all your expenses."});
});
app.use('/routes/expense',expense);
const port= process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on post ${port}`))
module.exports=app;