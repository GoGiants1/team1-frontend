//컴퍼넌트 구현
import { useEffect } from 'react'
import apis from '../../Apis' 


const Posts = () => {
	useEffect(() => {
		apis.posts.getAll()
			.then()
			.catch()
	}, [])
	return (
		<div>
		</div>
	)
}

export default Posts