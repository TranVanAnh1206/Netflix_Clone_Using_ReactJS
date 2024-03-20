import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './Nav.css';
import './HeaderResponsive.css';
// import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';

import HiepSiAoDen from '../Conponents/assets/images/AAAABbSWX6RZDOm2i6smz83YHZJsmUsbiXx_xk_wmDV09JRpzXGC1QeOSwilr_JCCe2gi2a6SfOzysLdjExZbyVCmky-y5cMHetvceR2-lUvtMotPIAAFbCmrskTzetkdQDa1704HKh8_ZCnZD8.jpg';
import SieuLuaGapSieuLay from '../Conponents/assets/images/AAAABfZDTHvK75bB-gFcQGEJqChg5hzRx3KqxFCVld_yDc9eT4GC70EFef_zYcGbf0TSMTvbWFqSTksi9lalf97s-QhTFZedFg_qzERt8oH3erYUfj3HWXLDZYm4j89vBxgvs2eofaF0RF6Ite4.jpg';
import Ragnarok from '../Conponents/assets/images/AAAABWdN0s424ZZmZnhcGJM2E-mByFsbdm8FEDD0-auf9oPThi62zz-T1r0uBqXd_J6VGCLSQ8pmhPU0sOlhVQL3V1h0dEpTIvg.jpg';
import KamenRiderSaber from '../Conponents/assets/images/AAAABYatL0Rmo_C8cb8h79_FLOYFYhOIFhduUeOQXnCn2jXeirYhWAITx53B7fa5lPqaPK7V19cZAbp8-T5pJVgJbzAJqA_Id9DC4KPZ5vgoRLaCrNBirZ4tDS_7sOT0pIFMfnWVPBLI0I5xyGI.jpg';
import NetflixComingSoon from '../Conponents/assets/images/csInapp_112x63.png';

const notifycation = [
    {
        title: 'Nội dung mới',
        content: 'Hiệp sĩ áo đen',
        time: '29/05/2023',
        img: HiepSiAoDen,
    },
    {
        title: 'Tiếp tục xem',
        content: 'Ragnarok Hoàng hôn của chư thần',
        time: '28/05/2023',
        img: Ragnarok,
    },
    {
        title: 'Tiếp tục xem',
        content: 'Hiệp sĩ mặt nạ: Thánh kiếm',
        time: '25/05/2023',
        img: KamenRiderSaber,
    },
    {
        title: 'Nội dung mới',
        content: 'Siêu lừa gặp siêu lầy',
        time: '29/05/2023',
        img: SieuLuaGapSieuLay,
    },
    {
        title: 'Netflix sắp ra mắt',
        content: 'Khám phá các nội dung sắp ra mắt',
        time: '29/05/2023',
        img: NetflixComingSoon,
    },
];

function Nav() {
    const history = useNavigate(); // thay cho useHistory() ở phiên bản v5
    const [show, handleShow] = useState(true);
    // const user = useSelector(selectUser);

    const search_Ref = useRef();
    const search_box_Ref = useRef();
    const search_input_Ref = useRef();
    const search_tab_Ref = useRef();

    const transitionNav = () => {
        if (window.scrollY < 200) handleShow(false);
        else handleShow(true);
    };

    /**
     * xử lý cho windown lắng nghe sự kiện scroll
     * hàm clearn up func giúp loại bỏ sự kiện khi k còn sử dụng
     * ngăn rò rỉ bộ nhớ và tránh các lỗi trong đó trình xử lý
     * sự kiện vẫn hoạt động ngay cả khi thành phần không còn trong DOM.
     *
     * Tham số thứ hai cho useEffect, là một mảng trống,
     * chỉ định rằng hiệu ứng chỉ được chạy một lần (khi gắn kết)
     * và không được chạy lại trong các lần kết xuất lại tiếp theo.
     */
    useEffect(() => {
        window.addEventListener('scroll', transitionNav);

        return () => window.removeEventListener('scroll', transitionNav);
    }, []);

    // xử lý khi chuyển tab thì sẽ cuộn lên trang đầu
    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    // Xủa lý sự kiện ẩn hiện thanh tìm kiếm
    const HandleSearch = () => {
        search_tab_Ref.current.classList.add('search-tab-hide');

        search_box_Ref.current.classList.add('show-search-box');

        search_input_Ref.current.classList.add('action');
        search_input_Ref.current.focus();
    };

    // xủa lý sự kiện khi click ra ngoài vùng search thì sẽ loại bỏ classes action
    const HandleClickOutSide = (e) => {
        e.stopPropagation();
        if (search_Ref.current && !search_Ref.current.contains(e.target)) {
            search_tab_Ref.current.classList.remove('search-tab-hide');

            search_box_Ref.current.classList.remove('show-search-box');

            search_input_Ref.current.classList.remove('action');
            search_input_Ref.current.value = '';
        }
    };

    useEffect(() => {
        document.addEventListener('click', HandleClickOutSide);

        return () => document.removeEventListener('click', HandleClickOutSide);
    }, []);

    return (
        <header className={`header ${show ? 'nav__black' : 'nav__black--gradien'}`}>
            <div className="nav__contents">
                <div className="nav-box">
                    {/* <div className="navbar-icon-wrap">
                        <i className="fa-solid fa-bars"></i>
                    </div> */}
                    <img
                        onClick={() => history('/')}
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix-logo-red-black-png"
                        className="nav__logo"
                    />

                    <div className="navbar-wrapper">
                        <div className="menu-trigger">
                            <span>Duyệt Tìm</span>
                            <span className="icon-wrapper">
                                <i className="rotate-icon fa-solid fa-caret-down"></i>
                            </span>
                        </div>

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
                                    Danh sách xem sau
                                </NavLink>
                            </li>

                            <li className="nav__list--item">
                                <NavLink className="navlink" onClick={handleClick} to="/SearchByName">
                                    Tìm kiếm theo tên
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <ul className="nav__user--box">
                    {/* Search */}
                    <li ref={search_Ref} className="search">
                        <div ref={search_box_Ref} className="search-box">
                            <button>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <div className="search-input-wrap">
                                <input
                                    ref={search_input_Ref}
                                    className="search-input"
                                    htmlFor="text"
                                    placeholder="Phim, diễn viên, thể loại ..."
                                />
                            </div>
                        </div>
                        <button ref={search_tab_Ref} className="search-tab" onClick={() => HandleSearch()}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </li>

                    {/* Trẻ em */}
                    <li className="for__kid">Trẻ em</li>

                    {/* Notification */}
                    <li className="notification">
                        <div className="notify__icon">
                            <i className="fa-solid fa-bell"></i>
                            <span className="notif-number">2</span>
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
        </header>
    );
}

export default Nav;
