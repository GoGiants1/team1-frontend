import { routes } from './Routes'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
function App({history}) {
  return (
    <div className="app">
    <ConnectedRouter history={history}>
      <Header/>
			
			{/* App body */}
				<div className="app_body">
          <Sidebar />
        </div>
        {/* sidebar */}
				{/* Feed */}
				{/* widget */}



      <Switch>
        <Route path={routes.users.path} component={routes.users.component} />
        <Route path={routes.posts.path} component={routes.posts.component} />
        <Route path={routes.search.path} component={routes.search.component} />
        <Route path={routes.login.path} component={routes.login.component} />
        <Route path={routes.signup.path} component={routes.signup.component} />
        
        <Redirect from='/' to={routes.users.path} />
      </Switch>
    </ConnectedRouter>
    </div>
  );
}

export default App;
