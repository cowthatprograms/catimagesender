const http = require('http');
const formidable = require('formidable');
const meow = require('random-meow');
const { send } = require('./mail');

let port = process.env.PORT;
if (port == null || port == "") { port = 8080; }

var mailOptions = {
  from: 'catimagesender@gmail.com',
  to: '',
  subject: 'Cat Image!',
  html: '',
};

http.createServer(function(req, res) {
  if (req.url == '/sent') {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      meow().then(url => {
        let catImagePath = url;
        console.log(catImagePath);
        mailOptions.html = `<img src="${catImagePath}" height="200px">`;
      });

      mailOptions.to = fields.receivers;
      
      if (fields.subject != '') { mailOptions.subject = fields.subject; }

      send(mailOptions);
      res.write('cat image sent!');
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<h1>Cat Image Sender</h1>');
    res.write('<form action="sent" method="post" enctype="multipart/form-data">');
    res.write('<label>Send to: </label>');
    res.write('<input type="text" name="receivers"><sup> *comma separated list for more than one email</sup><br>');
    res.write('<label>Subject (optional): </label>');
    res.write('<input type="text" name="subject"><br><br>');
    res.write('<input type="submit" value="Send">');
    res.write('</form>');

    return res.end();
  }
}).listen(port);