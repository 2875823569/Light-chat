var sendbtn = document.querySelector('.send');
var mesbox = document.querySelector('.mesbox');
var mes = document.querySelector('.textbox');
var userid = document.querySelector('.userid')
var friendid = window.localStorage.getItem('friend_id');
var nickname = localStorage.getItem('nick_name')
userid.innerHTML = `${nickname}`;
// var reslogo=localStorage.getItem('')
var all_net = obj = JSON.parse(window.localStorage.getItem("all_net"))
// 


// 返回按钮
var lbtn = document.querySelector('.leftbtn');
lbtn.onclick = function () {
    window.history.go(-1)
}
// 右菜单栏
var rightbtn = document.querySelector('.rightbtn');
rightbtn.onclick = function () {

}

var click = localStorage.getItem("click")
clickfriend = JSON.parse(click);



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
        url: all_net.getMessages_net,
        type: "GET",
        data: {
            sign_str: localStorage.sign_str,
            user_id: localStorage.id,
        },
        dataType: "JSON",
        timeout: 6000
    })
        .done(function (res) {


            if (res.code == 0) {

                var message = res.data[0].message.split('<').join('&lt').split('>').join('&gt')
                var p = document.createElement('div');
                p.style.display = "block";

                p.innerHTML = `
                <div class="sendb2"> 
                <div class="headlogo2">
                <img src="http://118.24.25.7/${localStorage.friend_head_log}"style="border-radius: 50%;width: 1.4rem;height:1.4rem"></div>
                <div class='rightmm'>
                <div class='nickname2'>${res.data[0].nickname}</div>
                <div class='mybox2'>${message}</div>
                </div>
                </div>
                `
                mesbox.append(p)
                // // var lmessage = localStorage.setItem('p');
                // 
                //
                // 
            } else if (res.code == 3) {
                var timer = null;
                timer = setInterval(function () {
                    location.href = '../Login.html'
                }, 3000)
                clearTimeout()
            }
            else {

            }
        })
        .fail(function (res) {

        })
        .always(function () {
            receivemes();
        })
}
receivemes();
headlog()
// 回车发送消息
$(".textbox").keydown(function (res) {
    if (res.code === "Enter") {
        sendmessage()
    }
})
// 点击发送消息
sendbtn.onclick = function () {
    // console.log(mes.value)
    sendmessage()

}

function sendmessage() {
    $.ajax({
        url: all_net.sendMessage_net,
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


            if (res.code == 101) {
                console.log(res);
                var Mes = {}
                if (Mes.dialog1) {
                    return Mes.dialog1.show();
                }
                Mes.dialog1 = jqueryAlert({
                    'content': '你不是对方的好友',
                    'closeTime': 2000,
                    'end': function () {
                    }
                })

            } else if (res.code == 0) {

                var head_log = res.data
                var p = document.createElement('div');
                p.classList.add('messbox')
                var message = mes.value.split('<').join('&lt').split('>').join('&gt')
                p.innerHTML = `<div class="sendb">  
                <div class='leftmm'>
                <div class='nickname'>${localStorage.nickname}</div>
                <div class='mybox'>${mes.value}</div>
                </div>
                <div class="headlogo">
                <img src="http://118.24.25.7/${localStorage.head_log}" style="border-radius: 50%;width: 1.4rem;height:1.4rem"></div>
                </div>`
                mesbox.append(p)

                // var p = document.createElement('div');
                // p.classList.add('messbox')
                // var message = mes.value.split('<').join('&lt').split('>').join('&gt')
                // p.innerHTML = `
                // <div class="sendb2"> 
                // <div class="headlogo2">
                // <img src="http://118.24.25.7/${localStorage.head_log}" style="border-radius: 50%;width: 1.4rem;height=1.4rem"></div>
                // <div class='rightmm'>
                // <div class='nickname2'>${localStorage.nickname}</div>
                // <div class='mybox2'>${mes.value}</div>
                // </div>
                // </div>
                // `
                // mesbox.append(p)

                // 
                mes.value = null;

            } else {
                console.log(res);

                var Mes = {}
                if (Mes.dialog1) {
                    return Mes.dialog1.show();
                }
                Mes.dialog1 = jqueryAlert({
                    'content': '发送失败,消息不能为空',
                    'closeTime': 2000,
                    'end': function () {
                    }
                })

            }
        })
        .fail(function (res) {
            if (res.code == 3) {
                var timer = null;
                timer = setInterval(function () {
                    location.href = '../Login.html'
                }, 3000)
                clearTimeout()
            } else if (res.code == 2) {
                var timer = null;
                timer = setInterval(function () {
                    location.href = '../Login.html'
                }, 3000)
                clearTimeout()
            }

        })
        .always(function () { })
}
// 获取头像
function headlog() {
    $.ajax({
        url: all_net.getHeadImg_net,
        type: "GET",
        data: {
            username: localStorage.username,
        },
        dataType: "JSON",
    })
        .done(function (res) {

            var head_log = res.data[0].head_logo;
            // console.log(head_log);
            window.localStorage.setItem('head_log', head_log)
        })
        .fail(function (err) {
            console.log(err);

        })
        .always(function () {
        })
}



// 获取历史记录
function historys() {
    $.ajax({
        url: all_net.getChatHistory_net,
        type: "GET",
        data: {
            sign_str: localStorage.sign_str,
            user_id: localStorage.id,
            friend_id: friendid,
        },
        dataType: "JSON",
    })
        .done(function (res) {


            for (i = 0; i < res.data.length; i++) {


                if (res.data[i].user_id == localStorage.id) {
                    var p = document.createElement('div');
                    p.classList.add('messbox')
                    // var messbox=document.querySelector('.messbox');
                    var message = res.data[i].message.split('<').join('&lt').split('>').join('&gt')
                    p.innerHTML = `<div class="sendb">  
                    <div class='leftmm'>
                    <div class='nickname'>${localStorage.nickname}</div>
                    <div class='mybox'>${res.data[i].message}</div>
                    </div>
                    <div class="headlogo">
                    <img src="http://118.24.25.7/${localStorage.head_log}" style="border-radius: 50%;width: 1.4rem;height:1.4rem"></div>
                    </div>`
                    mesbox.append(p)
                } else {
                    var message = res.data[0].message.split('<').join('&lt').split('>').join('&gt')
                    var p = document.createElement('div');
                    p.style.display = "block";

                    p.innerHTML = `
                    <div class="sendb2"> 
                    <div class="headlogo2">
                    <img src="http://118.24.25.7/${localStorage.friend_head_log}" style="border-radius: 50%;width: 1.4rem;height:1.4rem"></div>
                    <div class='rightmm'>
                    <div class='nickname2'>${nickname}</div>
                    <div class='mybox2'>${res.data[i].message}</div>
                    </div>
                    </div>
                    `
                    mesbox.append(p)
                    // 
                    // var timer = null;
                    // timer = setInterval(function(){
                    //     // 
                    //     
                    //     window.scrollTo(0,parseInt(document.documentElement.clientHeight))
                    //     clearInterval(timer)
                    // },100)
                }
            }
            console.log(document.documentElement.clientHeight);
            // console.log($(".messbox .mybox2")[0].getBoundRect.top)

        })
        .fail(function (err) {
            console.log(err);

        })
        .always(function () {
        })
}
historys();
$("body").scrollTop(document.documentElement.clientHeight)





