import UsersPage from './Pages/Users/Users'
import PostsPage from './Pages/Posts/Posts'
import SearchPage from './Pages/Search/Search'
import SignUpPage from './Pages/SignUp/SignUp'
import LoginPage from './Pages/Login/Login'



const routes = {
	user: { path: '/user/:user_id', component: UsersPage },
	posts: { path: '/posts', component: PostsPage },
	login: { path: '/login', component: LoginPage },
	signup: { path: '/signup', component: SignUpPage },
	search: { path: '/search', component: SearchPage },
	userMe:{path: '/user/me', component: UsersPage}
}

export { routes }