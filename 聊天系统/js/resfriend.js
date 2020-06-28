var addfriendbox=document.querySelector(".addfriendbox");
var submitf=document.querySelector(".submitf")
var regtype=document.querySelector(".regtype")


var leftbtn=document.querySelector(".leftbtn");

leftbtn.onclick=function(){
    // 
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
        
        
        
        for(let i=0;i<res.data.length;i++){
            
            var p = document.createElement('div');
            head_log = res.data[i].head_logo
            // 
            p.classList.add('friendbox')
            p.innerHTML = `
            <div class="headlogo">
            <img src='http://118.24.25.7/${head_log}' class="headimg"></div>
            <div class='nickname'>${res.data[i].nickname}</div>
                <select class="regtype" user_id=${res.data[i].user_id}>
                <option value="1">同意</option>
                <option value="2">拒绝</option>
                <option value="3">拒绝并不再接收此人好友申请</option>
                </select>
            <button class="submitf" user_id=${res.data[i].user_id}>提交</button>`
            addfriendbox.append(p)
            $(`.submitf[user_id=${res.data[i].user_id}]`).on("click",function(){
                var processvals=$(`.regtype[user_id=${res.data[i].user_id}]`).val();
                
                processFriendRequest(res.data[i],processvals)
                
            })
            
        }

        
    })
    .fail(function(res){
        
        
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
        
        if(res.code==0){

        }else if(res.code==1){
            
            
        }else{
            
            
        }
    })
    .fail(function(data){
        
        
    })
    .always(function(){
    })
}


