import React, { useRef, useState } from 'react';
import './SignInScreen.css';
import { auth } from '../../firebase';

function SignInScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [checked, setChecked] = useState(false);

    const handleShow = () => {
        setChecked(!checked);
    };

    // Xử lý sự kiện khi nhấn vào show pass box thì input sex checked
    const HandleCkecked = () => {
        const check_showpass = document.querySelector('.showPassword');
        check_showpass.setAttribute('checked', true);
    };

    const inputType = checked ? 'text' : 'password';

    const Register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const SignIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <form className="signInScreen">
            <h1 className="signInForm__title">Sign In</h1>

            {/* Nhập email or số điện thoại */}
            <div className="signIn-box">
                <input ref={emailRef} id="singin__email--input" type="email || phone" placeholder="email"></input>
                {/* <label className="signIn__label" htmlFor="singin__email--input">
                    <span className="input-content">Enter your email.</span>
                </label> */}
            </div>

            {/* Nhập password */}
            <div className="signIn-box">
                <input ref={passwordRef} id="singin__password--input" type={inputType} placeholder="password"></input>
                {/* <label className="signIn__label" htmlFor="singin__password--input">
                    <span className="input-content">Enter your password.</span>
                </label> */}
            </div>

            {/* Show password */}
            <div className="showPass__box">
                <input checked={checked} onChange={handleShow} id="showPassword" name="showPassword" type="checkbox" />
                <label htmlFor="showPassword" onClick={() => HandleCkecked}>
                    Show password
                </label>
            </div>
            <button onClick={SignIn} className="singIn__btn netflix__btn">
                Sign In
            </button>

            <h3>
                <span className="gray">Need to Netflix ?</span>
                <span onClick={Register} className="link">
                    Sign up now.
                </span>
            </h3>
        </form>
    );
}

export default SignInScreen;
