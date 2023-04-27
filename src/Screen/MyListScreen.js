import React, { useEffect, useState } from 'react'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'

function MyListScreen() {
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect( () => {
    
  })

  return (
    <div className='myListScreen'>
      <Nav />

      {isEmpty ? (
        {}          
      ) : (
        <div className='AnimeScreen_body'>
          <span>Danh sách của bạn đang trống</span>
          <span><i class="fa-solid fa-face-sad-tear"></i></span>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default MyListScreen