Vue.component("joke-layer",{
	props:["layershow"],
	template:`
		<div id="joke-layer" v-show="show">
			<div class="joke-layer-mask" @click="changeShow"></div>
			<div class="joke-layer-content">
				<slot name="joke-layer-content">content</slot>
			</div>
		</div>
	`,
	data:function(){
		return {
			show:this.layershow
		}
	},
	methods:{
		changeShow:function(){
			this.show = !this.show;
		}
	}
});

var jokeLayer = new Vue({
	el:"#app",
	data:{
		show:false
	},
	methods:{
		jokeLayer:function(){
			this.show = !this.show;
		}
	},
	watch:{
		show:function(val){
			// 调用子组件方法，改变子组件show的值
			this.$refs.layerRef.changeShow(val);
		}
	}
});