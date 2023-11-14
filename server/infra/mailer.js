const nodemailer = require('nodemailer');

const send = async function (email) {
    const transporter = nodemailer.createTransport({
        name: 'Consultoria RB',
        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 587,
        auth: {
            user: "AKIAWGP3CHEY7WXXGWHT",
            pass: "BOkp8D+1DHEY4jKRghabjpuVg3b7u/diJl1hVbZQB7eo"
        }
    });
    const mailOptions = {
        from: `<noreply@gennera.com.br>`,
        to: email.to,
        cc: email.cc,
        bcc: email.bcc,
        replyTo: email.replyTo,
        subject: email.subject,
        html: email.message
    };
    const info = await transporter.sendMail(mailOptions);
        /*
        , function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        return info;
        //*/
    //});
    return info;
};

module.exports = {
    send
};