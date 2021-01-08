import React,{useState} from "react";
import './user.css'
import {Avatar} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import apis from "../../Apis";

const Profile = ({profile,me}) => {
	const [edit, setEdit] = useState(false)
	
	const [firstName, setFirstName] = useState(profile.firstName)
	const [lastName, setLastName] = useState(profile.lastName)
	const [image, setImage] = useState(profile.image)
	const [detail, setDetail] = useState(profile.detail)
	const [contact, setContact] = useState(profile.contact)
	const [region, setRegion] = useState(profile.region)




	return (
	  <div className='segment'>
		<Modal
			disablePortal
			disableEnforceFocus
			disableAutoFocus
			className="modal"
			open={edit}
			onClose={() => {
			setEdit(false)
			}}
			BackdropProps={{style: {backgroundColor: 'transparent'}}}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			
		>
			<div>
			<form noValidate autoComplete="off">
				<TextField color="contained" variant="outlined" id="outlined-basic" label="성(LastName)" onChange={(event) => {
				setLastName(event.target.value)
				}}/>
				<TextField variant="outlined" id="outlined-basic" label="이름(FirstName)" onChange={(event) => {
				setFirstName(event.target.value)
				}}/>
				<TextField variant="outlined" id="outlined-basic" label="한줄 소개" onChange={(event) => {
				setDetail(event.target.value)
				}}/>
				<TextField variant="outlined" id="outlined-basic" label="지역(Region)" onChange={(event) => {
				setRegion(event.target.value)
				}}/>
				<TextField variant="outlined" id="outlined-basic" label="연락처" onChange={(event) => {
				setContact(event.target.value)
				}}/>
				
				<Button variant="contained" onClick={() => {
				if (edit) {
					apis.user.putMyProfile({
					"firstName": firstName,
					"lastName": lastName,
					"detail": detail,
					"region": region,
					"contact": contact,
					"image":image,
					"profile_created": true
					}).then(r => {
						
					})
				} 
				setEdit(false)
				}}>확인</Button>
			</form>
			</div>
      	</Modal>

			<img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" className="inner"/>
			<Avatar className="profile_img" src={image}/>
			{me?<CreateIcon onClick={() => setEdit(true)} className={"edit_button"}/>:null}
			<h1>{firstName + " " + lastName}</h1>
			<h3>{profile.company.length > 0?profile.company[profile.company.length -1].companyName:(profile.school.length>0?profile.school[profile.school.length -1].schoolName:"회사/학교 정보가 없습니다")}</h3>
			<p>{detail}</p>
			<p>{region}</p>
			<p>{contact}</p>
		</div>
	);
}

export default Profile
