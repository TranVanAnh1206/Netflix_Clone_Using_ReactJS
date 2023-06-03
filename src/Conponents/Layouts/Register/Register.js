import React, { useRef, useState } from 'react';
import './Register.css';
import { registerWithEmail } from '../../../firebase';

function Register() {
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();

    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();

    const [confirmedPassword, setConfirmedPassword] = useState();
    const [confirmedPasswordError, setConfirmedPasswordError] = useState();

    const [showPass, setShowPass] = useState(false);
    const [showPassConfirmed, setShowPassConfirmed] = useState(false);

    // xử lý sự kiện submit form
    const HandleRegister = (e) => {
        e.preventDefault();

        registerWithEmail(email, password);
    };

    // Sử lý dự kiện khi người dùng nhập vào email
    const HandleEmailChange = (e) => {
        const { value } = e.target;

        // Phương thức trim() dùng để xóa tất cả những khoảng trắng ở đầu và cuối chuỗi.
        // Giá trị trả về của phương thức trim() sẽ là một chuỗi không có khoảng trắng ở đầu và cuối.
        if (value.trim() === '') {
            setEmailError('Vui lòng nhập email');
            console.log('Vui long nhập email');
        } else if (!IsEmail(value)) {
            setEmailError('Trường này phải là email');
            console.log('Trường này phải là email');
        } else {
            // TODO: ...
            setEmailError(null);
        }

        setEmail(value);
    };

    const IsEmail = (value) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value);
    };

    // Xử lý sự kiện khi người dùng nhập vào mật khẩu
    const HandlePasswordChange = (e) => {
        const { value } = e.target;

        if (value.trim() === '') {
            setPasswordError('Trường này là bắt buộc.');
            console.log('Trường này là bắt buộc.');
        } else if (value.includes(' ')) {
            setPasswordError('Mật khẩu không thể chứa khoảng trắng.');
            console.log('Mật khẩu không thể chứa khoảng trắng.');
        } else if (value.length < 6) {
            setPasswordError('Mật khẩu phải chứa ít nhất 6 ký tự.');
            console.log('Mật khẩu phải chứa ít nhất 6 ký tự.');
        } else {
            setPasswordError(null);
        }

        setPassword(value);
    };

    // Xử lý sự kiện khi người dùng xác nhận mật khẩu
    const HandleConfirmPasswordChange = (e) => {
        const { value } = e.target;

        if (value.trim() === '') {
            setConfirmedPasswordError('Trường này là bắt buộc.');
        }

        if (!IsConfirmed(value, password)) {
            setConfirmedPasswordError('Xác nhận mật khẩu không đúng.');
            console.log('Xác nhận mật khẩu không đúng.');
        }

        if (IsConfirmed(value, password)) {
            setConfirmedPasswordError(null);
        }

        setConfirmedPassword(value);
    };

    const IsConfirmed = (confirmValue, value) => {
        return value === confirmValue ? true : false;
    };

    const HandleShowPass = () => {
        setShowPass(!showPass);
    };

    const HandleShowPassConfirmed = () => {
        setShowPassConfirmed(!showPassConfirmed);
    };

    return (
        <div className="register">
            <h2 className="register-title">Đăng ký</h2>
            <div className="register-contents">
                <div className="register-wrap">
                    <input
                        value={email}
                        onChange={HandleEmailChange}
                        onBlur={HandleEmailChange}
                        className="register-email-input"
                        placeholder="Nhập email của bạn ..."
                        type="email"
                        name="email"
                        title="Nhập email của bạn ..."
                    />
                    <span className="message">{emailError}</span>
                </div>
                <div className="register-wrap">
                    <div className="register-wrap-content">
                        <input
                            value={password}
                            onChange={HandlePasswordChange}
                            onBlur={HandlePasswordChange}
                            className="register-password-input"
                            placeholder="Nhập mật khẩu ..."
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            title="Nhập password ..."
                        />

                        <span onClick={HandleShowPass}>
                            {showPass ? (
                                <i className="icon-eye fa-solid fa-eye"></i>
                            ) : (
                                <i className="icon-eye fa-solid fa-eye-slash"></i>
                            )}
                        </span>
                    </div>
                    <span className="message">{passwordError}</span>
                </div>
                <div className="register-wrap">
                    <div className="register-wrap-content">
                        <input
                            value={confirmedPassword}
                            onChange={HandleConfirmPasswordChange}
                            onBlur={HandleConfirmPasswordChange}
                            className="register-confirm-password-input"
                            placeholder="Xác nhận lại mật khẩu ..."
                            type={showPassConfirmed ? 'text' : 'password'}
                            name="confirm-password"
                            title="Xác nhận mật khẩu ..."
                        />
                        <span onClick={HandleShowPassConfirmed}>
                            {showPassConfirmed ? (
                                <i className="icon-eye fa-solid fa-eye"></i>
                            ) : (
                                <i class="icon-eye fa-solid fa-eye-slash"></i>
                            )}
                        </span>
                    </div>
                    <span className="message">{confirmedPasswordError}</span>
                </div>

                <button onClick={HandleRegister} type="submit" className="netflix__btn register-btn">
                    Đăng ký
                </button>
            </div>
        </div>
    );
}

export default Register;
