import Header from '../../Components/Header/Header'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import './Posts.css'
import Widget from '../../Components/Widget/Widget'


const PostsPage = ({history}) => {
	return (
	<div className="app">
    	<Header/>
		<div className="app_body">
        	<Sidebar />
        	<Feed />
			<Widget/>
        </div>

      
      
    </div>
	)
}

export default PostsPage