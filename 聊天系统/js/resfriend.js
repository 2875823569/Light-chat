var addfriendbox=document.querySelector(".addfriendbox");
var submitf=document.querySelector(".submitf")
var regtype=document.querySelector(".regtype")
console.log(regtype);


// submitf.onclick=function(){
//     console.log(1);
    
// }

// 获取好友申请
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
        // var datas=JSON.stringify(res.data)
        // console.log(datas);
        var arr1=new Array();
        for(let i=0;i<res.data.length;i++){
            // regtype.onchange=function(){
            //     console.log(1);
                
            //     // console.log(res.data[i].request_id);
            //     // arr1.push(res.data[i].request_id)
            //     // window.localStorage.setItem('fromuserid',arr1)
            //     // var fromuserid=JSON.stringify(window.localStorage.getItem('fromuserid'))
            //     // console.log(fromuserid);
            // }
        }
        console.log(localStorage);
        
        for(i in res.data){
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
                console.log( $(`.regtype[user_id=${res.data[i].user_id}]`).val())
                // console.log(111)
            })
        }

        
    })
    .fail(function(res){
        console.log(res);
        
    })
    .always(function(){
        // getfriend();
    })
}
getfriend()



// 处理好友申请
// function processFriendRequest(){
//     $.ajax({
//         url:"http://118.24.25.7/chat_api/interface/processFriendRequest.php",
//         type:"POST",
//         data:{
//             sign_strL:localStorage.sign_str,
//             user_id:localStorage.id,
//             from_user_id:`${res.data.user_id}`,
//             request_id:`${res.data.request_id}`,
//             process_result:`${a}`
//         },
//         datatype:"JSON",
//         timeout: 6000
//     })
//     .done(function(res){
//         console.log(res);
        
//     })
//     .fail(function(res){
//         console.log(res);
        
//     })
//     .always(function(){
//         // getfriend();
//     })
// }
// processFriendRequest()

