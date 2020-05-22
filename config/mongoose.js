//Import library
const mongoose = require('mongoose');
//Connect to database
mongoose.connect('mongodb://localhost/tasks_list_db');
//Acquire the connection
const db = mongoose.connection;
//error
db.on('error', console.error.bind(console, 'connection error'));
//up and running then print the message
db.once('open', function(){
    console.log('Successfully connected to db');
});
