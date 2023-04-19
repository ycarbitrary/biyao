import axios from "../axios/axios.js"
const baseUrl = "http://47.113.230.184:5566/"
//首页的数据
export function homeData() {
	return axios({
		url: baseUrl,
	})
}

// 分类页的数据
export function classifydata(id) {
	return axios({
		url: baseUrl + `classify?categoryId=${id}`,
	})
}



// 热门销量数据

// 首页nav点击跳转页面 热门销量切换接口
export function getNavData(data) {
	return axios({
		url: baseUrl+'classifys',
	
		data:{
			...data
		}
	})
}