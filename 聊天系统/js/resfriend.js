var a=localStorage;
console.log(a);


function getfriendid(){
    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/getFriendRequests.php",
        type:"POST",
        data:{
            sign_str:,
            user_id
        },
        datatype:"json"
    })
}