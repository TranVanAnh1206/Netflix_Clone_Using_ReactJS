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
    const [active, setActive] = useState(0);
    const [maxScrollLeft, setMaxScrollLeft] = useState(0);
    const [isHover, setIsHover] = useState(false);
    const [hoverPositionEle, setHoverPositionEle] = useState({ x: 0, y: 0 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemLength, setItemLength] = useState(0);

    const addBtn = useRef();
    const addedBtn = useRef();
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

        //Nếu database không tồn tại hoặc rỗng, tiến hành ghi mới
        if (!listMoviesDB || listMoviesDB.length === 0) {
            writeFavoriteMovies('watch_later', currentUser.user.uid, 'movies', movie);
        } else {
            // Thêm movie vào database có sẵn

            if (listMoviesDB.find((item) => item.id === movie.id)) {
                alert('phim đã tồn tại trong danh sách của tôi, không cần thêm vào.');
            } else {
                UpdateDataToRealtimeDatabase('watch_later', currentUser.user.uid, 'movies', movie);
            }
        }
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

        // console.log(slider_Mark_Ref);
        // if (currentIndex + 1 > itemLength) setCurrentIndex(0);
        // else setCurrentIndex((prev) => prev + 1);
        // console.log(currentIndex);
        // const checkLeft = slider_Mark_Ref.current.children[currentIndex].offsetLeft;
        // slider_Mark_Ref.current.style.left = checkLeft + 'px';
        // console.log(checkLeft);
    };

    // Page Row
    const HandlePagination = () => {
        console.log(pagination_Ref);
    };

    const HandleScroll = () => {
        const maxScrollLeft = slider_Mark_Ref.current.offsetWidth - slider_Mark_Ref.current.clientWidth;
    };

    // const calculateMaxScrollLeft = () => {
    //     if (slider_Mark_Ref.current) {
    //         const { offsetWidth, scrollWidth } = slider_Mark_Ref.current;
    //         const clientWidth = slider_Mark_Ref.current.clientWidth;
    //         const calculatedMaxScrollLeft = scrollWidth - offsetWidth + clientWidth;
    //         setMaxScrollLeft(calculatedMaxScrollLeft);
    //     }
    // };

    // Mouse
    const HandleMouseEnter = (e) => {
        setTimeout(() => {
            setIsHover(true);
            const rect = e.target.getBoundingClientRect();
            setHoverPositionEle({ x: rect.left, y: rect.top });
        }, 2000);
    };

    const HandleMouseLeave = () => {
        setIsHover(false);
    };

    return (
        <div className="lolomoRow row-wrapper">
            <h2 className="row-title">{title}</h2>
            <ul ref={pagination_Ref} className="pagination-indicator">
                <li className="action"></li>
                <li></li>
                <li></li>
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

                    <div ref={slider_Mark_Ref} onScroll={() => HandleScroll()} className="slider-mark show-peek">
                        {movies.map(
                            (movie, index) =>
                                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                                    <React.Fragment>
                                        <div
                                            key={movie.id}
                                            className="movie__item"
                                            onMouseEnter={HandleMouseEnter}
                                            onMouseLeave={HandleMouseLeave}
                                        >
                                            <img
                                                className={`movie__img ${isLargeRow && 'row__posterLarge'}`}
                                                src={`${base_Url}${
                                                    isLargeRow ? movie.poster_path : movie?.backdrop_path
                                                }`}
                                                alt={movie.name}
                                            />
                                            {/* <h2 className="movie__name">{movie.name || movie.title}</h2> */}

                                            {/* <div className="action__box">
                                                <div className="action">
                                                    <span className="play">
                                                        <i className="fa-solid fa-circle-play"></i>
                                                    </span>
                                                    <span className="add-to-my-list">
                                                        <i
                                                            ref={addBtn}
                                                            onClick={() => HandleStorage(movie)}
                                                            className="add fa-solid fa-circle-plus"
                                                        ></i>

                                                        <i
                                                            style={{ display: 'none' }}
                                                            ref={addedBtn}
                                                            className="added fa-solid fa-circle-check"
                                                        ></i>
                                                    </span>
                                                    <span className="like-wrap">
                                                        <i ref={likeBtn} class="like fa-regular fa-heart"></i>

                                                        <i
                                                            style={{ display: 'none' }}
                                                            ref={likedBtn}
                                                            className="liked fa-solid fa-heart"
                                                        ></i>
                                                    </span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </React.Fragment>
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
