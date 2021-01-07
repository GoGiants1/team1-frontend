import React,{useState, useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import apis from "../../Apis"
import './Login.css'
import TextField from '@material-ui/core/TextField';
import storage from '../../lib/storage'
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { login, signUpRequest, signUpSecondStep } from '../../feature/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';


const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [autoLogin, setAutoLogin] = useState(false)
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (user && history.location.pathname === '/login') {
		  alert('잘못된 접근입니다.')
		  console.log('history 객체', history)
		  console.log('history 객체비교 결과', history.location.pathname !== '/login')
		  history.replace('/posts')
		}
		
	  }, [])

	const validateEmail = (mailAddress) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(mailAddress)
	}

	const handleLogin = async (e) => {
        e.preventDefault();
		setEmailError(validateEmail(email) ? false : true)
		setPasswordError(password.length < 6 ? true : false)
		
		if(!emailError && !passwordError){
			await apis.user.login({email: email, password: password})
			apis.user.getMyProfile().then(res => {
					dispatch(login(res.data))
					history.replace('/posts')
				})
			.catch(error => alert(JSON.stringify(error.response.data)))

		
		}
	}
	const jumpToSignUp = () => {
		dispatch(signUpRequest(true))	
		history.push('/signup')
	}

	const handleSocialLogin = async (response) => {
		await apis.user.responseGoogle(response)
		
		apis.user.getMyProfile().then(res=> {
			console.log('로그인 한 사람',res)
			alert('이미 회원이시군요!')
			dispatch(login(res.data))
			history.push('/posts')
		}).catch(error => {
			alert('회원가입이 완료되지 않았습니다. 회원가입 페이지로 이동합니다')
			dispatch(signUpRequest(true))
			dispatch(signUpSecondStep(true))
			history.push('/signup')
		}
	)
}
	


	 return (
		
		<div className="login">
			<img 
				src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png"
				alt=""
			/>
			<form>
				<TextField 
					id="outlined-basic" 
					margin="normal"
					error={emailError}
					helperText={emailError ? "이메일 주소가 올바르지 않습니다" : null } 
					label="이메일 주소" 
					variant="outlined" 
					onChange={(event) => setEmail(event.target.value)}
					value={email}
				/>
				<TextField 
					id="outlined-basic" 
					margin="normal"
					error={passwordError}
					helperText={passwordError ? "비밀번호는 6자 이상이어야 합니다.": null}  
					label="비밀번호" 
					variant="outlined" 
					onChange={(event) => setPassword(event.target.value)}
					// placeholder="비밀번호" 
					type="password"
					value={password}

				/>
				<button type='submit' onClick={handleLogin}>로그인</button>
			</form>
			<GoogleLogin
				clientId="927523383935-oo65e954d6ugud2roj8ck4l7ai4cfds0.apps.googleusercontent.com"
				buttonText="구글 계정으로 로그인"
				onSuccess={handleSocialLogin}
				onFailure={handleSocialLogin}
				cookiePolicy={'single_host_origin'}
			/>

			<p>
				LinkedIn이 처음이세요?
				<span className="login_register_link" onClick={jumpToSignUp}>
					회원가입
				</span>
			</p>

		</div>
		
		)
}

export default Login