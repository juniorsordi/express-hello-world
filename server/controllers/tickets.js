const db = require("../mariadb");
const jwt = require("jsonwebtoken");
var crypto = require('crypto');


async function getAllTickets() {
    const data = await db.query(`SELECT a.*, b.nome as userName FROM ticket a
        LEFT JOIN usuario b ON (b.id = a.user_id)
        ORDER BY a.id DESC
        LIMIT 0, 15`);
    return data;
}

async function getTicketByID(id) {
    const data = await db.query(`SELECT a.*, b.nome as userName FROM ticket a
        LEFT JOIN usuario b ON (b.id = a.user_id)
        WHERE a.id = ?`,[id]);
    const events = await db.query(`SELECT a.*, b.nome as userName, b.email FROM ticket_event a
    LEFT JOIN usuario b ON (b.id = a.user_id)
    WHERE ticket_id = ? 
    ORDER BY id ASC`,[id]);
    data[0]['events'] = events;
    return data;
}

async function saveTicketEvent(data, id) {
    console.log(data);
    //return data;
    return db.query("INSERT INTO ticket_event VALUES (null, ?, now(), ?, ?)",[id, data.event, data.user_id]);
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
        const tempUser = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
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
    const data = await db.query(`SELECT b.name as status, b.color, count(a.id) as total  from ticket a
        left join ticket_status b on(b.id = a.status_id and b.active = 1)
        group by b.name
        ORDER BY b.id`);
    return data;
}

async function getDashboardLastTickets() {
    const data = await db.query(`SELECT a.*, b.nome as userName FROM ticket a
        LEFT JOIN usuario b ON (b.id = a.user_id)
        ORDER BY a.id DESC
        LIMIT 0, 15`);
    return data;
}


module.exports = {
    userLogin,
    getAllTickets,
    getTicketByID,
    saveTicketEvent,
    getDashboardStatusTickets,
    getDashboardLastTickets
}