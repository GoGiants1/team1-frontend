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
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/userSlice';



// Todo: 
// 3. 오른쪽 widget (Page/Posts.js에 구현 필요.)
// 새로고침 기능

function Feed() {
    const [input, setInput] = useState('');
    const [fetching, setFetching] = useState(false);
    const [posts, setPosts] = useState([]);
    const [pageNumber,setPageNumber] = useState(1);
    const [nextLink, setNextLink] = useState(null);
    const [nextPostId, setNextPostId] = useState(-1);
    const [count, setCount] = useState();
    const history = useHistory();
	const dispatch = useDispatch();
    const user = useSelector(selectUser);
    

    useEffect(() =>{
        apis.posts.getAllLatest(pageNumber).then((res) =>{
            setPosts(
                prev => [...prev, ...res.data.results.filter((post) => (post.id < nextPostId || nextPostId === -1 ))]
            )
            setNextPostId(res.data.results[res.data.results.length - 1].id)
            setNextLink(res.data.next)
            setCount(res.data.count)
            console.log(res);
            console.log(res.data);
            console.log(res.data.next);    
        })       
        setFetching(false)
        console.log('NextPostId',nextPostId)
        console.log(posts)
    },[pageNumber])


    const sendPost= (e) => {
        e.preventDefault();
        
        const newPost = {
            content: input,
            userId: user.id,
            userFirstName: user.firstName,
            userLastName: user.lastName,
        }
        // 글 올린 다음 새로운 글 추가 (맨 마지막 페이지일 경우에만.)
        apis.posts.post(newPost).then(res=> {
                setPosts(prev => [ res.data ,...prev]) // 최신순으로 정렬된 경우 수정 필요 
                setCount(prev => prev + 1)
            
        })    
        setInput("")
    }



    const handleScroll = () => {
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight - 1 && fetching === false && nextLink ) {
            setFetching(true)
            setPageNumber(prev => prev +1 )
        }
    };
  
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
  
    const refresh =() =>{
        setPosts([])
        setPageNumber(1)
        setNextLink(null)
        setNextPostId(-1)
    }
    return (
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon/>
                    <form onSubmit={sendPost}>
                        <input value={input} onChange={e=> setInput(e.target.value)} type="text" placeholder="글 올리기"/>
                        {/* <button type="submit">작성</button> */}
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title='사진' color='#70B5F9'/>
                    <InputOption Icon={SubscriptionIcon} title='동영상' color='#E7A33E'/>
                    <InputOption Icon={EventNoteIcon} title='이벤트' color='#C0CBCD'/>
                    <InputOption Icon={CalendarViewDayIcon} title='글쓰기' color='#f5987e'/>
                </div>
            </div>
                {!nextLink && posts ? <p onClick={refresh}>모든 글을 다 보셨습니다. 눌러서 새로고침</p> : null}
                {posts.map(({id, content, createdAt, updatedAt,modified, userId,userFirstName,userLastName,userSchool,userCompany, image}) =>(
                    <Post
                        key={id}
                        id={id}
                        userId={userId}
                        firstName= {userFirstName} 
                        lastName = {userLastName} 
                        userSchool={userSchool}
                        userCompany={userCompany}
                        updatedAt={updatedAt}
                        modified={modified}
                        message={content}
                        image={image}
                    />
                ))}
                {!nextLink && posts ? <p onClick={refresh}>모든 글을 다 보셨습니다. 눌러서 새로고침</p> : null}
                {fetching ? 'Loading...' : null}
        </div>
    )
}

export default Feed
