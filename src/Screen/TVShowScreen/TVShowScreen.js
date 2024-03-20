import React, { useEffect, useState } from 'react';
import Nav from '../../Header/Nav';
import './TVShowScreen.css';
import axios from '../../axios';
import requests from '../../Requests';
import Row from '../../Row/Row';
import Footer from '../../Footer/Footer';
import Banner from '../../Banner/Banner';

function TVShowScreen() {
    return (
        <div className="tvShowScreen">
            <Nav />

            <div className="animate">
                <Banner fetchURL={requests.fetchTVShowMovies_ActionAndAdventure} />

                <Row title={'Action and adventure'} fetchURL={requests.fetchTVShowMovies_ActionAndAdventure} />

                <Row title={'Animations'} fetchURL={requests.fetchTVShowMovies_Animations} />

                <Row title={'News'} fetchURL={requests.fetchTVShowMovies_News} />

                <Row title={'War and politics'} fetchURL={requests.fetchTVShowMovies_WarAndPolitics} />

                <Row title={'Reality'} fetchURL={requests.fetchTVShowMovies_Realities} />

                <Row title={'Sci-Fi and Fantacy'} fetchURL={requests.fetchTVShowMovies_SciFiAndFantacies} />

                <Row title={'Humor'} fetchURL={requests.fetchTVShowMovies_Humors} />

                <Row title={'Drama'} fetchURL={requests.fetchTVShowMovies_Dramas} />
            </div>

            <Footer />
        </div>
    );
}

export default TVShowScreen;
