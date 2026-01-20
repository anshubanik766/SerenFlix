let currentMovie = null;
let isPlaying = false;

export function setCurrentMovie(movie) {
    currentMovie = movie;
    isPlaying = true;
}

export function getCurrentMovie() {
    return currentMovie;
}

export function stopCinema() {
    currentMovie = null;
    isPlaying = false;
}

export function cinemaIsPlaying() {
    return isPlaying;
}
