import React from 'react';
import './AccountScreen.css';
import { useNavigate } from 'react-router-dom';

function AccountScreen() {
    const history = useNavigate();

    return (
        <div className="accountScreen">
            <header className="nav nav__black">
                <div className="nav__contents">
                    <img
                        onClick={() => history('/')}
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Logo ứng dụng"
                        className="nav__logo"
                    ></img>
                </div>
            </header>

            <section className="account-container">
                <div className="account-title border-bottom">
                    <h1>Tài Khoản</h1>
                    <div className="account-section-member-ince">
                        <div className="account-section-member-ince--svg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="26px"
                                height="26px"
                                viewBox="0 0 26 26"
                                version="1.1"
                            >
                                <title>Artboard</title>
                                <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Icons/26/clips-Copy">
                                        <rect
                                            id="BG"
                                            fill-opacity="0"
                                            fill="#FFFFFF"
                                            x="0"
                                            y="0"
                                            width="26"
                                            height="26"
                                        />
                                        <path
                                            d="M10.9950284,8 L19.9950284,8 C21.6518827,8 22.9950284,9.34314575 22.9950284,11 L22.9950284,20 C22.9950284,21.6568542 21.6518827,23 19.9950284,23 L10.9950284,23 C9.33817416,23 7.99502841,21.6568542 7.99502841,20 L7.99502841,11 C7.99502841,9.34314575 9.33817416,8 10.9950284,8 Z M10.9950284,10 C10.4427437,10 9.99502841,10.4477153 9.99502841,11 L9.99502841,20 C9.99502841,20.5522847 10.4427437,21 10.9950284,21 L19.9950284,21 C20.5473132,21 20.9950284,20.5522847 20.9950284,20 L20.9950284,11 C20.9950284,10.4477153 20.5473132,10 19.9950284,10 L10.9950284,10 Z M7,16.1734889 L7,18.2207207 C5.72419537,18.0650278 4.64490555,17.094575 4.41012995,15.7630965 L3.02094453,7.88463444 C2.73323481,6.25295153 3.82274035,4.69697637 5.45442326,4.40926665 L13.3279892,3.02094453 C14.9596721,2.73323481 16.5156473,3.82274035 16.803357,5.45442326 L17.0758839,7 L15.0450307,7 L14.8337415,5.80171961 C14.7378383,5.25782531 14.2191799,4.8946568 13.6752856,4.99056004 L5.80171961,6.37888215 C5.25782531,6.47478539 4.8946568,6.99344378 4.99056004,7.53733808 L6.37974546,15.4158001 C6.44252168,15.7718218 6.6864372,16.0504072 7,16.1734889 L7,16.1734889 Z M18.1,15.5 L14.1,17.9 L14.1,13.1 L18.1,15.5 Z"
                                            id="Shape"
                                            fill="#E50913"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <p>Thành viên từ 10/05/2023</p>
                    </div>
                </div>

                <div className="ele-wrapper border-bottom">
                    <div>
                        <h3>Tư cách thành viên và tính phí</h3>
                        <button className="cancel-member-btn">Hủy tư cách thành viên</button>
                    </div>

                    <div className="ele-section">
                        <div className="ele-section-group">
                            <div className="ele-section-group-item">
                                <h4>anh038953@gmail.com</h4>
                                <span className="maintenance-info">Thay đổi email</span>
                            </div>
                            <div className="ele-section-group-item">
                                <h4 className="acc-password">
                                    Mật khẩu: <span>**********</span>
                                </h4>
                                <span className="maintenance-info">Thay đổi mật khẩu</span>
                            </div>
                            <div className="ele-section-group-item">
                                <h4></h4>
                                <span className="maintenance-info">Thêm số điện thoại</span>
                            </div>
                        </div>
                        <h4 className="acc-payment-info">Không có thông tin thanh toán</h4>
                    </div>
                </div>

                <div className="ele-wrapper border-bottom">
                    <h3>Thông tin gói dịch vụ</h3>
                    <div className="ele-section-group-item">
                        <h4>Miễn phí</h4>
                        <button className="package-update-btn">Nâng cấp</button>
                    </div>
                </div>

                <div className="ele-wrapper border-bottom">
                    <h3>Bảo mật và quyền riêng tư</h3>
                    <div className="ele-section-group-item">
                        <h4 style={{ width: '300px' }}>
                            Kiểm soát các quyền truy cập tài khoản này, xem các thiết bị hoạt động gân đây nhất và hơn
                            thế nữa.
                        </h4>
                        <div className="acc-security">
                            <span className="maintenance-info">Quản lý quyền truy cập và thiết bị</span>
                            <span className="maintenance-info">Đăng xuất khỏi tất cả các thiết bị</span>
                            <span className="maintenance-info">Tải xuống thông tin cá nhân của bạn</span>
                        </div>
                    </div>
                </div>

                <div className="ele-wrapper border-bottom">
                    <h3>Cài đặt</h3>
                    <div className="ele-section-group-item">
                        <div>
                            <span className="maintenance-info">Tham gia thử nghiệm</span>
                            <span className="maintenance-info">Quản lý thiết bị tải xuống</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="acc-footer">
                <p className="contact-us">Bạn có câu hỏi? Liên hệ với chúng tôi.</p>
                <div className="footer-contents">
                    <div>
                        <p>Âm thanh và phụ đề.</p>
                        <p>Trung tâm da phương tện.</p>
                        <p>Tuyên bố về quyền riêng tư.</p>
                    </div>

                    <div>
                        <p>Trung tâm trợ giúp.</p>
                        <p>Việc làm.</p>
                    </div>

                    <div>
                        <p>Thẻ quà tặng.</p>
                        <p>Tùy chọn cookie.</p>
                    </div>

                    <div>
                        <p>Quan hệ với nhà đầu tư.</p>
                        <p>Diều khoản sử dụng.</p>
                    </div>
                </div>

                <button>Mã dịch vụ</button>
            </footer>
        </div>
    );
}

export default AccountScreen;
