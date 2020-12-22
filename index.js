const express = require('express');
const mysql = require('mysql');
let bodyParser = require('body-parser');

// Create connection to DB.

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'kids_shop',
    multipleStatements: true
  });

//Connect 

connection.connect((error)=>{
    if(error)
    {
        throw error; 
    }
    else
    {
        console.log('MySql Connected');
    }
})

const app = express();
const port = '3000';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/rate',(req,res) =>{
    rating = req.body;
    console.log(rating);
    var sql = "SET @add_product_id = ?;SET @rating_value = ?;SET @customer_id =?;\
    CALL new_add_rating(@add_product_id, @rating_value, @customer_id);";
    connection.query(sql,[rating.productId,rating.rating,rating.raterId], (error,result) =>{
        if(error)
        {
            throw error;
        }
        console.log(result);
        
    })

     sql = 'SELECT t.* FROM kids_shop.rating t LIMIT 501';

    connection.query(sql, (error,result) =>{
        if(error)
        {
            throw error;
        }
        console.log(result.length);
        let total_rating = {"result":result.length};
        
        res.send( total_rating);
    })
    
})


app.listen(`${port}`, () => {
    console.log(`Server started on port ${port}`);
})