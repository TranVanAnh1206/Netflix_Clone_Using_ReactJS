import React, { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import './MyListScreen.css';

function MyListScreen() {
    const [isEmpty, setIsEmpty] = useState(false);
    const [myList, setMyList] = useState([]);

    const img_Base_Url = 'https://image.tmdb.org/t/p/original/';

    useEffect(() => {
        setMyList(JSON.parse(localStorage.getItem('MyFavoriteList')) || []);
        setIsEmpty(true);
    }, []);
    console.log('Yêu thích: ', myList);

    return (
        <div className="myListScreen">
            <Nav />

            <div className="myListScreen__body">
                {!isEmpty ? (
                    <div className="AnimeScreen_body">
                        <span>Danh sách của bạn đang trống</span>
                        <span>
                            <i className="fa-solid fa-face-sad-tear"></i>
                        </span>
                    </div>
                ) : (
                    <div className="my__movies--wrapper">
                        <div className="my__row--grid">
                            {myList.map((movie) => {
                                const movie_Name = movie.title || movie.name;
                                return (
                                    <div key={movie.id} className="film__item">
                                        <img
                                            src={`${img_Base_Url}${movie.backdrop_path}`}
                                            lt={`Đây là hình ảnh của bộ phim ${movie_Name}`}
                                        />
                                        <h3>{movie_Name}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default MyListScreen;
