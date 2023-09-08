
const express = require('express');
const router = express.Router();

router.get("/games", async function (req, res, next) {
    try {
        fetch("https://api.rawg.io/api/games?key=353f4de2e4f54a26812a5ee816408273&dates=2023-06-22,2023-08-22&page_size=12")
            .then(response => response.json())
            .then(response => {
                res.json(response.results);
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/gamesPlatform", async function (req, res, next) {
    try {
        fetch("https://api.rawg.io/api/games?key=353f4de2e4f54a26812a5ee816408273&ordering=-released&page_size=50&platforms="+req.query.id)
            .then(response => response.json())
            .then(response => {
                res.json(response.results);
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/games/platforms", async function (req, res, next) {
    try {
        fetch("https://api.rawg.io/api/platforms?key=353f4de2e4f54a26812a5ee816408273&page_size=10")
            .then(response => response.json())
            .then(response => {
                res.json(response.results);
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;