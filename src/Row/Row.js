import React, { useEffect, useRef, useState } from 'react'
import axios from '../axios'
import './Row.css'

function Row({ title, fetchURL, isLargeRow = false }) {
    const [movies, setMovies] = useState([])
    const [myList, setMyList] = useState([])
    
    const base_Url = 'https://image.tmdb.org/t/p/original/'
   
   //#region Xử lý lấy dữ liệu lên từ API TMDB
   useEffect(() => {
       async function fetchData() {
           try {
               const request = await axios.get(fetchURL)
               setMovies(request.data.results)
               return request
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [fetchURL])


    //  Xử lý khi bấm 
    const HandleStorage = (movie) => {
        const updateFavoriteList = [...myList, movie]
        setMyList(updateFavoriteList)
        localStorage.setItem("MyFavoriteList", JSON.stringify(updateFavoriteList))
        console.log(myList);

    }


    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>

            <div className='row__movies'>
                {movies.map(movie =>
                    (
                        (isLargeRow && movie.poster_path) || 
                        (!isLargeRow && movie.backdrop_path)
                    ) 
                    &&
                    (
                        <div key={movie.id} className={`movie__item`} >
                            <img className={`movie__img ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_Url}${isLargeRow ? movie.poster_path : movie?.backdrop_path}`}
                                alt={movie.name} />
                            <h2 className='movie__name'>{movie.name || movie.title}</h2>

                            <div className='action__box'>
                                <div className='action'>
                                    <span className='play'>
                                        <i className="fa-solid fa-play"></i>
                                    </span>
                                    <span className='add-to-my-list'
                                        onClick={() => HandleStorage(movie)}>
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                    <span className='like'>
                                        <i className="fa-solid fa-thumbs-up"></i>
                                    </span>
                                </div>

                            </div>
                        </div>
                    )

                )}

            </div>

        </div>
    )
}

export default Row