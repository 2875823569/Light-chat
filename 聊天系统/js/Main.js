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

//退出
login_out_slider.click(function(){
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