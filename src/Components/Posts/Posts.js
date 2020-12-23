//컴퍼넌트 구현
import { useEffect } from 'react'
import apis from '../../Apis' 
import Header from '../Header/Header'

const Posts = () => {
	useEffect(() => {
		apis.posts.getAll()
			.then()
			.catch()
	}, [])
	return (
		<div className="app">
			{/* Header */}
			<Header/>

			{/* App body */}
				{/* sidebar */}
				{/* Feed */}
				{/* widget */}
		</div>
	)
}

export default Posts