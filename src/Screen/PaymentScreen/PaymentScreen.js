import React from 'react';
import './PaymentScreen.css';

// Danh sách các 36 tỉnh thành
const provinces = [
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cần Thơ',
    'Cao Bằng',
    'Đà Nẵng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Nội',
    'Hà Tĩnh',
    'Hải Dương',
    'Hải Phòng',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'TP Hồ Chí Minh',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái',
];

// Logo của google
{
    /* <svg width="1em" data-e2e="" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
        fill="#EA4335"
    ></path>
</svg>; */
}

function PaymentScreen() {
    return (
        <div className="paymentScreen">
            <div className="payment__left">
                <div className="wrapper">
                    <div className="payment_info--title">
                        <span className="comeback" onClick={() => window.history.back()}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </span>
                        <span className="pay__logo">
                            <i className="fa-solid fa-credit-card"></i>
                        </span>
                        <h3>
                            Payment simulator <span>TEST MODE</span>
                        </h3>
                    </div>
                    <div className="payment__package--info">
                        <h3>Subcribe to Premium</h3>
                        <div className="package__price">
                            <h1>VND 299.000</h1>
                            <h3>per month</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="payment__right">
                <form className="form">
                    <div className="gpaybtn__wrapper">
                        <button className="gg__pay--btn" onClick={(e) => e.preventDefault()}>
                            <i className="fa-brands fa-google"></i>
                            Pay
                        </button>
                        <p>Or pay with card</p>
                    </div>

                    <div className="form__box">
                        <label for="email" className="form__lable">
                            Email
                        </label>
                        <div className="input__wrapper">
                            <input
                                type="email"
                                name="email"
                                className="form__input email__input"
                                title="Enter your email ..."
                                placeholder="Enter your email ..."
                            ></input>
                        </div>
                    </div>

                    <div className="form__box">
                        <label for="card_number" className="form__lable">
                            Card infomation
                        </label>
                        <div className="input__wrapper">
                            <input
                                type="text"
                                name="card_number"
                                className="form__input card__info--input"
                                title="Enter your card number ..."
                                placeholder="1234 1234 1234 1234"
                            ></input>
                        </div>
                        <div className="card__info--box">
                            <div className="input__wrapper">
                                <input
                                    type="text"
                                    className="form__input card__date"
                                    name="card_date"
                                    placeholder="MM/YY"
                                ></input>
                            </div>
                            <div className="input__wrapper">
                                <input
                                    type="text"
                                    className="form__input card__cvc"
                                    name="card_cvc"
                                    placeholder="CVC"
                                ></input>
                            </div>
                        </div>
                    </div>

                    <div className="form__box">
                        <label for="name_card" className="form__lable">
                            Name on card
                        </label>
                        <div className="input__wrapper">
                            <input type="text" name="name_card" className="form__input namecard__input"></input>
                        </div>
                    </div>

                    <div className="form__box">
                        <label for="billing_address" className="form__lable">
                            Billing address
                        </label>
                        <div className="input__wrapper">
                            {/* Combo box */}
                            <select name="billing_address" id="billing_address">
                                <option></option>
                                {provinces.map((province) => {
                                    return <option>{province}</option>;
                                })}
                            </select>
                        </div>
                        <div className="input__wrapper">
                            <input
                                type="text"
                                name="billing_address"
                                className="form__input bill__address--input"
                                placeholder="Address"
                            ></input>
                        </div>
                        <span onClick={() => alert('This feature is in development')}>Enter address manualli</span>
                    </div>

                    <button className="subscribe__btn" onClick={(e) => e.preventDefault()}>
                        Subscribe
                    </button>
                    <p>
                        By confirming your subscription, you allow Payment simulator to change your card for this
                        payment and future payment info accordance with their terms
                    </p>
                </form>
            </div>
        </div>
    );
}

export default PaymentScreen;
