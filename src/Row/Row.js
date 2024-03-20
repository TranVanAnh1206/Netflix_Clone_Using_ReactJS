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
    const [itemLength, setItemLength] = useState(0);
    const [watchLaterDB, setWatchLaterDB] = useState([]);

    const likeBtn = useRef();
    const likedBtn = useRef();

    const slider_Mark_Ref = useRef();
    const pagination_Ref = useRef();
    const slideLeftBtn = useRef();

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

    useEffect(() => {
        const FetchDataFromDB = async () => {
            const MoviesDB = await ReadDataFromRealtimeDatabase(
                'watch_later',
                JSON.parse(localStorage.getItem('User')).user.uid,
                'movies',
            );

            if (MoviesDB) {
                const LocalStorageWatchlater = Object.values(MoviesDB);
                localStorage.setItem('WatchLater', JSON.stringify(LocalStorageWatchlater));
            }
        };

        FetchDataFromDB();
    }, []);

    //  Xử lý khi bấm nút thêm yêu thích sẽ thêm vào danh sách yêu thích
    const HandleStorage = (movie) => {
        //#region Thao tác với firebase realtime database
        // ====================== Thao tác với firebase realtime database => có vẻ ổn ======================

        // Lấy ra người dùng đăng nhập hiện tại
        const currentUser = JSON.parse(localStorage.getItem('User'));

        const readMoviesFromDB = ReadDataFromRealtimeDatabase('watch_later', currentUser.user.uid, 'movies');

        if (readMoviesFromDB) {
            const listMoviesDB = Object.values(readMoviesFromDB);

            // setWatchLaterDB(listMoviesDB);

            // Nếu database không tồn tại hoặc rỗng, tiến hành ghi mới
            if (!listMoviesDB || listMoviesDB.length === 0) {
                writeFavoriteMovies('watch_later', currentUser.user.uid, 'movies', movie);
            } else {
                // Thêm movie vào database có sẵn
                if (listMoviesDB.find((item) => item.id === movie.id)) {
                    alert('phim đã tồn tại trong danh sách xem sau, không cần thêm vào.');
                } else {
                    UpdateDataToRealtimeDatabase('watch_later', currentUser.user.uid, 'movies', movie);
                }

                // console.log(listMoviesDB.find((item) => item.id === movie.id));
            }
        }

        //#endregion
    };

    // Handle Scroll
    const HandlePrevBtn = () => {
        const sliderMarkWidth = slider_Mark_Ref.current.offsetWidth;

        slider_Mark_Ref.current.scrollBy({
            left: -sliderMarkWidth,
            behavior: 'smooth',
        });

        console.log(slider_Mark_Ref);
    };

    useEffect(() => {
        const listLength = slider_Mark_Ref.current.children.length - 1;
        setItemLength(listLength);
    }, []);

    const HandleNextBtn = () => {
        const sliderMarkWidth = slider_Mark_Ref.current.offsetWidth;
        slider_Mark_Ref.current.scrollBy({
            left: sliderMarkWidth,
            behavior: 'smooth',
        });
    };

    return (
        <div className="lolomoRow row-wrapper">
            <h2 className="row-title">{title}</h2>
            <ul ref={pagination_Ref} className="pagination-indicator">
                <li key="1" className="action"></li>
                <li key="2"></li>
                <li key="3"></li>
            </ul>
            <div className="row-container">
                <div className="row-slider">
                    <span
                        ref={slideLeftBtn}
                        onClick={() => HandlePrevBtn()}
                        className="slider-handle-btn prev-btn"
                        role="button"
                        aria-label="Xem thêm phim khác"
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </span>

                    <div ref={slider_Mark_Ref} className="slider-mark show-peek">
                        {movies.map(
                            (movie, index) =>
                                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                                    <div key={movie.id} id="movie-item-$" className="movie__item">
                                        <img
                                            className={`movie__img ${isLargeRow && 'row__posterLarge'}`}
                                            src={`${base_Url}${isLargeRow ? movie.poster_path : movie?.backdrop_path}`}
                                            alt={movie.name}
                                        />
                                        {/* <h2 className="movie__name">{movie.name || movie.title}</h2> */}

                                        <div className="action__box">
                                            <div className="action">
                                                <span
                                                    onClick={() => alert('This feature is development ...')}
                                                    className="action-item play"
                                                >
                                                    <i className="fa-solid fa-circle-play"></i>
                                                </span>
                                                <div className="action-item add-to-my-list">
                                                    <span
                                                        className={`add ${
                                                            watchLaterDB.includes(movie.id) ? 'hide' : ''
                                                        }`}
                                                        onClick={() => HandleStorage(movie)}
                                                    >
                                                        <i className="fa-solid fa-circle-plus"></i>
                                                    </span>
                                                    <span
                                                        className={`${
                                                            !watchLaterDB.includes(movie) ? 'hide' : ''
                                                        } added`}
                                                    >
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    </span>
                                                </div>

                                                <span className="action-item like-wrap">
                                                    <i ref={likeBtn} class="like fa-regular fa-heart"></i>

                                                    <i ref={likedBtn} className="hide liked fa-solid fa-heart"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ),
                        )}
                    </div>
                    <span
                        onClick={() => HandleNextBtn()}
                        className="slider-handle-btn next-btn"
                        role="button"
                        aria-label="Xem thêm phim khác"
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Row;
