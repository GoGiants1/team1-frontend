import axios from 'axios';
import storage from "./lib/storage";

//baseURL 제외한 추가적인 옵션의 경우, 검색해보시면 됩니다.
const AUTH_TOKEN = 'token'
const token = storage.get(AUTH_TOKEN)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;
const requester = axios.create({
	baseURL: 'http://clone-linkedin.com/'
})

const apis = {
	token: {
		update: async () => {
		const result = await requester.get('user/me/profile/')
		requester.defaults.headers.common['Authorization'] = `Token ${result.data.token}`
		},
		delete: async () => {
			await delete requester.defaults.headers.common['Authorization']
		}
	},
	user: {
		get: async (id) => {
			return await requester.get(`user/${id}/`)
		},
		getAll: async () => {
			return await requester.get('user/')
		},
		getMyProfile: async () => {
			return await requester.get('user/me/profile/')
		},
		getIdProfile: async (id) => {
			return await requester.get(`user/${id}/profile/`)
		},
		postMyProfile: async ( {
			firstName,
			lastName,
			region,
			contact,
			schoolName,
			schoolStartYear,
			schoolEndYear,
			major,
			companyName,
			companyStartDate,
			companyEndDate
			
		}) => {
			return await requester.post('user/me/profile/', {
				firstName,
				lastName,
				region,
				contact,
				schoolName,
				schoolStartYear,
				schoolEndYear,
				major,
				companyName,
				companyStartDate,
				companyEndDate
			})
		},
		putMyProfile: async (userinfo) => {
			return await requester.put('user/me/profile/specific/', userinfo)			
		},

		register: async ({
			email,
			password
		}) => {
			delete requester.defaults.headers.common['Authorization'];
			return await requester.post('user/', {
				email,
				password
			}).then(res=> {
				console.log('이메일 로그인 res', res)
				requester.defaults.headers.common['Authorization'] = `Token ${res.data.token}`
			})
		},
		login: async ({
			email,
			password
		}) => {
			delete requester.defaults.headers.common['Authorization']
			const result = await requester.put('user/login/', {
				email,
				password
			})
			requester.defaults.headers.common['Authorization'] = `Token ${result.data.token}`
			console.log('일반로그인 토큰', result.data)
			
		},
		// logout: async () => {
		// 	delete requester.defaults.headers.common['Authorization']
		// 	return await 
		// },
		responseGoogle : async (response) => {
			try{
				// 소셜로그인 API 엔드포인트
				// const url = 'social/login/'
			
				// 장고서버에 로셜로그인 호출 (response.tokenId 사용)
				console.log('google response: ', response);
				const newToken = response.tokenId
				storage.set('token', newToken);
				console.log('newtoken:', newToken);
				console.log('token: ', response.tokenId)
				
				console.log('스토리지 토큰:', storage.get('token'));
				const request = {
				tokenId: response.tokenId,
				};
	
				// 로그인토큰 : result.data.token
				delete requester.defaults.headers.common['Authorization'];
				
				console.log('axios:', axios.defaults.headers.common['Authorization'])
				console.log('리퀘스터 디폴트:', requester.defaults)
				const result = await requester.post('social/login/', request)
				requester.defaults.headers.common['Authorization'] = `Token ${result.data.token}`
				console.log('logintoken:', result.data)
				requester.get('user/').then(res=> console.log('유저 겟', res))
				}catch(error) {
					alert(JSON.stringify(error.response.data))
					throw error
				}
		},
		userName: async ({first_name,last_name}) => {
			return await requester.put('username/update/', {first_name,last_name})
		},
	},
	posts: {
		getAll: async (num) => {
			return await requester.get(`posts/?page=${num}`)
		},
		get: async (id) => {
			return await requester.get(`posts/${id}/`)
		},
		post: async (newPost) => {
			return await requester.post('posts/', newPost)
		},
		delete: async (id) => {
			return await requester.delete(`posts/${id}/`)
		}

		//위처럼 필요한 것 적으면 됩니다.
	},
	comments: {
		post: async (post_id,comment) => {
			return await requester.post(`posts/${post_id}/comments/`,comment)
		}
	},
	// reaction: {
	//
	// }
}

export default apis