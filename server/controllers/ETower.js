const db = require("../mariadb");
var crypto = require('crypto');
var moment = require("moment");
const fs = require("fs");
var request = require('request');
const TokenQA = "testsXQ_b-YKPb2wQm6OWgI";
const TokenPROD = "pcluhapq0GpxakIQtKPjUR";
const SecretQA = "nrf_5XMyy5erR49ae1lWAg";
const SecretPROD = "kGZjZBB3i5X1T75_6DmcwQ";
const urlQA = 'http://qa.etowertech.com';
const urlPROD = 'http://us.etowertech.com';
const DEV = true;

async function generateLabel(json) {
    //*
    let Secret = "";
    let Token = "";
    let url = "";
    let path = `/services/shipper/orders`;
    if (DEV) {
        Secret = SecretQA;
        Token = TokenQA;
        url = urlQA;
    } else {
        Secret = TokenPROD;
        Token = SecretPROD;
        url = urlPROD;
    }
    //*/
    //console.log([Secret,Token,DEV]);

    return await makeRequest(url, path, Secret, Token, json);
}

async function orderLabel(json) {
    //let path = `/services/shipper/orders`;
    let path = `/services/shipper/orderLabels`;
    if (DEV) {
        Secret = SecretQA;
        Token = TokenQA;
        url = urlQA;
    } else {
        Secret = TokenPROD;
        Token = SecretPROD;
        url = urlPROD;
    }
    //*/
    //console.log([Secret,Token,DEV]);

    const resp = await makeRequest(url, path, Secret, Token, json);
    return resp;
}

async function closeShipment() {}

async function makeRequest(url, path, Secret, Token, data) {
    let respBody;
    console.log(url);
    let X_WallTech_Date = (new Date()).toGMTString();
    let auth = "POST" + '\n' + X_WallTech_Date + '\n' + url + path;
    let a = crypto.createHmac('sha1', Secret).update(auth).digest().toString('base64');

    request({
        url: url + path,
        method: "POST",
        headers: {
            'Authorization': "WallTech " + Token + ":" + a,
            'Content-Type': 'application/json',
            'X-WallTech-Date': X_WallTech_Date,
            'Accept': 'application/json',
            'Host': url.replace("http://",""),
        },
        body: data
    }, (error, response, body) => {
        console.log(error);
        //console.log(response);
        console.log(body);
        respBody = body;
        let json = JSON.parse(body);
        //return JSON.parse(body);
        //fs.writeFileSync("server1.log", body);
        //console.log(json.status);
        if (json.status == "Success") {
            var base64String = json.data[0].labelContent;
            //let base64Image = base64String.split(';base64,').pop();
            fs.writeFile(json.data[0].trackingNo + '.jpg', base64String, { encoding: 'base64' }, function (err) {
                console.log('File created');
            });
        }
        
        //*/
        return respBody;
    });
}

module.exports = {
    generateLabel,
    orderLabel,
    closeShipment
}