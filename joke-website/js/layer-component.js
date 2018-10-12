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
