import React from 'react'
import {Avatar} from "@material-ui/core"
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import InputOption from '../Feed/InputOption'
import MoreButton from './MoreButton'
import './Comment.css'

function Comment({id,firstName,lastName,modified, userSchool, userCompany, updatedAt, message,image}) {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const postingDate = new Date(Date.parse(updatedAt)) 
	const formatted = postingDate.getFullYear() + "년 " + (postingDate.getMonth()+1) + "월 " + postingDate.getDate() +
	"일 " + postingDate.getHours() + "시 " + postingDate.getMinutes() + "분";
    
    return (
        <div className="comment">
			<div className="comment_header">
				<Avatar src={image}/>

				<div className="comment_info">
					<h2>{korean.test(lastName) || korean.test(lastName) ? lastName + firstName : firstName +' ' + lastName }</h2>
					{userCompany ? <p>{userCompany}</p> : <p>{userSchool}</p>} 
					<p>{formatted} {modified && <p>수정됨</p>}</p>
				</div>

				<div className="comment_modify">
					<MoreButton id={id} />
				</div>
			</div>

			<div className="comment_body">
				<p>{message}</p>
			</div>

			<div className="comment_buttons">
				<InputOption Icon={ThumbUpAltOutlinedIcon} title="추천" color="gray"/>
				<InputOption Icon={ChatOutlinedIcon} title="댓글" color="gray"/>
				<InputOption Icon={ShareOutlinedIcon} title="공유" color="gray"/>
				<InputOption Icon={SendOutlinedIcon} title="보내기" color="gray"/>
			</div>
		</div>
    )
}

export default Comment
