import React, { useEffect } from 'react';
import apis from '../Apis'
import storage from '../lib/storage'
import { useDispatch } from 'react-redux';
import {login} from '../feature/userSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../feature/userSlice';
import {useHistory} from 'react-router-dom'

export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        console.log('prop',props)
        const dispatch = useDispatch();
        const user = useSelector(selectUser)
        const his = useHistory()
        useEffect(() => {
            const loggedInfo = storage.get('token')
            if(!loggedInfo){
                if(option){
                    his.push('/login')
                }
            }else{
                if(!user){
                    apis.token.update(loggedInfo).then( res=> {
                        console.log('getMyprofile', res)
                        if(!res.data.profile_created){
                            storage.remove('token')
                        }
                        else {
                            dispatch(login(res.data))
                            his.push('/posts')
                        }
                    })
                }
            }
        }, [dispatch, props.history])
        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}