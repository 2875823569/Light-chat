
//底部按钮的点击事件
$(".tomain_window").click(function () {
    $(".main_window")[0].setAttribute("src","Main.html")
    $(".tomain_window i").addClass("isclicked").parent().siblings().children("i").removeClass("isclicked")
})


$(".tofriend_window").click(function () {
    $(".main_window")[0].setAttribute("src","../html/好友列表.html")
    $(".tofriend_window i").addClass("isclicked").parent().siblings().children("i").removeClass("isclicked")
})


$(".toaction").click(function () {
    $(".main_window")[0].setAttribute("src","../html/developmen.html")
    $(".toaction i").addClass("isclicked").siblings().parent().siblings().children("i").removeClass("isclicked")
})