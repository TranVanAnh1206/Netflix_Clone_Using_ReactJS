/**
 * Vấn đề còn tồn đọng:
 * Khi sử dụng hàm gọi dữ liệu lên từ realtime database firebase
 * khi trang web được chạy lên
 * khi nhấn sang tab danh sách của tôi lần đầu tiên
 * không có gì được hiện lên cả
 * phải nhấn sang tab khác sau đo nhấn trở lại mới hiện danh sách phim lên
 */

import React, { useEffect, useState, useRef } from 'react';

import Nav from '../../Header/Nav';
import Footer from '../../Footer/Footer';
import './MyListScreen.css';
import { ReadDataFromRealtimeDatabase } from '../../firebase';

function MyListScreen() {
    const [isEmpty, setIsEmpty] = useState(true);
    const [myList, setMyList] = useState([]);
    const nodeRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const img_Base_Url = 'https://image.tmdb.org/t/p/original/';

    useEffect(() => {
        const fetchData = async () => {
            // setMyList(JSON.parse(localStorage.getItem('MyFavoriteList')) || []);

            const currentUser = JSON.parse(localStorage.getItem('User'));
            const readFromDB = ReadDataFromRealtimeDatabase('watch_later', currentUser.user.uid, 'movies');

            if (!readFromDB || readFromDB.length == 0) {
                setIsEmpty(true);
                return;
            }

            // Do readFromDB lấy từ cơ sở dữ liệu ra là 1 object
            // ta cần chuyển dổi sang dạng mảng
            const arr = Object.keys(readFromDB).map((key) => readFromDB[key]);
            setMyList(arr);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timerLoading = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timerLoading);
    }, []);

    console.log(myList);

    return (
        <div className="myListScreen">
            <Nav />

            <div ref={nodeRef} className="myListScreen__body">
                {isLoading ? (
                    <div className="loading-wrapper">
                        <div class="lds-default">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {!isEmpty ? (
                            <div className="AnimeScreen_body">
                                <span>Danh sách của bạn đang trống</span>
                                <span>
                                    <i className="fa-solid fa-face-sad-tear"></i>
                                </span>
                            </div>
                        ) : (
                            <div className="my__movies--wrapper">
                                <div className="my__row--grid">
                                    {myList.map((movie) => {
                                        const movie_Name = movie.title || movie.name;
                                        return (
                                            <div key={movie.id} className="film__item">
                                                <img
                                                    src={`${img_Base_Url}${movie.backdrop_path}`}
                                                    lt={`Đây là hình ảnh của bộ phim ${movie_Name}`}
                                                />
                                                <h3>{movie_Name}</h3>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default MyListScreen;
