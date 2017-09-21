<template>
  <div class="home">
	  <div class="nav">
		  <h2>{{msg}}</h2>
	  </div>

	  <div class="content">
		  <ul>
			  <router-link tag="li" to="/air">空调</router-link>
			  <li>门禁</li>
		  </ul>
	  </div>

	  <div class="tabbar">
		  <ul>
			  <li class="active">家庭</li>
			  <li>公司</li>
		  </ul>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: '家庭'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.nav{
		width: 100%;
		height: 44px;
		background-color: #eeeeee;
		line-height: 44px;
		position: fixed;
		left: 0;
		top: 0;
		h2{
			font-size: 17px;
			color: #3879d9;
			font-weight: 400;
		}
	}
	.content{
		margin-top: 60%;
		width: 100%;
		ul{
			width: 60%;
			height: 100px;
			margin: 0 auto;
			li{
				width: 100px;
				height: 100px;
				background-color: #6896d9;
				border-radius: 10px;
				float: left;
				margin-right: 10%;
				font-size: 18px;
				line-height: 100px;
				color: #fff;
			}
			li:last-child{
				margin-right: 0;
			}
		}
	}
	.tabbar{
		width: 100%;
		height: 50px;
		background-color: #fcfcfc;
		border-top: 1px solid #eee;
		position: fixed;
		left: 0;
		bottom: 0;
		ul{
			li{
				width: 50%;
				height: 100%;
				line-height: 50px;
				float: left;
			}
			.active{
				color: #3879d9;
			}
		}
	}
</style>
