import React, { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState();
    const [newPassword, setNewPassword] = useState();

    return (
        <form className="forgotPassword">
            <h2>Quên mật mật khẩu</h2>
            <div className="email-wrap">
                <input value={email} type="email" className="email-input" placeholder="Nhập địa chỉ email của bạn" />
            </div>
            <div className="new-password-wrap">
                <input
                    value={newPassword}
                    type="password"
                    className="new-password-input"
                    placeholder="Nhập mật khẩu mới"
                />
            </div>
            <div className="confirm-password-wrap">
                <input type="password" className="confirm-password-input" placeholder="Xác nhận mật khẩu" />
            </div>
            <button className="change-pasword-btn">Thay đổi mật khẩu</button>
        </form>
    );
}

export default ForgotPassword;
