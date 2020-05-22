const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    duedate:{
        type:String
    }
});

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;