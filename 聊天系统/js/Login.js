$("#loading").click(function () {
    if($("#uername")[0].value===""){
        alert("请输入账号")
        return;
    }else if($("#password")[0].value===""){
        alert("请输入密码");
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
                $(".tcbox").css({"opacity":".8","top":".6rem"})
                var timer = setInterval(function () {
                    $(".tcbox").css({"opacity":"0"})
                    location.href = 'html/main_box.html'

                    var uinformation = [{"id":msg.data.id,"sign_str":msg.data.sign_str,"uname":msg.data.username}]
                    //设置localStorage
                    // console.log(msg)
                    window.localStorage.setItem('id',msg.data.id);
                    window.localStorage.setItem('sign_str',msg.data.sign_str);
                    window.localStorage.setItem('username',msg.data.username);
                    window.localStorage.setItem('nickname',msg.data.nickname);
                    clearInterval(timer)
                },600)
                // console.log(msg.data.nickname)
                // alert("登陆成功");
            }else{

                alert(msg.msg)
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
    console.log(123)
    $(".loading_window").toggle("slow")
    $(".register_window").toggle("slow")
})


$(".footer").on("click","#open_register_btn",function(){
    console.log(123)
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
        alert("请将信息填完整")
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
                // console.log(msg)
                alert(msg.msg)
            })
        })
    }
})
