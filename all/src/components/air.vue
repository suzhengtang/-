<template>
	<div class="air">
		<div class="air-nav">
			<div class="air-nav-top">
				<div class="air-nav-left" onclick="window.history.go(-1)"><span>&lt;</span>&nbsp;&nbsp;&nbsp; 办公室的格力空调</div>
			<div class="air-nav-right">...</div>
			</div>
			<div class="air-nav1">
				<p id="showNum"><span class="num">{{status.weatcher}}</span>
					<span v-if="status.pattern==1">制冷</span>
					<span v-else-if="status.pattern==2">制热</span>
					<span v-else-if="status.pattern==3">通风</span>
					<span v-else-if="status.pattern==4">除湿</span>
				</p>
			</div>
			<ul id="nav_wind">
				<li v-if="status.speed==1">低速</li>
				<li v-else-if="status.speed==2">中速</li>
				<li v-else-if="status.speed==3">高速</li>
				<li v-if="status.direction==1">风向上</li>
				<li v-else-if="status.direction==2">风向中</li>
				<li v-else-if="status.direction==3">风向下</li>
				<li>{{status.swing==1?'扫风':'不扫风'}}</li>
			</ul>
		</div>

		<div class="air-content">
			<ul class="off all" id="off">
				<li @click="close()">{{status.status==1?'开启':'关闭'}}</li>
				<li @click="mode">模式</li>
			</ul>
			<ul class="dir all">
				<li @click="speed">风速</li>
				<li @click="dir">风向</li>
				<li @click="sweep">扫风状态</li>
			</ul>
			<ul class="add all">
				<li @click="minus">-</li>
				<li class="wen">温度</li>
				<li @click="add">+</li>
			</ul>
		</div>
		<!--<div class="air-content">111</div>-->
	</div>
</template>
<style lang="less">
	.air{
		height: 100%;
		width: 100%;
		.air-nav{
			width: 100%;
			background-color: #eeeeee;
			color: #888;
			.air-nav-top{
				height: 44px;
				padding-top: 4%;
				box-sizing: border-box;
				.air-nav-left{
					float: left;
					margin-left: 12px;
					span{
						font-size: 12px;
						font-weight: 800;
					}
				}
				.air-nav-right{
					float: right;
					font-weight: bold;
					margin-right: 16px;
				}
			}
			.air-nav1{
				margin-top: 20%;
				text-align: center;
				p{
					span{
						font-size: 20px;
					}
					span:first-child{
						font-size: 100px;
						font-weight: 300;
					}
				}
			}
			ul{
				width: 100%;
				height: 60px;
				margin: 0 auto;
				text-align: center;
				margin-top: 20%;
				color: #666;
				li{
					float: left;
					width: 100%/3;
					text-align: center;
					line-height: 60px;
					font-size: 14px;
				}
				.active{
					color: #3879d9;
					font-weight: 600;
				}
			}
		}
		.air-content{
			width: 100%;
			.all{
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #eee;
				li{
					flex: 1;
					border-right: 1px solid #eee;
					padding: 10% 0;
					box-sizing: border-box;
					font-size: 16px;
					color: #666;
				}
				li:last-of-type{
					border-right: none;
				}
				.wen{
					color: #ccc;
				}
				.current{
					color: red;
				}
			}
			.all:last-of-type{
				border-bottom: none;
			}
		}
	}
</style>
<script type="text/javascript">
	var mqtt = require('../../static/js/mqtt');
	export default {
		name: 'air',
		data() {
			return {
				client:null,
				status:{
					weatcher:26,
					speed:1,
					swing:0,
					direction:1,
					pattern:1,
					status:0  //0表示关闭状态  1表示开启状态
				}
			}
		},
		created(){

			this.client = mqtt.connect('ws://192.168.31.240:8083',{
				username:'alice',
				password:'secret',
			});
			this.client.publish("AD2648");     //缓存数据
			this.client.subscribe("WG5246/clien");

			this.client.on("message", (topic, payload)=> {
				console.log('我的订阅：'+topic)
				console.log('我收到的消息：'+payload);

				this.status = Object.assign(this.status,this.toJSON(payload))
			});
		},
		computed: {},
		props: {},
		methods: {
			close() {
				this.publish();
			},
			mode() {
				var oPattern = this.status.pattern;
				if(oPattern == 1){
					oPattern = 2;
				}else if(oPattern == 2){
					oPattern = 3;
				}else if(oPattern == 3){
					oPattern = 4;
				}else if(oPattern == 4){
					oPattern = 1;
				}
				this.client.publish("AD2648", 'pattern='+oPattern);
			},
			speed() {
				var oSpeed = this.status.speed;
				if(oSpeed == 1){
					oSpeed = 2;
				}else if(oSpeed == 2){
					oSpeed = 3;
				}else if(oSpeed == 3){
					oSpeed = 1;
				}
				this.client.publish("AD2648", 'speed='+oSpeed);
			},
			dir() {
				var oDir = this.status.direction;
				if(oDir == 1){
					oDir = 2;
				}else if(oDir == 2){
					oDir = 3;
				}else if(oDir == 3){
					oDir = 1;
				}
				this.client.publish("AD2648", 'direction='+oDir);
			},
			sweep() {
				var oSweep = this.status.swing===0?1:0;
				this.client.publish("AD2648", 'swing='+oSweep);
			},
			minus() {
				var oWeatcher = this.status.weatcher;
				oWeatcher--;
				if(oWeatcher<10){
					oWeatcher = 10;
				}
				this.client.publish("AD2648", 'weatcher='+oWeatcher);
			},
			add() {
				var oWeatcher = this.status.weatcher;
				oWeatcher++;
				if(oWeatcher>40){
					oWeatcher = 40;
				}
				this.client.publish("AD2648", 'weatcher='+oWeatcher);
			},
			publish(){
				var status = this.status.status===0?1:0;
				this.client.publish("AD2648", 'status='+status);
			},
			toJSON(payload){
				var json = {};
				//字符串转json对象
				var arr = payload.toString().split('&').map(function(val){
					return val.split('=')
				})
				arr.forEach(function(val){
					json[val[0]] =~~val[1];
				})
				return json;
			}
		},
		components: {}
	}
</script>
