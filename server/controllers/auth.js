const db = require('../infra/database');
//const postgres = require('../infra/postgres');
var crypto = require('crypto');
const jwt = require("jsonwebtoken");
const utils = require("../infra/utils");
const companyCtrl = require("./company");

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
        const user = await db.any("SELECT * FROM usuario WHERE email = $1", [emailC]);
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
}