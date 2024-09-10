const {MongoClient} = require('mongodb')
let dbConnection;
let db;

let url = 'mongodb://localhost:27017/Customers'

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(url)
        .then((client) => {
            dbConnection = client.db()
            return callback()

        })
        .catch(err => {
            console.log(err);
            return callback(err);
            console.log('error in establising')
        })
    },
    getDb: () => dbConnection
}