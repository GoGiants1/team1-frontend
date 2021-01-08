import React from "react";
import './user.css'
import {Avatar} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';


const Profile = ({profile,me}) => {
	return (
	  <div className='segment'>
			<img src="https://static-exp1.licdn.com/sc/h/cpemy7gsm8bzfb5nnbbnswfdm" alt="" className="inner"/>
			<Avatar className="profile_img" src={profile.image}/>
			{me?<CreateIcon className={"edit_button"}/>:null}
			<h1>{profile.firstName + " " + profile.lastName}</h1>
			<h3>{profile.company.length > 0?profile.company[profile.company.length -1].companyName:(profile.school.length>0?profile.school[profile.school.length -1].schoolName:"회사/학교 정보가 없습니다")}</h3>
			<p>{profile.detail}</p>
		</div>
	);
}

export default Profile
