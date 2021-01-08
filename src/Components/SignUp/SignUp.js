import React,{useState, useEffect} from 'react';
import GoogleLogin from 'react-google-login';
import apis from "../../Apis"
import './SignUp.css'
import TextField from '@material-ui/core/TextField';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { login, signUpRequest, signUpSecondStep } from '../../feature/userSlice';
import { selectSignupSecondStep, selectUser } from '../../feature/userSlice';
import { useSelector } from 'react-redux';
import storage from '../../lib/storage'


const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [lastName, setLastName] = useState('');
	const [detail, setDetail] = useState('');
	const [region, setRegion] = useState('');
	const [contact, setContact] = useState('');
	const [image, setImage] = useState('');
	
	const dispatch = useDispatch();
	const signUpSecondStepCheck = useSelector(selectSignupSecondStep);
	const history = useHistory();
	const user = useSelector(selectUser);


	useEffect(() => {
		const loggedInfo = storage.get('token')
		console.log(loggedInfo)
		if(history.location.pathname === '/signup'){
			if(loggedInfo){
				apis.token.update(loggedInfo).then( res=> {
					console.log('getMyprofile', res)
					dispatch(login(res.data))
					alert('잘못된 접근입니다.')
					console.log('history 객체', history)
					console.log('history 객체비교 결과', history.location.pathname !== '/login')
					history.replace('/posts')
				  })
				}
			else return
			console.log('his',history)
		}
	  }, [])




	const validateEmail = (mailAddress) => {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(mailAddress)
	}

	const handleSignup = (e) => {
        e.preventDefault();
		setEmailError(validateEmail(email) ? false : true)
		setPasswordError(password.length < 6 ? true : false)
		if(!emailError && !passwordError){
			apis.user.register({email: email, password: password})
			.then(res=> {
				console.log('회원가입 1단계 로그:', res)
				alert('다음 단계로 이동합니다.')
				dispatch(signUpSecondStep(true))
			})
			.catch(error => {
				alert('이미 가입된 이메일입니다.')
			})
		}
	}
	
	const handleSignupSecond = async (e) => {
        e.preventDefault();
		setLastNameError( lastName.length === 0 ? true : false)
		setFirstNameError( firstName.length === 0 ? true : false)
		if(!lastNameError && !firstNameError){
			apis.user.getMyProfile().then(res=> {
				console.log('로그인 한 사람1',res)
			})
			await apis.user.userName({ first_name: firstName, last_name: lastName })
			.then(res=> {
				console.log('회원가입 2단계 로그:', res)	
			})
			.catch(error => alert(JSON.stringify(error.response.data)))

			apis.user.getMyProfile().then(res=> {
				console.log('로그인 한 사람2',res)
			}).then(() => {
				apis.user.putMyProfile({
					firstName: firstName,
					lastName: lastName,
					detail: detail,
					region: region,
					contact: contact,
					profile_created: true,
					image: image
				})
				.then(res=> { 
					console.log(res)
					apis.user.getMyProfile().then(res=> {
						console.log('로그인 한 사람3',res)
						console.log(res)
						dispatch(login(res.data))
						dispatch(signUpRequest(false))
						dispatch(signUpSecondStep(false))	
						history.push('/posts')
					}).catch(error => alert(JSON.stringify(error)))
				})
			})
			

			
		}
		}


	const jumpToLogin = () => {
		dispatch(signUpRequest(false))
		dispatch(signUpSecondStep(false))	
		history.push('/login')
	}

	const handleSocialSignup = async (response) => {
		await apis.user.responseGoogle(response)

		apis.user.getMyProfile().then(res=> {
			console.log('로그인 한 사람',res)
			if(res.data.profile_created){
				alert('이미 회원가입을 하셨습니다. 로그인을 진행합니다')
				dispatch(signUpRequest(false))
				dispatch(signUpSecondStep(false))
				dispatch(login(res.data))	
				history.push('/posts')
			}else{
				alert('다음 단계로 이동합니다.')
				dispatch(signUpSecondStep(true))	
			}

		}).catch(error => {
			alert(JSON.stringify(error))
		})
	}


	 return (
		<>
		{!signUpSecondStepCheck? 
		(<div className="login">
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
			<button type='submit' onClick={handleSignup}>회원가입</button>
		</form>
		<GoogleLogin
			clientId="927523383935-oo65e954d6ugud2roj8ck4l7ai4cfds0.apps.googleusercontent.com"
			buttonText="구글 계정으로 가입"
			onSuccess={handleSocialSignup}
			onFailure={() => {}}
			cookiePolicy={'single_host_origin'}
		/>

		<p>
			이미 LinkedIn이 회원이세요?
			<span className="login_register_link" onClick={jumpToLogin}>
				로그인
			</span>
		</p>

	</div>) :
	(
		<div className="login">
		<img 
			src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png"
			alt=""
		/>
		<form>
			<TextField 
				id="outlined-basic" 
				margin="normal"
				error={lastNameError}
				helperText={lastNameError ? "성을 입력해주세요" : null } 
				label="성(LastName)을 입력해주세요" 
				variant="outlined" 
				onChange={(event) => setLastName(event.target.value)}
				value={lastName}
				required
			/>
			<TextField 
				id="outlined-basic" 
				margin="normal"
				error={firstNameError}
				helperText={firstNameError ? "이름을 입력해주세요": null}  
				label="이름(FirstName)을 입력해주세요" 
				variant="outlined" 
				onChange={(event) => setFirstName(event.target.value)}
				value={firstName}
				required
			/>
			<TextField 
				id="outlined-basic" 
				margin="normal"
				error={!image.length ? true : false}
				// helperText={!image.length ? "필수는 아닙니다": null}  
				label="이미지 링크(URL)를 작성해주세요" 
				variant="outlined" 
				onChange={(event) => setImage(event.target.value)}
				value={image}
			/>
			<TextField 
				id="outlined-basic" 
				margin="normal"
				error={!detail.length ? true : false}
				// helperText={firstNameError ? "한줄 프로필을 입력해주세요": null}  
				label="한줄 프로필을 작성해주세요" 
				variant="outlined" 
				onChange={(event) => setDetail(event.target.value)}
				value={detail}
				required
			/>
			<TextField 
				id="outlined-basic" 
				margin="normal"
				error={!region ? true : false}
				// helperText={region ? "이름을 입력해주세요": null}  
				label="거주 지역을 입력해주세요" 
				variant="outlined" 
				onChange={(event) => setRegion(event.target.value)}
				value={region}
				required

			/>
			<TextField 
				id="outlined-basic" 
				margin="normal"
				error={ !contact ? true : false}
				// helperText={contact ? "이름을 입력해주세요": null}  
				label="연락처를 입력해주세요" 
				variant="outlined" 
				onChange={(event) => setContact(event.target.value)}
				value={contact}

			/>
			<button type='submit' onClick={handleSignupSecond}>회원가입 완료하기</button>
		</form>
		<p>
			이미 LinkedIn이 회원이세요?
			<span className="login_register_link" onClick={jumpToLogin}>
				로그인
			</span>
		</p>
		</div>
	)}
	</>
		
	)
}

export default SignUp