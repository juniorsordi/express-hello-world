const db = require("../infra/database");
const jwt = require("jsonwebtoken");
var crypto = require('crypto');

async function getAllTickets() {
    const data = await db.any(`SELECT a.*, b.nome as userName FROM ticket a
        LEFT JOIN usuario b ON (b.id = a.id_usuario)
        ORDER BY a.id DESC`);
    return data;
}

async function getTicketByID(id) {
    const data = await db.any(`SELECT a.*, b.nome as userName, b.email FROM ticket a
        LEFT JOIN usuario b ON (b.id = a.id_usuario)
        WHERE a.id = $1`,[id]);
    const events = await db.any(`SELECT a.*, b.nome as userName, b.email FROM ticket_evento a
    LEFT JOIN usuario b ON (b.id = a.id_usuario)
    WHERE id_ticket = $1 
    ORDER BY id ASC`,[id]);
    data[0]['eventos'] = events;
    return data;
}

async function saveTicketEvent(data, id) {
    return db.one("INSERT INTO ticket_evento VALUES (DEFAULT, $1, $2, $3, now()) RETURNING *",[id, data.user_id, data.event]);
}

async function saveTicket(fields) {
    return db.one("INSERT INTO ticket VALUES (DEFAULT, $1, null, 1, $2, $3, now(), null) RETURNING *",[ fields.user_id, fields.titulo, fields.event]);
}

async function userLogin(email, password) {
    try {
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(password);
        var tempHash = hashPassword.digest('hex');
        // Validate if user exist in our database
        const tempUser = await db.one("SELECT * FROM usuario WHERE email = $1", [email]);
        const user = tempUser[0];
        if (user && (tempHash == user.password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email },
                `${process.env.TOKEN_KEY }`,
                {
                    expiresIn: "4h",
                }
            );
            // save user token
            user.success = true;
            user.token = token;
            return user;
        }
        return null;
    } catch (err) {
        console.log(err);
    }
}

async function getDashboardStatusTickets() {
    const data = await db.any(`SELECT b.nome as status, b.cor, count(a.id) as total  from ticket a
        left join ticket_status b on(b.id = a.id_situacao and b.ativo = 1)
        group by b.nome, b.cor, b.id
        ORDER BY b.id`);
    return data;
}

async function getDashboardLastTickets() {
    const data = await db.any(`SELECT a.*, b.nome as userName FROM ticket a
        LEFT JOIN usuario b ON (b.id = a.id_usuario)
        ORDER BY a.id DESC`);
    return data;
}


module.exports = {
    userLogin,
    getAllTickets,
    getTicketByID,
    saveTicketEvent,
    getDashboardStatusTickets,
    getDashboardLastTickets,
    saveTicket,
}