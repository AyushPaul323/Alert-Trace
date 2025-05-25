import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import "./member.css";
import Admin from './Admin';

const Member = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [tt, setT] = useState(0);
    const Navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleLogin = (username, password) => {
        if (username === "Admin" && password === "@dmin") {
            setSuccess(true);
            Navigate("/admin");
        } else {
            setErrMsg("Wrong Password for this username");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(user, pwd);
    }

    const main = (tab) => {
        setT(tab);
    }

    return (
        <>{(success) ? 
            <div>
                <Admin />
            </div> :
            <div className="bgm" >
            <div className="containerAd" >
                
                <div className="form_containerAd">
                    <section className="Appo2"> 
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className='sig'>Sign In</h1>
                        <form onSubmit={handleSubmit} className='polo'>
                            <label htmlFor="username" style={{color:'white'}}>Username:</label>
                            <input
                                className='kolo'
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
    
                            <label htmlFor="password" style={{color:'white', paddingTop:'2vh'}}>Password:</label>
                            <input
                                className='kolo'
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            
                            <div className='bu'><Button type="submit" colorScheme='red' className='a11'>
                                Sign In</Button></div>
                        </form>
                    </section>
                    </div>
            </div>
            </div>
      }</>);
}

export default Member;
