var sendbtn = document.querySelector('.send');
var mesbox = document.querySelector('.mesbox');
var mes = document.querySelector('.textbox');
var userData = localStorage.getItem("userData");
var friendid=localStorage.getItem('friend_id');
userData = JSON.parse(userData);
var click = localStorage.getItem("click")
clickfriend = JSON.parse(click);
console.log(userData);
console.log(localStorage);

sendbtn.onclick = function () {
    console.log(mes.value)
    sendmes()
}

function sendmes(){
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
                mes.value=null;
            }else{
                console.log('发送失败');
            }

        })
        .fail(function () {

        })
        .always(function () { })
}

function receivemes(){
    $.ajax({
        url: "http://118.24.25.7/chat_api/interface/getMessages.php",
        type: "GET",
        data: {
            sign_str: localStorage.sign_str,
            user_id: localStorage.id,
        },
        dataType: "JSON",
        timeout: 3000
    })
        .done(function (res) {
            console.log(res);
            if(code==0){
                console.log("接收到消息");  
                var p = document.createElement('div');
                // p.style.display="block";
                p.innerHTML = `<div class="revb">
                <div class='rightmm'>
                <div class='nickname'>${localStorage.nickname}</div>
                <div class='mybox'>${mes.value}</div>
                </div>
                <div class="headlogo">
                <img src="../img/head_logo.jpg" style="border-radius: 50%;width: .8rem;height=.8rem"></div>
                </div><br><br>`
                mesbox.append(p)
                console.log(localStorage.nickname);
                mes.value=null;
            }else{
                console.log(接收失败);
                
            }
        })
        .fail(function () {

        })
        .always(function () { })
}
receivemes()

var lbtn=document.querySelector('.leftbtn');
lbtn.onclick=function(){
    location.href='Main.html'
}

var rightbtn=document.querySelector('.rightbtn');
rightbtn.onclick=function(){

}

// 添加好友
// $.ajax({
//     url: "http://118.24.25.7/chat_api/interface/addFriend.php",
//     type: "POST",
//     data: {
//         sign_str:localStorage.sign_str,
//         user_id:'68',
//         friend_user_id:'8',
//     },
//     dataType: "JSON",
//     timeout: 3000
// })
//     .done(function (res) {
//         console.log(res);
        

//     })
//     .fail(function () {

//     })
//     .always(function () { })

// 获取申请
// $.ajax({
//     url: " http://118.24.25.7/chat_api/interface/getFriendRequests.php",
//     type: "GET",
//     data: {
//         sign_str:localStorage.sign_str,
//         user_id:'68'

//     },
//     dataType: "JSON",
//     timeout: 3000
// })
//     .done(function (res) {
//         console.log(res);
        

//     })
//     .fail(function () {

//     })
//     .always(function () { })

    // 处理好友申请
    // $.ajax({
    //     url: "http://118.24.25.7/chat_api/interface/processFriendRequest.php",
    //     type: "POST",
    //     data: {
    //         sign_str:localStorage.sign_str,
    //         user_id:'68',
    //         from_user_id:'50',
    //         request_id:'158',
    //         process_result:'1', 

    //     },
    //     dataType: "JSON",
    //     timeout: 3000
    // })
    //     .done(function (res) {
    //         console.log(res);
            
    
    //     })
    //     .fail(function () {
    
    //     })
    //     .always(function () { })