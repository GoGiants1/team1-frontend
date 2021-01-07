import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home' ;
import WorkIcon from '@material-ui/icons/Work';
import SmsIcon from '@material-ui/icons/Sms';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HeaderOption from './HeaderOption'
import Button from '@material-ui/core/Button';

function Header() {
    return (
        <div className='header'>
            <div className="header_left">
                <img 
                    src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" 
                    alt= ""
                />
                
                <div className="header_search">
                    {/* Search icon */}
                    <SearchIcon />
                    <input placeholder='검색' type="text"/>

                </div>
            </div>

            <div className="header_right">
                <HeaderOption Icon={HomeIcon} title='홈' />
                <HeaderOption Icon={PeopleIcon} title='인맥' />
                <HeaderOption Icon={WorkIcon} title='채용공고' />
                <HeaderOption Icon={SmsIcon} title='메시지' />
                <HeaderOption Icon={NotificationsIcon} title='알림' />
                <HeaderOption avatar={''} isProfile={true} title={'나'}/>
                <Button variant="contained" color="primary">
                    로그아웃
                </Button>
            </div>
        </div>
    )
}

export default Header
