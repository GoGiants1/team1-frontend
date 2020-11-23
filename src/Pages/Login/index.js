import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../Routes'

const LoginPage = () => {
	return (
		<>
			<Route exact path={routes.login.path} component={routes.login.component} />
		</>
	)
}

export default LoginPage