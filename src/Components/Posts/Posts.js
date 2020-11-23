//컴퍼넌트 구현
import { useEffect } from 'react'
import apis from '../../Apis' 

const Posts = () => {
	useEffect(() => {
		apis.posts.getAll()
			.then()
			.catch()
	}, [])
	return <p>포스트 컴포넌트</p>
}

export default Posts