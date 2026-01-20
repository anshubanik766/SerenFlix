import fs from "fs";
import path from "path";

const HISTORY_PATH = path.resolve("data/history.json");

function readHistory() {
    if (!fs.existsSync(HISTORY_PATH)) return [];
    return JSON.parse(fs.readFileSync(HISTORY_PATH, "utf-8"));
}

function writeHistory(data) {
    fs.writeFileSync(HISTORY_PATH, JSON.stringify(data, null, 2));
}

export function addHistory(movie, user) {
    const history = readHistory();

    history.unshift({
        movieId: movie.id,
        title: movie.title,
        userId: user.id,
        username: user.username,
        watchedAt: new Date().toISOString()
    });

    if (history.length > 50) history.length = 50;

    writeHistory(history);
}

export function getHistory(limit = 10) {
    return readHistory().slice(0, limit);
}
