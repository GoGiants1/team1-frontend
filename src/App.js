import './App.css';
import React,{useEffect} from 'react';

import { routes } from './Routes';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { selectUser, selectSignupRequest } from './feature/userSlice';
import LoginPage from './Pages/Login/Login';
import SignUpPage from './Pages/SignUp/SignUp';

function App({history}) {
  const user = useSelector(selectUser);
  const signUpRequest = useSelector(selectSignupRequest)

  return (
    <ConnectedRouter history={history}>
      { !user ? signUpRequest? <SignUpPage/> : <LoginPage/> : (
      <Switch>
        <Route path={routes.users.path} component={routes.users.component} />
        <Route path={routes.posts.path} component={routes.posts.component} />
        <Route path={routes.search.path} component={routes.search.component} />
        <Route path={routes.login.path} component={routes.login.component} />
        <Route path={routes.signup.path} component={routes.signup.component} />

        <Redirect from='/' to={routes.posts.path} />
      </Switch>
      )} 
    </ConnectedRouter>
  );
}

export default App;
