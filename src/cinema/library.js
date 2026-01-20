import fs from "fs";
import path from "path";

const filePath = path.resolve("data/movies.json");
const movies = JSON.parse(fs.readFileSync(filePath, "utf-8"));

export function getAllMovies() {
    return movies;
}

export function getMovieByName(name) {
    return movies.find(
        m => m.title.toLowerCase() === name.toLowerCase()
    );
}
