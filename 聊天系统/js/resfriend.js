var addfriendbox=document.querySelector(".addfriendbox");
var submitf=document.querySelector(".submitf")
var regtype=document.querySelector(".regtype")
console.log(localStorage);



var leftbtn=document.querySelector(".leftbtn");
console.log(leftbtn);

leftbtn.onclick=function(){
    // console.log(1);
    location.href='../html/Main.html'
}

function getfriend(){
    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/getFriendRequests.php",
        type:"GET",
        data:{
            sign_str:localStorage.sign_str,
            user_id:localStorage.id
        },
        datatype:"JSON",
        timeout: 6000
    })
    .done(function(res){
        console.log(res);
        
        
        for(let i=0;i<res.data.length;i++){
            console.log(res.data[i]);
            var p = document.createElement('div');
            head_log = res.data[i].head_logo
            console.log(res.data)
            p.classList.add('friendbox')
            p.innerHTML = `
            <div class="headlogo">
            <img src='http://118.24.25.7/${head_log}' class="headimg"></div>
            <div class='nickname'>${res.data[i].nickname}</div>
                <select class="regtype" user_id=${res.data[i].user_id}>
                <option value="1">同意</option>
                <option value="2">拒绝</option>
                <option value="3">拒绝并不再接收此用人好友申请</option>
                </select>
            <button class="submitf" user_id=${res.data[i].user_id}>提交</button>`
            addfriendbox.append(p)
            $(`.submitf[user_id=${res.data[i].user_id}]`).on("click",function(){
                var processvals=$(`.regtype[user_id=${res.data[i].user_id}]`).val();
                console.log(localStorage);
                processFriendRequest(res.data[i],processvals)
                
            })
            
        }

        
    })
    .fail(function(res){
        console.log(res);
        
    })
    .always(function(res){
        if(!res.data.user_id){
        // getfriend();
        }
    })
  
}
getfriend()



// 处理好友申请
function processFriendRequest(obj,val){
    console.log(localStorage.sign_str);
    console.log(localStorage.id);
    console.log(obj.user_id);
    console.log(obj.request_id);
    console.log(val);

    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/processFriendRequest.php",
        type:"POST",
        data:{
            sign_strL:localStorage.sign_str,
            user_id:localStorage.id,
            from_user_id:obj.user_id,
            request_id:obj.request_id,
            process_result:val
        },
        timeout:3000,
        datatype:"JSON",
    })
    .done(function(data){
        console.log(data);
        
    })
    .fail(function(data){
        console.log(data);
        
    })
    .always(function(){
    })
}


