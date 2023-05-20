import React, { useRef, useState } from 'react';

import './SignInScreen.css';
import { signInWithEmail, registerWithEmail } from '../../firebase';

function SignInScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [checked, setChecked] = useState(false);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^[0-9]{10,12}$/;

    const handleShow = () => {
        setChecked(!checked);
    };

    // Xử lý sự kiện khi nhấn vào show pass box thì input set checked
    const HandleChecked = () => {
        const check_showpass = document.querySelector('.showPassword');
        check_showpass.setAttribute('checked', true);
    };
    const inputType = checked ? 'text' : 'password';

    // xử lý đăng ký tài khoản
    const Register = (e) => {
        e.preventDefault();
        registerWithEmail(emailRef.current.value, passwordRef.current.value);
    };

    // xử lý đăng nhập tài khoản
    const SignIn = (e) => {
        e.preventDefault();

        // ktra đăng nhập với email
        if (emailRegex.test(emailRef.current.value)) {
            console.log('Dây là email');
            signInWithEmail(emailRef.current.value, passwordRef.current.value)
                .then((authUser) => {
                    // khi đăng nhập sẽ lưu thông tin tài khoản đăng nhập vào locaStorage
                    localStorage.setItem('User', JSON.stringify(authUser));

                    console.log(authUser);
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        alert('User not found. Please try again.');
                    } else if (error.code === 'auth/wrong-password') {
                        alert('Wrong password. Please try again.');
                    }
                });

            return;
        } else if (phoneRegex.test(emailRef.current.value)) {
            // Kiểm tra đăng nhập với SĐT
            console.log('đây là sdt');
            return;
        } else {
            throw new Error();
        }
    };

    return (
        <form className="signInScreen">
            <h1 className="signInForm__title">Sign In</h1>

            {/* Nhập email or số điện thoại */}
            <div className="signIn-box">
                <input
                    required
                    ref={emailRef}
                    id="singin__email--input"
                    name="emailOrTel"
                    type="email || tel"
                    title="Nhập vào email or số điện thoại."
                    pattern="[a-z]{4,8}"
                    placeholder="email and phone number"
                ></input>
                {/* <label className="signIn__label" htmlFor="singin__email--input">
                    <span className="input-content">Enter your email.</span>
                </label> */}
            </div>

            {/* Nhập password */}
            <div className="signIn-box">
                <input
                    required
                    ref={passwordRef}
                    id="singin__password--input"
                    name="password"
                    type={inputType}
                    title="Nhập vào mật khẩu của bạn."
                    placeholder="password"
                ></input>
                {/* <label className="signIn__label" htmlFor="singin__password--input">
                    <span className="input-content">Enter your password.</span>
                </label> */}
            </div>

            {/* Show password */}
            <div className="showPass__box">
                <input checked={checked} onChange={handleShow} id="showPassword" name="showPassword" type="checkbox" />
                <label htmlFor="showPassword" onClick={() => HandleChecked}>
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
