import React, { useEffect, useRef, useState } from 'react'
import axios from '../axios'
import './Row.css'

function Row({ title, fetchURL, isLargeRow = false }) {
    const [movies, setMovies] = useState([])
    
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
    
    // console.log(movies);
    //#endregion
    
    //#region Xử lý cuộn khi bấm vào nút next or prev
    /**
     * đoạn code sau tương đương với việc khai báo sau
     * const list = document.querySelector('.list')
     * const items = document.querySelectorAll('.item')
    */
    // const row_Films_Ref = useRef(null)
    // const movie_Items_Ref = useRef(null)
    
    // const [currentIndex, setCurrentIndex] = useState(0)
    // const [itemLength, setItemLength] = useState(0)

    // console.log(movie_Items_Ref.current);
   

    //#endregion


    return (
        <div className='row'>
            <h2 className='row-title'>{title}</h2>

            <div className='row__movies'>
                {movies.map(movie =>
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) &&
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
                                    <span className='add-to-my-list'>
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

            <div className='next__btn scroll'>
                <i className="fa-solid fa-chevron-left"></i>
            </div>

            <div className='prev__btn scroll'>
                <i className="fa-solid fa-chevron-right"></i>
            </div>

        </div>
    )
}

export default Row