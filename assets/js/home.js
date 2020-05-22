function myFunction() {
    if(this.checked){
        console.log('DarkMode');
        $.ajax({
            type:"get",
            url:"/",
            success:function(){
              console.log('success');
            },
            data:{
                "mode":"dark" 
              },
            error:function(){
              console.log('error');
            }
          });
    }
    else{
    console.log('LigthMode');
    $.ajax({
        type:"get",
        url:"/",
        success:function(){
          console.log('success');
        },
        data:{
            "mode":"light" 
          },
        error:function(){
          console.log('error');
        }
      });
    }
}
var toggle = document.getElementById('btn1');
toggle.addEventListener('click', myFunction);
