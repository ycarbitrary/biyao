<template>
	<view class="section-classify">

		<view class="section-firstCate">
			<scroll-view enhanced scroll-y style="height: 88vh;">
				<view class="left" v-for="(item,index) in data" :key="index" @click="changetab(item.categoryId,index)">
					<p :class="[select == index ? 'active' : '' , 'leftItem']">{{ item.categoryName }}</p>
				</view>
			</scroll-view>
		</view>

		<view class="section-cateList">
			<scrool-view scroll-y enhanced style="height: 88vh;">
				<view class="title">
					<text class="left_line"></text>
					<text class="title_t">{{ title }}</text>
					<text class="right_line"></text>
				</view>
				<view class="list">
					<view class="list_con" v-for="(item,index) in listdata" :key="index">
						<image class="img" :src="item.categoryImg" mode=""></image>
						<text class="txt">{{ item.categoryName }}</text>
					</view>

				</view>
			</scrool-view>
		</view>
	</view>
</template>

<script setup>
	import {
		classifydata
	} from "../../apis/api/api.js"
	import {
		defineComponent,
		ref
	} from 'vue'
	let data = ref([]) //初始左边数据
	let listdata = ref([]) // 右边内容区域
	let select = ref(0)
	let id = ref('294')
	let title = ref('')
	let initData = async (cateid) => {
		const res = await classifydata(cateid)
		data.value = res.data.categoryList
		title.value = data.value[select.value].categoryName
		listdata.value = res.data.subCategory.threeLevelcategoryList
	}
	initData(id.value)
	let changetab = (cid,i)=>{
		id.value = cid
		select.value = i
		initData(id.value)
	}
	
	
	
	
	
</script>

<style scoped>
	.section-classify {
		width: 100%;
		background: #fff;
		border-top: 1px solid #cccccc;

		.section-firstCate {
			position: fixed;
			left: 0;
			top: 90rpx;
			bottom: 35rpx;
			z-index: 2;
			box-sizing: border-box;
			width: 210rpx;
			/* overflow: hidden; */
			background: #f7f7f7;

			.left {
				width: 100%;
				margin: 20rpx 0;

				.leftItem {
					padding: 10rpx 30rpx;
					text-align: center;
					font-size: 30rpx;
					margin: 10rpx;

				}

				.active {
					border-left: 2px solid #7f4395;
					background: #fff;
				}
			}

		}

		.section-cateList {
			position: absolute;
			left: 210rpx;
			top: 90rpx;
			z-index: 2;
			box-sizing: border-box;
			width: 550rpx;
			bottom: 35rpx;
			padding-bottom: 20rpx;

			.title {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.title_t {
					padding: 12rpx 20rpx;
					font-size: 30rpx;
				}

				.left_line {
					height: 4rpx;
					width: 96rpx;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAACCAYAAAAesF8hAAAAAXNSR0IArs4c6QAAAJhJREFUGBldT0sKRCEM8/P6wIX3v4N3mGOpC1EnKVORKUjTNInqSymx1iprLem9v957SSnJGON1zgnPnFOxoIj33g90bwjhaKhDhs7gBZqzM2y8+eE5Gvr/deRunm+j5/J/HhCncs4Oj3CtNQfxjjHqDn3j8oPxCc8B2sNzNg0zUBsZ7Jp1Y1K6gObXtd1+3m+7G4NjrvnXF/XOUa7X8vi3AAAAAElFTkSuQmCC) no-repeat center top;
					background-size: 100% 100%;
				}

				.right_line {
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAACCAYAAAAesF8hAAAAAXNSR0IArs4c6QAAAKBJREFUGBl1TsENxDAIS9JGatSxbsrucbNkk35KEmpzJernkBDG2MjxOI5vCOGDvtDtmaKqAiwxRvLcbb454qcv6qBprh9j/PWnlOYv+qG9yGG2ZVnsJijefG+teQ4ppVAv+75LgsgrOkCQgCDKBmcT2O7kUK7l3erFBQSZfhP/fk0/7oYxp985PmN2BFd2711zzrquq3m2bdPzPA3XWvUGPwyDhD95AlIAAAAASUVORK5CYII=) no-repeat center top;
					background-size: 100% 100%;
					height: 4rpx;
					width: 96rpx;
				}
			}

			.list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				padding-bottom: 200rpx;
				
				.list_con{
					width: 30%;
					text-align: center;
					margin-right: 15rpx;
					margin-bottom: 35rpx;
					.img {
						display: block;
						width: 100%;
						border-radius: 10rpx;
						height: 190rpx;
					}
					.txt{
						display: block;
						width: 100%;
						font-size: 24rpx;
						height: 60rpx;
					}
				}
				
			}
		}
	}
</style>