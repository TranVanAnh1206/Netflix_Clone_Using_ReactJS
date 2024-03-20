import React, { useRef, useState } from 'react';

import './SignInScreen.css';
import RegisterLayout from '../../Conponents/Layouts/Register/Register';
import { signInWithEmail, registerWithEmail, SignInWithGoogle, signInWithFacebook } from '../../firebase';
import { InputEle } from '../../Conponents/DefaultComponents/Input';

function SignInScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [checked, setChecked] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

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

    // xử lý khi chưa có tài khoản và muốn đăng ký tài khoản
    const Register = (e) => {
        // e.preventDefault();
        setIsRegister(true);
    };

    // Xử lý khi đã có tài khoản và muốn đăng nhập
    const SignInlink = () => {
        setIsRegister(false);
    };

    // xử lý đăng nhập tài khoản
    const SignIn = (e) => {
        e.preventDefault();

        // ktra đăng nhập với email
        if (emailRef.current.value === null || passwordRef.current.value === null) {
            alert('email hoặc mật khẩu không được bỏ trống.');
        } else {
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
        }
    };

    const HandleSignInWithGoogle = () => {
        SignInWithGoogle();
    };

    const HandleSignInWithFacebook = () => {
        signInWithFacebook();
    };

    const HandleSignInWithTwitter = () => {
        alert(
            'Muốn đăng nhập phải liên kết tài khoản twitter for devvelopers,\nmà nó bảo phải đóng tiền 1000$ lận, chịu chết, nghèo !\nÀ không, basic la 100$ còn pro là 5000$, quãi đạn thiệt !:((  ',
        );
    };

    return (
        <form className="signInScreen">
            {isRegister ? (
                <>
                    <RegisterLayout />
                </>
            ) : (
                <>
                    <h1 className="signInForm__title">Sign In</h1>

                    {/* Nhập email or số điện thoại */}
                    <div className="signIn-box left">
                        <input
                            required
                            ref={emailRef}
                            id="singin__email--input"
                            name="emailOrTel"
                            type="email || tel"
                            title="Nhập vào email or số điện thoại."
                            pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                            placeholder="email and phone number"
                        ></input>
                        {/* <label className="signIn__label" htmlFor="singin__email--input">
                                <span className="input-content">Enter your email.</span>
                            </label> */}
                    </div>

                    {/* Nhập password */}
                    <div className="signIn-box right">
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
                        <input
                            checked={checked}
                            onChange={handleShow}
                            id="showPassword"
                            name="showPassword"
                            type="checkbox"
                        />
                        <label htmlFor="showPassword" onClick={() => HandleChecked}>
                            Show password
                        </label>
                    </div>
                    <button onClick={SignIn} className="singIn__btn netflix__btn">
                        Sign In
                    </button>
                    <span className="forgot-pasword">Bạn quên mật khẩu ?</span>
                </>
            )}
            {isRegister ? (
                <h3 className="register-wrap signup-wrap">
                    <span className="gray">Đã có tài khoản ?</span>
                    <span onClick={SignInlink} className="link">
                        đăng nhập
                    </span>
                </h3>
            ) : (
                <h3 className="signup-wrap">
                    <span className="gray">Chưa có tài khoản ?</span>
                    <span onClick={Register} className="link">
                        Đăng ký ngay
                    </span>
                </h3>
            )}

            {/* Phương pháp đăn nhập khác */}
            <div className="signIn-other-wrap">
                <p>Hoặc đăng nhập bằng</p>
                <div className="wrap">
                    <div className="signIn-with-gg" onClick={() => HandleSignInWithGoogle()}>
                        <svg
                            width="2em"
                            data-e2e=""
                            height="2em"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
                                fill="#4285F4"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
                                fill="#34A853"
                            ></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
                                fill="#FBBC04"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clip-rule="evenodd"
                                d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
                                fill="#EA4335"
                            ></path>
                        </svg>
                    </div>
                    <div className="signIn-with-fb" onClick={() => HandleSignInWithFacebook()}>
                        <svg
                            width="2em"
                            data-e2e=""
                            height="2em"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                                fill="white"
                            ></path>
                            <path
                                d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
                                fill="#0075FA"
                            ></path>
                        </svg>
                    </div>
                    <div className="signIn-with-twitter" onClick={() => HandleSignInWithTwitter()}>
                        <svg
                            width="2em"
                            data-e2e=""
                            height="2em"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M43.8044 6.79902C42.5841 7.62363 39.7822 8.82191 38.4004 8.82191V8.82437C36.8226 7.08554 34.6013 6 32.1377 6C27.353 6 23.4731 10.093 23.4731 15.1387C23.4731 15.8398 23.5501 16.5236 23.6925 17.1793H23.6911C17.2007 16.9996 10.1022 13.5678 5.82893 7.69403C3.2016 12.4916 5.4752 17.8272 8.45673 19.7713C7.43613 19.8526 5.55733 19.6473 4.673 18.737C4.61373 21.9212 6.06507 26.1403 11.3571 27.6709C10.3379 28.2494 8.53373 28.0834 7.74926 27.9604C8.0246 30.6484 11.5927 34.1625 15.4945 34.1625C14.1039 35.8594 8.8716 38.9374 3 37.9582C6.98767 40.5177 11.6352 42 16.5543 42C30.5333 42 41.3894 30.0482 40.8051 15.3041C40.8028 15.2879 40.8028 15.2716 40.8014 15.2539C40.8028 15.216 40.8051 15.1781 40.8051 15.1387C40.8051 15.0929 40.8014 15.0496 40.8 15.0053C42.0726 14.0871 43.7801 12.463 45 10.3254C44.2925 10.7365 42.1701 11.5596 40.1952 11.7639C41.4627 11.0422 43.3405 8.67865 43.8044 6.79902Z"
                                fill="#1DA1F2"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignInScreen;
