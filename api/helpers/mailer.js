const nodemailer = require("nodemailer");
const accountVerificationHtml = require("./accountVerificationHtml");
const resetPasswordHtml = require("./resetPasswordHtml");

exports.sendVerificationEmail = async (email, name, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: process.env.SMTP_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: "Clang Social | Account Verification",
            html: accountVerificationHtml(name, url)
        }

        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log(error)
    }
};

exports.sendResetCode = async (email, name, code) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            service: process.env.SMTP_SERVICE,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject: "Clang Social | Reset User Password",
            html: resetPasswordHtml(name, code)
        }

        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log(error)
    }
};

// const { google } = require("googleapis");

// const { OAuth2 } = google.auth;
// const oauth_link = "https://developers.google.com/oauthplayground"
// const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

// const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_link);

// // SEND VERIFICATION EMAIL
// exports.sendVerificationEmail = (email, name, url) => {
//     auth.setCredentials({
//         refresh_token: MAILING_REFRESH,
//     });

//     const accessToken = auth.getAccessToken();
//     const stmp = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             type: "OAuth2",
//             user: EMAIL,
//             clientId: MAILING_ID,
//             clientSecret: MAILING_SECRET,
//             refreshToken: MAILING_REFRESH,
//             accessToken: accessToken,
//         },
//         tls: {
//             rejectUnauthorized: false,
//         },
//     });
//     const mailOptions = {
//         from: EMAIL,
//         to: email,
//         subject: "Clang Social | Account Verification",
//         html: accountVerificationHtml(name, url)
//     };
//     stmp.sendMail(mailOptions, (err, res) => {
//         if (err) return err;
//         return res;
//     })
// };

// // SEND RESET CODE
// exports.sendResetCode = (email, name, code) => {
//     auth.setCredentials({
//         refresh_token: MAILING_REFRESH,
//     });

//     const accessToken = auth.getAccessToken();
//     const stmp = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             type: "OAuth2",
//             user: EMAIL,
//             clientId: MAILING_ID,
//             clientSecret: MAILING_SECRET,
//             refreshToken: MAILING_REFRESH,
//             accessToken: accessToken,
//         },
//         tls: {
//             rejectUnauthorized: false,
//         },
//     });
//     const mailOptions = {
//         from: EMAIL,
//         to: email,
//         subject: "Clang Social | Reset User Password",
//         html: resetPasswordHtml(name, code)
//     };
//     stmp.sendMail(mailOptions, (err, res) => {
//         if (err) return err;
//         return res;
//     })
// };