<template>
		<view class="boxss">
			<view class="box" v-if="arrs.imgList">
					<view class="lb">
						<view :class="nums==0?'active':''" @click="qhsps(0)">
							商品
						</view>
						<view :class="nums==1?'active':''" @click="qhsps(1)">
							评价
						</view>
						<view :class="nums==2?'active':''" @click="qhsps(2)">
							详情
						</view>
					</view>
					</view>
					<scroll-view class="scv" @scroll="scrollBox"  :scroll-top="myScrollTop" scroll-y="true" >
					<view class="banner">
						<swiper class="swiper" indicator-dots circular>
							<swiper-item class="swiperItem" v-for="(item,index) in arrs.imgList" :key="index">
								<image :src="item.largeImg" mode=""></image>
							</swiper-item>
						</swiper>
					</view>
					<view class="name" v-if="arrs.suData">
						<p class="pic">￥ <span>{{arrs.suData.price}}</span> 支持花呗支付 <i class="i">收藏</i></p>
						<p class="na">
							<span class="left">{{arrs.supplierBackground}}</span>
							<span class="right">生产周期{{arrs.suData.duration}}天</span>
						</p>
						<p class="mt">{{arrs.longProductName}}</p>
						<p class="js">{{arrs.productSale}}</p>
					</view>
					<view class="fl" v-if="arrs.supplierInfo">
						<view v-for="(item,index) in arrs.supplierInfo.policy" :key="index">
							{{item.policyName}}
						</view>
					</view>
					<view class="colors"></view>
					<div class="ja">
						<div class="ja-item">
							<img src="https://img0.baidu.com/it/u=3797365808,104465376&fm=253&fmt=auto&app=138&f=JPEG?w=150&h=150"
								alt="">
							<span class="xhz">坤坤</span>
							<div class="right">
								<span>还差1人拼成<br>
									<i>剩余02:16:12</i></span>
								<button>参与</button>
							</div>
						</div>
						<div class="ja-item">
							<img src="https://img2.baidu.com/it/u=524623349,2223915578&fm=253&fmt=auto&app=120&f=JPEG?w=432&h=270"
								alt="">
							<span class="xhz">小黑子</span>
							<div class="right">
								<span>还差1人拼成<br>
									<i>剩余05:36:42</i></span>
								<button>参与</button>
							</div>
						</div>
					</div>
					<div class="pt">
						<p>拼团玩法 <span>详细规则></span></p>
						<img src="https://static.biyao.com/mnew/img/master/togetherGroup/rule@2x_4b87758.png" alt="">
					</div>
					<view class="colors"></view>
					<view class="sppj">
						<p>商品评价（{{pjs.cmtCount}}） <span>好评率{{pjs.praiseRate}} ></span></p>
						<p style="margin-bottom: 10rpx;" v-if="pjs.post&&pjs.post.length!=0">
							<image :src="pjs.post[0].avatar_url" alt="" />
							<i>{{pjs.post[0].nickname}}</i>
							<span style="color: #ebba67; ">满意</span>
						</p>
						<p v-if="pjs.post&&pjs.post.length!=0" style="color: rgba(102, 102, 102, 0.575); font-size: .1rem;">
							<b>{{pjs.post[0].createTime}}</b> {{pjs.post[0].spec}}
						</p>
						<p v-if="pjs.post&&pjs.post.length!=0">{{pjs.post[0].content}}</p>
						<img class="nas" :src="item" alt="" v-for="(item,index) in imgs" :kye="index">
					</view>
				<view class="colors"></view>
				<view class="spna" v-if="arrs.supplierInfo">
					<view class="nmna">
						<img :src="arrs.supplierInfo.urlLogo" alt="">
						<div class="lo">
							<h2>{{arrs.supplierInfo.supplierName}}</h2>
							<p>商品质量:{{arrs.supplierInfo.productQuality}}&nbsp;&nbsp;&nbsp;服务态度: {{arrs.supplierInfo.qualityGrade}}
							</p>
						</div>
						<div class="qbsp">全部商品></div>
					</view>
				
				</view>
				<scroll-view scroll-x class="scroll" v-if="arrs.onSellGoodsInfo">
					<view @click="qhxq(e.suId)"  class="bjj" v-for="(e,index) in arrs.onSellGoodsInfo.recommendProducts" :key="index">
						<image :src=e.imageUrl alt="" />
						<p class="ssas">{{e.title}}</p>
						<span>一起拼</span>
						<p style="color: #f7a101;"><i>￥</i>{{e.price}}</p>
					</view>
				</scroll-view>
				
				<view :class="[fla?'ac':'','jslk']">
					<dl v-for="(e,index) in arrs.productTopDetail" :key="index">
				        <dt>{{e.name}}</dt>
				        <dd>{{e.desc}}</dd>
				    </dl>
				</view>
				<view class="zkqb"><span @click="zkqb">{{str}}</span></view>
				<view  class="imgs">
					<view v-html="arrs.productButtomDetailOrig">
					</view>
				</view>
			</scroll-view>
		</view>
</template>

<script setup>
	import {
		goodsData,
		goodspj
	} from "../../apis/api/api.js"
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		ref
	} from "vue"
	const arrs = ref([])
	const pjs = ref([])
	const imgs = ref([])
	let str = ref('展开全部')
	let fla = ref(false)
	let one = ref(0)
	let tow = ref(0)
	let nums = ref(0)
	onLoad(async (option) => {
		console.log(option);
		let arr = await goodsData(option.id)
		arrs.value = arr.data
		let pj = await goodspj(arrs.value.productId)
		pjs.value = pj.data.data
		console.log(arrs.value);
		console.log(pjs.value);
		imgs.value = pjs.value.post[0].img.split(',')
		if (imgs.value[0] == '') {
			imgs.value = []
		}
		
		uni.createSelectorQuery().select('.sppj').boundingClientRect((rect)=>{
		one.value = rect.top
		}).exec()
		
		uni.createSelectorQuery().select('.jslk').boundingClientRect((rect)=>{
		tow.value = rect.top
		}).exec()
	})
	let zkqb=()=>{
		if(fla.value){
			str.value = '展开全部'
			fla.value = false
		}else{
			str.value = '收起'
			fla.value = true
		}
	}
	let qhxq=(id)=>{
		console.log(id);
		uni.navigateTo({
			url:'/pages/goods/goods?id='+id
		})
		window.scrollTo({
			top:0
		})
	}
	let myScrollTop = ref(0)
	let scrollBox = (e)=>{
		console.log(e);
		e.detail.scrollTop>=0&&e.detail.scrollTop<one.value?nums.value = 0:''
		e.detail.scrollTop>=one.value&&e.detail.scrollTop<tow.value?nums.value = 1:''
		e.detail.scrollTop>=tow.value?nums.value = 2:''
		console.log(myScrollTop.value);
	}
	let qhsps=(num)=>{
		if(num==0){
			myScrollTop.value = 0
			nums.value = 0
		}else if(num==1){
			myScrollTop.value = one.value
			nums.value = 1
		}else if(num==2){
			myScrollTop.value = tow.value
			nums.value = 2
		}
		console.log(num.value);
	}
</script>

<style scoped>
	@import url(./goods.css);
</style>
