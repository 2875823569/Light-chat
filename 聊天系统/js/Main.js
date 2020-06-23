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
            console.log(msg);
            
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
var arr_id=[]//存放发信息的id
longLoop("http://118.24.25.7/chat_api/interface/getMessages.php","GET",notic_data,function (data) {
    // set_add_information(data.data)
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
            location.href = '../html/chatpage.html'
            window.localStorage.setItem('friend_id',this.getAttribute("user_id"));
        })
    }
  })

//添加消息的函数
function add_information(time,uname,head_logo,message,user_id) {
    $(".notice_area").html(function(n){
        return `<div class="notice_infomation" user_id=${user_id} uname=${uname}>
                    <img src="http://118.24.25.7/chat_api${head_logo}" class="notice_uheadimg">
                    <div class="notice_left">
                        <div class="notice_information1">
                            <p class="uname">${uname}</p>
                            <p class="send_time" user_id=${user_id} uname=${uname}>${time}</p>
                        </div>
                        <div class="notice_container" user_id=${user_id} uname=${uname}>${message}</div>
                        <span class="notice_num" user_id=${user_id} uname=${uname}>1</span>
                    </div>
                </div>`+$(".notice_area").html()
    })
}
function set_add_information(arr_notice) {
    var time = arr_notice.message_send_time.match(/(\d\d:\d\d):\d\d/)[1]

    if(arr_id.includes(arr_notice.user_id)){
        $(`.notice_num[user_id=${arr_notice.user_id}]`).html(function (n) {
            // console.log($(".notice_num").html())
            return parseInt($(`.notice_num[user_id=${arr_notice.user_id}]`).html())+1;
        })
        $(`.notice_container[user_id=${arr_notice.user_id}]`).html(arr_notice.message)
        $(`.send_time[user_id=${arr_notice.user_id}]`).html(time)
    }else{
        arr_id.push(arr_notice.user_id)
        add_information(time,arr_notice.nickname,arr_notice.head_logo,arr_notice.message,arr_notice.user_id)
    }

    $(".notice_area").on("click",".notice_infomation",function () {
        location.href = '../html/chatpage.html'
        window.localStorage.setItem('friend_id',this.getAttribute("user_id"));
        window.localStorage.setItem('nick_name',this.getAttribute("uname"));
    })
}

//获取好友列表
function get_friendlist(url,callback) {
    $.ajax({
        url:url,
        type:"GET",
        datatype:"json",
        data:{
            sign_str:sign_str,
            user_id:id,
        },
        success:(function (data) {
            callback(data)
        })
    })
}

//获取聊天记录
function getchatlist(user_id,sign_str,friend_id,callback) {
    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/getChatHistory.php",
        type:"GET",
        datatype:"json",
        data:{
            sign_str:sign_str,
            user_id:user_id,
            friend_id:friend_id
        },
        success(data) {
            console.log(data)
            callback(data)
        },
        error(data) {
            console.log("获取失败")
        }
    })
}
getchatlist(id,sign_str,50)

// 添加聊天记录到主页上
get_friendlist("http://118.24.25.7/chat_api/interface/getFriends.php",function (data) {
    arr_id.push(data.data.user_id)
    for(var i=0;i<arr_id.length;i++){
        getchatlist(id,sign_str,arr_id[i],function (data) {
            set_add_information(data.data[0])
        })
    }
})

// 搜索用户
//用户按下回车键执行的操作


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

