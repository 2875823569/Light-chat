var M = {}
//创建弹窗
function create_tc(message){
    $(".out").html(function () {
        return `<div class="tcbox" num="${num}">
            <p>${message}</p>
        </div>`+$('.out').html()
    })
    //给弹窗显示事件
    $(".out .tcbox").css({"animation":"ani 3s"})

    var timer = setInterval(function () {
        $(`.out .tcbox[num=${num}]`).remove();
        console.log(num)
        num++;
        clearInterval(timer)
    },3000)
}

//点击登陆按钮
$(document).delegate("#loading",'click',function(){
    //输入的账号为空时
    if($("#uername")[0].value===""){
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
        url:"http://118.24.25.7/chat_api/interface/login.php",
        type:"POST",
        data:data,
        // dataType:JSON,
        success:(function (msg) {
            if(msg.msg==="success"){
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
                    // console.log(msg)
                    window.localStorage.setItem('id',msg.data.id);
                    window.localStorage.setItem('sign_str',msg.data.sign_str);
                    window.localStorage.setItem('username',msg.data.username);
                    window.localStorage.setItem('nickname',msg.data.nickname);
                    clearInterval(timer)
                },1000)

            }else{
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
    if(headimg===""){
        $.ajax({
            url:"http://118.24.25.7/chat_api/interface/reg.php",
            type:"POST",
            data:{
                username:uname,
                password:password,
                nickname:nickname
            },
            success:(function (msg) {
                if(M.dialog1){
                    return M.dialog1.show();
                }
                M.dialog1 = jqueryAlert({
                    'content' : '注册成功',
                    'closeTime' : 2000,
                    'end':function(){
                    }
                })
            })
        })
    }
})
