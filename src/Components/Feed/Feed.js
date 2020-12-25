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
    const [fetching, setFetching] = useState(false);
    const [posts, setPosts] = useState([]);
    const [pageNumber,setPageNumber] = useState(1);
    const [nextLink, setNextLink] = useState(null);
    const [count, setCount] = useState();
    


    useEffect(() =>{
        setFetching(true)
        apis.posts.getAll(pageNumber).then((res) =>{
            setPosts(prev => [...prev, ...res.data.results]);
            setNextLink(res.data.next)
            setCount(res.data.count)
            console.log(res);
            console.log(res.data);
            console.log(res.data.next);
        })
        setFetching(false)
    },[pageNumber])

//     const fetchPosts = () => {
//         if(nextLink && pageNumber){
//             setFetching(true)
//             setPageNumber(prev => prev +1 )
//             apis.posts.getAll(pageNumber).then((res) =>{
//                 setPosts(prev => [...prev, ...res.data.results]);
//                 setNextLink(res.data.next);
//                 const more = (res.data.next !== null)
//                 console.log(res);
//                 console.log(res.data);
//                 console.log(res.data.next);
//             })
//             setFetching(false)
//         }
// }

    
    // console.log(posts)

    const sendPost= (e) => {
        e.preventDefault();
        
        const newPost = {
            title:"임시 타이틀",
            content: input,
            userId:1,
        }
        // 글 올린 다음 새로운 글 추가 (맨 마지막 페이지일 경우에만.)
        apis.posts.post(newPost).then(res=> {
            if(posts.length === count){
                setPosts(prev => [...prev, res.data])
                setCount(prev => prev + 1)
            }
        })    
        setInput("")
    }



    const handleScroll = () => {
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight - 1 && fetching === false && nextLink ) {
            setPageNumber(prev => prev +1 )
        }
    };
  
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
  

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

                {posts.map(({id,title, content, createdAt, updatedAt,userId,userFirstName,userLastName}) =>(
                    <Post
                        key={id}
                        id={id}
                        name={'익명'} 
                        description={'와플스튜디오'}
                        updatedAt={updatedAt}
                        message={content}
                        photoUrl="https://avatars2.githubusercontent.com/u/69342392?s=460&u=5f00d9ea3cb8d134035a30cf78ca0e9a29f6e522&v=4"
                    />
                ))}
        </div>
    )
}

export default Feed
