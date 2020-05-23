var toggle = document.getElementById('btn1');
var addButton = document.getElementById('add-button');
var deleteButton = document.getElementById('delete-button');
var mode = 'dark'
const color_pallete = {
  'work':'#424d8a',
  'school':'#13a978',
  'personal':'#fa744f',
  'others' :'#5a5c65'
};
function myFunction() {
  console.log('Toggle Status:')
  console.log(toggle.checked);
  console.log(mode);

    if(toggle.checked != true){
        console.log('LightMode');
        var main = document.getElementById('main');
        console.log(main.style.backgroundColor);
        main.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
        main.style.color = 'black';
        var inputs = document.getElementsByTagName('input');
        for(input of inputs){
          input.style.color = 'black';
        }
        var categories = document.getElementsByClassName('category-container');
        for(each of categories){
            // each.style.fontWeight = '600';
            each.style.color = each.style.backgroundColor;
            each.style.backgroundColor = 'white';
            
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
toggle.addEventListener('click', function(){
  if(mode == 'dark')
    mode = 'light';
  else
    mode = 'dark';
    // console.log(to)
    myFunction();
});
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