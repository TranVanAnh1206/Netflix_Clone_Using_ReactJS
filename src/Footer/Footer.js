import React from 'react'
import "./Footer.css"

function Footer() {

    return (
        <footer className='footer__contents'>
            <div className='social__box'>
                <span className='fb'>
                    <i className="fa-brands fa-facebook-f"></i>
                </span>
                
                <span className='ins'>
                    <i className="fa-brands fa-instagram"></i>
                </span>
                
                <span className='tw'>
                    <i className="fa-brands fa-twitter"></i>
                </span>
                
                <span className='yt'>
                    <i className="fa-brands fa-youtube"></i>
                </span>
            </div>

            <div className='footer__box'>
                <div className='footer__info'>
                    <p>Mô tả âm thanh</p>
                    <p>Quan hệ với nhà đầu tư</p>
                    <p>Thông báo pháp lý</p>
                </div>
                <div className='footer__help'>
                    <p>Trung tâm trợ giúp</p>
                    <p>Việc làm</p>
                    <p>Tuỳ chọn cookie</p>
                </div>
                <div className='footer__rules'>
                    <p>Thẻ quà tặng</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Thông ton doanh nghiệp</p>
                </div>
                <div className='footer__contact'>
                    <p>Trung tâm đa thư viện</p>
                    <p>Quyền riêng tư</p>
                    <p>Liên hệ với chúng tôi</p>
                </div>
            </div>

            <p className='footer__service-code'>Mã dịch vụ</p>
            <p className='footer__year-released'>© 1997-2023 Netflix, Inc</p>
        </footer>
    )
}

export default Footer