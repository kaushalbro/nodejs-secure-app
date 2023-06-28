const nodemailer = require("nodemailer");
const sender_email = "engineeringscircle@gmail.com";
const sender_email_pass = "dtrftxbqnfntdhsh";
const subscriber_mail_body = (user_name, url) => {
  const html = ` </head>
  <body style="font-family: Arial, sans-serif; padding: 20px;">
    <h1 style="text-align: center;">Subscribe to Our Newsletter</h1>
    <p style="font-size: 18px;">Hi, ${user_name},</p>
    <p style="font-size: 18px;">
      Thanks for showing interest in our newsletter. To subscribe, please click the link below:
    </p>
    <p style="font-size: 18px; text-align: center;">
      <a href="${url}" style="color: #fff; background-color: #007bff; border-radius: 5px; padding: 10px 20px; text-decoration: none;">Subscribe</a>
    </p>
    <p style="font-size: 18px;">
      Note: if you do not verify this link will be expired in 7 day.
      If you didn't sign up for this service, you can safely ignore this email.
    </p>
    <p style="font-size: 18px;">Thanks,</p>
    <p style="font-size: 18px;">The ${"kaushal's team"} Team</p>
  </body>`;
  return html;
};

const email_registration_body = (usrname, url) => {
  const html_body = `<body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center;">Verify Your Email Address</h1>
        <p style="font-size: 18px;">Hi ${usrname},</p>
        <p style="font-size: 18px;">
          Thanks for signing up with [company name]. Please verify your email address by clicking the link below:
        </p>
        <p style="font-size: 18px; text-align: center;">
          <a href="${url}" style="color: #fff; background-color: #007bff; border-radius: 5px; padding: 10px 20px; text-decoration: none;">Verify Email Address</a>
        </p>
        <p style="font-size: 18px;">
          Note: if you do not verify this link will be expired in 7 day.
          If you didn't sign up for this service, you can safely ignore this email.
        </p>
        <p style="font-size: 18px;">Thanks,</p>
        <p style="font-size: 18px;">The ${"kaushal's team"}  Team</p>
      </body> `;
  return html_body;
};

// create reusable transporter object using the default SMTP transport

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: sender_email,
    pass: sender_email_pass,
  },
});
// "✔ Subscribe to Our Newsletter ✔"
const send = async (mail_to, subject, html_body) => {
  // send mail with defined transport object
  try {
    await transporter.sendMail({
      from: sender_email, // sender address
      to: mail_to, // list of receivers
      subject: subject, // Subject line
      html: html_body, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sendMailToSubscriber = (mail_to, link) => {
  send(
    mail_to,
    "✔ Subscribe to Our Newsletter ✔",
    subscriber_mail_body(mail_to, link)
  );
};

const sendEmailVerificationMail = (mail_to, link) => {
  send(
    mail_to,
    "✔ Verify Your Email Address ✔",
    email_registration_body(mail_to, link)
  );
};

// sendEmailVerificationMail("official.kaushalg@gmail.com", "http://google.com");
// sendMailToSubscriber("official.kaushalg@gmail.com", "http://google.com");
