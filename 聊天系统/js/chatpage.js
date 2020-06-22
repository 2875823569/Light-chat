var sendbtn=document.querySelector('.send');
var mesbox=document.querySelector('.mesbox');
var mes=document.querySelector('.textbox');
console.log(mes);
var userData=localStorage.getItem("userData")
userData=JSON.parse(userData)
console.log(userData);


sendbtn.onclick=function(){
    console.log(mes.value)
    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/sendMessage.php",
        type:"POST",
        data:{
            sign_str:userData.data.sign_str,
            user_id:userData.data.id,
            receive_user_id:3,
            message:mes.value
        },
        dataType:"JSON"
    })
    .done(function(res){
        console.log('发送成功');
        
    })
    .fail(function(){
        console.log('123')
        if(res.code==101){
            console.log("你不是对方的好友");
            
        }
    })
    .always(function(){})
}
