import React, { useEffect, useRef, useState } from 'react';

import axios from '../axios';
import './Row.css';
import {
    ReadDataFromRealtimeDatabase,
    UpdateDataToRealtimeDatabase,
    WriteDataToRealtimeDataBase as writeFavoriteMovies,
} from '../firebase';

function Row({ title, fetchURL, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [myList, setMyList] = useState([]);
    const [added, setAdded] = useState(false);
    const rowWrap = useRef();
    const rowMovieItem = useRef();

    const base_Url = 'https://image.tmdb.org/t/p/original/';

    //#region Xử lý lấy dữ liệu lên từ API TMDB
    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchURL);
                setMovies(request.data.results);
                return request;
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [fetchURL]);

    //  Xử lý khi bấm nút thêm yêu thích sẽ thêm vào danh sách yêu thích
    const HandleStorage = (movie) => {
        // Thao tác với localStorage => Không hiệu quả
        /**
         * NGuyên nhân
         * Do cấu trúc layout hiển thị từng thể loại phim theo component row riêng biệt
         * Khi lưu list phim yêu thích vào localStorage:
         *  + Nếu bấm cùng 1 row => hoạt động bình thường
         *  + Nếu bấm khác row => toàn bộ sẽ list sẽ bị làm mới
         */
        let updateFavoriteList = [];
        const arrLen = updateFavoriteList.length;
        if (arrLen > 0) {
            for (let i = 0; i < arrLen; i++) {
                if (updateFavoriteList[i].id !== movie.id) updateFavoriteList = [...myList, movie];
            }
        } else {
            updateFavoriteList = [...myList, movie];
        }

        // set mảng movies vào myList
        setMyList(updateFavoriteList);

        // Ghi mảng phim vào localStorage
        localStorage.setItem('MyFavoriteList', JSON.stringify(myList));

        //Thao tác với firebase realtime database => có vẻ ổn

        // Lấy ra người dùng đăng nhập hiện tại
        const currentUser = JSON.parse(localStorage.getItem('User'));

        // ghi list movie yêu thích vào database
        // writeFavoriteMovies('watch_later/', currentUser.user.uid, 'movies', myList);

        const listMoviesDB = ReadDataFromRealtimeDatabase('watch_later', currentUser.user.uid, 'movies');

        ////Nếu database không tồn tại hoặc rỗng, tiến hành ghi mới
        if (!listMoviesDB || listMoviesDB.length === 0) {
            writeFavoriteMovies('watch_later', currentUser.user.uid, 'movies', movie);
        } else {
            // Thêm movie vào database có sẵn
            UpdateDataToRealtimeDatabase('watch_later', currentUser.user.uid, 'movies', movie);
        }

        setAdded(true);
    };

    return (
        <div className="row-wrapper">
            <h2 className="row-title">{title}</h2>

            <div className="row-container">
                <div className="ptrack-container">
                    <div className="row-content">
                        <div className="row-slider" ref={rowWrap}>
                            {movies.map(
                                (movie) =>
                                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                                        <div key={movie.id} className={`movie__item`} ref={rowMovieItem}>
                                            <img
                                                className={`movie__img ${isLargeRow && 'row__posterLarge'}`}
                                                src={`${base_Url}${
                                                    isLargeRow ? movie.poster_path : movie?.backdrop_path
                                                }`}
                                                alt={movie.name}
                                            />
                                            <h2 className="movie__name">{movie.name || movie.title}</h2>

                                            <div className="action__box">
                                                <div className="action">
                                                    <span className="play">
                                                        <i className="fa-solid fa-circle-play"></i>
                                                    </span>
                                                    <span
                                                        className="add-to-my-list"
                                                        onClick={() => HandleStorage(movie)}
                                                    >
                                                        <i className="fa-solid fa-circle-plus"></i>
                                                        <i class="fa-solid fa-circle-check"></i>
                                                    </span>
                                                    <span className="like">
                                                        <i class="fa-regular fa-heart"></i>
                                                        <i class="fa-solid fa-heart"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Row;
