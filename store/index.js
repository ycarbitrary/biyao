import {
	createStore
} from "vuex";

export default createStore({
	state: {
		type: 'wx',
		name: 'xxx',
		uid: "27777"
	},
	mutations: {
		// 定义mutations，用于修改状态(同步)
		updateUid(state, payload) {
			state.uid = payload
		}
	},
	actions: {
		// 定义actions，用于修改状态(异步)
		// 2秒后更新状态
		updateUid(context, payload) {
			setTimeout(() => {
				context.commit('updateUid', payload)
			}, 2000)
		}
	},
	getters: {
		// 定义一个getters
		formatUid(state) {
			return state.uid + ' Tom'
		}
	},
	modules: {}
});
