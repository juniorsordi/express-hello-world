const db = require('../infra/database');
//const postgres = require('../infra/postgres');
var crypto = require('crypto');
const sha256 = require('sha256');
const jwt = require("jsonwebtoken");
const utils = require("../infra/utils");
const companyCtrl = require("./company");
var pbkdf2 = require('pbkdf2')

var fs = require('fs');
//var parser = require('xml2json');

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
                { user_id: user.id, email, foto: user.foto, id_empresa: user.id_empresa },
                `${process.env.TOKEN_KEY}`,
                {
                    expiresIn: "20h",
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

async function userRegisterPG(fields) {
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
        return await db.run(SQL);
    } catch (err) {
        console.log(err);
    }
    
}

async function userLoginPG(email, password) {
    try {
        // Validate user input
        if (!(email && password)) {
            //res.status(400).send("All input is required");
            return { success: false, msg: 'Email ou senha vazios'};
        }
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(password.trim());
        var tempHash = hashPassword.digest('hex');
        // Validate if user exist in our database
        let emailC = email.trim();
        const user = await db.one("SELECT * FROM usuario WHERE email = $1", [emailC]);
        if (user && (tempHash == user.senha)) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email: emailC, foto: user.foto },
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
        }
        return { success: false, msg: 'Usuário não encontrado' };
    } catch (err) {
        console.log(err);
    }
}

async function testePassword() {
    //ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413
    //ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413
    let pwdDB = "b32f01d1d3c368fc335b99d9a18a23e9dd7187d73e971f7c940daa17c91f411ef9f162765409af271c432513ee3ccaad17bee0cbf0f708698ef689981caefcb0";
    let salt1 = "dc2661d30c89cd5922e4f464a8265e265719e87a6133d2e591fd3fe501e43c6045832c2636a1eff31133d52f1f2c1e2af5e0eb3ff1e3229b32f571a4be556698";
    //var hash = crypto.createHash('sha256').update("123456").digest('base64');
    /*
    var hash = crypto.createHash('sha256').update("123456").digest('hex');
    var hash2 = sha256('123456');
    return { pwd: hash, pwd2: hash2 }
    //*/
    let password = '123456';
    var salt = crypto.randomBytes(128).toString('hex');
    var iterations = 10000;
    var hash = pbkdf2.pbkdf2Sync(password, salt1, 1, 64, 'sha512');
    var hash2 = crypto.createHash('sha512').update(password).digest('hex');
    var hash3 = crypto.createHash('sha512').update(hash2+salt1).digest('hex');

    return {
        salt: salt,
        pwdDB,
        hash3,
        hash: hash.toString("hex"),
        hash2: hash2,
        iterations: iterations
    };
}

async function processManifestXML() {
    /*
    fs.readFile('./manifest_sample.xml', function (err, data) {
        var json = parser.toJson(data, { object: true });
        //console.log("to json ->", );
        var temp1 = json.manifest.items.item;
        console.log(temp1[0].articles);
        for (const item of temp1) {

            let articles = [];
            var temp2 = item.articles;
            if (temp2.length > 0) {
                for (var i = 0; i < temp2.length;i++) {
                    let obj = temp2[i].article;
                    let temp = {
                        "itemNo": i,
                        "description": obj.name,
                        "hsCode": obj.hs_tariff_no,
                        "originCountry": obj.country_of_origin,
                        "unitValue": obj.unit_value,
                        "weight": obj.unit_weight,
                        "itemCount": obj.unit_quantity
                    }
                    articles.push(temp);
                };
            } else {
                for (var i = 0; i < temp2.article.length; i++) {
                    let obj = temp2.article[i];
                    let temp = {
                        "itemNo": i,
                        "description": obj.name,
                        "hsCode": obj.hs_tariff_no,
                        "originCountry": obj.country_of_origin,
                        "unitValue": obj.unit_value,
                        "weight": obj.unit_weight,
                        "itemCount": obj.unit_quantity
                    }
                    articles.push(temp);
                };
            }
            
            let etowerRequest = {
                "referenceNo": item.order_no,
                "trackingNo": item.tracking_no,
                "facility": "*",
                "recipientName": item.receiver_name,
                "email": item.receiver_email_address,
                "phone": item.receiver_phone_no,
                "serviceCode": "DLUS.EXT.CLAS.LABEL",
                "incoterm": "DDU",
                "country": item.receiver_country_code,
                "addressLine1": item.receiver_address1,
                "addressLine2": item.receiver_address2,
                "addressLine3": "",
                "city": item.receiver_city,
                "state": item.receiver_state,
                "postcode": item.receiver_post_code,
                "weight": item.total_weight,
                "weightUnit": "kg",
                "recipientTaxId": "",
                "orderItems": articles,
                "description": item.description_content,
                "invoiceCurrency": item.invoice_currency,
                "invoiceValue": item.invoice_amount,
                "batteryType": "No Battery",
                "batteryPacking": "No Battery"
            };
            console.log(etowerRequest);
        }
        //console.log(temp1);
        
    });
    //*/
}

module.exports = {
    userLogin,
    userRegister,
    userLoginPG,
    userRegisterPG,
    processManifestXML,
    testePassword,
}