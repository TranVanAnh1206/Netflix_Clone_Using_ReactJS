import React, { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Banner.css'
import axios from '../axios'
import requests from '../Requests.js'

function Banner() {
    const [movie, setMovie] = useState([])
    const [randomMovieID, setRandomMovieID] = useState()

    useEffect(() => {
        async function FetchData() {
            try {
                // const request = await axios.get(requests.fetchAnimations)
                // setMovie(
                //     request.data.results[
                //     Math.floor(Math.random() * request.data.results.length - 1)
                //     ]
                // )

                
                const request = await axios.get(requests.fetchAnimations)
                const randomMovieIndex = Math.floor(Math.random() * request.data.results.length - 1)
                const randomMovie = request.data.results[randomMovieIndex]
                setMovie(randomMovie)
                setRandomMovieID(randomMovie.id)

                return request
            } catch (error) {
                throw new Error(error.message)
            }
        }

        FetchData()
    }, [])

    // console.log(movie);
    // console.log(randomMovieID);

    const handlePlayBtn = () => {
        alert('This feature is development ...')
    }

    return (
        <div className='banner' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'none',
            backgroundImage: `linear-gradient(-90deg, transparent, transparent, #000), url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}>
            <div className='banner__contents'>
                <h2 className='banner__series--film'>
                    <span className='icon'>
                        <i className="fa-solid fa-film"></i>
                    </span>
                    Loạt phim
                </h2>
                <h1 className='banner__film--name'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <p className='banner__film--desc'>
                    {movie?.overview}
                </p>
                <div className='banner__buttons'>
                    <button className='play__btn'
                        onClick={handlePlayBtn}>
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

            <div className='banner__gradient'></div>
        </div>
    )
}

export default Banner