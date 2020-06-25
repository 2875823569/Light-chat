//获取传递过来的localStorage
var id = window.localStorage.getItem('id')
var sign_str = window.localStorage.getItem('sign_str')
var username = window.localStorage.getItem('username')
var nikename = window.localStorage.getItem('nickname')
//------------------------------------------------右边隐藏界面--------------------------------------------------------------
$(".icon-shizi-copy").click(function () {
    $(".icon-shizi-copy").toggleClass("shizi_isclicked")
    $(".hidden_rigth").toggleClass("hidden_rigth_display")
})
//申请好友
$(".add_btn").click(function () {

    //申请好友
    $.ajax({
        url: "http://118.24.25.7/chat_api/interface/addFriend.php",
        type: "POST",
        data: {
            sign_str: sign_str,
            user_id: id,
            friend_user_id: $(".add_input").val()
        },
        datatype: "JSON",
        success: (function (msg) {
            alert(msg.msg)
        }),
        err: (function (msg) {
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
            if(data.msg === "签名字符串已过期"){
                location.href = '../Login.html';
                console.log(1)
            }
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
        set_add_information(data.data[i])
        var time = data.data[i].message_send_time.match(/(\d\d:\d\d):\d\d/)[1]
        if(arr_id.includes(data.data[i].user_id)){
            $(`.notice_num[user_id=${data.data[i].user_id}]`).html(function (n) {
                console.log($(".notice_num").html())
                return parseInt($(".notice_num").html())+1;
            })
            $(`.notice_container[user_id=${data.data[i].user_id}]`).html(data.data[i].message)
            $(`.send_time[user_id=${data.data[i].user_id}]`).html(time)
        }else{
            arr_id.push(data.data[i].user_id)
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
                        <span class="notice_num" user_id=${user_id} uname=${uname}>0</span>
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
        $(`.notice_num[user_id=${arr_notice.user_id}]`).css({"display":"inline-block"});
        $(`.notice_container[user_id=${arr_notice.user_id}]`).html(arr_notice.message)
        $(`.send_time[user_id=${arr_notice.user_id}]`).html(time)

    }else{
        arr_id.push(arr_notice.user_id)
        add_information(time,arr_notice.nickname,arr_notice.head_logo,arr_notice.message,arr_notice.user_id)
        $(`.notice_num[user_id=${arr_notice.user_id}]`).html("1");
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
        success:(function (msg) {
            callback(msg)
        }),
        error(msg) {
            console.log(msg)
            console.log("获取失败")
        }
    })
}

// 添加聊天记录到主页上
get_friendlist("http://118.24.25.7/chat_api/interface/getFriends.php",function (data) {
    // console.log(11)
    var friend_list = data.data

    for(let i=0;i<friend_list.length;i++){
        getchatlist(id,sign_str,friend_list[i].user_id,function (data) {
            if(!data.data[0]) return;

            var data_list = {"message_send_time":"14:20:06","nickname":friend_list[i].nickname,"user_id":friend_list[i].user_id,
                "head_logo":friend_list[i].head_logo,"message":data.data[0].message}
            arr_id.push(friend_list.user_id)
            // console.log(data.data[0].message)
            set_add_information(data_list)
            $(".notice_area .notice_num").css({"display":"none"});
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
var avatar = $("#avatar")
var avatar2 = $("#avatar2")
var btn_file = $("#btn_file")
var btn_submit = $("#btn_submit")
var change_avatar = $(".change_avatar")
var backg = $(".backg")
var login_out_slider= $(".login_out_slider")
var login_out =$(".login_out")

//获取大框宽度
var ri_width = -$(".left_home").width()
var ri_height = $(".left_home").height()

$("#avatar").css("top",ri_height/14)
$("#avatar").css("left",-ri_width/40)
$(".backg").children().eq(1).css("top",ri_height/100-20)
$(".backg").children().eq(1).css("left",-ri_width/4)


//点击滑出
$(".head_img").click(function () {
    left_home.css("left", "0")
})

//左滑隐藏
left_ri.click(function () {
    left_home.css("left", `${ri_width}px`)
})

//滑动效果
avatar.click(function () {
    change_avatar.slideToggle("slow")
})
login_out.click(function(){
    login_out_slider.slideToggle("slow")
})

$("#login_outt").click(function(){
    parent.location.href="../Login.html"
})


//获取用户头像
$.ajax({
    url: "http://118.24.25.7/chat_api/interface/getHeadImg.php",
    type: 'GET',
    data: {
        username: username
    },
    success: function (msg) {
        // console.log(msg.data[0].head_logo);
        var user_head_logo = msg.data[0].head_logo

        //获取的数据显示到页面
        avatar.attr("src", "http://118.24.25.7/chat_api" + user_head_logo)
        avatar2.attr("src", "http://118.24.25.7/chat_api" + user_head_logo)
        backg.children().eq(1).children().eq(0).children().empty().append(username)
        backg.children().eq(1).children().eq(1).children().empty().append(nikename)

        //上传图片
        btn_submit.click(function () {
            var btn_file_val = btn_file.val()
            var hzm = btn_file_val.substr(btn_file_val.indexOf(".") + 1)

            if (btn_file_val == "") {
                alert("亲，您未选择任何图片哦")
            }
            else if (hzm != "png" && hzm != "jpg" && hzm != "JPG" && hzm != "PNG") {
                alert("亲，请选择一张PNG或者是JPG格式的图片哦")
            }
            else {
                var file = btn_file[0].files[0];
                var data = new FormData();
                data.append('file', file)
                // console.log(data);
                
                $.ajax({
                    url: "http://118.24.25.7/chat_api/interface/upload.php",
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (msg) {
                        console.log(msg.data.path);
                        var data_path = "http://118.24.25.7"+msg.data.path
                        // console.log(msg.data);
                        $.ajax({
                            url:"http://118.24.25.7/chat_api/interface/modifyHeadLogo.php",
                            type:"GET",
                            data:{
                                sign_str:sign_str,
                                user_id:id,
                                head_logo_path:data_path,
                            },
                            success: function (msg) {
                                console.log(msg);
                                console.log(1);
                                
                            },
                            error: function (msg) {
                                console.log(2);
                                
                                console.log(msg);
                            }
                        })
                    },
                    error: function (msg) {
                        console.log(msg);
                    }
                })
            }
        })
    },
    error: function () {
        console.log("faile");
    }
})