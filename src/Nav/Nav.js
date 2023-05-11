import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Nav.css';
import './Responsive.css';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

function Nav() {
    const history = useNavigate(); // thay cho useHistory() ở phiên bản v5
    const [show, handleShow] = useState(true);
    const user = useSelector(selectUser);

    const transitionNav = () => {
        if (window.scrollY < 200) handleShow(false);
        else handleShow(true);
    };

    useEffect(() => {
        window.addEventListener('scroll', transitionNav);
        return () => window.removeEventListener('scroll', transitionNav);
    }, []);

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <nav className={`nav ${show ? 'nav__black' : 'nav__black--gradien'}`}>
            <div className="nav__contents">
                <div className="nav-box">
                    <img
                        onClick={() => history('/')}
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix-logo-red-black-png"
                        className="nav__logo"
                    />

                    <ul className="nav__list">
                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} exact="true" to="/" active="true">
                                Trang chủ
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/TVShow">
                                Phim truyền hình
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/Anime">
                                Phim hoạt hình
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/MyList">
                                Danh sách của tôi
                            </NavLink>
                        </li>

                        <li className="nav__list--item">
                            <NavLink className="navlink" onClick={handleClick} to="/SearchByName">
                                Tìm kiếm theo tên
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <ul className="nav__user--box">
                    {/* Search */}
                    <li className="search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </li>

                    {/* Trẻ em */}
                    <li className="for__kid">Trẻ em</li>

                    {/* Notification */}
                    <li className="notification">
                        <div className="notify__icon">
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="notificaion__list">
                            <h3 className="notify__list--title">Thông báo</h3>
                            <ul className="notificaion__list--body">
                                {/* <h3>Hiện chưa có thông báo nào</h3> */}
                                <li className="notif__item">
                                    <img
                                        className="notif__item--img"
                                        src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
                                        alt="Hình ảnh thông báo bộ phim sắp chiếu"
                                    />
                                    <div className="notif__item--text">
                                        <h3>Ra mắt vào mùng 4 tháng 5</h3>
                                        <h3>Phát trailer</h3>
                                        <p>Hôm nay</p>
                                    </div>
                                </li>

                                <li className="notif__item">
                                    <img
                                        className="notif__item--img"
                                        src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
                                        alt="Hình ảnh thông báo bộ phim sắp chiếu"
                                    />
                                    <div className="notif__item--text">
                                        <h3>Ra mắt vào mùng 4 tháng 5</h3>
                                        <h3>Phát trailer</h3>
                                        <p>Hôm nay</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* User */}
                    <li>
                        <div className="account-menu-item">
                            <div className="account-dropdown">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                                    alt="Netflix User Avatar"
                                    className="nav__avatar"
                                />

                                <span>
                                    <i className="rotate-icon fa-solid fa-caret-down"></i>
                                </span>
                            </div>

                            <ul className="subnav-account-menu">
                                <li
                                    className="menu-item li-hover"
                                    onClick={() => alert('This feature is in development ...')}
                                >
                                    <span>
                                        <i className="fa-solid fa-pen"></i>
                                    </span>
                                    Quản lý hồ sơ
                                </li>
                                <li className="menu-item">
                                    <span>
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <NavLink className="li-hover" to="/your-Account">
                                        Tài khoản
                                    </NavLink>
                                </li>
                                <li className="menu-item" onClick={() => alert('This feature is in development ...')}>
                                    <span>
                                        <i className="fa-solid fa-circle-question"></i>
                                    </span>
                                    Trung tâm trợ giúp
                                </li>
                                <li className="logout-netflix li-hover" onClick={() => auth.signOut()}>
                                    Đăng xuất khỏi netflix
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
