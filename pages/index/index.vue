<template>
	<view class="box">
		<Search></Search>
		<Nav></Nav>
		<scroll-view class="sp" @scrolltolower="scrollFloort" scroll-y>
		<view class="banner">
			<swiper class="banner" indicator-dots circular>
				<swiper-item v-for="(e,i) in arr.banners" :key="i">
					<image :src="e.image" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="jj">
			<view class="pz">
				<span>大牌品质</span>/
				<span>工厂价格</span>/
				<span>分期支付</span>/
				<span>顺丰包邮</span>/
				<span>无忧退款</span>
			</view>
			<view class="js">
				<view class="pag" v-for="(item,index) in arr.operationNavigation" :key="index">
					<image :src="item.icon" mode=""></image><br />
					<text>{{item.title}}</text>
				</view>
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
			
		</scroll-view>
	</view>
</template>

<script setup>
	import Search from "../../componts/search.vue"
	import Nav from "../../componts/nav.vue"
	import {
		useStore
	} from "vuex"
	import {
		homeData,
		listData
	} from "../../apis/api/api.js"
	import {
		ref
	} from "vue"
	const store = useStore()
	let arr = ref([])
	let list = ref([])
	let num = ref(1)
	let getHomeData = async () => {
		const arrs = await homeData()
		arr.value = arrs.data.homeData
		let arra = await listData(num.value)
		list.value = arra.data.data.blockList[1].block
		console.log(list.value);
	}
	getHomeData()
	let scrollFloort = async()=>{
		num.value++
		let arra = await listData(num.value)
		console.log(arra);
		console.log(arra.data.data.blockList.length);
		if(arra.data.data.blockList.length>1){
		console.log(arra.data.data.blockList[1].block);
		list.value.push(...arra.data.data.blockList[1].block) 
		}else{
		list.value.push(...arra.data.data.blockList[0].block) 
		}
		console.log(list.value);
	}
	let toxq=(id)=>{
		console.log(id);
		uni.navigateTo({
			url:'/pages/goods/goods?id='+id
		})
	}
	console.log(store);
</script>

<style scoped>
	@import url(./index.css);
</style>
