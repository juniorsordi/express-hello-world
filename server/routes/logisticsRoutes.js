const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/logistics');
const ETower = require('../controllers/ETower');
const path = require("path");
const xlsx = require("xlsx");
var request = require('request');
var crypto = require('crypto');
const APG = require("../integrations/APG");
const ePost = require("../integrations/ePost");
const fs = require("fs");
const { parse } = require("csv-parse");
var moment = require("moment");
const db = require("../mariadb");

const url = 'http://qa.etowertech.com';

router.get("/shipper/importXLSX", auth, async function (req, res, next) {
    try {
        const filePath = path.resolve(__dirname, "../orderGridExport-20230613035440.xlsx");

        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        // Get the data of "Sheet1"
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

        /// Do what you need with the received data
        /*
        data.map(person => {
            console.log(`${person.Name} is ${person.Age} years old`);
        });
        //*/
        res.json(data);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/shipper/uploadFIMS", async function (req, res, next) {
    try {
        const fileName = "pkgSearch_Detail_2023_01_1.csv";
        //const fileName2 = "uploads/ShipFIMS_2023_Jan_1.xlsx";
        const fileName2 = "uploads/ShipFIMS_2023_Jan_2.xlsx";
        const fileName3 = "uploads/" + req.query.file +".xlsx";
        //const fileName3 = "uploads/pkgSearch_Detail_2023_01_2.xlsx";
        //const fileName3 = "uploads/TesteShipFims.xlsx";
        //console.log(req.query.file);
        /*
        fs.createReadStream("./uploads/" + fileName)
            .pipe(parse({ delimiter: ",", from_line: 1 }))
            .on("data", function (row) {
                let type = row[0];
                if(type == 'H') {
                    console.log(row);
                }
            })
            .on("end", function () {
                console.log("finished");
            })
            .on("error", function (error) {
                console.log(error.message);
            });
        //*/
        //const filePath = path.resolve(__dirname, fileName3);
        //res.json([]);
        //*
        const workbook = xlsx.readFile(fileName3);
        const sheetNames = workbook.SheetNames;
        // Get the data of "Sheet1"
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
        
        //console.log(data[0]);
        /// Do what you need with the received data
        //controller.insertFIMSItem(data[0]);
        //controller.insertFIMSItem(data[1]);
        
        data.map(item => {
            if(item.Type == 'H') {
                let countAttr = Object.keys(item).length;
                let postalItem = {};
                //console.log(countAttr);
                if (countAttr == 30) {
                    postalItem.postal_id = item.Field1;
                    postalItem.reference_id = item.Field3;
                    postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD") ;

                    //console.log(postalItem);
                }
                if (countAttr == 29) { 
                    postalItem.postal_id = item.Field1;
                    postalItem.reference_id = item.Field3;
                    postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD");

                    //console.log(postalItem);
                }
                if (countAttr == 28) {
                    if (item.Field1) {
                        postalItem.postal_id = item.Field1;
                    } else {
                        postalItem.postal_id = null;
                    }
                    postalItem.reference_id = item.Field3;
                    postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD");

                    //console.log(postalItem);
                }
                if (countAttr == 27) {
                    if (item.Field1) {
                        postalItem.postal_id = item.Field1;
                    } else {
                        postalItem.postal_id = null;
                    }
                    postalItem.reference_id = item.Field3;
                    postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    if (item.Field36) {
                        postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD");
                    }
                    
                    //console.log(postalItem);
                }
                if (countAttr == 26) {
                    if (item.Field1) {
                        postalItem.postal_id = item.Field1;
                    } else {
                        postalItem.postal_id = null;
                    }
                    postalItem.reference_id = item.Field3;
                    postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    if (item.Field36) {
                        postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD");
                    }

                    //console.log(postalItem);
                }
                if (countAttr == 25) {
                    if (item.Field1) {
                        postalItem.postal_id = item.Field1;
                    } else {
                        postalItem.postal_id = null;
                    }
                    postalItem.reference_id = item.Field3;
                    if (item.Field5)
                        postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    if (item.Field36) {
                        postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD");
                    }

                    //console.log(postalItem);
                }
                if (countAttr == 24) {
                    if (item.Field1) {
                        postalItem.postal_id = item.Field1;
                    } else {
                        postalItem.postal_id = null;
                    }
                    postalItem.reference_id = item.Field3;
                    if (item.Field5)
                        postalItem.company = item.Field5;
                    postalItem.shipper_name = item.Field6;
                    postalItem.shipper_state = item.Field10;
                    postalItem.shipper_country = item.Field12;
                    postalItem.recipient_country = item.Field24;
                    postalItem.label_type = item.Field28;
                    postalItem.source_type = item.Field34;
                    if (item.Field36) {
                        postalItem.label_date = moment(item.Field36, 'MM-DD-YYYY').format("YYYY-MM-DD");
                    }

                    //console.log(postalItem);
                }
                if (countAttr == 23) {}
                if (countAttr == 22) {}
                if (countAttr == 21) {}
                
                if (item.Field1) {
                    controller.insertFIMSItem(postalItem);
                    //console.log(`Inserindo obj ${postalItem}`);
                }
            }
            
        });
        //*/
        res.json([]);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post("/shipper/createLabel", auth, async function (req, res, next) {
    let fields = req.body;
    /**
     * <shipper>
            <name>Luis Santos</name>
            <company>DIRECT LINK 2</company>
            <address1>700 DOWD AVE</address1>
            <address2></address2>
            <city>ELIZABETH</city>
            <state>NJ</state>
            <zipCode>07201</zipCode>
            <country>US</country>
            <phone></phone>
            <email></email>
            <taxNo></taxNo>
         </shipper>

     */
    let data = JSON.stringify([
        {
            "referenceNo": fields.reference,
            //"serviceCode": "DIRECT.LINK.US.BPS.25",
            //"serviceCode": "DIRECT.LINK.US.L3",
            //"serviceCode": "DLUS.DDP.NJ01",
            //"serviceCode": "DLUS.DDP.NJ02",
            //"serviceCode": "DIRECT.LINK.ONE.ST.NJ",
            //"serviceCode": "DIRECT.LINK.US.APG.E.AU",
            //"serviceCode": "DIRECT.LINK.US.APG.EP.AU",
            //"serviceCode": "DIRECT.LINK.US.APG.E.NZ",
            //"serviceCode": "DIRECT.LINK.US.APG.EP.NZ",
            "shipperName": "Test Shiper name",
            "incoterm": "DDP",
            "shipperPhone": "17606410185",
            "shipperAddressLine1": "700 DOWD AVE",
            "shipperCity": "ELIZABETH",
            "shipperState": "NJ",
            "shipperPostcode": "07201",
            "shipperCountry": "US",
            "instruction": "www.level99games.com",
            "facility": "EWR",
            "weight": "5.8",
            "weightUnit": "kg",/*
            "extendData": {
                "originPort": "JFK"
            },//*/
            "length": "36.83",
            "height": "13.97",
            "width": "30.00",
            "description": "Board Game and Accessories",
            "invoiceValue": 98.04,
            "invoiceCurrency": "USD",
            "recipientName": "Diego Armando Trejo Torres",
            //"recipientTaxId": "32097199852",
            "phone": "55119838310000",
            "email": "lkd@gmail.com",
            "addressLine1": "Circuito Cienfuegos 22",
            //"addressLine2": "Fraccionamiento Parque Habana",
            "city": "Puebla",
            "state": "Puebla",
            "postcode": "72865",
            "country": 'MX',
            /*
            "city": "Nacajuca",
            "state": "Tabasco",
            "postcode": "86246",
            "country": 'MX',
            //*/
            "orderItems": [{
                "description": "Board Game and Accessories",
                "unitValue": "98.04",
                itemCount: 1,
                "weight": "5.8",
                "hsCode": 95049060,
                "originCountry": "CN"
            }]
        }
    ]);
    console.log(data);
    let resp = await ETower.generateLabel(data);
    res.json(resp);

});

router.get("/shipper/sendToEtower", auth, async function (req, res, next) {
    //const Token = "testWlkVgvAr3a6aTad1Agr";
    //const Secret = "2xsrlE9wH6SDSHm2SMELfw";
    const Token = "testsXQ_b-YKPb2wQm6OWgI";
    const Secret = "nrf_5XMyy5erR49ae1lWAg";

    let X_WallTech_Date = (new Date()).toGMTString();
    let path = `/services/shipper/orders`;
    let auth = "POST" + '\n' + X_WallTech_Date + '\n' + url + path;
    let a = crypto.createHmac('sha1', Secret).update(auth).digest().toString('base64');

    let data = JSON.stringify([
        {
            "referenceNo": "DilsonTest 2023-06-15-01",
            "serviceCode": "DIRECT.LINK.ONE.ST.NJ",
            "shipperName": "Test Shiper name",
            "shipperPhone": "17606410185",
            "shipperAddressLine1": "test shipper address",
            "shipperCity": "miami",
            "shipperState": "FL",
            "shipperPostcode": "22222",
            "shipperCountry": "US",
            "instruction": "XXXX@XX.COM",
            "facility": "MIA",
            "weight": "0.4",
            "length": "17.0",
            "height": "3.0",
            "width": "12.0",
            "weightUnit": "KG",
            "invoiceValue": 20,
            "invoiceCurrency": "USD",
            "recipientName": "Recipient KDD",
            "recipientTaxId": "32097199852",
            "phone": "55119838310000",
            "email": "lkd@gmail.com",
            "addressLine1": "Rua Mirassol 272",
            "city": "São Paulo",
            "state": "SP",
            "postcode": "04044010",
            "country": "BR",
            "orderItems": [
                {
                    "sku": "AAA-B08HH6QAAA",
                    "description": "BLABLABLA PERSONAL CARE PRODUCTS",
                    "hsCode": "222222",
                    "originCountry": "US",
                    "itemCount": "1",
                    "unitValue": "10.00",
                    "weight": "0.20"
                },
                {
                    "sku": "AAA-B094NYJJAA",
                    "description": "BLEBLEBLE PERSONAL CARE PRODUCTS",
                    "hsCode": "333333",
                    "originCountry": "US",
                    "itemCount": "1",
                    "unitValue": "10.00",
                    "weight": "0.20"
                }
            ]
        }
    ]);
    //*/
    request({
        url: url + path,
        method: "POST",
        headers: {
            'Authorization': "WallTech " + Token + ":" + a,
            'Content-Type': 'application/json',
            'X-WallTech-Date': X_WallTech_Date,
            'Accept': 'application/json',
            'Host': 'qa.etowertech.com',
        },
        body: data
    }, (error, response, body) => {
        res.json(JSON.parse(body));
    });

});

router.get("/shipper/getLabelInfo", auth, async function (req, res, next) {
    try {
        const Token = "testsXQ_b-YKPb2wQm6OWgI";
        const Secret = "nrf_5XMyy5erR49ae1lWAg";

        let X_WallTech_Date = (new Date()).toGMTString();
        let path = `/services/shipper/queryorders`;
        let auth = "POST" + '\n' + X_WallTech_Date + '\n' + url + path;
        let a = crypto.createHmac('sha1', Secret).update(auth).digest().toString('base64');

        let data = JSON.stringify([req.query.ID]);

        request({
            url: url + path,
            method: "POST",
            headers: {
                'Authorization': "WallTech " + Token + ":" + a,
                'Content-Type': 'application/json',
                'X-WallTech-Date': X_WallTech_Date,
                'Accept': 'application/json',
                'Host': 'qa.etowertech.com',
            },
            body: data
        }, (error, response, body) => {
            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/shipper/GPSLabel", async function (req, res, next) {
    //APG.testeXML();
    //APG.Authenticate();
    APG.createLabel();
    res.json([]);
});

router.get("/shipper/ePostLabel", async function (req, res, next) {
    //APG.testeXML();
    //let resp = await ePost.createLabel();
    let resp = await ePost.listPackages();
    res.json(resp);
});

router.get("/shipper/loadFIMS_excel", async function (req, res, next) {
    const fileName = "uploads/Reports/" + req.query.file +".xls";
    const workbook = xlsx.readFile(fileName);
    const sheet_name_list = workbook.SheetNames;
    var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    //*
    data.map(el => {
        //data.forEach(el => {
        if (el['Postal ID']) {
            let SQL = "INSERT INTO directlink.fims_report_3 VALUES (null, ?, ?, ?, ?, ?, ?, ?)";
            //console.log(el['Date Printed']);
            let labelDate = (el['Date Printed'] ? moment(el['Date Printed'],"MM-DD-YYYY").format("YYYY-MM-DD") : null);
            db.query(SQL, [el['Postal ID'], el['FIMS AWB'], el['Reference'], el['Value'], el['Dest. Country'], labelDate, el['Customer']]);
        }
    });
    res.json([]);
});

router.get("/shipper/orderLabel", async function (req, res, next) {
    let json = {
        "labelFormat": "JPG",
        "labelType": "0",
        "orders": [
            {
                "referenceNo": "DilsonTest2023071812",
                "country": "CA",
                "serviceCode": "DIRECT.LINK.ONE.ST.NJ",
                "facility": "EWR",
                "state": "AB",
                "city": "Picture Butte",
                "postcode": "T0K 1V0",
                "addressLine1": "PO box 759",
                "addressLine2": "",
                "recipientName": "Mr. Jake Slingerland",
                "phone": "4037154656",
                "email": "jakeslingerland50@gmail.com",
                "invoiceCurrency": "USD",
                "invoiceValue": 10,
                "weightUnit": "LB",
                "weight": 0.55,
                "dimensionUnit": "in",
                "length": 11,
                "width": 9,
                "height": 2,
                "description": "Books",
                "nativeDescription": "",
                "shipperName": "Chapel Library-Mt Zion",
                "shipperPhone": "18504340058",
                "shipperState": "FL",
                "shipperPostcode": "32505",
                "shipperCountry": "US",
                "shipperCity": "Pensacola",
                "shipperAddressLine1": "2603 W Wright St",
                "shipperWebsite": "www.ChapelLibrary.org",
                "instruction": "www.chapellibrary.org",
                "vendorid": "123456",
                "orderItems": [
                    {
                        "description": "Books - Commercial Sample",
                        "itemCount": "5",
                        "originCountry": "US",
                        "unitValue": "2",
                        "hsCode": "490199",
                        "productURL": "https://www.chapellibrary.org",
                        "sku": "eish",
                        "weight": ".11"
                    }
                ]
            }
        ]
    };

    let resp = await ETower.orderLabel(JSON.stringify(json));
    //fs.writeFileSync('./label.txt', resp);
    res.json(resp);
});

module.exports = router;