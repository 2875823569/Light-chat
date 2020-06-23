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
        timeout:1000*20,
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
        .always(function () {

        })
}
var notic_data = {
    sign_str:sign_str,
    user_id:id
}
var arr=[]
longLoop("http://118.24.25.7/chat_api/interface/getMessages.php","GET",notic_data,function (data) {
    console.log(data)
    for(var i=0;i<data.data.length;i++){
        var time = data.data[i].message_send_time.match(/(\d\d:\d\d):\d\d/)[1]

        if(arr.includes(data.data[i].user_id)){
            $(`.notice_num[user_id=${data.data[i].user_id}]`).html(function (n) {
                console.log($(".notice_num").html())
                return parseInt($(".notice_num").html())+1;
            })
            $(`.notice_container[user_id=${data.data[i].user_id}]`).html(data.data[i].message)
            $(`.send_time[user_id=${data.data[i].user_id}]`).html(time)
        }else{
            arr.push(data.data[i].user_id)
            add_information(time,data.data[i].nickname,data.data[i].head_logo,data.data[i].message,data.data[i].user_id)
        }
        
        $(".notice_area").on("click",".notice_infomation",function () {
            location.href = 'html/chatpage.html'
            window.localStorage.setItem('friend_id',this.getAttribute("user_id"));
        })
    }
  })
//添加消息的函数
function add_information(time,uname,head_logo,message,user_id) {
    $(".notice_area").html(function(n){
        return $(".notice_area").html()+`<div class="notice_infomation" user_id=${user_id}>
                    <img src="http://118.24.25.7/chat_api${head_logo}" class="notice_uheadimg">
                    <div class="notice_left">
                        <div class="notice_information">
                            <p class="uname">${uname}</p>
                            <p class="send_time" user_id=${user_id}>${time}</p>
                        </div>
                        <div class="notice_container" user_id=${user_id}>${message}</div>
                        <span class="notice_num" user_id=${user_id}>1</span>
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

