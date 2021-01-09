import './App.css';
import React,{useEffect} from 'react';
import apis from './Apis'
import { routes } from './Routes';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { useSelector } from 'react-redux';
import { selectUser, selectSignupRequest } from './feature/userSlice';
import LoginPage from './Pages/Login/Login';
import SignUpPage from './Pages/SignUp/SignUp';
import {useDispatch} from 'react-redux';
import {login, logout} from './feature/userSlice';
import storage from './lib/storage'
import Auth from './hoc/auth'


function App({history}) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={routes.user.path} component={Auth(routes.user.component, true)} />
        <Route exact path={routes.posts.path} component={Auth(routes.posts.component, true)} />
        <Route exact path={routes.search.path} component={Auth(routes.search.component, true)}  />
        <Route exact path={routes.login.path} component={Auth(routes.login.component, null)} />
        <Route exact path={routes.signup.path} component={Auth(routes.signup.component, null)} />
        <Route exact path={routes.userMe.path} component={Auth(routes.user.component, true)} />
        <Redirect from='/' to={routes.login.path} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
