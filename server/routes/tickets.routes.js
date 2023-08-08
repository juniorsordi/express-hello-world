const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require('../controllers/tickets');
var fs = require('fs');
var request = require('request');
var mailer = require("../infra/mailer");


router.get("/dashboard/status", auth, async function (req, res, next) {
    try {
        res.json(await controller.getDashboardStatusTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/dashboard/lastTickets", auth, async function (req, res, next) {
    try {
        res.json(await controller.getDashboardLastTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/tickets/list", auth, async function (req, res, next) {
    try {
        res.json(await controller.getAllTickets());
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/ticket/:id", auth, async function (req, res, next) {
    try {
        res.json(await controller.getTicketByID(req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/ticket/:id/event", auth, async function (req, res, next) {
    try {
        req.body.user_id = req.cookies.IDUser;
        res.json(await controller.saveTicketEvent(req.body, req.params.id));
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/test/convertZPL", async function (req, res, next) {
    try {
        var zpl = `^XA
^LH05,3
^PR6
^MTD
^PON
^FO030,623^A0N,018,024^FDDescription of Contents^FS
^FO487,610^A0N,018,024^FDNET^FS
^FO487,630^A0N,018,024^FDWGT^FS
^FO538,610^A0N,018,024^FDValue^FS
^FO538,630^A0N,018,024^FD(USD)^FS
^FO411,623^A0N,018,024^FDQTY^FS
^FO724,613^A0N,016,016^FDCountry of^FS^FO744,630^A0N,016,016^FDOrigin^FS^FO609,610^A0N,017,017^FDHS Tariff^FS^FO629,632^A0N,017,017^FDNo.^FS^FO030,660^A0,N,018,016^FDBOOK^FS
^FO422,660^A0,N,018,016^FD1^FS
^FO491,660^A0,N,014,017^FD0,9^FS
^FO540,660^A0,N,018,016^FD13^FS
^FO609,660^A0,N,018,016^FD^FS
^FO744,660^A0,N,018,016^FDUS^FS
^FO619,999^A0,N,026,024^FD13^FS
^FO416,999^A0,N,026,024^FD0^FS
^FO423,950^A0N,020,020^FDTotal^FS
^FO426,967^A0N,020,020^FDQTY^FS
^FO487,950^A0N,020,020^FDTotal^FS
^FO491,967^A0N,020,020^FDWGT^FS
^FO486,999^A0N,014,017^FD0,9^FS^FO575,957^A0N,020,020^FDTotal Value (USD)^FS^FO020,943^GB782,000,002^FS^FO020,984^GB782,000,002^FS^FO020,1033^GB782,000,002^FS^FO020,943^GB000,089,002^FS^FO406,943^GB000,089,002^FS^FO482,943^GB000,089,002^FS^FO533,943^GB000,089,002^FS^FO800,943^GB000,089,002^FS^FT027,95^A0N,022,022^FDFROM^FS^FO677,074^FR^GB122,088,001^FS^FO704,081^A0N,020,020^FDPostage^FS^FO711,108^A0N,020,020^FDPaid^FS^FO697,135^A0N,020,020^FDAustralia^FS^FT027,196^A0N,024,024^FDTO^FS^FO027,220^A0N,024,024^FDEmail: ^FS^FO90,220^A0N,024,024^FDjohn@doe.com^FS^FO27,200^A0N,024,024^FDTel No:  + 1 201 370 2316^FS^FO020,024^A0N,041,041^FDCN22^FS^FO129,017^A0N,024,024^FDCUSTOMS DECLARATION^FS^FO129,041^A0N,024,024^FDDOUANE^FS^FO450,05^GFA,1342,1342,22,,3SFE,7TF,::::::::7LF83LF,7LF807KFI0404679C10084,7JF8FF81KFI0C2491123108C,7JF0IF07JFI0E2481123108E,7IFC0IF83JFI0A24611C2908A,7IF80IFC0JF001A2431166909A,7IF00IFE07IF001F2491127909F,7FFE00JF07IF00112CD11245C91,7FFE00JF83IFJ0106,7FFC00JF81IF,7FF800JF81IF,7FF800JFC0IFQ018K06,7FF800JFC0IF001IFCI03FFCI0IF03KF,7FFI0JFC07FF001JFC00JF003IFC3KF8,7FFI0JFC07FF001JFE01JF807IFE3KF8,7FFI0JFC07FF001KF03JFC0KF3KF8,7FEI0JFC07FF001KF87JFE0KF3KF8,7FEI0JF803FF001KF8KFE0FF1FF3KF8,7FEI0JF803FF001KF8FF83FF1FE07FBKF,7FEI0JF803FFL07FCFF00FF1FE07F807F8,7FEI0JF003FFL03FDFF00FF9FFK07F8,7FEI0IFE003FFL03FDFE007F9IFJ07F8,7FEI0IFC007FFL03FDFE007F8JFI07F8,7FFI0IF8007FFL0FF9FE007F8JFC007F8,7FFI0IFI07FF001KF9FE007F87IFE007F8,7FFI0FFCI07FF001KF9FE007F83JF007F8,7FF800F8J0IF001KF1FE007F80JF807F8,7FF800F8J0IF001JFE1FE007F801IF807F8,7FF800F8I01IF001JFC1FE007F8001FFC07F8,7FFC00F8I01IF001IFE01FF00FF9FC07FC07F8,7FFE00F8I03IF001FEJ0FF00FF1FE03FC07F8,7FFE00F8I07IF001FEJ0FF83FF1FF07F807F8,7IF00F8I07IF001FEJ0KFE1KF807F8,7IF80F8I0JF001FEJ07JFE0KF807F8,7IFC0F8003JF001FEJ03JFC0KF007F8,7JF0F8007JF001FEJ01JF807IFE007F8,7JF8F801KF001FEK0IFE001IFC007F8,7LF807KF001FEK03FF8I07FFI07F8,7LF83LF,7TF,::::::::3SFE,,^FS^FO630,05^GFA,1260,1260,21,VF8M03UFC,VF820080603UFC,VF860180603UFC,VF8C0300C03UFC,VF8C0301803KF9BF6FBJFC,VF8M03KFA795FBEFB7C,VF8M03KFB3D5FB3F17C,VF8LFE3LF3CDF77F37C,VF9LFE3NFDFFCIFC,VF9LFE3UFC,:::VF9IF7DBE3UFC,VF9JF83E3UFC,VF9IF017E3UFC,VF9FFE057E3UFC,VF9FF915AE3UFC,VF9FF9EDCE3UFC,VF9FF16ECE3UFC,VF9FF36ECE3UFC,VF9FF37E763UFC,VF9FF7707E3UFC,VF9FF0037E3UFC,VF9FF337FE3UFC,VF9FFI7B63UFC,VF9FFI78E3UFC,VF9FFI79E3UFC,VF9IF723E3UFC,VF9FFCC1FE3UFC,VF9FFD9BDE3UFC,VF9IFBBC63UFC,VF9FFDBFCE3UFC,VF9FFEBC0E3UFC,VF9IFE03E3UFC,VF9IFE07E3UFC,VF9LFE3UFC,:::VF9D6BIFE3UFC,VF9D2BIFE3UFC,VF9LFE3UFC,:VF9C3JFE3UFC,VF9CBFFDFE3UFC,VF9C8I08E3UFC,VF9C41I0E3UFC,VF9CC9104E3UFC,VF9CC010C63UFC,VF9C00588E3UFC,VF9FF9IFE3UFC,VF9FF9IFE3KF7BFDEDEDEFC,FE7F7QF8LFE3KF7EFDEFFDEFC,FF3F7QF83KF83JFD1EICFFCCFC,FFB77QF807IFC03JFD9ECE4FF243C,FFA7RF801IF003LFEJFEFFBC,VF8007FC003UFC,VF8001FI03UFC,VF8M03UFC,^FS^FO129,380^BY3^BCN,90,N,N^FDLO000110479AU^FS^FO298,484^A0N,030,030^FDLO000110479AU^FS^FO640,204^BY32^BX,7,200^FDLO000110479AU^FS^FO020,603^GB782,343,002^FS^FO020,650^GB782,000,002^FS^FO482,603^GB000,343,002^FS^FO599,603^GB000,343,002^FS^FO406,603^GB000,343,002^FS^FO533,603^GB000,343,002^FS^FO717,603^GB000,343,002^FS^FO007,003^FR^GB792,063,001^FS^FO007,071^FR^GB660,102,001^FS^FO007,175^FR^GB792,185,001^FS^FO017,1050^FR^GB787,160,001^FS^FO017,517^FR^GB785,081,001^FS^FO020,522^FR^GB034,034,034^FS^FO071,528^A0N,026,026^FDSale of goods^FS^FO020,562^FR^GB034,034,001^FS^FO071,569^A0N,026,026^FDReturned Goods^FS^FO257,522^FR^GB034,034,001^FS^FO298,528^A0N,026,026^FDDocument^FS^FO257,562^FR^GB034,034,00^FS^FO298,569^A0N,026,026^FDOther:^FS^FO413,522^FR^GB034,034,001^FS^FO453,528^A0N,026,026^FDCommercial sample^FS^FO670,522^FR^GB034,034,001^FS^FO717,528^A0N,026,026^FDGift^FS^FO020,1056^A0N,026,026^FDI, the undersigned, whose name and address are given on the item, certify ^FS^FO020,1079^A0N,026,026^FDthat the particulars given in the declaration are correct and that this item^FS^FO020,1110^A0N,026,026^FDdoes not contain any dangerous articles prohibited by legislators^FS^FO020,1140^A0N,026,026^FDor by postal or customs regulations^FS^FO020,1175^A0N,026,026^FDSignature of Sender____________________^FS^FO589,1175^A0N,026,026^FDDate   08/05/2023^FS^FO643,1201^GB149,002,002^FS^FT27,115^A0N,022,022,TT0003M_^FDAPG UK  C/O Startrack returns^FS
^FT27,135^A0N,022,022,TT0003M_^FDPO Box 6082 (Chull Chullora NSW 1405^FS^FT27,261^A0N,024,024,TT0003M_^FDLINDSAY DWANE^FS
^FT27,283^A0N,024,024,TT0003M_^FDGPO BOX 4274^FS
^FT27,305^A0N,024,024,TT0003M_^FDSYDNEY NSW  2001^FS
^FT27,327^A0N,024,024,TT0003M_^FD^FS
^FT27,349^A0N,024,024,TT0003M_^FD^FS^FO590,110^A0N,034,034^FD AU^FS^XZ`;

        var options = {
            encoding: null,
            formData: { file: zpl },
            // omit this line to get PNG images back
            //headers: { 'Accept': 'application/pdf' },
            // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
            url: 'http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/'
        };

        request.post(options, function (err, resp, body) {
            if (err) {
                return console.log(err);
            }
            var filename = 'label.png'; // change file name for PNG images
            fs.writeFile(filename, body, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/test/email", async function (req, res, next) {
    var name = "RB";
    var company = "Consultoria RB";
    let email = {
        replyTo: 'noreply@consultoria.com.br',
        to: 'juniorsordi82@gmail.com',
        subject: 'Mail Test 3',
        message: `<h2>Hello ${name}! </h2>
  <p>We're glad to have you on board at ${company}. </p>`
    };
    var resp = await mailer.send(email);
    res.json(resp);
});

module.exports = router;