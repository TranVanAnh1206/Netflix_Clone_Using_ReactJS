import React, { useEffect, useState } from 'react';
import HomeScreen from './Screen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './Screen/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import TVShowScreen from './Screen/TVShowScreen'
import AnimeScreen from './Screen/AnimeScreen';
import MyListScreen from './Screen/MyListScreen';
import SearchByNameScreen from './Screen/SearchByNameScreen'
import PaymentScreen from './Screen/PaymentScreen';
import NotFoundScreen from './Screen/NotFoundScreen';


function App() {
  const user = useSelector(selectUser)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const dispatch = useDispatch()

  useEffect(() => {
    /**
     * basically something called a listener and the reason being
     * is because it listens to any authenticated state change
     *  and what is really clever about firebase is whenever you go
     *  ahead and even if you're logged in and you refesh it will store it to
     *  your local memory so in your browser so basically go ahead and pop it in a 
     *  cookie and it knows that you're logged in from before
     */
    const unsubcribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // logged in
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        )
      } else {
        // logged out
        dispatch(logout())
      }
    })

    return unsubcribe
  }, [dispatch])

  useEffect( () => {
    function HandleNetworkChange ()
    {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener('online', HandleNetworkChange)
    window.addEventListener('offline', HandleNetworkChange)

    return () => {
      window.removeEventListener('online', HandleNetworkChange)
      window.removeEventListener('offline', HandleNetworkChange)
    }

  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            {isOnline ? (
              <React.Fragment>
                <Route className='route-transition' exact={true} path='/' element={<HomeScreen />}></Route>
                <Route className='route-transition' path='/profile' element={<ProfileScreen />}></Route>
                <Route className='route-transition' path='/TVShow' element={<TVShowScreen />}></Route>
                <Route className='route-transition' path='/Anime' element={<AnimeScreen />}></Route>
                <Route className='route-transition' path='/MyList' element={<MyListScreen />}></Route>
                <Route className='route-transition' path='/SearchByName' element={<SearchByNameScreen />}></Route>
                <Route path='/paymentScreen' element={<PaymentScreen />}></Route>
              </React.Fragment>
            ) : (
              <Route path='/404-NotFound' element={<NotFoundScreen />}></Route>
            )}
            
          </Routes>

        )}
      </Router>
    </div>
  );
}

export default App;
