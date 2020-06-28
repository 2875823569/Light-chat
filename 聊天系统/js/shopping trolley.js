var filter_addbtn = $("button").filter("#add_btn")
var filter_cut = $("button").filter("#cut_btn")
var input_val = $("input").filter("#inputs")
var filter_span = $("span").filter("#total")
var arr = new Array("66", "76", "86", "96")
var filter_checkbox = $("input").filter("#checkboxs")
var delets = $("button").filter("#delet")

//重置checked属性
for (i = 0; i < ($("tr").length - 2); i++) {
    filter_checkbox.eq(i)[0].checked = false
}

$(function () {
    for (i = 0; i < ($("tr").length - 2); i++) {
        //添加数量
        filter_addbtn.eq(i).click(function () {
            //取得点击按钮的序号
            var idx = $(this).closest('tr').index()
            var num = input_val.eq(idx - 1).val()
            if (num < 999) {
                num++
                input_val.eq(idx - 1).val(num)
                countTOAll(num, idx)
                var num3 = 0
                if ($(this).parent().siblings().eq(0).children().prop("checked") == true) {
                    num3 = parseInt($(this).parent().siblings().eq(3).children().html())
                    var val = parseInt($(".yuan").html()) + num3
                    $(".yuan").empty().append(val)
                }
            }
            else{
                return false
            }
        })
        //删减数量
        filter_cut.eq(i).click(function () {
            //取得点击按钮的序号
            var idx = $(this).closest('tr').index()
            var num = input_val.eq(idx - 1).val()
            if (num > 1) {
                num--
                input_val.eq(idx - 1).val(num)
                countTOAll(num, idx)
                var num3 = 0
                if ($(this).parent().siblings().eq(0).children().prop("checked") == true) {
                    num3 = parseInt($(this).parent().siblings().eq(3).children().html())
                    var val = parseInt($(".yuan").html()) - num3
                    $(".yuan").empty().append(val)
                }
            }
            else {
                return false
            }
        })
    }
    //赋值给总金额
    function countTOAll(val, idx) {
        filter_span.eq(idx - 1).empty().append(val * arr[idx - 1])
    }

    //input实时监听事件
    input_val.blur(function () {
        var value = $(this).val()
        var idx = $(this).closest('tr').index()
        filter_span.eq(idx - 1).empty().append(value * arr[idx - 1])
        var num4 = 0
        if ($(this).parent().siblings().eq(0).children().prop("checked") == true) {
            num4 = $(this).val() * parseInt($(this).parent().siblings().eq(3).children().html())
            for (i = 1; i < ($("tr").length - 2); i++) {
                if ($(this).parent().siblings().eq(0).parent().siblings().eq(i).children().eq(0).children().prop("checked") == true) {
                    num4 = parseInt($(this).parent().siblings().eq(0).parent().siblings().eq(i).children().eq(5).children().html()) + num4
                    $(".yuan").empty().append(num4)
                }
            }
        }
    })

    //为checkbox添加checked属性
    for (i = 0; i < ($("tr").length - 2); i++) {
        filter_checkbox.eq(i).click(function () {
            var idx = $(this).closest('tr').index()
            if (filter_checkbox.eq(idx - 1)[0].checked == true) {
                checkNum++;
                if (checkNum == filter_checkbox.length) {
                    $(".deletAll").empty().append("取消")
                }
                filter_checkbox.eq(idx - 1)[0].checked = true
                fun_count()
            }
            else if (filter_checkbox.eq(idx - 1)[0].checked == false) {
                checkNum--;
                if (checkNum < filter_checkbox.length) {
                    $(".deletAll").empty().append("全选")
                }
                filter_checkbox.eq(idx - 1)[0].checked = false
                fun_count()
            }
        })
    }

    //全选按钮
    var checkNum = 0;
    $(".deletAll").click(function () {
        if (checkNum == filter_checkbox.length) {
            // 取消
            for (i = 0; i < ($("tr").length - 2); i++) {
                filter_checkbox.eq(i)[0].checked = false
                $(this).empty().append("全选")
            }
            checkNum = 0
            fun_count()
        }
        else {
            // 全选
            for (i = 0; i < ($("tr").length - 2); i++) {
                filter_checkbox.eq(i)[0].checked = true
                $(this).empty().append("取消")
            }
            checkNum = filter_checkbox.length
            fun_count()
        }
    })

    //合计
    function fun_count() {
        var countNum_jian = 0
        var countNum_yuan = 0
        for (i = 0; i < ($("tr").length - 2); i++) {
            if (filter_checkbox.eq(i).prop("checked") == true) {
                countNum_jian++
                $(".jian").empty().append(countNum_jian)
                countNum_yuan = parseInt(filter_checkbox.eq(i).parent().siblings().eq(4).children().html()) + countNum_yuan
                $(".yuan").empty().append(countNum_yuan)
            }
            else if (checkNum == 0) {
                countNum_jian = 0
                countNum_yuan = 0
                $(".jian").empty().append(countNum_jian)
                $(".yuan").empty().append(countNum_yuan)
            }
        }
    }

    //删除
    for (i = 0; i < ($("tr").length - 2); i++) {
        delets.eq(i).click(function () {
            var num1 = 0
            var jian2 = 0
            $(this).parent().parent().remove()
            for (i = 0; i < ($("tr").length - 2); i++) {
                if (filter_checkbox.eq(i).prop("checked") == true) {
                    num1 = parseInt($("span").filter("#total").eq(i).html()) + num1
                    jian2++
                    $(".jian").empty().append(jian2)
                    $(".yuan").empty().append(num1)
                }
            }
        })
    }

    //获取屏幕宽高
    var window_height = window.outerHeight
    var window_width = window.outerWidth
    $("div").css("height", window_height, "width", window_width, "overflow", "hidden")

    $("#get_back").click(function(){
        // wonlocation.href="main_box.html"
        // parent.$(".toaction").click()
        window.history.go(-1)
    })
})