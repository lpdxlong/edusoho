webpackJsonp(["app/js/group/index"],{0:function(t,e){t.exports=jQuery},"3b408ff117f4a7077554":function(t,e,o){"use strict";var a=o("b334fd7e4c5a19234db2"),r=function(t){return t&&t.__esModule?t:{default:t}}(a),n=o("4833bf6727a52ba97d0c");(0,n.initThread)(),(0,n.initThreadReplay)();$("#add-btn").click(function(){$(this).addClass("disabled");var t=$(this).data("url");$.post(t,function(t){"success"==t.status?window.location.reload():(0,r.default)("danger",Translator.trans(t.message))})}),$("#exit-btn").length>0&&$("#exit-btn").click(function(){if(!confirm(Translator.trans("group.manage.member_exit_hint")))return!1;var t=$(this).data("url");$.post(t,function(t){"success"==t.status?window.location.reload():(0,r.default)("danger",Translator.trans(t.message))})}),$("#thread-list").on("click",".uncollect-btn, .collect-btn",function(){var t=$(this);$.post(t.data("url"),function(){t.hide(),t.hasClass("collect-btn")?t.parent().find(".uncollect-btn").show():t.parent().find(".collect-btn").show()})}),$(".attach").tooltip(),$(".group-post-list").length>0&&($(".group-post-list").on("click",".li-reply",function(){var t=$(this).attr("postId"),e=$(this).data("fromUserId");$("#fromUserIdDiv").html('<input type="hidden" id="fromUserId" value="'+e+'">'),$("#li-"+t).show(),$("#reply-content-"+t).focus(),$("#reply-content-"+t).val(Translator.trans("group.post.reply_hint")+" "+$(this).attr("postName")+":")}),$(".group-post-list").on("click",".reply",function(){var t=$(this).attr("postId");if(""!=$(this).data("fromUserIdNosub")){var e=$(this).data("fromUserIdNosub");$("#fromUserIdNoSubDiv").html('<input type="hidden" id="fromUserIdNosub" value="'+e+'">'),$("#fromUserIdDiv").html("")}$(this).hide(),$("#unreply-"+t).show(),$(".reply-"+t).css("display","")}),$(".group-post-list").on("click",".unreply",function(){var t=$(this).attr("postId");$(this).hide(),$("#reply-"+t).show(),$(".reply-"+t).css("display","none")}),$(".group-post-list").on("click",".replyToo",function(){var t=$(this).attr("postId");"hidden"==$(this).attr("data-status")?($(this).attr("data-status",""),$("#li-"+t).show(),$("#reply-content-"+t).focus(),$("#reply-content-"+t).val("")):($("#li-"+t).hide(),$(this).attr("data-status","hidden"))}),$(".group-post-list").on("click",".lookOver",function(){var t=$(this).attr("postId");$(".li-reply-"+t).css("display",""),$(".lookOver-"+t).hide(),$(".paginator-"+t).css("display","")}),$(".group-post-list").on("click",".postReply-page",function(){var t=$(this).attr("postId");$.post($(this).data("url"),"",function(e){$("body,html").animate({scrollTop:$("#post-"+t).offset().top},300),$(".reply-post-list-"+t).replaceWith(e)})})),$("#hasAttach").length>0&&$(".ke-icon-accessory").addClass("ke-icon-accessory-red"),$("#post-action").length>0&&($("#post-action").on("click","#closeThread",function(){var t=$(this);if(!confirm(t.attr("title")+"?"))return!1;$.post(t.data("url"),function(t){window.location.href=t})}),$("#post-action").on("click","#elite,#stick,#cancelReward",function(){var t=$(this);$.post(t.data("url"),function(t){window.location.href=t})})),$(".actions").length>0&&$(".group-post-list").on("click",".post-delete-btn,.post-adopt-btn",function(){var t=$(this);if(!confirm(t.attr("title")+"?"))return!1;$.post(t.data("url"),function(){window.location.reload()})})},"4833bf6727a52ba97d0c":function(t,e,o){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}Object.defineProperty(e,"__esModule",{value:!0}),e.initThreadReplay=e.initThread=void 0;var n=o("b7b955d31d3c6acc3b71"),i=o("b334fd7e4c5a19234db2"),s=a(i),l=o("d5fb0e67d2d4c1ebaaed"),c=a(l);e.initThread=function(){var t="#post-thread-btn",e=$("#post-thread-form");new c.default(e),$("#post_content").length&&(0,n.initEditor)({toolbar:"Thread",replace:"post_content"});var o=e.validate({currentDom:t,ajax:!0,rules:{content:{required:!0,minlength:2,trim:!0}},submitError:function(t){t=t.responseText,t=$.parseJSON(t),t.error?(0,s.default)("danger",t.error.message):(0,s.default)("danger",Translator.trans("group.post.reply_fail_hint"))},submitSuccess:function(t){if("/login"==t)return void(window.location.href=t);window.location.reload()}});$(t).click(function(){o.form()})},e.initThreadReplay=function(){$(".thread-post-reply-form").each(function(){var t=$(this),e=t.find("textarea").attr("name"),o=t.validate({ignore:"",rules:r({},""+e,{required:!0,minlength:2,trim:!0}),submitHandler:function(t){var e=$(t).find(".reply-btn"),o=e.attr("postId"),a="";a=$("#fromUserId").length>0?$("#fromUserId").val():$("#fromUserIdNosub").length>0?$("#fromUserIdNosub").val():"",e.button("submiting").addClass("disabled"),$.ajax({url:$(t).attr("action"),data:"content="+$(t).find("textarea").val()+"&postId="+o+"&fromUserId="+a,cache:!1,async:!1,type:"POST",dataType:"text",success:function(t){if("/login"==t)return void(window.location.href=t);window.location.reload()},error:function(t){t=$.parseJSON(t.responseText),t.error?(0,s.default)("danger",t.error.message):(0,s.default)("danger",Translator.trans("group.post.reply_fail_hint")),e.button("reset").removeClass("disabled")}})}});t.find("button").click(function(t){o.form()})})}},b7b955d31d3c6acc3b71:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.initEditor=function(t){var e=CKEDITOR.replace(t.replace,{toolbar:t.toolbar,fileSingleSizeLimit:app.fileSingleSizeLimit,filebrowserImageUploadUrl:$("#"+t.replace).data("imageUploadUrl"),allowedContent:!0,height:300});e.on("change",function(){$("#"+t.replace).val(e.getData())}),e.on("blur",function(){$("#"+t.replace).val(e.getData())})}}},["3b408ff117f4a7077554"]);