import axios from "../axios/axios.js"
const baseUrl = "http://47.113.230.184:5566/"
//首页的数据
export function homeData(){
  return axios({
    url:baseUrl,
  })
}
//首页的商品数据
export function listData(pageNum){
	return axios({
		url:baseUrl+'floor',
		data:{
			pageNum
		}
	})
}
//详情页的数据
export function goodsData(id){
	return axios({
		url:baseUrl+'oo',
		data:{
			id
		}
	})
}
//商品评价
export function goodspj(id){
	return axios({
		url:baseUrl+'pls?id='+id+'&index=1&type=0',
	})
}