import axios from 'axios'

//baseURL 제외한 추가적인 옵션의 경우, 검색해보시면 됩니다.
const requester = axios.create({
	baseURL: 'https://jsonplacholder.com/api/'
})

const apis = {
	users: {
		get: (id) => {
			return requester.get(`users/${id}`)
		},
		getAll: () => {
			return requester.get('users')
		},
		register: ({
			username,
			password
		}) => {
			return requester.post('users', {
				username,
				password
			})
		}
	},
	posts: {
		getAll: () => {
			return requester.get('posts')
		}
		//위처럼 필요한 것 적으면 됩니다.
	}
}

export default apis