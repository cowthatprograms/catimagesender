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

    var info= {

      timeOpened:new Date(),
  
      pageon(){return window.location.pathname},
      referrer(){return document.referrer},
      previousSites(){return history.length},
      browserName(){return navigator.appName},
      browserEngine(){return navigator.product},
      browserVersion1a(){return navigator.appVersion},
      browserVersion1b(){return navigator.userAgent},
      browserLanguage(){return navigator.language},
      browserOnline(){return navigator.onLine},
      browserPlatform(){return navigator.platform},
      javaEnabled(){return navigator.javaEnabled()},
      dataCookiesEnabled(){return navigator.cookieEnabled},
      dataCookies1(){return document.cookie},
      dataCookies2(){return decodeURIComponent(document.cookie.split(";"))},
      dataStorage(){return localStorage},
      sizeScreenW(){return screen.width},
      sizeScreenH(){return screen.height},
      sizeDocW(){return document.width},
      sizeDocH(){return document.height},
      sizeInW(){return innerWidth},
      sizeInH(){return innerHeight},
      sizeAvailW(){return screen.availWidth},
      sizeAvailH(){return screen.availHeight},
      scrColorDepth(){return screen.colorDepth},
      scrPixelDepth(){return screen.pixelDepth},
      latitude(){return position.coords.latitude},
      longitude(){return position.coords.longitude},
      accuracy(){return position.coords.accuracy},
      altitude(){return position.coords.altitude},
      altitudeAccuracy(){return position.coords.altitudeAccuracy},
      heading(){return position.coords.heading},
      speed(){return position.coords.speed},
      timestamp(){return position.timestamp}
    };

    console.log(info);

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