import React from 'react';

function MovieDialog({ movie }) {
    return (
        <div key={movie.id} role="dialog" className="movieDialog">
            <div className="preview-dialog-model">
                <div className="preview-modal-play">
                    <div className="movie-img">
                        <img src={movie.backdrop_path} alt="Đây là poster phim .... " />
                    </div>
                </div>
                <div className="preview-modal-play"></div>
                <div className="preview-modal-info"></div>
            </div>
        </div>
    );
}

export default MovieDialog;
