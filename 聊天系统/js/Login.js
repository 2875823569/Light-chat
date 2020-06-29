
window.localStorage.clear();
window.localStorage.setItem("window_num","1")

var all_net = {
    regist_net:"http://118.24.25.7/chat_api/interface/reg.php", //注册
    login_net:"http://118.24.25.7/chat_api/interface/login.php", //登陆
    addFriend_net:"http://118.24.25.7/chat_api/interface/addFriend.php",//申请好友
    getFriendRequests_net:"http://118.24.25.7/chat_api/interface/getFriendRequests.php",//获取好友申请
    processFriendRequest_net:"http://118.24.25.7/chat_api/interface/processFriendRequest.php",//处理好友申请
    getFriends_net:"http://118.24.25.7/chat_api/interface/getFriends.php",//获取好友列表
    removeFriend_net:"http://118.24.25.7/chat_api/interface/removeFriend.php",//删除好友"
    sendMessage_net:"http://118.24.25.7/chat_api/interface/sendMessage.php",//发消息
    getMessages_net:"http://118.24.25.7/chat_api/interface/getMessages.php",//获取消息
    logout_net:"http://118.24.25.7/chat_api/interface/logout.php",//登出
    getSearchUsers_net:"http://118.24.25.7/chat_api/interface/getSearchUsers.php",//搜索用户
    getUserInfo_net:"http://118.24.25.7/chat_api/interface/getUserInfo.php", //获取用户信息
    upload_net:"http://118.24.25.7/chat_api/interface/upload.php", //图片上传
    getChatHistory_net:"http://118.24.25.7/chat_api/interface/getChatHistory.php",//获取历史记录
    getHeadImg_net:"http://118.24.25.7/chat_api/interface/getHeadImg.php", //获取用户头像
    modifyHeadLogo_net:"http://118.24.25.7/chat_api/interface/modifyHeadLogo.php", //改变头像
    headInner_net:" http://118.24.25.7"//头像前置
}
window.localStorage.setItem("all_net",JSON.stringify(all_net))

function Login(){
     //输入的账号为空时
     if($("#uername")[0].value===""){
        var M = {}
        if(M.dialog1){
            return M.dialog1.show();
        }
        M.dialog1 = jqueryAlert({
            'content' : '请输入账号',
            'closeTime' : 2000,
            'end':function(){
            }
        })
        return;

    }
    //输入的密码为空时
    else if($("#password")[0].value===""){
        var M = {}
        if(M.dialog1){
            return M.dialog1.show();
        }
        M.dialog1 = jqueryAlert({
            'content' : '请输入密码',
            'closeTime' : 2000,
            'end':function(){
            }
        })
        return;
    }

    var data = {
        username: `${$("#uername")[0].value}`,
        password: `${$("#password")[0].value}`
    }
    $.ajax({
        url:all_net.login_net,
        type:"POST",
        data:data,
        // dataType:JSON,
        success:(function (msg) {
            if(msg.msg==="success"){
                var M = {}
                if(M.dialog1){
                    return M.dialog1.show();
                }
                M.dialog1 = jqueryAlert({
                    'content' : '登陆成功',
                    'closeTime' : 2000,
                    'end':function(){
                    }
                })

                var timer = setInterval(function () {
                    location.href = 'html/main_box.html'
                    // var uinformation = [{"id":msg.data.id,"sign_str":msg.data.sign_str,"uname":msg.data.username}]
                    //设置localStorage
                    // 
                    window.localStorage.setItem('id',msg.data.id);
                    window.localStorage.setItem('sign_str',msg.data.sign_str);
                    window.localStorage.setItem('username',msg.data.username);
                    window.localStorage.setItem('nickname',msg.data.nickname);
                    clearInterval(timer)
                },1000)

            }else{
                var M = {}
                if(M.dialog1){
                    return M.dialog1.show();
                }
                M.dialog1 = jqueryAlert({
                    'content' : msg.msg,
                    'closeTime' : 2000,
                    'end':function(){
                    }
                })
            }
        }),
        err:(function () {
            alert("连接失败")
        })
    })
}

//点击登陆按钮
//按回车登陆
$("body").keydown(function(res){
    if(res.code==="Enter"){
    Login();
}
})

$("#loading").click(function(){
    Login();
})

$(".loading:nth-of-type(3)").mousedown(function () {
    $(".loading:nth-of-type(3)")[0].style.backgroundColor = "rgba(213, 222, 228, 0.51)"
})


$(".register_window .icon-jiantouzuoxi").click(function () {
    $(".loading_window").toggle("slow")
    $(".register_window").toggle("slow")
})


$(".footer").on("click","#open_register_btn",function(){
    $(".loading_window").toggle("slow")
    $(".register_window").toggle("slow")
})


//------------------------------------------------注册界面js--------------------------------------------------------------
$("#regist_btn").click(function () {
    uname = $("#regist_name input").val()
    password = $("#regist_password input").val()
    nickname = $("#regist_nickname input").val()
    headimg = $("#regist_headimg input").val()

    if(uname===""||password===""||nickname===""){
        var M = {}
        if(M.dialog1){
            return M.dialog1.show();
        }
        M.dialog1 = jqueryAlert({
            'content' : '请将信息填写完整',
            'closeTime' : 2000,
            'end':function(){
            }
        })
        return;
    }
        $.ajax({
            url:all_net.regist_net,
            type:"POST",
            data:{
                username:uname,
                password:password,
                nickname:nickname
            },
            success:(function (msg) {
                var M = {}
                if(M.dialog1){
                    return M.dialog1.show();
                }
                M.dialog1 = jqueryAlert({
                    'content' : msg.msg,
                    'closeTime' : 4000,
                    'end':function(){
                    }
                })
            })
        })
})
