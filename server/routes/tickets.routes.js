const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/tickets');
var mailer = require("../infra/mailer");

router.get("/dashboard/status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getDashboardStatusTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/lastTickets", auth, async function (req, res, next) {
    try {
        res.json(await controller.getDashboardLastTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/list", auth, async function (req, res, next) {
    try {
        res.json(await controller.getAllTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.getTicketByID(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await controller.saveTicket(req.body, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/:id/event", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await controller.saveTicketEvent(req.body, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/test/email", async function (req, res, next) {
    var name = "RB";
    var company = "Consultoria RB";
    let email = {
        replyTo: 'noreply@consultoria.com.br',
        to: 'juniorsordi82@gmail.com',
        subject: 'Mail Test 3',
        message: `<h2>Hello ${name}! </h2>
  <p>We're glad to have you on board at ${company}. </p>`
    };
    var resp = await mailer.send(email);
    res.json(resp);
});//*/

module.exports = router;