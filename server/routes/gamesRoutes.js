
const express = require('express');
const router = express.Router();
const moment = require("moment");

router.get("/", async function (req, res, next) {
    try {
        let hoje = moment().format("YYYY-MM-DD");
        let oldDate = moment().add(-15, "days").format("YYYY-MM-DD");
        fetch(`https://api.rawg.io/api/games?key=353f4de2e4f54a26812a5ee816408273&dates=${oldDate},${hoje}&page_size=30`)
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

router.get("/gamesByPlatform", async function (req, res, next) {
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

router.get("/gameInfo", async function (req, res, next) {
    try {
        fetch("https://api.rawg.io/api/games/"+req.query.id+"?key=a9dc202186f5446bb0702b8e6cf64d97&page_size=50")
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

router.get("/searchGames", async function (req, res, next) {
    try {
        let query = encodeURI(req.query);
        fetch("https://api.rawg.io/api/games?key=353f4de2e4f54a26812a5ee816408273&"+query)
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

router.get("/platforms", async function (req, res, next) {
    try {
        fetch("https://api.rawg.io/api/platforms?key=353f4de2e4f54a26812a5ee816408273&page_size=30")
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