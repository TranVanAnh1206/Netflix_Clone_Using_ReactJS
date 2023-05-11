const API_KEY = '900f62974efe56ae3058a8cc053e0885';

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

    fetchTVShowMovies_ActionAndAdventure: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    fetchTVShowMovies_Animations: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
    fetchTVShowMovies_News: `/discover/tv?api_key=${API_KEY}&with_genres=10763`,
    fetchTVShowMovies_WarAndPolitics: `/discover/tv?api_key=${API_KEY}&with_genres=10768`,
    fetchTVShowMovies_Realities: `/discover/tv?api_key=${API_KEY}&with_genres=10764`,
    fetchTVShowMovies_SciFiAndFantacies: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
    fetchTVShowMovies_Humors: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchTVShowMovies_Dramas: `/discover/tv?api_key=${API_KEY}&with_genres=18`,

    fetAnimation_Anime: `/discover/animation?api_key=${API_KEY}&with_genres=16`,

    fetchAllMovies: `/discover/movie?api_key=${API_KEY}`,
};

export default requests;
