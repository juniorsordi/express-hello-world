const db = require('../infra/database');
var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const utils = require("../infra/utils");
const companyCtrl = require("./company");

async function userLogin(email, password) {
    try {
        // Validate user input
        if (!(email && password)) {
            //res.status(400).send("All input is required");
            return null;
        }
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(password);
        var tempHash = hashPassword.digest('hex');
        // Validate if user exist in our database
        //const tempUser = await db1.query("SELECT * FROM usuario WHERE email = ?", [email]);
        const user = await db.get("SELECT * FROM usuario WHERE email = ?", [email]);

        if (user && (tempHash == user.senha)) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email, foto: user.foto },
                `${process.env.TOKEN_KEY}`,
                {
                    expiresIn: "24h",
                }
            );
            user.initials = utils.createInitials(user.nome);
            // save user token
            user.success = true;
            user.token = token;
            return user;
        } else {

        }
        return null;
    } catch (err) {
        console.log(err);
    }
}

async function userRegister(fields) {
    try {
        let { nome, email, senha, empresa } = fields;
        
        let temp = await companyCtrl.createCompany(empresa);
        let idEmpresa = temp.id;
        ///
        let hashPassword = crypto.createHash('sha1').update(senha);
        var tempHash = hashPassword.digest('hex');
        ///
        let senha2 = tempHash;
        let SQL = `INSERT INTO usuario VALUES (null, '${nome}', '${email}', '${senha2}', null, 1, 1, 0, ${idEmpresa}) returning *`;
        return await db.get(SQL);
    } catch (err) {
        console.log(err);
    }
    
}

module.exports = {
    userLogin,
    userRegister
}