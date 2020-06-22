//获取传递过来的localStorage
var id = window.localStorage.getItem('id')
var sign_str = window.localStorage.getItem('sign_str')
var username = window.localStorage.getItem('username')
var nikename = window.localStorage.getItem('nickname')

console.log("id:"+id)
console.log("sign_str:"+sign_str)
console.log("username:"+username)
console.log("nickname:"+nikename)


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

//------------------------------------------------聊天信息界面--------------------------------------------------------------
//长轮询
function longLoop(url,type,data,callback) {
    $.ajax({
        url:url,
        type:type,
        dataType:"json",
        timeout:1000*5,
        data:data,
        success(data){
            callback(data)
        },
        error(data){

        },
        complete(){
            longLoop(url,type,data,callback)
        }
    })
}
var notic_data = {
    sign_str:sign_str,
    user_id:id
}

longLoop("http://118.24.25.7/chat_api/interface/getMessages.php","GET",notic_data,function (data) {
    console.log(data)
    var arr=[]
    for(var i=0;i<data.data.length;i++){
        if(arr.includes(data.data[i].user_id)){
            $(".notice_num").html(function (n) {
                return parseInt($(".notice_num").html())+1;
            })
            continue;
        }
        var time = data.data[0].message_send_time.match(/(\d\d:\d\d):\d\d/)[1]
        add_information(time,data.data[0].nickname,data.data[0].head_logo,data.data[0].message)

    }
  })
//添加消息的函数
function add_information(time,uname,head_logo,message) {
    $(".notice_area").html(function(n){
        return $(".notice_area").html()+`<div class="notice_infomation">
                    <img src="http://118.24.25.7/chat_api${head_logo}" class="notice_uheadimg">
                    <div class="notice_left">
                        <div class="notice_information">
                            <p class="uname">${uname}</p>
                            <p class="send_time">${time}</p>
                        </div>
                        <div class="notice_container">${message}</div>
                        <span class="notice_num">1</span>
                    </div>
                </div>`
    })
}

// 搜索用户
//用户按下回车键执行的操作
        function ctlent() {
            if(event.keyCode === 14) {
                console.log(123)
                // document.getElementsByClassName("search")[0].focus() //焦点将移到id为"text"的对象上。
            }
        }
document.onkeydown = ctlent

// $.ajax({
//     url:"http://118.24.25.7/chat_api/interface/getSearchUsers.php",
//     type:"GET",
//     data:{
//         sign_str:sign_str,
//         user_id:id,
//         search_text:$(".search").val
//     },
//     datatype:"JSON",
//     success:(function (msg) {
//         console.log(msg)
//     })
// })

//------------------------------------------------个人信息界面--------------------------------------------------------------
//获取元素
var left_home = $(".left_home")
var left_le = $(".left_le")
var left_ri = $(".left_ri")

//获取大框宽度
var ri_width = -$(".left_home").width()

//点击滑出
$(".head_img").mousedown(function () {
    left_home.css("left", "0")
})

//左滑隐藏
left_ri.mousedown(function () {
    left_home.css("left", `${ri_width}px`)
})

