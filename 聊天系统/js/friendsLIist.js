
var addfriend=document.querySelector('#newFriends')
addfriend.onclick=function(){
    location.href='../html/resfriend.html'
}

$(function () {
    var all_net = obj=JSON.parse(window.localStorage.getItem("all_net"))
    var id = window.localStorage.getItem('id')
    var sign_str = window.localStorage.getItem('sign_str')
    var username = window.localStorage.getItem('username')
    var nikename = window.localStorage.getItem('nickname')
    var all_net = obj=JSON.parse(window.localStorage.getItem("all_net"))
    var curID=0;//现在点击头像的当前好友ID
// var sign_str;
// var user_id = ""
// var list=[];
// var user_id="";
// var password="";
// var delSignStr='';
// var delUserId='';
// var delFriendId=[];
    // $.ajax({
    //     url: 'http://118.24.25.7/chat_api/interface/login.php',
    //     type: 'POST',
    //     data: {
    //         username: 'koujing',
    //         password: '123456',
    //     },
    //     success: function (msg) {
    //         sign_str = msg.data.sign_str;
    //         user_id = msg.data.id;
    //         // console.log(user_id)
    //         getFriends(sign_str, user_id);
    //         callback(sign_str,user_id)
    //     }
    // })

    // function callback(sign_str,user_id){
    //     delSignStr=sign_str;
    //     delUserId=user_id;
    // }
    getFriends(sign_str,id);
    function getFriends(sign_str,id) {
        $.ajax({
            url: all_net.getFriends_net,
            type: 'GET',
            data: {
                // username:'aaaaa11',
                // password:'admin1',
                sign_str: sign_str,
                user_id:id
            },
            success: function (msg) {
                list=msg.data;
                writeLi(list);
            },
            failed: function (msg) {
                console.log(msg)
            }
        })
    }
    function writeLi(list){
        for(var i=0;i<list.length;i++){
            var str=`
            <li class="friends"><span class='Logo'><img class='headImg' src=" http://118.24.25.7/${list[i].head_logo}" alt=""></span>
                        <span class="nickname">${list[i].nickname}</span>
                        <span class="signature">${list[i].onlinechat_number}</span>
                        <button class="delete" style="display:none;">删除</button>
                    </li>
            `;
            $('#friendsUl').append(str);
        }
    }
    // function deleteFriends(sign_str,id,friend_id){
    //     $.ajax({
    //         url:"http://118.24.25.7/chat_api/interface/removeFriend.php",
    //         type:'POST',
    //         data:{
    //             sign_str:sign_str,
    //             user_id:id,
    //             friend_id:friend_id
    //         },
    //         success:function(msg){
    //             console.log(msg);
    //         }
    //     })
    // }
    //关于删除按钮的出现与隐藏
    // var friends=document.querySelector('.friends');
    $('.delete').hide();
    $('#friendsUl').on('swipeleft',function(e){
        if(e.target.className=='nickname'||e.target.className=='signature'){
            $(e.target.parentNode.children[3]).show();
            
            
        }
    })
    $('#friendsUl').on('swiperight',function(e){
        if(e.target.className=='nickname'||e.target.className=='signature'){
            $(e.target.parentNode.children[3]).fadeOut('slow');
        }
    })

    // 删除按钮 删除操作
    $('#friendsUl').on('tap',function(e){
        // console.log(delSignStr,delUserId,delFriendId)
        if(e.target.className=='delete'){
            var index=$(e.target.parentNode).index();
            delFriendId=list[index].user_id;
            list.splice(index,1);
            delFriends(sign_str,id,delFriendId);
            console.log(delFriendId)
            $(e.target.parentNode).remove();
            // deleteFriends(sign_str,user_id,friend_id);
            var M = {}
            if(M.dialog1){
                return M.dialog1.show();
            }
            M.dialog1 = jqueryAlert({
                'content' : '删除成功！',
                'closeTime' : 2000,
                'end':function(){
                }
            })

        }else if(e.target.className=='headImg'){        
            var index=$(e.target.parentNode.parentNode).index();
            // curID=list[index].user_id;
            window.localStorage.setItem('friend_head_log',list[index].head_logo);
            window.localStorage.setItem('friend_id',list[index].user_id);
           window.localStorage.setItem('nick_name',list[index].nickname);
            parent.location.href = 'chatpage.html';
            // console.log(list[index].nickname)
        }
    })
     //ajax删除
     function delFriends(x,y,z) {
        $.ajax({
            url:all_net.removeFriend_net,
            type:"POST",
            data:{
                sign_str:x,
                user_id:y,
                friend_id:z,
            },
            success:function(){
                console.log("删除成功！")
            },
            error:function(msg){
                console.log("删除失败");
            }
        })
    }
    //调转到新朋友页面
    $('#newFriends').on('click',function(){
        location.href = 'resfriend.html';
    })
})
    
    
    

    