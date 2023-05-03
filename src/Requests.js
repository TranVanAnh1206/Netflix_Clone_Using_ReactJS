const API_KEY = '900f62974efe56ae3058a8cc053e0885'

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchAnimations: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    fetchScienceFictions: `/discover/movie?api_key=${API_KEY}&with_genres=878`,

    fetchTVShowMovies_ActionAndAdventure: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchTVShowMovies_Animations: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`,
    fetchTVShowMovies_News: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10763`,
    fetchTVShowMovies_WarAndPolitics: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10768`,
    fetchTVShowMovies_Realities: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10764`,
    fetchTVShowMovies_SciFiAndFantacies: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    fetchTVShowMovies_Humors: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchTVShowMovies_Dramas: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18`,

    fetAnimation_Anime: `https://api.themoviedb.org/3/discover/animation?api_key=${API_KEY}&with_genres=16`,

    fetchAllMovies: `/discover/movie?api_key=${API_KEY}`
}

export default requests