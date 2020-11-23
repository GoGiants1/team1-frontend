import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../Routes'

const SignUpPage = () => {
	return (
		<>
			<Route exact path={routes.signup.path} component={routes.signup.component} />
		</>
	)
}

export default SignUpPage