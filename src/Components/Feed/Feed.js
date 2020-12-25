import React, { useState, useEffect } from 'react';
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import apis from "../../Apis"
import InputOption from './InputOption'
import Post from '../Post/Post'


// Todo: 
// 1. 게시글 작성 기능(API 연동)
// 2. 무한 스크롤(pagination)
// 3. 오른쪽 widget (APP.js에 구현 필요.)

function Feed() {
    const [input, setInput] = useState('');
    const [count, setCount] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        apis.posts.getAll().then((res) =>{
            setPosts(res.data.results);
            setCount(res.data.count);
            console.log(res);
            console.log(res.data);
            console.log(res.data.count);

        })
    },[])
    
    console.log(posts)

    const sendPost= (e) => {
        e.preventDefault();
        
        apis.posts.post({
            title:"임시 타이틀",
            content: input,
            userId:1,
            userFirstName:"스트형",
            userLastName:"테",
        })
        
    }


    // const { results: postList, count: PageCount } = posts;

    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon/>
                    <form>
                        <input value={input} onChange={e=> setInput(e.target.value)} type="text" placeholder="글 올리기"/>
                        <button onClick={sendPost} type="submit">작성</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title='사진' color='#70B5F9'/>
                    <InputOption Icon={SubscriptionIcon} title='동영상' color='#E7A33E'/>
                    <InputOption Icon={EventNoteIcon} title='이벤트' color='#C0CBCD'/>
                    <InputOption Icon={CalendarViewDayIcon} title='글쓰기' color='#f5987e'/>
                </div>
            </div>
            {posts.map(({title, content, createdAt, updatedAt,userId,userFirstName,userLastName}) =>(
                <Post 
                    name={'익명'} 
                    description={'와플스튜디오'}
                    updatedAt={updatedAt}
                    message={content}
                    photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4"
                />
            ))}
            {/* <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" />
            <Post name='최형욱' description='서울대학교' message='hi' photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4" /> */}
            
        </div>
    )
}

export default Feed
