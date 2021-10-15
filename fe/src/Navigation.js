import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { checkLogin } from './axios';
import Home from './Home';
import LoginScreen from './LoginScreen';
import Main from './Main';
import PostScreen from './PostScreen';
import SignupScreen from './SignupScreen';
export default function Navigation() {
    const [check, setCheck] = useState(false)

    useEffect(() => {
        checkLogin().then(res => {
            setCheck(res.data)
        }).catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Router>
                <Switch>
                    
                    {!check ? (<>
                    <Switch>
                        <LoginScreen exact path='/' />
                        <SignupScreen exact path="/signup" /></Switch></>) :
                        (<><Route exact path='/' component={Main} />
                            <Route exact path='/post' component={PostScreen} />
                        </>)
                    }

                </Switch>
            </Router>
        </div>
    )
}
