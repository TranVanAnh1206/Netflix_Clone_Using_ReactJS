import React from "react";
import "./HomeScreen.css";
import Nav from "../../Nav/Nav";
import Banner from "../../Banner/Banner";
import requests from "../../Requests";
import Row from "../../Row/Row";
import Footer from "../../Footer/Footer";

function HomeScreen() {
    return (
        <div className="homeScreen">
            <Nav />

            <Banner />

            //#region Rows
            <Row
                title='Netflix original'
                fetchURL={requests.fetNetflixOriginals}
                isLargeRow
            />

            <Row
                title='Trending now'
                fetchURL={requests.fetchTrending}
            // isLargeRow
            />

            <Row
                title='Top rated'
                fetchURL={requests.fetchTopRated}
            // isLargeRow
            />

            <Row
                title='Action movies'
                fetchURL={requests.fetchActionMovies}
            // isLargeRow
            />

            <Row
                title='Comedy movies'
                fetchURL={requests.fetchComedyMovies}
            // isLargeRow
            />

            <Row
                title='Horror movies'
                fetchURL={requests.fetchHorrorMovies}
            // isLargeRow
            />

            <Row
                title='Animations'
                fetchURL={requests.fetchAnimations}
                isLargeRow
            />

            <Row
                title='Science Fictions'
                fetchURL={requests.fetchScienceFictions}
            // isLargeRow
            />

            <Row
                title='Romance movies'
                fetchURL={requests.fetchRomanceMovies}
            // isLargeRow
            />

            <Row
                title='Documentaries'
                fetchURL={requests.fetchDocumentaries}
            // isLargeRow
            />
            //#endregion

            <Footer />
        </div>
    )
}

export default HomeScreen