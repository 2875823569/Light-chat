var addfriendbox=document.querySelector(".addfriendbox");
var submitf=document.querySelector(".submitf")
var regtype=document.querySelector(".regtype")
console.log(localStorage);

var leftbtn=document.querySelector(".leftbtn");

leftbtn.onclick=function(){
    // console.log(1);
    location.href='../html/好友列表.html'
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
            // console.log(res.data[i]);
            var p = document.createElement('div');
            head_log = res.data[i].head_logo
            // console.log(head_log)
            p.classList.add('friendbox')
            p.innerHTML = `
            <div class="headlogo">
            <img src='http://118.24.25.7/${head_log}' class="headimg"></div>
            <div class='nickname'>${res.data[i].nickname}</div>
                <select class="regtype" user_id=${res.data[i].user_id}>
                <option value="1">同意</option>
                <option value="2">拒绝</option>
                <option value="3">拒绝并不再接收</option>
                </select>
            <button class="submitf" user_id=${res.data[i].user_id}>提交</button>`
            addfriendbox.append(p)
            $(`.submitf[user_id=${res.data[i].user_id}]`).on("click",function(){
                var processvals=$(`.regtype[user_id=${res.data[i].user_id}]`).val();
                // console.log(localStorage);
                processFriendRequest(res.data[i],processvals)
                
            })
            
        }

        
    })
    .fail(function(res){
        console.log(res);
        
    })
    .always(function(){
       
    })
  
}
getfriend()


// 处理好友申请
function processFriendRequest(obj,val){
    
    $.ajax({
        url:"http://118.24.25.7/chat_api/interface/processFriendRequest.php",
        type:"POST",
        data:{
            sign_str:localStorage.sign_str,
            user_id:localStorage.id,
            from_user_id:obj.user_id,
            request_id:obj.request_id,
            process_result:val,
        },
        datatype:"JSON",
    })
    .done(function(res){
        console.log(res);
        if(res.code==0){

        }else if(res.code==1){
            console.log(res.data);
            
        }else{
            console.log(11);
            
        }
    })
    .fail(function(data){
        console.log(data);
        
    })
    .always(function(){
    })
}


