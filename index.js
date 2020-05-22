const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes'));

//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Middleware to serve static assets
app.use(express.static('assets'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is successfully running on port ${port}`);
});

