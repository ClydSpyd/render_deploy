import React from 'react'
import logo from './assets/logo_webpack.svg'
import axios from 'axios'
import './styles/main.scss'
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './Redux/Reducers/authReducer';


const Home = () =>{

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth) 

    const testFetch = async (route) => {
        const { data: res } = await axios.get(`/api/test/${route}`);
        console.log(res);

        if(route == 'get_token'){
            dispatch(login(res))
        } else if ( route === 'logout'){
            dispatch(logout());
        }
    }   

    const testCreate = async () => {

        try {
            const { data: res } = await axios.post(`/api/user`, { userName: "DAVE", password: "helloWorld" });
            console.log(res)
            dispatch(login(res))

        } catch (error) {
            console.error(error.response.data);
            // const errors = error.response.data.errors;
            // errors.forEach(i=>console.log(i))
        }
    }

    const testLogin = async () => {
        const res = await axios.post(`/api/auth/login`, { userName: "DAVE", password: "helloWorld" });
        console.log(res);
        dispatch(login(res.data))
    }


    return(
        <div className="appWrapper">
            <img className='logo spinBlock' src={logo} alt="" />
            <div style={{position:"relative", zIndex:"500"}} className="buttons">
               {!isLoggedIn && <button onClick={()=>testLogin('get_token')}>LOGIN</button>}
                <button onClick={testCreate}>CREATE</button>
                <button onClick={()=>testFetch('protected')}>PROTECTED</button>
                <button onClick={()=>testFetch('unprotected')}>UNPROTECTED</button>
               {isLoggedIn && <button onClick={()=>testFetch('logout')}>LOGOUT</button>}
            </div>
        </div>
    )
    
}

export default Home;