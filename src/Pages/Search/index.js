import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../Routes'

const SearchPage = () => {
	return (
		<>
			<Route exact path={routes.search.path} component={routes.search.component} />
		</>
	)
}

export default SearchPage