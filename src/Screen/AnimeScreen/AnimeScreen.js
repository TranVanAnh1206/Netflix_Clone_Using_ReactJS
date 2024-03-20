import React, { useEffect, useState } from 'react';
import Nav from '../../Header/Nav';
import Footer from '../../Footer/Footer';
import './AnimeScreen.css';
import axios from '../../axios';
import YouTube from 'react-youtube';

function AnimeScreen() {
    const [film, setFilm] = useState();
    const [movieTrailerKey, setMovieTrailerKey] = useState();

    const youtubeUrl = `https://www.youtube.com/embed/${movieTrailerKey}`;

    useEffect(() => {
        async function FetchData() {
            const request = await axios.get(
                'https://api.themoviedb.org/3/movie/640146?api_key=900f62974efe56ae3058a8cc053e0885&append_to_response=videos',
            );
            setFilm(request.data);

            const videos = request.data.videos.results;

            if (videos.length > 0) {
                const trailer = videos.find((video) => video.site.toLowerCase() === 'youtube');

                if (trailer) {
                    setMovieTrailerKey(trailer.key);
                }
            }
        }

        FetchData();
    }, []);

    // console.log(film.videos.results[0].key);

    return (
        <div className="animeScreen">
            <Nav />

            <div className="AnimeScreen_body">
                <span>Hiện chưa có danh bất kì danh sách phim hoạt hình nào</span>
                <span>
                    <i className="fa-solid fa-face-sad-tear"></i>
                </span>

                {movieTrailerKey && (
                    <video controls width="250">
                        <source src="https://www.youtube.com/watch?v=q0rUPDH9ORE&list=RDq0rUPDH9ORE&start_radio=1"></source>
                    </video>
                )}

                <YouTube videoId={movieTrailerKey} opts={{ width: '450', height: '300' }} />
            </div>

            <Footer />
        </div>
    );
}

export default AnimeScreen;
