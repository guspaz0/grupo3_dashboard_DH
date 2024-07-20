const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require("dotenv")
dotenv.config()
const {USER_EMAIL, USER_PASS,
    CLIENT_ID, CLIENT_SECRET,
    REFRESH_TOKEN, ACCESS_TOKEN } = process.env

const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: REFRESH_TOKEN,
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.log("*ERR: ", err)
                    reject();
                }
                resolve(token); 
            });
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: USER_EMAIL,
                accessToken,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
            },
        });
        return transporter;
    } catch (err) {
        return err
    }
};


const sendEmail = async (to,subject,text,html) => {
    try {
        const mailOptions = {
            from: `La Tienda De Maria💚 <${USER_EMAIL}>`,
            to,
            subject,
            text,
            html
        }

        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(mailOptions);
    } catch (err) {
        console.log("ERROR: ", err)
    }
};

module.exports = {sendEmail}

