var addfriendbox=document.querySelector(".addfriendbox");
var submitf=document.querySelector(".submitf")
var regtype=document.querySelector(".regtype")
var all_net = obj = JSON.parse(window.localStorage.getItem("all_net"))

var leftbtn=document.querySelector(".leftbtn");

$(".addfriend").click(function () {
    parent.location.href = '../html/search_all_user.html'
})

// 返回上一页
leftbtn.onclick=function(){
    window.history.go(-1)
}

// 获取好友申请
function getfriend(){
    $.ajax({
        url:all_net.getFriendRequests_net,
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
            // console.log(res.data[i]);
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
                <option value="3">拒绝并不再接收</option>
                </select>
            <button class="submitf" user_id=${res.data[i].user_id}>提交</button>`
            addfriendbox.append(p)
            $(`.submitf[user_id=${res.data[i].user_id}]`).on("click",function(){
                var processvals=$(`.regtype[user_id=${res.data[i].user_id}]`).val();
                // console.log(localStorage);
                processFriendRequest(res.data[i],processvals)
                if(processvals==1){
                    var Mes = {}
                    if(Mes.dialog1){
                        return Mes.dialog1.show();
                    }
                    Mes.dialog1 = jqueryAlert({
                        'content' : '已同意',
                        'closeTime' : 2000,
                        'end':function(){
                        }
                    })
                }else if(processvals==2){
                    var Mes = {}
                    if(Mes.dialog1){
                        return Mes.dialog1.show();
                    }
                    Mes.dialog1 = jqueryAlert({
                        'content' : '已拒绝该好友',
                        'closeTime' : 2000,
                        'end':function(){
                        }
                    })
                }else if(processvals==3){
                    var Mes = {}
                    if(Mes.dialog1){
                        return Mes.dialog1.show();
                    }
                    Mes.dialog1 = jqueryAlert({
                        'content' : '已拒绝并不再接受该好友请求',
                        'closeTime' : 2000,
                        'end':function(){
                        }
                    })
                }
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
        url:all_net.processFriendRequest_net,
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
    })
    .fail(function(err){
        console.log(err);
        
    })
    .always(function(){
    })
}


