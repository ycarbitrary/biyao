<template>
	<view class="box">
		<icon size="35rpx" type="search"></icon>
		<input class="search" type="text" value="" placeholder="请输入想要搜索的商品" />
	</view>
</template>

<script setup>
	let scroll = (e)=> {
				console.log(e)
			}
</script>

<style scoped>
	.box{
		width: 100%;
	}
	.search {
		margin: 20rpx auto;
		background: #f4f4f4;
		width: 600rpx;
		padding: 13rpx;
		padding-left: 80rpx;
		border-radius: 30rpx;
	}
	.box icon{
		position: absolute;
		top: 20rpx;
		left: 60rpx;
	}
</style>
