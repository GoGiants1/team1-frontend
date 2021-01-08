import React,{useEffect,useState} from 'react'
import "./Sidebar.css"
import {Avatar} from "@material-ui/core"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';
function Sidebar({history}) {
    const user = useSelector(selectUser);

    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const bottomItem = (topic) =>(
        <div className="sidebar_bottomItem">
            <p>{topic}</p>
        </div>
    )
        
    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80" alt=""/>
                <Avatar className="sidebar_avatar"  src={user.image}/>
                <h2>{ korean.test(user.lastName) ?   user.lastName + user.firstName: user.firstName +' '+ user.lastName}</h2>
                <h4>{        user.company.length === 0 
                            ?   (user.school.length === 0  
                                ?   (user.region) 
                                :   (user.school[user.school.length - 1].schoolName) ) 
                            :   (user.company[ user.company.length - 1].companyName)
                }</h4>
            </div>

            <div className="sidebar_texts">
                <div className="sidebar_text2">
                    <div>
                        <p>1촌(명)</p>
                        <p className="sidebar_textDescription">인맥 키우기</p>
                    </div>
                    <div><PersonAddIcon/></div>
                </div>
                <div className="sidebar_text">
                    <div>
                        <p>프리미엄 전용 기능</p>
                        <CardGiftcardIcon className="sidebar_text_icon" style={{color : 'orange'}}/>
                        <span className="sidebar_textDescription">프리미엄 1개월 무료이용</span>
                    </div>
                </div>

                <div className="sidebar_text">
                    <BookmarkIcon className="sidebar_text_icon"/>
                    <span className="sidebar_textDescription">내 항목</span>
                </div>
            </div>
            
            <div className="sidebar_bottom">
                {bottomItem('그룹')}
                {bottomItem('이벤트')}
                {bottomItem('팔로우한 해시태그')}
            </div>
        </div>
    )
}

export default Sidebar
