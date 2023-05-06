import React, { useEffect, useState } from 'react'
import Nav from '../../Nav/Nav'
import Footer from '../../Footer/Footer'
import './AnimeScreen.css'
import axios from '../../axios'

function AnimeScreen() {
  

  return (
    <div className='animeScreen'>
        <Nav />

        <div className='AnimeScreen_body'>
          <span>Hiện chưa có danh bất kì danh sách phim hoạt hình nào</span>
          <span><i className="fa-solid fa-face-sad-tear"></i></span>
        </div>

        <Footer />
    </div>
  )
}

export default AnimeScreen