import React, { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Banner.css';
import './BannerResponsive.css';
import axios from '../axios';
import requests from '../Requests';
import error_img from '../Conponents/assets/images/VN-vi-20230410-popsignuptwoweeks-perspective_alpha_website_medium.jpg';

function Banner({ fetchURL }) {
    const [movie, setMovie] = useState();
    const [genresList, setGenresList] = useState([]);
    const [currentMovieGenres, setCurrentMovieGenres] = useState([]);

    const dialogRef = useRef();
    const dialogCloseRef = useRef();

    useEffect(() => {
        async function FetchData() {
            try {
                // const request = await axios.get(requests.fetchAnimations)
                // setMovie(
                //     request.data.results[
                //     Math.floor(Math.random() * request.data.results.length - 1)
                //     ]
                // )

                const request = await axios.get(fetchURL);
                const randomMovieIndex = Math.floor(Math.random() * request.data.results.length - 1);
                const randomMovie = request.data.results[randomMovieIndex];
                setMovie(randomMovie);

                return request;
            } catch (error) {
                throw new Error(error.message);
            }
        }

        FetchData();
    }, [fetchURL]);

    // console.log(movie);
    // console.log(randomMovieID);

    useEffect(() => {
        async function FetGenresData() {
            try {
                const request = await axios.get(requests.GenresList);
                const genresListData = request.data.genres;

                setGenresList(genresListData);
            } catch (error) {
                throw new Error(error.message);
            }
        }

        FetGenresData();
    }, []);

    // console.log(genresList);

    const handlePlayBtn = () => {
        alert('This feature is development ...');
    };

    const HandleClickModelDialog = () => {
        dialogRef.current.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (movie && movie.genre_ids) {
            const findGenres = movie.genre_ids.map((curr_genre_id) => {
                return genresList.filter((id) => id.id === curr_genre_id);
            });

            // const concatArr = [].concat(...findGenres);
            setCurrentMovieGenres([].concat(...findGenres));
        }

        console.log(movie);
    };

    const HandleCloseDialog = () => {
        dialogRef.current.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    return (
        <React.Fragment>
            <div style={{ position: 'relative' }}>
                <div
                    className="banner"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `linear-gradient(-90deg, transparent, transparent, #000), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    }}
                >
                    <div className="banner__contents">
                        <h2 className="banner__series--film">
                            <span className="icon">
                                <i className="fa-solid fa-film"></i>
                            </span>
                            Loạt phim
                        </h2>
                        <h1 className="banner__film--name">{movie?.title || movie?.name || movie?.original_name}</h1>
                        <p className="banner__film--desc">{movie?.overview}</p>
                        <div className="banner__buttons">
                            <button className="play__btn" onClick={handlePlayBtn}>
                                <span className="icon">
                                    <i className="fa-solid fa-play"></i>
                                </span>
                                <span className="text--btn">Phát</span>
                            </button>
                            <button onClick={HandleClickModelDialog} className="info__btn">
                                <span className="icon">
                                    <i className="fa-solid fa-circle-info"></i>
                                </span>
                                <span className="text--btn">Thông tin khác</span>
                            </button>
                        </div>
                    </div>
                    <div className="banner__gradient"></div>
                </div>
                {/* Overlay */}
                {/* <div className="banner__overlay"></div> */}

                {/* Model dialog */}
                <div ref={dialogRef} className="previewModal-wrapper">
                    <div className="previewModal__box">
                        <div className="previewModal-container" role="dialog">
                            <button onClick={HandleCloseDialog} ref={dialogCloseRef} className="dialogClose">
                                <span>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </button>
                            <div className="previewModal-player-wrap">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                                    alt={error_img}
                                />
                            </div>

                            <div className="previewAction">
                                <button className="play__btn" onClick={handlePlayBtn}>
                                    <span className="icon">
                                        <i className="fa-solid fa-play"></i>
                                    </span>
                                    <span className="text--btn">Phát</span>
                                </button>

                                <button className="previewAction-btn">
                                    <span className="actionBtn-title">Thêm vào xem sau</span>
                                    <i className="fa-solid fa-plus"></i>
                                </button>

                                <button className="previewAction-btn">
                                    <span style={{ width: 'auto' }} className="actionBtn-title">
                                        Thích
                                    </span>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                </button>
                            </div>

                            <div className="previewModal-movie-info">
                                {currentMovieGenres.map((genre, index) => {
                                    return (
                                        <span className="preview-movie-genre" key={index}>
                                            {genre.name}
                                        </span>
                                    );
                                })}
                                <h1 className="preview-movie-name banner__film--name">
                                    {movie?.title || movie?.name || movie?.original_name}
                                </h1>

                                <div className="preview-movie-desc">
                                    <p className="">{movie?.overview}</p>

                                    {movie && (
                                        <div className="preview-movie-subdesc">
                                            <p>
                                                Ngày khởi chiếu: <span>{movie.release_date}</span>
                                            </p>
                                            <p>
                                                Bình chọn trung bình: <span>{movie.vote_average}</span>
                                            </p>
                                            <p>
                                                Số lượt bình chọn: <span>{movie.vote_count}</span>
                                            </p>
                                            <p>
                                                Ngôn ngữ: <span>{movie.original_language}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="preview-same-movie">
                                <h3>Nội dung tương tự</h3>

                                <div className="timeline-item preview-same-movie-content">
                                    <div className="animated-background same-movie-item">
                                        <div className="background-masker header-top"></div>
                                        <div className="background-masker header-left"></div>
                                        <div className="background-masker header-right"></div>
                                        <div className="background-masker header-bottom"></div>
                                        <div className="background-masker subheader-right"></div>
                                        <div className="background-masker content-bottom"></div>
                                    </div>

                                    <div className="animated-background same-movie-item">
                                        <div className="background-masker header-top"></div>
                                        <div className="background-masker header-left"></div>
                                        <div className="background-masker header-right"></div>
                                        <div className="background-masker header-bottom"></div>
                                        <div className="background-masker subheader-right"></div>
                                        <div className="background-masker content-bottom"></div>
                                    </div>

                                    <div className="animated-background same-movie-item">
                                        <div className="background-masker header-top"></div>
                                        <div className="background-masker header-left"></div>
                                        <div className="background-masker header-right"></div>
                                        <div className="background-masker header-bottom"></div>
                                        <div className="background-masker subheader-right"></div>
                                        <div className="background-masker content-bottom"></div>
                                    </div>

                                    <div className="animated-background same-movie-item">
                                        <div className="background-masker header-top"></div>
                                        <div className="background-masker header-left"></div>
                                        <div className="background-masker header-right"></div>
                                        <div className="background-masker header-bottom"></div>
                                        <div className="background-masker subheader-right"></div>
                                        <div className="background-masker content-bottom"></div>
                                    </div>

                                    <div className="animated-background same-movie-item">
                                        <div className="background-masker header-top"></div>
                                        <div className="background-masker header-left"></div>
                                        <div className="background-masker header-right"></div>
                                        <div className="background-masker header-bottom"></div>
                                        <div className="background-masker subheader-right"></div>
                                        <div className="background-masker content-bottom"></div>
                                    </div>

                                    <div className="animated-background same-movie-item">
                                        <div className="background-masker header-top"></div>
                                        <div className="background-masker header-left"></div>
                                        <div className="background-masker header-right"></div>
                                        <div className="background-masker header-bottom"></div>
                                        <div className="background-masker subheader-right"></div>
                                        <div className="background-masker content-bottom"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Banner;
