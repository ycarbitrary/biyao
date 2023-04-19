<template>
	<view class="box">
		<scroll-view  class="scrool" scroll-x>
			<view :class="['item',index==num?'active':'']" @click="clikcActive(index)" v-for="(item,index) in arr.oneLevelCategoryList" :key="item.categoryId">
				{{item.categoryName}}
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		homeData
	} from "../apis/api/api.js"
	import {
		ref
	} from "vue"
	let arr = ref([])
	let num = ref(0)
	onLoad(async () => {
		const arrs = await homeData()
		arr.value = arrs.data.homeData
		console.log(arr.value);

	})
	let clikcActive=(index)=>{
		num.value = index
	}
</script>

<style scoped>
	.box {
		width: 100%;
		white-space: nowrap;
		margin-bottom: 20rpx;
	}

	.scrool {
		width: 100%;
		white-space: nowrap;
		padding-right: 50rpx;
	}

	.scrool .item {
		display: inline-block;
		width: 20%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 36rpx;
		margin-left:20rpx ;
		position: relative;
	}
	.active{
		color: #7f4395;
	}
	.active::after{
		content: '';
		display: block;
		width: 60rpx;
		height: 4rpx;
		background-color:#7f4395;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
