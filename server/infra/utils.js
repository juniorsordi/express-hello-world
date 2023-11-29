require('dotenv').config();
const { Pool, Client } = require("pg");
var util = require("util");
const fs = require("fs");
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const HTMLtoDOCX = require('html-to-docx');

var ofxParse = require('./ofx2');
var moment = require("moment");

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
        doc = new Docxtemplater(zip, {nullGetter() { return ''; }, modules: [new HTMLModule({})]});
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

const testeDocx = async function(item) {
    //if(fs.existsSync("./public/G4F/docs/"+item.numero_os+".html")) {
    //    return { arquivo: `G4F/docs/${item.numero_os}.html`}
    //} else {
        let documentOptions = { "orientation": "portrait", header: true, footer: true, pageNumber: true, table: { row: { cantSplit: true } }, };
        let headerHTMLString = `<img src="https://virtual.qa.tce.sc.gov.br/web/image/logoTCESC.png" width="128" /><br>`;
        let footerHTMLString = "";
        const filePath = './output/'+item.numero_os+'.docx';
        ///
        let htmlDetalhamento = `<div>`;
        let i = 1;
        for(const detalhe of item.detalhamentos) {
            htmlDetalhamento += `<h3>3.${i} - ${detalhe.nome_detalhamento}</h3>
            <table align="center" class="table table-bordered">
                <tr><th style="background-color: #c9c9c9;">Breve descrição da funcionalidade:</th><td>${detalhe.nome_detalhamento}</td></tr>
                <tr><th colspan="2" style="background-color: #c9c9c9;">Passo a Passo de acesso a Funcionalidade</th></tr>
                <tr><th colspan="2">${ (detalhe.passo_passo == null ? "" : detalhe.passo_passo)}</th></tr>
                <tr><th colspan="2" style="background-color: #c9c9c9;">Descrição da Manutenção</th></tr>
                <tr>
                    <th>${detalhe.detalhamento}</th>
                    <td>
                        ${detalhe.tipo}
                    </td>
                </tr>
                <tr><th colspan="2" style="background-color: #c9c9c9;">Interface do usuário</th></tr>
                <tr><th colspan="2">${ (detalhe.interface == null ? "" : detalhe.interface)}</th></tr>
            </table>
            <br />
            Alterações no Banco de Dados
            <table align="center" class="table table-bordered">
                <tr><th style="background-color: #c9c9c9;text-align: center;">Descrição da Manutenção</th></tr>
                <tr><td>${ (detalhe.alteracao_banco == null ? 'Não houve' : detalhe.alteracao_banco) }</td></tr>
            </table>
            <br /><br />
            `;
            i++;
        }
        htmlDetalhamento += `</div>`;
        ///
        let htmlString = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <title>Document</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.2/css/bootstrap.min.css">
                </head>
                <body>
                    <h2 style="text-align: center;">Controle de Mudanças</h2>
                    <table align="center" class="table table-bordered">
                        <tr>
                            <th colspan="4" style="background-color: #f1878f;text-align: center;">Histórico de revisões</th>
                        </tr>
                        <tr>
                            <th align="center" style="background-color: #f1878f;text-align: center;">Data</th>
                            <th align="center" style="background-color: #f1878f;text-align: center;">Versão</th>
                            <th align="center" style="background-color: #f1878f;text-align: center;">Descrição</th>
                            <th align="center" style="background-color: #f1878f;text-align: center;">Autor</th>
                        </tr>
                        <tr>
                            <td>27/11/2023</td>
                            <td>1.0</td>
                            <td>Criação do Documento</td>
                            <td>${item.nome_analista}</td>
                        </tr>
                    </table>
                    <br />
                    <h3>1 - IDENTIFICAÇÃO</h3>
                    <table align="center" class="table table-bordered">
                        <tr><th style="background-color: #c9c9c9;">Nº OS</th><td>${item.numero_os}</td></tr>
                        <tr><th style="background-color: #c9c9c9;">Sistema (Sigla-Descrição)</th><td>${item.sistema}</td></tr>
                        <tr><th style="background-color: #c9c9c9;">Solicitante (Nome/Área)</th><td>${item.solicitante}</td></tr>
                        <tr><th style="background-color: #c9c9c9;">Unidade do Requisitante</th><td>${item.unidade}</td></tr>
                        <tr><th style="background-color: #c9c9c9;">Analista Responsável</th><td>${item.nome_analista}</td></tr>
                        <tr><th style="background-color: #c9c9c9;">Tipo da Demanda</th><td>${item.tipo_demanda}</td></tr>
                    </table>
                    <h3>2 - DESCRIÇÃO DA SOLICITAÇÃO</h3>
                    <div style="text-align: 'justify';">
                        ${item.descricao}
                    </div>
                    <h3>3 - DETALHAMENTO DAS FUNCIONALIDADES A SEREM EXECUTADAS</h3>
                    <div>
                        ${htmlDetalhamento}
                    </div>
                    <h3>4 - INFORMAÇÕES COMPLEMENTARES</h3>
                    <div>\t\t\t<table align="center" class="table table-bordered">
                            <tr><th style="background-color: #c9c9c9;">Tecnologia</th><td>${item.nome_tecnologia}</td></tr>
                            <tr><th style="background-color: #c9c9c9;">Quantidade de Profissionais alocados na Execução da OS/ iteração</th><td>${item.total_alocados}</td></tr>
                            <tr><th style="background-color: #c9c9c9;">Tempo Gasto</th><td>${item.tempo_gasto} ${item.tempo_gasto_medida}</td></tr>
                        </table>
                    </div>
                    <div class="page-break" style="page-break-before: always"></div>
                    <h3>5 - APROVAÇÃO</h3>
                    <div>
                            O detalhamento acima está em conformidade com as nossas reais necessidades.
                            <table align="center" class="table table-bordered" cellpadding=0 cellspacing=0>
                                <tr><th style="background-color: #c9c9c9;" colspan="2">ASSINATURAS</th></tr>
                                <tr><th style="background-color: #c9c9c9;">Fiscal Requisitante do Contrato</th><th style="background-color: #c9c9c9;">Fiscal Técnico do Contrato</th></tr>
                                <tr>
                                    <td style="text-align: center;"><br />_____________________<br />\nNome do Fiscal<br />\nMatrícula nº</td>
                                    <td style="text-align: center;"><br />_____________________<br />\nNome do Fiscal<br />\nMatrícula nº</td>
                                </tr>
                                <tr><th style="background-color: #c9c9c9;text-align: center;" colspan="2">Brasília, _____ de _____________________ de 20__</th></tr>
                                <tr><th style="background-color: #f1878f;" colspan="2"></th></tr>
                            </table>
                    </div>
                </body></html>`;
        ///
        fs.writeFileSync("./test.html", htmlString);
        fs.writeFileSync("./public/G4F/docs/"+item.numero_os+".html", htmlString);
        /*
        const fileBuffer = await HTMLtoDOCX(htmlString, headerHTMLString, documentOptions, footerHTMLString);
        fs.writeFile(filePath, fileBuffer, (error) => {
            if (error) {
                console.log('Docx file creation failed');
                console.log(error);
                return;
            }
            console.log('Docx file created successfully');
        });//*/
        return { arquivo: `G4F/docs/${item.numero_os}.html`}
    //}
    
}

const gerarControleMudancaTemplateG4F = function(dados) {
    const content = fs.readFileSync('modeloG4F.docx', 'binary');
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
	config.database.user = process.env.DATABASE_USER || 'postgres';
	config.database.database = process.env.DATABASE_DB || 'backstage';
	config.database.password = process.env.DATABASE_PW || '123456';
	config.database.host = process.env.DATABASE_HOST || 'localhost';
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
    gerarControleMudancaTemplateG4F,
    getOutstandingMigrations,
    getClient,
    parseOFXFile,
    testeDocx,
};