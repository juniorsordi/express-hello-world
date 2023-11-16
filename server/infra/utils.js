require('dotenv').config();
const { Pool, Client } = require("pg");
var util = require("util");
const fs = require("fs");
var ofxParse = require('./ofx2');

const createInitials = function (text) {
    if (!text) return "";
    if (text.length <= 2) return text;
    let parts = text.split(" ");
    let first = parts[0].charAt(0);
    let last = parts[parts.length - 1].charAt(0);
    return (first + last).toUpperCase();
};

const formatDateDMY = function(oldDate) {
    let temp = oldDate.substr(6, 2) + '/' + oldDate.substr(4, 2) + '/' + oldDate.substr(0, 4);
    return temp;
}

const gerarControleMudancaTemplate = function(dados) {
    const content = fs.readFileSync('modelo2.docx', 'binary');
    const zip = new PizZip(content);
    var doc;
    try {
        doc = new Docxtemplater(zip, {nullGetter() { return ''; }});
    } catch (error) {
        errorHandler(error);
    }
    doc.setData(dados);
    try {
        doc.render();
    } catch (error) {
        errorHandler(error);
    }
    let fileName = dados.numero_os+'.docx';
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync('./output/'+dados.numero_os+'.docx', buf);
    console.log(`"${dados.numero_os}.docx" written to disk`);
    return fileName;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrxors));
  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join('\n');
    console.log('errorMessages', errorMessages);
  }
  throw error;
}

async function getOutstandingMigrations(migrations = []) {
    const files = await util.promisify(fs.readdir)(__dirname+"/../../database/migrations/");
    const sql = await Promise.all(
        files
        .filter((file) => file.split(".")[1] === "sql")
        .filter((file) => !migrations.includes(file))
        .map(async (file) => ({
            file,
            query: await util.promisify(fs.readFile)(`${__dirname}/../../database/migrations/${file}`, {
            encoding: "utf-8",
            }),
        }))
    );

  return sql;
}

async function getClient() {
	let config = {};
	config.database = {};
	config.database.port = process.env.DATABASE_PORT || 5432;
	config.database.user = process.env.DATABASE_USER_LOCAL || 'postgres';
	config.database.database = process.env.DATABASE_DB_LOCAL || 'backstage';
	config.database.password = process.env.DATABASE_PW_LOCAL || '123456';
	config.database.host = process.env.DATABASE_HOST_LOCAL || 'localhost';
	//config.database.ssl = { require: false, };

    try {
		//console.log(config.database);
        const client = new Client(config.database);
        await client.connect();
        return client;
    } catch (error) {
        console.log(error);
    }
    
}

async function parseOFXFile(file) {
    let info = await ofxParse.parse(file);
    let ofxData = info;

    let infoSaldo = {
        valor: ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL.BALAMT,
        data: formatDateDMY(ofxData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL.DTASOF)
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

    let infos = { saldo: infoSaldo, transacoes: transacoes2, resumo };
    return infos;
    //*/
}

module.exports = {
    createInitials,
    formatDateDMY,
    gerarControleMudancaTemplate,
    getOutstandingMigrations,
    getClient,
    parseOFXFile,
};