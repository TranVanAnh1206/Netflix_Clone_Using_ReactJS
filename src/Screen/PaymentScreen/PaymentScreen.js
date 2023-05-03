import React from 'react'
import './PaymentScreen.css'

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
  'Yên Bái'
];

function PaymentScreen() {

  return (
    <div className='paymentScreen'>
      <div className='payment__left'>
        <div className='wrapper'>
          <div className='payment_info--title'>
            <span className='comeback'
                  onClick={() => window.history.back()}>
              <i className="fa-solid fa-arrow-left"></i>
            </span>
            <span className='pay__logo'>
              <i className="fa-solid fa-credit-card"></i>
            </span>
            <h3>Payment simulator <span>TEST MODE</span></h3>
          </div>
          <div className='payment__package--info'>
            <h3>Subcribe to Premium</h3>
            <div className='package__price'>
              <h1>VND 299.000</h1>
              <h3>per month</h3>
            </div>
          </div>

        </div>
      </div>

      <div className='payment__right'>
        <form className='form'>
          <div className='gpaybtn__wrapper'>
            <button className='gg__pay--btn' onClick={e => e.preventDefault()}>
              <i className="fa-brands fa-google"></i>
              Pay
            </button>
            <p>Or pay with card</p>
          </div>

          <div className='form__box'>
            <label for='email' className='form__lable' >Email</label>
            <div className='input__wrapper'>
              <input type='email'
                name='email'
                className='form__input email__input'
                title='Enter your email ...'
                placeholder='Enter your email ...'
              ></input>
            </div>
          </div>

          <div className='form__box'>
            <label for='card_number' className='form__lable' >Card infomation</label>
            <div className='input__wrapper'>
              <input type='text'
                name='card_number'
                className='form__input card__info--input'
                title='Enter your card number ...'
                placeholder='1234 1234 1234 1234'
              ></input>
            </div>
            <div className='card__info--box'>
              <div className='input__wrapper'>
                <input type='text'
                  className='form__input card__date'
                  name='card_date'
                  placeholder='MM/YY'
                ></input>
              </div>
              <div className='input__wrapper'>
                <input type='text'
                  className='form__input card__cvc'
                  name='card_cvc'
                  placeholder='CVC'
                ></input>

              </div>
            </div>
          </div>

          <div className='form__box'>
            <label for='name_card' className='form__lable' >Name on card</label>
            <div className='input__wrapper'>
              <input type='text'
                name='name_card'
                className='form__input namecard__input'
              ></input>

            </div>
          </div>

          <div className='form__box'>
            <label for='billing_address' className='form__lable' >Billing address</label>
            <div className='input__wrapper'>
              {/* Combo box */}
              <select name='billing_address' id='billing_address'>
                <option></option>
                {provinces.map( (province) => {
                  return <option>{province}</option>
                })}
              </select>
            </div>
            <div className='input__wrapper'>
              <input type='text'
                name='billing_address'
                className='form__input bill__address--input'
                placeholder='Address'
              ></input>
            </div>
            <span onClick={() => alert('This feature is in development')}>Enter address manualli</span>
          </div>

          <button className='subscribe__btn' onClick={e => e.preventDefault()}>Subscribe</button>
          <p>By confirming your subscription, you allow Payment simulator to
            change your card for this payment and future payment info
            accordance with their terms
          </p>
        </form>
      </div>
    </div>
  )
}

export default PaymentScreen