import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, subject: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log('testAccount', testAccount);

  // create reusable transporter object using the default SMTP transport
  const nodeEnv = process.env.NODE_ENV
  const sendMailEnv = process.env.SEND_MAIL
  if(nodeEnv == 'development' || !sendMailEnv || sendMailEnv === 'false') {
    console.log("Not using NodeMailer. Either running in development mode or disabled")
    return
  }
  let transporter = nodemailer.createTransport({
    name: "smtp.ethereal.email",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'lgoahpztavtgcliv@ethereal.email', // generated ethereal user
      pass: 'w7Yuvaakf1FEpB8CPu', // generated ethereal password
    },
    // logger: true,
    // debug: true
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
