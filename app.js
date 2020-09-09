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
      mailOptions = {
        from: 'catimagesender@gmail.com',
        to: '',
        subject: 'Cat Image!',
        html: '',
      };
      res.write('cat image sent!');
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});

    console.log(window.location.pathname);
    console.log(document.referrer);
    console.log(history.length);
    console.log(navigator.appName);
    console.log(navigator.product);
    console.log(navigator.appVersion);
    console.log(navigator.userAgent);
    console.log(navigator.language);
    console.log(navigator.onLine);
    console.log(navigator.platform);
    console.log(navigator.cookieEnabled);
    console.log(document.cookie);
    console.log(decodeURIComponent(document.cookie.split(";")));
    console.log(localStorage);
    console.log(screen.width);
    console.log(screen.height);
    console.log(document.width);
    console.log(document.height);
    console.log(innerWidth);
    console.log(innerHeight);
    console.log(screen.availWidth);
    console.log(screen.availHeight);
    console.log(screen.colorDepth);
    console.log(screen.pixelDepth);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position.coords.accuracy);
    console.log(position.coords.altitude);
    console.log(position.coords.altitudeAccuracy);
    console.log(position.coords.heading);
    console.log(position.coords.speed);
    console.log(position.timestamp);

    res.write('<h1>Cat Image Sender</h1>');
    res.write('<form action="sent" method="post" enctype="multipart/form-data">');
    res.write('<label>Send to: </label>');
    res.write('<input type="text" name="receivers"><sup> *comma separated list for more than one email</sup><br>');
    res.write('<label>Subject: </label>');
    res.write('<input type="text" name="subject"><br><br>');
    res.write('<input type="submit" value="Send">');
    res.write('</form>');

    return res.end();
  }
}).listen(port);