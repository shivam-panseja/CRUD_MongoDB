const express = require('express');

const {connectToDb, getDb} = require('./db');

const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());

let db;


connectToDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return; // Exit if there's an error
    }

   
    // Assuming `getDb` is a function that retrieves the database instance
    db = getDb();
});


// Creating our Restfull API endpoints

// Defining the ApI routes here

//  routes

// read api
app.get('/api/users', (req, res) => {
   
   
    const page = req.query.p || 0;
    const salesPerPage = 12;
    let sales = [];
    db.collection('sales')
    .find()
    .sort({id : 1})
    .skip(page * salesPerPage)
    .limit(salesPerPage)
    .forEach(sale => sales.push(sale))
    .then(() => {
        res.status(200).json(sales);
        
    })

         
    })

    app.use((err, req, res, next) => {
        console.error(err); // Log error
        res.status(500).send('Something went wrong'); // Send response
    });




    
    

// Explanation:
        


// To get a particular data from id. at route localhost:3000/api/sales/id= 7,8 or any

app.get('/api/users/:id', (req, res) => {
    let salesID = parseInt(req.params.id);
    if (isNaN(salesID)) {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }
        db.collection('sales')
        .findOne({id: salesID})
        .then((sale)=> {
            if (sale) {
                res.status(200).json(sale);

            } else {
            res.status(404).json({msg: 'sale record not found'});
         }
        
    })
    })


// // Creating new entry= post method

app.post('/api/sales', (req, res) => {
    const sale = req.body;
    db.collection('sales')
    .insertOne(sale)
    .then((result) => {
        res.status(200).json({result
        });
    })
    // .catch(() => {
    //     res.status(500).json({msg: 'Error creating sale'})
    })



// // Updating

app.patch('/api/users/sales/:id', (req, res) => {
    let updates = req.body;
    const salesID = parseInt(req.params.id);
    if(!isNaN(salesID)) {
        db.collection('sales')
        .updateOne(
            {id: salesID},
            {$set: updates}
        )
        .then((result) => {
            res.status(200).json({result});
        })
    } else {
        res.status(400).json({Error: 'Sales ID must be a number'})
    }
})

// //delete

app.delete('/api/sale/:id', (req, res) => {
    const salesID = parseInt(req.params.id);
    if (!isNaN(salesID)) {
        db.collection('sales')
        .deleteOne({id: salesID})
        .then((result) => {
            res.status(204).json({result});
        })
        // .catch(() => {
        //     res.status(500).json({msg: 'Error delteing sales'})
        // })
    } else {
            res.status(400).json({Error: 'Err: Sales ID must be a number'})
        }
    }
)
console.log("Project is done")














app.listen(4000, () => {
    console.log('Server is running on port 4000');
});




    

