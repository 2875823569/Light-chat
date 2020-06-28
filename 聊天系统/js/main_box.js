window.onload = function(){
    var a = true
    //底部按钮的点击事件

    $(".toaction").click(function () {
        $(".main_window")[0].setAttribute("src","../html/developmen.html")
        $(".toaction i").addClass("isclicked").parent().siblings().children("i").removeClass("isclicked")
        window.localStorage.setItem("window_num","3")

        
    })

$(".tomain_window").click(function () {
    $(".main_window")[0].setAttribute("src","Main.html")
    $(".tomain_window i").addClass("isclicked").parent().siblings().children("i").removeClass("isclicked")
    window.localStorage.setItem("window_num","1")
    
})


$(".tofriend_window").click(function () {
    $(".main_window")[0].setAttribute("src","../html/好友列表.html")
    $(".tofriend_window i").addClass("isclicked").parent().siblings().children("i").removeClass("isclicked")
    window.localStorage.setItem("window_num","2")
})



var window_num = window.localStorage.getItem("window_num")

if(window_num==="1"){
    $(".tomain_window").click();
}else if(window_num==="2"){
    $(".tofriend_window").click();
}else if(window_num==="3"){
    $(".toaction").click();
}else{
    
}

// switch(window_num){
//     case "1":$(".tomain_window").click();
//     case "2":$(".tofriend_window").click();
//     case "3":$(".toaction").click();
//     // default:console.$(".tomain_window").click();
// }
}


