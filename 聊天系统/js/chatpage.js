var sendbtn = document.querySelector('.send');
var mesbox = document.querySelector('.mesbox');
var mes = document.querySelector('.textbox');
var userid = document.querySelector('.userid')
var friendid = window.localStorage.getItem('friend_id');
var nickname = localStorage.getItem('nick_name')
userid.innerHTML = `${nickname}`;
// console.log(friendid);


// 返回按钮
var lbtn = document.querySelector('.leftbtn');
lbtn.onclick = function () {
    location.href = 'Main.html'
}
// 右菜单栏
var rightbtn = document.querySelector('.rightbtn');
rightbtn.onclick = function () {

}

var click = localStorage.getItem("click")
clickfriend = JSON.parse(click);
console.log(localStorage);


function back() {
    var timer = null;
    timer = setInterval(function () {
        location.href = '../Login.html'
    }, 3000)
    clearTimeout()
}

// 接收消息
function receivemes() {
    $.ajax({
        url: 'http://118.24.25.7/chat_api/interface/getMessages.php',
        type: "GET",
        data: {
            sign_str: localStorage.sign_str,
            user_id: localStorage.id,
        },
        dataType: "JSON",
        timeout: 6000
    })
        .done(function (res) {
            console.log(res);

            if (res.code == 0) {


                var p = document.createElement('div');
                p.style.display = "block";
                console.log(res.data[0].nickname);
                p.innerHTML = `<div class="revb">
            <div class="headlogo">
            <img src="../img/head_logo.jpg" style="border-radius: 50%;width: .8rem;height=.8rem"></div>
            </div>
            <div class='rightmm'>   
            <div class='nickname'>${res.data[0].nickname}</div>
            <div class='mbox'>${res.data[0].message}</div>
            </div>
            <br>`
                mesbox.append(p)
                var lmessage = localStorage.setItem('p');
                console.log(lmessage);

                console.log(localStorage.nickname);
                mes.value = null;
            } else if (res.code == 3) {
                var timer = null;
                timer = setInterval(function () {
                    location.href = '../Login.html'
                }, 3000)
                clearTimeout()
            }
            else {
                console.log('sss');
            }
        })
        .fail(function (res) {
            console.log(res);
        })
        .always(function () {
            receivemes();
        })
}
receivemes();

// 发送消息
sendbtn.onclick = function () {
    console.log(mes.value)
    $.ajax({
        url: "http://118.24.25.7/chat_api/interface/sendMessage.php",
        type: "POST",
        data: {
            sign_str: localStorage.sign_str,
            user_id: localStorage.id,
            receive_user_id: friendid,
            message: mes.value
        },
        dataType: "JSON",
    })
        .done(function (res) {
            console.log(res);

            if (res.code == 101) {
                console.log("你不是对方的好友");
                confirm("你不是对方的好友")

            } else if (res.code == 0) {
                console.log('发送成功');
                var p = document.createElement('div');
                p.innerHTML = `<div class="sendb">  
                <div class='leftmm'>
                <div class='nickname'>${localStorage.nickname}</div>
                <div class='mybox'>${mes.value}</div>
                </div>
                <div class="headlogo">
                <img src="../img/head_logo.jpg" style="border-radius: 50%;width: .8rem;height=.8rem"></div>
                </div><br><br><br>`
                mesbox.append(p)

                // console.log(localStorage.nickname);
                mes.value = null;

            } else {
                console.log('发送失败');
            }

        })
        .fail(function (res) {
            if (res.code == 3) {
                var timer = null;
                timer = setInterval(function () {
                    location.href = '../Login.html'
                }, 3000)
                clearTimeout()
            }else{
                var timer = null;
                timer = setInterval(function () {
                    location.href = '../Login.html'
                }, 3000)
                clearTimeout()
            }

        })
        .always(function () { })
}






