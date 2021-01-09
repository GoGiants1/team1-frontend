import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import './Posts.css'


const PostsPage = ({history}) => {
	return (
	<div className="app">
    	<Header/>
		<div className="app_body">
        	<Sidebar />
        	<Feed />
        </div>
      
      
    </div>
	)
}

export default PostsPage