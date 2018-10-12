
var baseFn = {
	alertMsg:function(obj){
		if(!obj.msg) return;
		if(!obj.bgColor) obj.bgColor = "#D92525"; //背景颜色
		var div = document.createElement("div");
		div.classList.add("alertMsg");
		div.style = "background-color:"+obj.bgColor+";";
		div.innerHTML = obj.msg;
		document.body.append(div);
		// time之后删除提示信息
		setTimeout(function(){
			document.body.removeChild(div);
		},obj.time||1000);
	}
};

var jokeListApp = new Vue({
	el:"#app",
	data:{
		username:"", //输入框双向绑定用户名
		password:"", //输入框双向绑定密码
		loginDis:false,
		user:[],
		maskData:{
			"show":false,
			"passTips":true,
			"nameTips":true
		},
		parttens:{
			passPartten:/^[\w\s]{4,6}$/, //密码正则表达式,4-6位的数字、字母、下划线
			namePartten:/^[\u4e00-\u9fa5\w\s\（\）\(\)]{3,15}$/ //用户名正则表达式,4-6位的数字、字符、下划线
		}
	},
	created:function(){
		var _this = this;

		// 获取用户表数据 -------vue-resource.js
		/*this.$http.get("js/joke_data/user.json").then(function(res){
			this.user = res.data.list;
		},function(err){
			console.log("数据访问失败");
		});*/

		// 获取用户表数据 -------axios.js
		axios.get("js/joke_data/user.json").then(function(res){
			_this.user = res.data.list;
		}).catch(function(err){
			console.log("数据访问失败");
		});
	},
	methods:{

		loginRegisterMask:function(){
			this.maskData.show = !this.maskData.show;
		},

		// 验证用户名或者密码
		checkVal:function($event,type){

			var val = $event.target.value;
			if(type==="username"){
				// 验证用户名
				this.maskData.nameTips = this.checkStr(val,this.parttens.namePartten);
			}else if(type==="password"){
				// 验证密码
				this.maskData.passTips = this.checkStr(val,this.parttens.passPartten);
			}

		},

		// 用户登录
		userLogin:function(){
			var isUser = this.searchUser(this.username,this.user);
			// 用户存在，已注册
			if(isUser){
				// 密码正确
				if(isUser===this.password){
					this.loginDis = true;
					// 关闭弹窗
					this.closeMask();
					//保存登录成功的用户名至sessionStorage
					sessionStorage.setItem("username",this.username);
				}else{
					baseFn.alertMsg({msg:"密码错误"});
				}
			// 用户不存在，未注册
			}else{
				baseFn.alertMsg({msg:"用户不存在！请先注册再登录！",time:3000});
			}
			
		},

		// 关闭弹窗
		closeMask:function(){
			this.maskData.show = false;
		},

		// 退出登录
		signOut:function(){
			this.loginDis = false;
			sessionStorage.removeItem("username");
		},

		// 正则验证val
		checkStr:function(val,partn){
			return partn.test(val);
		},

		// 查询指定用户是否存在，存在返回密码,返回false表示不存在
		searchUser:function(username,userlist){	
			var arr = userlist;
			for(var item of arr){
				if(item.username===username){
					return item.password;
				}
			}
			return false;
		}
	},

	watch:{
		"maskData.show":function(val){
			// 调用弹窗组件的方法
			this.$refs.jokelayer.changeShow(val);
		}
	}
}); 
