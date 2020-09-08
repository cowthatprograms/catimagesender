const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'catimagesender@gmail.com',
    pass: 'catimagesarecool'
  }
});

module.exports.send = function(mailOptions) {
  try {
    transporter.sendMail(mailOptions, function(error, info) {
      console.log('Email sent: ' + info.response);
      console.log(mailOptions);
    });
  } catch {
    console.log('something broke lol');
  }
}