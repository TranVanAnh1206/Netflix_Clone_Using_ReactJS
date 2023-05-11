import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import ProfileScreen from './Screen/ProfileScreen/ProfileScreen';
import LoginScreen from './Screen/LoginScreen/LoginScreen';
import TVShowScreen from './Screen/TVShowScreen/TVShowScreen';
import AnimeScreen from './Screen/AnimeScreen/AnimeScreen';
import MyListScreen from './Screen/MyListScreen/MyListScreen';
import SearchByNameScreen from './Screen/SearchByNameScreen/SearchByNameScreen';
import PaymentScreen from './Screen/PaymentScreen/PaymentScreen';
import NotFoundScreen from './Screen/Error404Screen/NotFoundScreen';
import AccountScreen from './Screen/ProfileScreen/AccountScreen';

function App() {
    const user = useSelector(selectUser);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const dispatch = useDispatch();

    useEffect(() => {
        /**
         *  basically something called a listener and the reason being
         *  is because it listens to any authenticated state change
         *  and what is really clever about firebase is whenever you go
         *  ahead and even if you're logged in and you refesh it will store it to
         *  your local memory so in your browser so basically go ahead and pop it in a
         *  cookie and it knows that you're logged in from before
         */
        const unsubcribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                // logged in
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email,
                    }),
                );
            } else {
                // logged out
                dispatch(logout());
            }
        });

        return unsubcribe;
    }, [dispatch]);

    useEffect(() => {
        function HandleNetworkChange() {
            setIsOnline(navigator.onLine);
        }

        window.addEventListener('online', HandleNetworkChange);
        window.addEventListener('offline', HandleNetworkChange);

        return () => {
            window.removeEventListener('online', HandleNetworkChange);
            window.removeEventListener('offline', HandleNetworkChange);
        };
    }, []);

    // return (
    //     <Router>
    //       <Route
    //         render={({ location }) => (
    //           <TransitionGroup>
    //             <CSSTransition key={location.key} classNames="slide" timeout={300}>
    //               <Switch location={location}>
    //                 <Route exact path="/" component={Home} />
    //                 <Route path="/about" component={About} />
    //                 <Route path="/contact" component={Contact} />
    //               </Switch>
    //             </CSSTransition>
    //           </TransitionGroup>
    //         )}
    //       />
    //     </Router>
    //   );

    return (
        <div className="app">
            {!isOnline ? (
                <NotFoundScreen />
            ) : (
                <Router>
                    {!user ? (
                        <LoginScreen />
                    ) : (
                        <Routes>
                            <React.Fragment>
                                <Route exact="true" path="/" element={<HomeScreen />}></Route>
                                <Route path="/your-Account" element={<AccountScreen />}></Route>
                                <Route path="/TVShow" element={<TVShowScreen />}></Route>
                                <Route path="/Anime" element={<AnimeScreen />}></Route>
                                <Route path="/MyList" element={<MyListScreen />}></Route>
                                <Route path="/SearchByName" element={<SearchByNameScreen />}></Route>
                                <Route path="/paymentScreen" element={<PaymentScreen />}></Route>
                            </React.Fragment>
                        </Routes>
                    )}
                </Router>
            )}

            {/* <div className="overlay">
                <div className="movie__info--wrapper"></div>
            </div> */}
        </div>
    );
}

export default App;
