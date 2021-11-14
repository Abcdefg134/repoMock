import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,useHistory,
    Link
} from "react-router-dom";
//import { useHistory } from 'react-router';
import { checkLogin, getUserById } from './axios';
import {useDispatch} from 'react-redux'
import {GET_USER} from './actions/types'
import LoginScreen from './LoginScreen';
import Main from './Main';
import SignupScreen from './SignupScreen';
import ChatScreen from './ChatScreen';
export default function Navigation() {
    let history = useHistory()
    const [check, setCheck] = useState(false)
    const [authId, setAuthId] = useState()
    const dispatch = useDispatch()
    const loginSuccess = (value)=>{
        setCheck(value)
    }
    useEffect(() => {
        checkLogin().then(res => {
            console.log(res);
            setCheck(res.data.status)
            setAuthId(res.data._id)
            history.push(`${localStorage.getItem('path')}`)
        }).catch(err => console.log(err))
        if(authId){
            getUserById(authId).then((res)=>{
                console.log(res.data);
                dispatch({type: GET_USER,payload:res.data})
            })
        }
    }, [check,authId])
    useEffect(()=>{
        localStorage.setItem('path' , window.location.pathname)
        //console.log(path);
        if(!authId){
            history.push('/')
        }
    },[])

    return (
        <div>
            <Router>
                <Switch>
                    {check == false ? <SignupScreen exact path='/signup' />:null }
                    {check == false ? (
                            <LoginScreen setCheck={loginSuccess} />) :
                        (<><Route exact path='/' component={Main} />
                            <Route path='/chat-screen' component={ChatScreen} />
                        </>)
                    }
                </Switch>
            </Router>
        </div>
    )
}
