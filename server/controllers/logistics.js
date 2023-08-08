const db = require("../mariadb");
var crypto = require('crypto');
var moment = require("moment");
const xlsx = require('xlsx');

async function createLabel(idEmpresa) {
    const data = await db.query("SELECT * FROM financas_contas_pagar WHERE id_customer = ? ORDER BY data_vencto ASC", [idEmpresa]);
    return data;
}

async function insertFIMSItem2(item) {
    let postalID = (item.PostalID ? item.PostalID : null);
    let labelDate = (item.Date ? moment(item.Date).format("YYYY-MM-DD") : null);
    let COMPANY = (item.Company ? item.Company : null);
    let Name = (item.Name ? item.Name : null);
    let shipperCountry = (item['Shipper Country'] ? item['Shipper Country'] : 'US');
    let data = null
    try {
        data = await db.query("INSERT INTO directlink.fims_report VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [postalID, item.Identification, COMPANY, Name, item['Shipper State'], shipperCountry,
                item['Recipient Country'], item['Label Type'], item.SourceType, labelDate]);
    } catch (error) {
        console.log([item, error]);
    }
    return data;
}

async function processXLSFile(fileName) {
    const workbook = xlsx.readFile(fileName);
    const sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    //*
    data.map(el => {
    //data.forEach(el => {
        if(el['Postal ID']) {
            let SQL = "INSERT INTO directlink.fims_report_3 VALUES (null, ?, ?, ?, ?, ?, ?, ?)";
            db.query(SQL,[el['Postal ID'], el['FIMS AWB'], el['Reference'], el['Value'], el['Dest. Country'], el['Date Printed'], el['Customer']]);
        }
    });
    //*/
    //console.log(data[1]);
    //let line1 = data[1];
    //let SQL = "INSERT INTO ";
    //console.log([line1['Postal ID'], line1['FIMS AWB'], line1['Reference'], line1['Value'], line1['Dest. Country'], line1['Customer']])
}

async function insertFIMSItem(item) {
    try {
        let postalID = item.postal_id;
        let labelDate = item.label_date;
        let COMPANY = (item.company ? item.company : null);
        let Name = (item.shipper_name ? item.shipper_name : null);
        let shipperCountry = (item.shipper_country ? item.shipper_country : 'US');
        let data = null
        try {
            data = await db.query("INSERT INTO directlink.fims_report_2 VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [postalID, item.reference_id, COMPANY, Name, item.shipper_state, shipperCountry,
                    item.recipient_country, item.label_type, item.source_type, labelDate]);
        } catch (error) {
            console.log([item, error]);
        }
        return data;
    } catch (error) {
        
    }
    
}

module.exports = {
    createLabel,
    processXLSFile,
    insertFIMSItem,
    insertFIMSItem2,
}

/*
CREATE TABLE fims_report (
    id int primary key auto_increment,
    postal_id varchar(50),
    reference_id varchar(50),
    company varchar(350),
    shipper_name varchar(350),
    shipper_state varchar(50),
    shipper_country varchar(50),
    recipient_country varchar(50),
    label_type int,
    source_type varchar(50),
    label_date date
);
*/