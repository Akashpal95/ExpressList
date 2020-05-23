const db = require('../config/mongoose');
const Tasks = require('../models/tasks');
// var mode = 'light'
const color_pallete = {
    'work':'#424d8a',
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
    if(req.body['action-button'] === "add")
        createTask(req, res);
    else if(req.body['action-button'] ==="delete"){
        console.log(req.body);
        console.log('delete button pressed');
        if('task-select' in req.body){
            deleteTask(req, res);
           
        }
        else{
            console.log('No task selected for deletion');
            res.redirect('back');
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
                    newTask:newTask
                },
                message:"New List Added!"
            })
       // return res.redirect('back');
    
    });
}
deleteTask = function(req, res){
    console.log('delete section reached');
    if(typeof(req.body['task-select']) == 'string'){
        Tasks.findByIdAndDelete(req.body['task-select'], function(err, task){
            if(err){
                console.log('error in deleting task from db');
                return;
            }
            else
                console.log('task deleted : ', task);
        });
    }
    else{
        for(let id of req.body['task-select']){
            console.log(id);
            Tasks.findByIdAndDelete(id, function(err, task){
                if(err){
                    console.log('error in deleting task from db');
                    return;
                }
                else
                    console.log('task deleted : ', task);
                // return res.redirect('back');
            });
        }
    }   
    return res.redirect('back');
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