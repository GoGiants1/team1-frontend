import React from 'react';
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";

import InputOption from './InputOption'

function Feed() {
    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon/>
                    <form>
                        <input type="text" placeholder="글 올리기"/>
                        <button type="submit">작성</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title='사진' color='#70B5F9'/>
                    <InputOption Icon={SubscriptionIcon} title='동영상' color='#E7A33E'/>
                    <InputOption Icon={EventNoteIcon} title='이벤트' color='#C0CBCD'/>
                    <InputOption Icon={CalendarViewDayIcon} title='글쓰기' color='#f5987e'/>
                </div>
            </div>

        
        </div>
    )
}

export default Feed
