import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Banner.css';
import axios from '../axios';

function Banner({ fetchURL }) {
    const [movie, setMovie] = useState([]);
    const [randomMovieID, setRandomMovieID] = useState();

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
                setRandomMovieID(randomMovie.id);

                return request;
            } catch (error) {
                throw new Error(error.message);
            }
        }

        FetchData();
    }, []);

    // console.log(movie);
    // console.log(randomMovieID);

    const handlePlayBtn = () => {
        alert('This feature is development ...');
    };

    return (
        <React.Fragment>
            <div
                className="banner"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'none',
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
                        <button className="info__btn">
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

            {/*  Banner model */}
            {/* <div className="model__wrapper">
                <div className="model__contents">
                    <div className="model__movie--banner">
                        <div className="img__wrapper">
                            <img
                                src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABTPSO7Sq0HWnEx_m5L2VB7Ae1LKi7DgKGUlMsAHI_jzpkO57xdXyRXMpTdEncKInyXHP8dMg66H9pQKfq6YGP-oy1oaKAv3_Bx27.webp?r=155"
                                alt="Dây là hình ảnh về một bộ phim"
                            />
                        </div>
                        <div className="model__player">
                            <h3 className="model__player--title">Đây là tên phim</h3>
                            <button className="model__play--btn">
                                <span className="icon">
                                    <i className="fa-solid fa-play"></i>
                                </span>
                                Phát
                            </button>
                        </div>
                    </div>

                    <div className="model__movie--info">
                        <div className="movie__descriptions">
                            <h3>2020 - 3 mùa</h3>
                            <h3>Tình dục, ngôn ngữ, chất gây nghiện, tự sát</h3>
                            <p>
                                Sáu năm sau khi con virus trong nước mưa xóa sổ gần như toàn bộ dân số Scandinavia, hai
                                chị em đã gia nhập nhóm người còn sống sót để tìm kiếm sự an toàn và cả sự thật.
                            </p>
                        </div>

                        <div className="model--movie__genres">
                            <div className="model--movie__performer">
                                <p>
                                    <span>Diễn viên: </span> abscđsfsdfs, hfdjfgsudjfsdf, jsfdbufsjghdf, fsdhf
                                </p>
                            </div>
                            <div className="model--movie__genre">
                                <p>
                                    <span>Thể loại: </span> abscđsfsdfs, hfdjfgsudjfsdf, jsfdbufsjghdf, fsdhf
                                </p>
                            </div>

                            <div className="model--movie__this">
                                <p>
                                    <span>Chương trình này: </span> abscđsfsdfs, hfdjfgsudjfsdf, jsfdbufsjghdf, fsdhf
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </React.Fragment>
    );
}

export default Banner;
