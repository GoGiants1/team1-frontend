import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../Routes'

const UsersPage = () => {
	return (
		<>
			<Route exact path={routes.users.path} component={routes.users.component} />
		</>
	)
}

export default UsersPage