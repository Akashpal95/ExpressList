const db = require('../config/mongoose');
const Tasks = require('../models/tasks');
// var mode = 'light'
const color_pallete = {
    'work':'rgb(96, 113, 208)',
    'school':'#13a978',
    'personal':'#fa744f',
    'others' :'#5a5c65'
};
module.exports.home = function(req, res){
    // console.log(req.query);
    Tasks.find({}, function(err, tasks){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
            // console.log('Enter DarkMode');
            // console.log(mode);
        return res.render('home', {
                tasks_list :tasks,
                colors:color_pallete,
                // mode:mode
        });

    });
}

module.exports.actionTask = function(req, res){
    console.log('Inside createTask');
    console.log(req.body);
    // return createTask(req, res);
    if(req.body['action-button'] === "add")
        return console.log(createTask(req, res));
    else if(req.body['action-button'] ==="delete"){
        console.log(req.body);
        console.log('delete button pressed');
        if('task-select' in req.body){
            return deleteTask(req, res);
           
        }
        else{
            console.log('No task selected for deletion');
            // res.redirect('back');
        }
    }
    
}



// module.exports.changeMode = function(req, res){
    
//     mode = req.query['mode'];
//     // console.log(mode);
//     return res.redirect('back');
// }


createTask = function(req, res){
    var duedate = new Date(req.body.duedate);
    var day = req.body.duedate.slice(-2);
    var year = req.body.duedate.slice(0, 4);
    var month = duedate.toLocaleString('default', { month: 'long' });
    var duedate = day +" " + month + ", "+year;
    console.log(duedate);
    Tasks.create({
        task:req.body.task,
        category:req.body.category,
        duedate:duedate
        }, function(err, newTask){
        if(err){
            console.log(`error in creating a contact: ${err}`);
            return;
        }
        console.log('***', newTask);
        return res.json(200,
            {
                data:{
                    newTask:newTask,
                    colors:color_pallete
                },
                message:"New List Added!",
                action:'add'
            })
       // return res.redirect('back');
    
    });
}
deleteTask = function(req, res){
    console.log('delete section reached');
    var tasksIdList =[]
    if(typeof(req.body['task-select']) == 'string'){
        tasksIdList.push(req.body['task-select']);
    }
    else{
        for(let id of req.body['task-select']){
            console.log(id);
            tasksIdList.push(id);
        }
    }  
    Tasks.deleteMany({_id:tasksIdList}, function(err){
        if(err){
            console.log('error in deleting task from db');
            return;
        }
    }) ;
    console.log('***', tasksIdList);
    return res.json(200,{
        data:tasksIdList,
        message:"List of task IDs deleted",
        action:"delete"
    });
}

module.exports.createNewTask=function(req,res)
{
    var duedate = new Date(req.body.duedate);
    var day = req.body.duedate.slice(-2);
    var year = req.body.duedate.slice(0, 4);
    var month = duedate.toLocaleString('default', { month: 'long' });
    var duedate = day +" " + month + ", "+year;
    console.log(duedate);
    Tasks.create({
        task:req.body.task,
        category:req.body.category,
        duedate:duedate
        }, function(err, newTask){
        if(err){
            console.log(`error in creating a contact: ${err}`);
            return;
        }
        console.log('***', newTask);
        return res.json(200,
            {
                data:{
                    newTask:newTask
                },
                message:"New List Added!"
            })
       // return res.redirect('back');
    
    });
}