import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { NavLink, useNavigate } from 'react-router-dom'

function Nav() {
    const history = useNavigate() // thay cho useHistory()
    const [show, handleShow] = useState(true)

    const transitionNav = () => {
        if (window.scrollY < 200)
            handleShow(false)
        else
            handleShow(true)
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNav)
        return () => window.removeEventListener('scroll', transitionNav)
    }, [])

    const handleClick = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className={`nav ${show ? "nav__black" : "nav__black--gradien"}`}>
            <div className='nav__contents'>
                <div className='nav-box'>
                    <img
                        onClick={() => history('/')}
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix-logo-red-black-png"
                        className='nav__logo'
                    />

                    <ul className='nav__list'>
                        <li className='nav__list--item'>
                            <NavLink onClick={handleClick} exact to='/' active>Trang chủ</NavLink>
                        </li>

                        <li className='nav__list--item'>
                            <NavLink onClick={handleClick} to='/TVShow'>Phim truyền hình</NavLink>
                        </li>

                        <li className='nav__list--item'>
                            <NavLink onClick={handleClick} to='/Anime'>Phim hoạt hình</NavLink>
                        </li>

                        <li className='nav__list--item'>
                            <NavLink onClick={handleClick} to='/MyList'>Danh sách của tôi</NavLink>
                        </li>

                        <li className='nav__list--item'>
                            <NavLink onClick={handleClick} to='/SearchByName'>Tìm kiếm theo tên</NavLink>
                        </li>
                    </ul>

                </div>

                <ul className='nav__user--box'>
                    <li className='search'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </li>
                    <li className='for__kid'>Trẻ em</li>
                    <li className='notification'>
                        <div className='notify__icon'>
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className='notificaion__list'>
                            <h3 className='notify__list--title'>Thông báo</h3>
                            <div className='notificaion__list--body'>
                                <h3>Hiện chưa có thông báo nào</h3>
                            </div>
                        </div>
                    </li>
                    <li>
                        <img
                            onClick={() => { history('/profile') }}
                            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                            alt='Netflix User Avatar'
                            className='nav__avatar'
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav