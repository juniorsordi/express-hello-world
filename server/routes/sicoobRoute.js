const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
var fs = require("fs");
var ofxParse = require('../infra/ofx2');

const controller = require('../services/sicoobService');
const utils = require('../infra/utils');

router.post("/auth/login", async function (req, res, next) {
    try {
        // Get user input
        const { email, password } = req.body;
        const user = await controller.userLogin(email, password);
        // user
        if (user) {
            res.cookie("access_token", user.token, {
                httpOnly: true,
                maxAge: 86400000,
                secure: process.env.NODE_ENV === "production",
            });
            //
            res.cookie("user", user, { maxAge: 86400000 });
            res.cookie("Logado", 1, { maxAge: 86400000 });
            res.cookie("IDUser", user.id, { maxAge: 86400000 });
            //*/
            req.session.loggedin = true;
            req.session.userID = user.id;
            //req.session.user = user;
            req.session.token = user.token;
            req.session.save(function (err) { console.log(err); });
            res.status(200).json(user);
        } else {
            res.status(200).json({ success: false, msg: "Usuário ou senha incorretos." });
        }

    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/auth/logout", async function (req, res, next) {
    req.session.destroy();
    res.status(200).json([]);
});

router.post("/ofx/upload", async function (req, res, next) {
    let filename = req.files;
    if (filename) {
        if (filename.length == 0) {
            return;
        }
    } else {
        return;
    }
    console.log(filename);
    const file = fs.readFileSync(filename.file.tempFilePath, 'utf8');
    //res.json(filename.file.tempFilePath);
    try {
        /*
        let s3File = await s3.getObject({
            Bucket: process.env.CYCLIC_BUCKET_NAME,
            Key: filename.file.name,
        }).promise()

        res.set('Content-type', s3File.ContentType)
        res.send(s3File.Body.toString()).end()
        //*/
        /*
        await s3.putObject({
            Body: file,
            Bucket: process.env.CYCLIC_BUCKET_NAME,
            Key: filename.file.name,
        }).promise()
        //*/
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            console.log(`No such key ${filename}`)
            res.sendStatus(404).end()
        } else {
            console.log(error)
            res.sendStatus(500).end()
        }
    }
    ///
    try {
        
        ofxParse.parse(file).then(ofxData => {
            let infoSaldo = {
                valor: ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL.BALAMT,
                data: utils.formatDateDMY(ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL.DTASOF)
            };

            let resumo = {
                creditos: 0,
                debitos: 0
            };

            let listaTransacoes = ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
            let transacoes2 = [];
            let saldoInicial = parseFloat(ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL.BALAMT);
            let i = 0;
            listaTransacoes.map(function (item) {
                if (i == 0) {
                    item.saldo = parseFloat(item.TRNAMT);
                } else {
                    item.saldo = listaTransacoes[i - 1].saldo + parseFloat(item.TRNAMT);
                }
                item.valor = parseFloat(item.TRNAMT);
                if (item.valor > 0) {
                    resumo.creditos += item.valor;
                } else {
                    resumo.debitos += item.valor;
                }
                item.dataoperacao = item.DTPOSTED.substr(6, 2) + '/' + item.DTPOSTED.substr(4, 2) + '/' + item.DTPOSTED.substr(0, 4);

                transacoes2.push({
                    dataoperacao: item.dataoperacao,
                    descricao: item.MEMO,
                    nome: item.NAME,
                    valor: parseFloat(item.TRNAMT),
                    tipo: (item.TRNTYPE == 'OTHER' ? (item.valor > 0 ? 'CREDITO' : 'DEBITO') : item.TRNTYPE + 'O')
                });
                saldoInicial += parseFloat(item.TRNAMT);
                i++;
            });

            res.json({ message: "Successfully uploaded files", saldo: infoSaldo, transacoes: transacoes2, resumo });
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.get("/ofx/list", async function (req, res, next) {
    let list = await s3.listObjectsV2({
        Bucket: process.env.CYCLIC_BUCKET_NAME
    }).promise();
    res.json(list);
});

router.get("/ofx/file/:id", async function (req, res, next) {
    try {
        /*
        let s3File = await s3.getObject({
            Bucket: process.env.CYCLIC_BUCKET_NAME,
            Key: req.params.id,
        }).promise();

        res.json({ arquivo: s3File.Body.toString() });//*/
        res.json({ });
    } catch (error) {
        if (error.code === 'NoSuchKey') {
            console.log(`No such key ${req.params.id}`)
            res.sendStatus(404).end()
        } else {
            console.log(error)
            res.sendStatus(500).end()
        }
    }
});

module.exports = router;