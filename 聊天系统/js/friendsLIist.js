var sign_str;
var user_id = ""
var list=[];
var user_id="";
var password="";
var delSignStr='';
var delUserId='';
var delFriendId=[];
$(function () {
    $.ajax({
        url: 'http://118.24.25.7/chat_api/interface/login.php',
        type: 'POST',
        data: {
            username: 'abcdef',
            password: 'admin1',
        },
        success: function (msg) {
            sign_str = msg.data.sign_str;
            user_id = msg.data.id;
            getFriends(sign_str, user_id);
            callback(sign_str,user_id)
        }
    })

    function callback(sign_str,user_id){
        delSignStr=sign_str;
        delUserId=user_id;
    }
    function getFriends(sign_str, user_id) {
        $.ajax({
            url: 'http://118.24.25.7/chat_api/interface/getFriends.php',
            type: 'GET',
            data: {
                // username:'aaaaa11',
                // password:'admin1',
                sign_str: sign_str,
                user_id: user_id
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
            <li class="friends"><span class='Logo'><img src=" http://118.24.25.7/chat_api${list[i].head_logo}" alt=""></span>
                        <span class="nickname">${list[i].nickname}</span>
                        <span class="signature">${list[i].onlinechat_number}</span>
                        <button class="delete" style="display:none;">删除</button>
                    </li>
            `;
            $('#friendsUl').append(str);
        }
    }
    function deleteFriends(sign_str,user_id,friend_id){
        $.ajax({
            url:"http://118.24.25.7/chat_api/interface/removeFriend.php",
            type:'POST',
            data:{
                sign_str:sign_str,
                user_id:user_id,
                friend_id:friend_id
            },
            success:function(msg){
                console.log(msg);
            }
        })
    }
})
    
    
    //关于删除按钮的出现于隐藏
    var friends=document.querySelector('.friends');
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
            delFriends(delSignStr,delUserId,delFriendId);
            $(e.target.parentNode).remove();
            // deleteFriends(sign_str,user_id,friend_id);

        }

        //ajax删除
        function delFriends(x,y,z) {
            $.ajax({
                url:"http://118.24.25.7/chat_api/interface/removeFriend.php",
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
                    console.log(msg);
                }
            })
        }
    })
