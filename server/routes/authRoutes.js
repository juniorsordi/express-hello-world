const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
var fs = require("fs");
var xml2js = require('xml2js');
//const ofx = require('ofx-convertjs');
var ofxParse = require('../infra/ofx2');
var multer = require('multer');
const upload = multer({ dest: "uploads/" });
const AWS = require("aws-sdk");
const s3 = new AWS.S3()

const controller = require('../controllers/auth');
const utils = require('../infra/utils');


router.post("/auth/login", async function (req, res, next) {
    try {
        // Get user input
        const { email, password } = req.body;
        const user = await controller.userLoginPG(email, password);
        // user
        if (user) {
            res.cookie("access_token", user.token, {
                httpOnly: true,
                maxAge: 86400000,
                secure: process.env.NODE_ENV === "production",
            });
            //
            res.cookie("user", user, { maxAge: 86400000 });
            res.cookie("IDUser", user.id, { maxAge: 86400000 });
            res.cookie("IDEmpresa", user.id_empresa, { maxAge: 86400000 });
            res.cookie("token", user.token, { maxAge: 86400000 });
            //*/
            req.session.loggedin = true;
            req.session.userID = user.id;
            //req.session.user = user;
            req.session.token = user.token;
            req.session.save(function(err) { console.log(err); });
            res.status(200).json(user);
        } else {
            res.status(200).json({ success: false, msg: "Invalid Credentials" });
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

router.post("/auth/register", async function (req, res, next) {
    let response = await controller.userRegister(req.body);
    if(response) {
        response.success = true;
        response.Msg = "Conta criada com sucesso!";
    }
    res.status(200).json(response);
});

router.get("/test/seq", async function (req, res, next) {
    //let resp = seq1.connect();
    let resp = await controller.userLoginPG("dilson@sc.senac.br","123456");
    res.status(200).json(resp);
});

router.get("/auth/checkToken", upload.array("file"), async function (req, res, next) {
    let token = req.cookies.token;
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        res.status(200).json(decoded);
    } catch (err) {
        res.status(200).json({ valid: false, error: "Unauthorized! Invalid Token" });
    }
    
});

router.post("/ofx/upload", async function (req, res, next) {
    let filename = req.files;
    if (filename || filename.length == 0) {
        return;
    }
    //console.log(filename);
    //res.json(filename.file.tempFilePath);
    
    const file = fs.readFileSync(filename.file.tempFilePath, 'utf8');
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
})

router.post("/ofx/upload2", upload.array("file"), uploadFiles);

function uploadFiles(req, res) {
    let filename = req.files;
    if(filename.length == 0) {
        return;
    }
    
    const file = fs.readFileSync(filename[0].path, 'utf8');
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
            if(item.valor > 0) {
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
    
    /*
    ofxParse.parse(file).then(ofxData => {
        console.log(ofxData.OFX.BANKMSGSRSV1.LEDGERBAL);
        let infoSaldo = {
            valor: ofxData.OFX.BANKMSGSRSV1.LEDGERBAL.BALAMT,
            data: utils.formatDateDMY(ofxData.OFX.BANKMSGSRSV1.LEDGERBAL.DTASOF)
        };
        let listaTransacoes = ofxData.OFX.BANKMSGSRSV1.BANKTRANLIST.STMTTRN;
        let i = 0;
        let saldoInicial = parseFloat(ofxData.OFX.BANKMSGSRSV1.LEDGERBAL.BALAMT);
        let transacoes2 = [];
        listaTransacoes.map(function (item) {
            if (i == 0) {
                item.saldo = parseFloat(item.TRNAMT);
            } else {
                item.saldo = listaTransacoes[i - 1].saldo + parseFloat(item.TRNAMT);
            }
            item.valor = parseFloat(item.TRNAMT);
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

        res.json({ message: "Successfully uploaded files", saldo: infoSaldo, transacoes: transacoes2, saldoFinal: saldoInicial });
    });
    //*/
    /*
    const data = ofx.toJson(file);

    const infoSaldo = {
        valor: data.OFX.BANKMSGSRSV1.LEDGERBAL.BALAMT,
        data: utils.formatDateDMY(data.OFX.BANKMSGSRSV1.LEDGERBAL.DTASOF)
    };
    const listaTransacoes = data.OFX.BANKMSGSRSV1.BANKTRANLIST.STMTTRN;
    let i = 0;
    let saldoInicial = parseFloat(data.OFX.BANKMSGSRSV1.LEDGERBAL.BALAMT);
    let transacoes2 = [];
    listaTransacoes.map(function (item) {
        if (i == 0) {
            item.saldo = parseFloat(item.TRNAMT);
        } else {
            item.saldo = listaTransacoes[i - 1].saldo + parseFloat(item.TRNAMT);
        }
        item.valor = parseFloat(item.TRNAMT);
        item.dataoperacao = item.DTPOSTED.substr(6, 2) + '/' + item.DTPOSTED.substr(4, 2) + '/' + item.DTPOSTED.substr(0, 4);

        transacoes2.push({
            dataoperacao: item.dataoperacao,
            descricao: item.MEMO,
            nome: item.NAME,
            valor: parseFloat(item.TRNAMT),
            tipo: (item.TRNTYPE == 'OTHER' ? (item.valor > 0 ? 'CREDITO' : 'DEBITO') : item.TRNTYPE+'O')
        });
        saldoInicial += parseFloat(item.TRNAMT);
        i++;
    });
    //*/
    //res.json({ message: "Successfully uploaded files", saldo: infoSaldo, transacoes: transacoes2, saldoFinal: saldoInicial });
}

router.get("/ofx/upload", async function (req, res, next) {
    /*
    const data = ofx.toJson(file);
    const infoSaldo = {
        valor: data.OFX.BANKMSGSRSV1.LEDGERBAL.BALAMT,
        data: utils.formatDateDMY(data.OFX.BANKMSGSRSV1.LEDGERBAL.DTASOF)
    };
    const listaTransacoes = data.OFX.BANKMSGSRSV1.BANKTRANLIST.STMTTRN;
    let i = 0;
    listaTransacoes.map(function(item) {
        if(i == 0) {
            item.saldo = parseFloat(item.TRNAMT);
        } else {
            item.saldo = listaTransacoes[i-1].saldo + parseFloat(item.TRNAMT);
        }
        item.dataoperacao = item.DTPOSTED.substr(6, 2) + '/' + item.DTPOSTED.substr(4, 2) + '/' + item.DTPOSTED.substr(0, 4);
        i++;
    });
    //*/
    //const ofxString = readFile("bank-statement.ofx");
    const file = fs.readFileSync('extrato_202307.ofx', 'utf8')
    ofxParse.parse(file).then(ofxData => {
        let infoSaldo = {};
        const statementResponse = ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS;
        const accountId = statementResponse.BANKACCTFROM.ACCTID;
        //const currencyCode = currencyCode = statementResponse.CURDEF;
        const transactionStatement = statementResponse.BANKTRANLIST.STMTTRN;
        // do something...
        res.status(200).json({ saldo: infoSaldo, transacoes: transactionStatement });
    });
    
});

module.exports = router;