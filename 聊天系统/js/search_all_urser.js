var user_id = window.localStorage.getItem('id')
var sign_str = window.localStorage.getItem('sign_str')
var username = window.localStorage.getItem('username')
var nikename = window.localStorage.getItem('nickname')
var M = {}
$(".search").keydown(function (res) {
    // console.log(res.code)
    if(res.code==="Enter"){
        $.ajax({
            url:"http://118.24.25.7/chat_api/interface/getSearchUsers.php",
            type:"GET",
            data:{
                sign_str:sign_str,
                user_id:user_id,
                search_text:$(".search").val()
            },
            datatype:"JSON",
            success:(function (data) {
                // console.log(data.data)
                add_information(data.data)
            })
        })
    }
})
function add_information(arr){
    $(".container").html("")
    for(var i = 0;i<arr.length;i++){
        $(".container").html(function () {
            return $(".container").html() + `<div class="user_infomation">
                    <div class="information_left">
                        <img src="http://118.24.25.7/${arr[i].head_logo}">
                        <p class="username">${arr[i].username}</p>
                    </div>
                    <span class="add_btn" id="${arr[i].id}">添加</span>
                </div>`
        })
    }
    $(".container .add_btn").click(function () {
        add_friend(this.getAttribute("id"))
    })
}
//添加好友的函数
function add_friend(id) {
    $.ajax({
        url: "http://118.24.25.7/chat_api/interface/addFriend.php",
        type: "POST",
        data: {
            sign_str: sign_str,
            user_id: user_id,
            friend_user_id: id
        },
        datatype: "JSON",
        success: (function (msg) {
            // console.log(id)
            if(M.dialog1){
                return M.dialog1.show();
            }
            M.dialog1 = jqueryAlert({
                'content' : msg.msg,
                'closeTime' : 2000,
                'end':function(){
                }
            })
        }),
        err: (function (msg) {
            console.log(msg)
        })
    })
}

//取消按钮
$(".cancel").click(function () {
    parent.location.href='../html/main_box.html'
})
