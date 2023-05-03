import React, { useEffect, useState } from 'react'
import Nav from '../../Nav/Nav'
import Footer from '../../Footer/Footer'
import './SearchByNameScreen.css'
import requests from '../../Requests'
import axios from '../../axios'

const movie_Genres = [
  "Action Movies",
  "Comedy Movies",
  "Horror Movies",
  "Romance Movies",
  "Documentaries",
  "Animations",
  "Science Fictions",
]


function SearchByNameScreen() {

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const base_Url = 'https://image.tmdb.org/t/p/original/'
  const API_KEY = '900f62974efe56ae3058a8cc053e0885'
  const allMovieURL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`

  useEffect(() => {
    async function FetchData() {
      const request = await axios.get(allMovieURL)
      setLoading(false)
      setMovies( prevMovies => [ ...prevMovies, ...request.data.results])

      return request
    }

    FetchData()
  }, [page])

  console.log(movies);

  const handleScroll = () => {
    const windownHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop

    if (windownHeight + scrollTop >= documentHeight)
    {
      setLoading(true)
      setTimeout( () => {
        setPage(prevPage => prevPage + 1)
        setLoading(false)
      }, 2000)
    }
  }

  useEffect ( () => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='searchByNameScreen'>
      <Nav />

      <section className='search__screen'>
        <div className='sub__header--wrapper'>
          <div className='sub__header--title'>
            <h1>Duyệt tìm theo tên</h1>
          </div>

          <div className='choose__container'>
            <h3>Điều chỉnh tùy chọn của bạn</h3>
            <select name='language'
              id='choose__language'
              className='choose__language'>
              <option value="original" selected={true}>Ngôn ngữ gốc</option>
              <option value="english">Tiếng Anh</option>
              <option value="vietnamese">Tiếng việt</option>
            </select>

            <select name='movieGenres'
              id='choose__movie--genre'
              className='choose__movie--genre'>
              <option value='genre' selected={true}>Chọn thể loại phim</option>
              {movie_Genres.map((movie_Genre, index) => {
                return <option value={index}>{movie_Genre}</option>
              })}
            </select>

            <div className='sorted__by'>
              <h3>Sắp xếp theo</h3>
              <select name='sorted' id='sorted'>
                <option value='foryou' selected={true}>Đề xuất dành cho bạn</option>
                <option value='yearRelease'>Nắm phát hành</option>
                <option value='aToz'>A - Z</option>
                <option value='zToa'>Z - A</option>
              </select>
            </div>
          </div>
        </div>

        <div className='gallery__movies--wrapper'>
          <div className='row-grid'>
            {movies.map((movie) => {
              return (
                <div key={movie.id} className='film__item'>
                  <img src={`${base_Url}${movie.backdrop_path}`}
                    alt={`Đây là hình ảnh của bộ phim ${movie.title || movie.name}`} />
                  <h3>{movie.name || movie.title}</h3>
                </div>
              )
            })}
            
          </div>
          <div className='loading__wrapper'>{loading && <span className="loader"></span>}</div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SearchByNameScreen