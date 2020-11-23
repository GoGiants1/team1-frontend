import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../Routes'

const PostsPage = () => {
	return (
		<>
			<Route exact path={routes.posts.path} component={routes.posts.component} />
		</>
	)
}

export default PostsPage