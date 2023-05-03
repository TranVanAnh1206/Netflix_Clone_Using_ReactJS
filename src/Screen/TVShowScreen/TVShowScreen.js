import React, { useEffect, useState } from 'react'
import Nav from '../../Nav/Nav'
import './TVShowScreen.css'
import axios from '../../axios'
import requests from '../../Requests'
import Row from '../../Row/Row'
import Footer from '../../Footer/Footer'

function TVShowScreen() {
    const base__URL = 'https://image.tmdb.org/t/p/original/'

    const [tvMovie, setTVMovie] = useState([])
    const [films, setFilms] = useState([])


    useEffect(() => {
        async function Fetch_TVShow_Data() {
            const request = await axios.get(requests.fetchTVShowMovies_ActionAndAdventure)
            setTVMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request

        }

        Fetch_TVShow_Data()
    }, [])

    // console.log(tvMovie);

    useEffect(() => {
        async function Fetch_RowFilm_Data() {
            const request = await axios.get(requests.fetchTVShowMovies_ActionAndAdventure)
            setFilms(request.data.results)
            return request
        }

        Fetch_RowFilm_Data()
    }, [requests.fetchTVShowMovies_ActionAndAdventure])

    // console.log(films);

    return (
        <div className='tvShowScreen'>
            <Nav />

            <div className='tvShowScreen__Banner'
                style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundImage: `linear-gradient(-90deg, transparent, transparent, #000), url("${base__URL}${tvMovie?.backdrop_path}")`
                }}>
                {/* movie choose movie genre */}
                <div className='tvShowScreen__movie--genre'>
                    <h1 className='movie__genre--title'>Phim truyền hình</h1>
                </div>

                {/* moview conten */}
                <div className='tvShowScreen__contents'>
                    <h2 className='tvShowScreen__series--film'>
                        <span className='icon'>
                            <i className="fa-solid fa-film"></i>
                        </span>
                        Loạt phim
                    </h2>
                    <h1 className='tvShowScreen__film--name'>
                        {tvMovie?.name || tvMovie?.title}
                    </h1>
                    <p className='tvShowScreen__film--desc'>
                        {tvMovie?.overview}
                    </p>
                    <div className='tvShowScreen__buttons'>
                        <button className='play__btn'>
                            <span className='icon'>
                                <i className="fa-solid fa-play"></i>
                            </span>
                            <span className='text--btn'>Phát</span>
                        </button>
                        <button className='info__btn'>
                            <span className='icon'>
                                <i className="fa-solid fa-circle-info"></i>
                            </span>
                            <span className='text--btn'>Thông tin khác</span>
                        </button>
                    </div>
                </div>

                <div className='tvShowScreen__lỉnear'></div>
            </div>

            <Row title={'Action and adventure'}
                fetchURL={requests.fetchTVShowMovies_ActionAndAdventure}
                isLargeRow />

            <Row title={'Animations'}
                fetchURL={requests.fetchTVShowMovies_Animations} />

            <Row title={'News'}
                fetchURL={requests.fetchTVShowMovies_News} />

            <Row title={'War and politics'}
                fetchURL={requests.fetchTVShowMovies_WarAndPolitics} />

            <Row title={'Reality'}
                fetchURL={requests.fetchTVShowMovies_Realities} />

            <Row title={'Sci-Fi and Fantacy'}
                fetchURL={requests.fetchTVShowMovies_SciFiAndFantacies} />

            <Row title={'Humor'}
                fetchURL={requests.fetchTVShowMovies_Humors} />

            <Row title={'Drama'}
                fetchURL={requests.fetchTVShowMovies_Dramas} />

            <Footer />

        </div>
    )
}

export default TVShowScreen