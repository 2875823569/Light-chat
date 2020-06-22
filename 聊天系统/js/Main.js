//获取传递过来的localStorage
var id = window.localStorage.getItem('id')
var sign_str = window.localStorage.getItem('sign_str')
var username = window.localStorage.getItem('username')
var nikename = window.localStorage.getItem('nickname')


//------------------------------------------------右边隐藏界面--------------------------------------------------------------
$(".icon-shizi").click(function () {
    $(".icon-shizi").toggleClass("shizi_isclicked")
    $(".hidden_rigth").toggleClass("hidden_rigth_display")
})
//申请好友
$(".add_btn").click(function(){
    //申请好友
    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/addFriend.php",
        type:"POST",
        data:{
            sign_str:sign_str,
            user_id:id,
            friend_user_id:$(".add_input").val()
        },
        datatype:"JSON",
        success:(function (msg) {
            alert(msg.msg)
        }),
        err:(function (msg) {
            console.log(msg)
        })


    })
})





//------------------------------------------------个人信息界面--------------------------------------------------------------
$(".head_img").click(function(){
    console.log(111)
})

