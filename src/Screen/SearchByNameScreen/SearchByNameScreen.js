import React, { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import Footer from '../../Footer/Footer';
import './SearchByNameScreen.css';
import axios from '../../axios';

const movie_Genres = [
    'Action Movies',
    'Comedy Movies',
    'Horror Movies',
    'Romance Movies',
    'Documentaries',
    'Animations',
    'Science Fictions',
];

function SearchByNameScreen() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const img_base_Url = 'https://image.tmdb.org/t/p/original/';
    const API_KEY = '900f62974efe56ae3058a8cc053e0885';
    const allMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
    //const allMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${selectedLanguage}&with_genres=${selectedGenre}&primary_release_year=${selectedYear}&page=${page}`;

    useEffect(() => {
        async function FetchData() {
            const request = await axios.get(allMovieURL);
            setLoading(false);
            setMovies((prevMovies) => [...prevMovies, ...request.data.results]);

            /**
             * Trong mã này, câu lệnh return là không cần thiết
             * vì nó không ảnh hưởng đến hành vi của thành phần.
             * Nếu một câu lệnh trả về có giá trị được bao gồm,
             * thì giá trị được trả về sẽ được sử dụng làm hàm dọn dẹp
             * cho hook useEffect().
             *
             * Chức năng dọn dẹp này được sử dụng để hủy mọi
             * yêu cầu chưa xử lý, xóa mọi đăng ký hoặc thực hiện
             * bất kỳ hoạt động dọn dẹp nào khác cần thiết để ngăn
             * rò rỉ bộ nhớ và các sự cố khác. Tuy nhiên, trong mã này,
             * không có đăng ký đang hoạt động hoặc yêu cầu
             * đang chờ xử lý nào cần được dọn sạch,
             * vì vậy câu lệnh return là không cần thiết.
             */

            // return request;
        }

        FetchData();
    }, [allMovieURL, page]);

    console.log(movies);

    // Sử lý khi cuộn đến cuối trang
    // sẽ loading trước khi gọi api
    const handleScroll = () => {
        const windownHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;

        if (!loading && windownHeight + scrollTop >= documentHeight) {
            setLoading(true);
            setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 2000);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // clearnup func xóa bỏ sự kiện scroll của windown
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="searchByNameScreen">
            <Nav />

            <section className="search__screen">
                <div className="sub__header--wrapper">
                    <div className="sub__header--title">
                        <h1>Duyệt tìm theo tên</h1>
                    </div>

                    <div className="choose__container">
                        <h3>Điều chỉnh tùy chọn của bạn</h3>
                        <select name="language" id="choose__language" className="choose__language">
                            <option value="original" defaultValue={true}>
                                Ngôn ngữ gốc
                            </option>
                            <option value="english">Tiếng Anh</option>
                            <option value="vietnamese">Tiếng việt</option>
                        </select>

                        <select name="movieGenres" id="choose__movie--genre" className="choose__movie--genre">
                            <option value="genre" defaultValue={true}>
                                Chọn thể loại phim
                            </option>
                            {movie_Genres.map((movie_Genre, index) => {
                                return (
                                    <option key={index} value={index}>
                                        {movie_Genre}
                                    </option>
                                );
                            })}
                        </select>

                        <div className="sorted__by">
                            <h3>Sắp xếp theo</h3>
                            <select name="sorted" id="sorted">
                                <option value="foryou" defaultValue={true}>
                                    Đề xuất dành cho bạn
                                </option>
                                <option value="yearRelease">Nắm phát hành</option>
                                <option value="aToz">A - Z</option>
                                <option value="zToa">Z - A</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="gallery__movies--wrapper">
                    <div className="row-grid">
                        {movies.map((movie, index) => {
                            return (
                                <div key={index} className="film__item">
                                    <img
                                        src={`${img_base_Url}${movie.backdrop_path}`}
                                        alt={`Đây là hình ảnh của bộ phim ${movie.title || movie.name}`}
                                    />
                                    <h3>{movie.name || movie.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                    <div className="loading__wrapper">{loading && <span className="loader"></span>}</div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default SearchByNameScreen;
