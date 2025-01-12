const { MongoClient } = require('mongodb');

// MongoDB connection details
const uri = "mongodb+srv://rongbin99:deltahacks12345@pawlog.snfxa.mongodb.net/?retryWrites=true&w=majority&appName=PawLog";

let dbConnection;  // This will hold the DB connection object

// Function to connect to the database
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000  // Increase timeout to 30 seconds
      })
      .then((client) => {
        console.log("Connected to MongoDB");

        // Get the database and store the connection
        dbConnection = client.db("pawlog");  // Use the actual DB name here
        cb();  // Callback after DB connection is established
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        cb(err);  // Pass the error to the callback
      });
  },
  getDb: () => dbConnection  // Function to retrieve the DB connection
};
