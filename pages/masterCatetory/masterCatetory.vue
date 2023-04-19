<template>
	<view class="three-category-section">
		<view class="home-three-nav">
			<view class="navlist">
				<view class="item" v-for="(item,index) in navdata" :key="index">
					<image class="img" :src="item.categoryImg" mode=""></image>
					<text class="title">{{ item.categoryName }}</text>
				</view>
				<view class="item">
					<image class="img" src="https://static.biyao.com/mnew/img/master/index/classify_more@2x_0ed30f2.png"
						mode=""></image>
					<text class="title">查看全部</text>
				</view>
			</view>
		</view>

		<view class="home-tab-filter-box">
			<view @click="changetype(item,index)" :class="['typebox', select == index ? 'active' : '' ]" v-for="(item,index) in arr"
				:key="index">
				{{ item.name }}
			</view>
		</view>

		<view class="tl" v-for="(item,index) in list" :key="index">
			<view class="item" @click="toxq(e.routerParams.suId)" v-for="(e,i) in item.data" :key="index">
				<image :src="e.image"></image>
				<view class="onp"><i>￥</i>{{e.priceStr}}</view>
				<view class="bps">
					<text class="bp">爆品</text>
					<text class="yqp">一起拼</text>
				</view>
				<view class="jsss">{{e.subtitle}}</view>
				<view class="name">{{e.mainTitle}}</view>
				<view class="hp">{{e.thirdContent}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		onLaunch,
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		classifydata,
		getNavData
	} from "../../apis/api/api.js"
	let select = ref(0)
	let arr = ref([{
			name: '热门',
			sorttype: 0,
			
		},
		{
			name: '销量',
			sorttype: 1,
			
		},
		{
			name: '上新',
			sorttype: 5,
			
		},
		{
			name: '价格',
			sortValue: 0,
			sorttype:2
		},
		{
			name: '筛选',
			
		},
	])

	let categoryId = ref(294)
	let list = ref([])
	let sortType = ref(0)
	let sortValue = ref(0)
	let size = ref(20)
	let pageIndex = ref(1)
	let navdata = ref([])
	let cladata = async () => {
		const res = await classifydata(categoryId.value)
		
		navdata.value = res.data.subCategory.threeLevelcategoryList.splice(0, 9)
	
		
	}
	cladata()
	let listData =async ()=>{
		let params = {
			pageNum:pageIndex.value,
		
			sortValue:sortValue.value,
			sortType:sortType.value,
			categoryId:categoryId.value
		}
		let arra = await getNavData(params)
		console.log(arra);
		list.value = arra.data.data.blockList[0].block
		
	}
	listData()
	let count = 0
	let changetype = (item,i)=>{
		select.value = i
		arr.value.forEach((e)=>{
				if(e.name == item.name){
					sortType.value = item.sorttype
				} 
		})
		if (item.name == '价格'){	
			sortValue.value = 1
			count++
		} 
		if (count%2 == 0){
			sortValue.value = 0
		}
		listData()	
	}

</script>

<style scoped>
	.three-category-section {
		background-color: #f3f3f3;
	}

	.home-three-nav {
		background: #fff;
		padding-top: 35rpx;
		margin-bottom: 25rpx;

		.navlist {
			width: 100%;
			margin: auto;
			display: flex;
			flex-wrap: wrap;
			text-align: center;

			.item {
				width: 20%;
				margin-bottom: 40rpx;

				.img {
					width: 100%;
					height: 150rpx;
					display: block;
				}

				.title {
					font-size: 24rpx;
					color: #4a4a4a;
					width: 100%;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}


	}

	.home-tab-filter-box {
		margin-top: 30rpx;
		width: 100%;
		height: 160rpx;
		display: flex;
		justify-content: space-around;
		background-color: #fff;

		.typebox {
			position: relative;
			height: 160rpx;
			line-height: 120rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			color: #666;
			padding: 20rpx 24rpx;
		}

		.active {
			color: #7f4395;
		}
	}

	.tl {
		display: flex;
		width: 100%;
	}

	.item {
		width: 50%;
		overflow: hidden;
		/* height: 800rpx; */
	}

	.item image {
		display: block;
		width: 100%;
		height: 400rpx;
		margin-bottom: 20rpx;
	}

	.item view {
		margin-left: 30rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.item .onp {
		font-size: 40rpx;
		color: #f7a701;
	}

	.item .onp i {
		font-size: .40rpx;
	}

	.item .bps {
		color: #fff;
		font-size: 24rpx;
	}

	.item .bp {
		padding: 5rpx;
		background-color: #ab7fd1;
		margin-right: 10rpx;
	}

	.item .yqp {
		border: 1px solid #fb4c81;
		color: #fb4c81;
	}

	.item .jsss {
		color: #bf9e6b;
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item .hp {
		color: #bbb;
		font-size: 34rpx;
	}
</style>