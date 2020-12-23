import React from 'react'
import "./Sidebar.css"
import {Avatar} from "@material-ui/core"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import BookmarkIcon from '@material-ui/icons/Bookmark';

function Sidebar() {

    const bottomItem = (topic) =>(
        <div className="sidebar_bottomItem">
            <p>{topic}</p>
        </div>
    )

    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80" alt=""/>
                <Avatar className="sidebar_avatar"  src={"https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4"}/>
                <h2>최형욱</h2>
                <h4>서울대학교 학생</h4>
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
