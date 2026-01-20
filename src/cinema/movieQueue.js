import fs from "fs";
import path from "path";

let movieQueue = JSON.parse(fs.readFileSync(path.resolve("data/movies.json"), "utf-8"));

export function getNextMovie() {
    if (movieQueue.length === 0) return null;
    return movieQueue.shift();
}
