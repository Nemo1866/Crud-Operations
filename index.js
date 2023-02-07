const connection = require("./connection");
const express = require("express");

const app = express();

app.use(express.json());

//This route display all the products.

app.get("/products", (req, res) => {
  connection.query("Select * from products", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//This route will insert a new coloumn in our database.

app.post("/products", (req, res) => {
  let generate = req.body;
  let product = [
    generate.product_id,
    generate.name,
    generate.price,
    generate.quantity,
  ];
  connection.query("Insert Into products values(?)", [product], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

//This will delete all the columns from our database

app.delete("/products",(req,res)=>{
    connection.query("Delete from products",(err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send("Sucessfully Deleted all the records from the database")
        }
    })
})


//EXPRESS ROUTE PARAMETER

//This route will provide only a specific product which we pass in our route parameter

app.get("/products/:id", (req, res) => {
  connection.query(
    "Select * from products where product_id=?",
    [req.params.id],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

//This route update if the product_id exist else it will create a new entry in our database
app.put("/products/:id", (req, res) => {
  let product = req.body;
  connection.query(
    "update products set ? where product_id=" + req.params.id,
    [product],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (data.affectedRows == 0) {
          let generate = req.body;
          let product = [
            generate.product_id,
            generate.name,
            generate.price,
            generate.quantity,
          ];
          connection.query(
            `Insert Into products values(?)`,
            [product],
            (err, data) => {
              if (err) {
                res.send(err);
              } else {
                res.send(data);
              }
            }
          );
        } else {
          res.send(data);
        }
      }
    }
  );
});


// This route update a specific product based on the route parameter
app.patch("/products/:id", (req, res) => {
  let product = req.body;

  connection.query(
    "Update products set ? where product_id =" + req.params.id,
    [product],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});

//This route delete only a specific product which we pass in our route parameter

app.delete("/products/:id", (req, res) => {
  connection.query(
    "Delete from products where product_id=?",
    [req.params.id],
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Succesfully Deleted from the database");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
