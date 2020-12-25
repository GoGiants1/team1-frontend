import axios from 'axios'
import storage from "./lib/storage";

//baseURL 제외한 추가적인 옵션의 경우, 검색해보시면 됩니다.
const AUTH_TOKEN = 'token'
const token = storage.get(AUTH_TOKEN)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;
const requester = axios.create({
	baseURL: 'http://13.209.8.137/'
})

const apis = {
  	account: {
  		login: (loginParams) => {
  			return requester.post('account/login/',loginParams)
		}
	},
	users: {
		get: (id) => {
			return requester.get(`users/${id}/`)
		},
		getAll: () => {
			return requester.get('users/')
		},
		register: ({
			username,
			password
		}) => {
			return requester.post('users/', {
				username,
				password
			})
		}
	},
	posts: {
		getAll: () => {
			return requester.get('posts/')
		},
		get: (id) => {
			return requester.get(`posts/${id}/`)
		},
		post: (newPost) => {
			return requester.post('posts/', newPost)
		}

		//위처럼 필요한 것 적으면 됩니다.
	},
	comments: {
		post: (post_id,comment) => {
			return requester.post(`posts/${post_id}/comments/`,comment)
		}
	},
	// reaction: {
	//
	// }
}

export default apis