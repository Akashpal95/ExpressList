var toggle = document.getElementById('btn1');
var addButton = document.getElementById('add-button');
var deleteButton = document.getElementById('delete-button');
var mode = 'dark'
const color_pallete = {
  'work':'rgb(96, 113, 208)',
  'school':'#13a978',
  'personal':'#fa744f',
  'others' :'#5a5c65'
};
//Function to check whether in dark mode or light mode and style accordingly.
function myFunction() {
  console.log('Toggle Status:')
  console.log(toggle.checked);
  console.log(mode);

    if(toggle.checked != true){
        console.log('LightMode');
        var main = document.getElementById('main');
        console.log(main);
        main.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
        main.style.color = 'black';
        var inputs = document.getElementsByTagName('input');
        for(input of inputs){
          input.style.color = 'black';
        }
        var categories = document.getElementsByClassName('category-container');
        for(each of categories){
            // each.style.fontWeight = '600';
            each.style.color = color_pallete[each.innerText] ;
            each.style.backgroundColor = 'white';
            each.style.border = `2px solid ${each.style.color}`;
        }
      }
    else{
      console.log('DarkMode');
        var main = document.getElementById('main');
        console.log(main.style.backgroundColor);
        main.style.backgroundColor = '#1b1c23';
        main.style.color = 'white';
        var inputs = document.getElementsByTagName('input');
        for(input of inputs){
          input.style.color = 'white';
        }
        var categories = document.getElementsByClassName('category-container');
        for(each of categories){
            // each.style.fontWeight = '600';
            // console.log(each.innerText);
            each.style.backgroundColor = color_pallete[each.innerText] ;
            each.style.color = 'white';
            
            
        }
    }

    
}
//Event listener added on dark mode toggler
toggle.addEventListener('click', function(){
  if(mode == 'dark')
    mode = 'light';
  else
    mode = 'dark';
    // console.log(to)
    myFunction();
});
//Check mode selected first time window loads
window.addEventListener('load', function(){
  if(mode == 'dark')
    toggle.checked = true;
  else
    toggle.checked = false;
  console.log('Passes through here');
  myFunction();
});
// addButton.addEventListener('click', myFunction);
// deleteButton.addEventListener('click', myFunction);

//To check any new task like add /delete and made ajax call accordingly
let newTaskAddition=function()
{
  // console.log($("#add-form").serialize());

  $("button").click(function(e)
  {
    
    e.preventDefault();
    formData = $("#form").serialize();
    console.log($('#category').val());
    formData +='&action-button='+this.value;
    console.log(formData);
    $.ajax({
      type:"post",
      url:"/add-task",
      data:formData,
      success:function(data)
      {
          console.log(data);
          if(data.action=='add'){
            let newTask=data.data.newTask;
            let newTaskList=newTaskDom(newTask);
            console.log(newTaskList[0]);

            // newTaskList[0].children[2].style.backgroundColor = color_pallete[$('#category').val()]
            $(".task-container").append(newTaskList);
            myFunction();
          }
          else if(data.action=='delete'){
            // var parent = $('.task-container');
            // console.log(parent[0]); 
            var cards = []; 
            for(eachId of data.data){
              let child = $(`#${eachId}`);
              // console.log(child[0]);
              // child[0].parentElement.removeChild(child[0]);
              cards.push(child[0]);
            }
            // let cards = document.getElementsByClassName('Completed');
            let parent = cards[0].parentElement;
            let length = cards.length;
            let count=length-1;
            intervalID = setInterval(function(){
                cards[count].classList.add('delete-card');
                // task_count--;
                setTimeout(function(){
                    this.parentNode.removeChild(this); 
                    updateTaskCount();
              }.bind(cards[count]),500 )
                count--;
                if(count<0){
                    clearInterval(intervalID);
                }
            }, 200);
          }else{
            console.log('error in data action');
          }
          

      },
      error:function(err)
      {
        console.log(err.responseText);
      }
    })
  })
}

let newTaskDom=function(task)
{
  return $(`<div class="task-card" id="${task._id}">
  <input type="checkbox" id="task_select" name="task-select" value="${task._id}">
  <div class="task-wrapper">
      <p>${ task.task}</p>
      <div class="duedate-container">
          <i class="fas fa-calendar-alt"></i>
          <p>${task.duedate}</p>
      </div>
  </div>
  <div id ="category-container" class="category-container" >
      <p>${task.category}</p>
  </div>
</div>`)
}


newTaskAddition()
