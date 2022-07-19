export default async function contact(req, res) {
  require("dotenv").config();

  const USER = process.env.user;
  const PASSWORD = process.env.password;
  const CLIENTID = process.env.OAUTH_CLIENTID;
  const CLIENTSECRET = process.env.OAUTH_CLIENT_SECRET;
  const REFRESHTOKEN = process.env.OAUTH_REFRESH_TOKEN;

  let nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: USER,
      pass: PASSWORD,
      clientId: CLIENTID,
      clientSecret: CLIENTSECRET,
      refreshToken: REFRESHTOKEN,
    },
  });

  let mailData = {
    from: USER,
    to: USER,
    subject: `Message From ${req.body.name}`,
    text: req.body.message,
    html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`,
  };

  await transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  res.status(200);
  res.send("Success");
}
