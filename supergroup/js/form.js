
//	表单验证
	function checkform(_self){
//	    _self.preventDefault();
		$(_self).parents(".form1").find("inputbd").removeClass("warn_border");
		$(_self).parents(".form1").find(".layerTip").remove();
		var ageDom = $(_self).parents(".form1").find(".age"),
			nameDom = $(_self).parents(".form1").find(".name"),
			telDom = $(_self).parents(".form1").find(".tel");
		
		var obj={
			age:ageDom.val().trim(),
			name:nameDom.val().trim(),
			tel:telDom.val().trim()
		}
		var reg_name=new RegExp("[0-9]+");
		if(reg_name.test(obj.name)){
			nameDom.parent(".inputbd").addClass("warn_border");
			layerTip("不能为数字",$(_self));
			return false;
		}
		var reg_fh=/^([\u4E00-\u9FA5]|\w)*$/;
		if(!reg_fh.test(obj.name)){
			nameDom.parent(".inputbd").addClass("warn_border");
			layerTip("不能为特殊符号",$(_self));
			return false;
		}
		if(obj.name==""){
			nameDom.parent(".inputbd").addClass("warn_border");
			layerTip("姓名不能为空",$(_self));
			return false;
		}
		var reg_age = /120|((1[0-1]|\d)?\d)/;
		if(obj.age==""){
			ageDom.parent(".inputbd").addClass("warn_border");
			layerTip("年龄不能为空",$(_self));
			return false;
		}
		if(obj.age!="" && !reg_age.test(obj.age) ){
			ageDom.parent(".inputbd").addClass("warn_border");
			layerTip("请输入正确的年龄",$(_self));
			return false;
		}
		if(obj.tel==""){
			layerTip("手机号不能为空",$(_self));
			telDom.parent(".inputbd").addClass("warn_border");
			return false;
		}
		var reg_tel = /(^0?[1][34578][\d]{9}$)|(^0[1-9][\d]{1,2}[- ]?[\d]{7,8}[-| ]?[\d]*$)/;
		if(!reg_tel.test(obj.tel)){
			layerTip("手机号格式不对",$(_self));
			telDom.parent(".inputbd").addClass("warn_border");
			return false;
		}
		subform(obj);
	}
//	表单提交
	function subform(data){
		$.ajax({
			type : "post",
			data : data,
			url :"/index.php",
			contentType : "application/x-www-form-urlencoded; charset=utf8",
			dataType : "json",
			success : function(res) {
			    if(res.status == 1) {
                    $(".tc_bg")	.show();
                    $(_self).parent(".form1").find("input").val("");
                } else {
			        alert(res.status.msg);
				}
			},
			error : function(err) {
//				alert('提交失败请联系管理员！');
				 $(".tc_bg").show();
			}
		});	
	}
//	错误信息提示	
	function layerTip(msg,_self){
		var content = "<p class=\"layerTip\">"+msg+"</p>";
		_self.parent(".submitbd").prepend(content);
	}
	$(".form1 input").focus(function(){
		$(this).parents(".form1").find(".inputbd").removeClass("warn_border");
		$(this).parents(".form1").find(".layerTip").remove();
	})
	$(".tc_close").click(function(){
		$(".tc_bg").hide();
	})
