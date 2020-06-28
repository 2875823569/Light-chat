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
    // 
    
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

console.log(localStorage);

// 发送消息
sendbtn.onclick = function () {
    // 
   
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
            

            if (res.code == 101) {
                
                // confirm("你不是对方的好友")

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
                <img src="http://118.24.25.7/${localStorage.head_log}"style="border-radius: 50%;width: 1.4rem;height:1.4rem"></div>
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
            console.log(head_log);
            

            window.localStorage.setItem('head_log', head_log)
        })
        .fail(function (res) {
            
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
                
                
                if(res.data[i].user_id==localStorage.id){
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
                    <img src=http://118.24.25.7/${localStorage.head_log}" style="border-radius: 50%;width: 1.4rem;height:1.4rem"></div>
                    </div>`
                    mesbox.append(p)
                }else{
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
            // 
               
        })
        .fail(function (err) {
            
        })
        .always(function () {
        })
}
historys();





